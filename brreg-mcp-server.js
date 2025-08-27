#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
var BASE_URL = "https://data.brreg.no";
var BrregApiClient = /** @class */ (function () {
    function BrregApiClient() {
    }
    BrregApiClient.prototype.makeRequest = function (endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL("".concat(BASE_URL).concat(endpoint));
                        if (params) {
                            Object.entries(params).forEach(function (_a) {
                                var key = _a[0], value = _a[1];
                                if (value !== undefined && value !== null) {
                                    if (Array.isArray(value)) {
                                        url.searchParams.set(key, value.join(','));
                                    }
                                    else {
                                        url.searchParams.set(key, String(value));
                                    }
                                }
                            });
                        }
                        return [4 /*yield*/, fetch(url.toString(), {
                                headers: {
                                    'Accept': 'application/json',
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            if (response.status === 404) {
                                throw new types_js_1.McpError(types_js_1.ErrorCode.InvalidRequest, "Resource not found: ".concat(endpoint));
                            }
                            throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "API request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    BrregApiClient.prototype.searchEntities = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/enheter', params)];
            });
        });
    };
    BrregApiClient.prototype.getEntity = function (orgNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/enhetsregisteret/api/enheter/".concat(orgNumber))];
            });
        });
    };
    BrregApiClient.prototype.getEntityRoles = function (orgNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/enhetsregisteret/api/enheter/".concat(orgNumber, "/roller"))];
            });
        });
    };
    BrregApiClient.prototype.searchSubEntities = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/underenheter', params)];
            });
        });
    };
    BrregApiClient.prototype.getSubEntity = function (orgNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/enhetsregisteret/api/underenheter/".concat(orgNumber))];
            });
        });
    };
    BrregApiClient.prototype.getOrganizationalForms = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/organisasjonsformer')];
            });
        });
    };
    BrregApiClient.prototype.getOrganizationalForm = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/enhetsregisteret/api/organisasjonsformer/".concat(code))];
            });
        });
    };
    BrregApiClient.prototype.getMunicipalities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/kommuner')];
            });
        });
    };
    BrregApiClient.prototype.getMunicipality = function (municipalityNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/enhetsregisteret/api/kommuner/".concat(municipalityNumber))];
            });
        });
    };
    BrregApiClient.prototype.getEntityUpdates = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/oppdateringer/enheter', params)];
            });
        });
    };
    BrregApiClient.prototype.getSubEntityUpdates = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/oppdateringer/underenheter', params)];
            });
        });
    };
    BrregApiClient.prototype.getRoleUpdates = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/enhetsregisteret/api/oppdateringer/roller', params)];
            });
        });
    };
    BrregApiClient.prototype.searchVoluntaryOrganizations = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/frivillighetsregisteret/api/frivillige-organisasjoner', params)];
            });
        });
    };
    BrregApiClient.prototype.getVoluntaryOrganization = function (orgNumber_1) {
        return __awaiter(this, arguments, void 0, function (orgNumber, params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/frivillighetsregisteret/api/frivillige-organisasjoner/".concat(orgNumber), params)];
            });
        });
    };
    BrregApiClient.prototype.getIcnpoCategories = function () {
        return __awaiter(this, arguments, void 0, function (params) {
            if (params === void 0) { params = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/frivillighetsregisteret/api/icnpo-kategorier', params)];
            });
        });
    };
    return BrregApiClient;
}());
var server = new index_js_1.Server({
    name: "brreg-api",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
var apiClient = new BrregApiClient();
server.setRequestHandler(types_js_1.ListToolsRequestSchema, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                tools: [
                    {
                        name: "search_entities",
                        description: "Search for Norwegian business entities (hovedenheter) with various filters",
                        inputSchema: {
                            type: "object",
                            properties: {
                                navn: { type: "string", description: "Entity name (1-180 characters)" },
                                navnMetodeForSoek: { type: "string", enum: ["FORTLOEPENDE"], description: "Search method for name parameter" },
                                organisasjonsnummer: { type: "array", items: { type: "string" }, description: "List of organization numbers (9 digits)" },
                                overordnetEnhet: { type: "string", description: "Parent entity organization number" },
                                fraAntallAnsatte: { type: "number", description: "Minimum number of employees" },
                                tilAntallAnsatte: { type: "number", description: "Maximum number of employees" },
                                konkurs: { type: "boolean", description: "Whether entity is bankrupt" },
                                registrertIMvaregisteret: { type: "boolean", description: "Registered in VAT registry" },
                                registrertIForetaksregisteret: { type: "boolean", description: "Registered in business registry" },
                                registrertIStiftelsesregisteret: { type: "boolean", description: "Registered in foundation registry" },
                                registrertIFrivillighetsregisteret: { type: "boolean", description: "Registered in voluntary organization registry" },
                                underTvangsavviklingEllerTvangsopplosning: { type: "boolean", description: "Under forced liquidation" },
                                underAvvikling: { type: "boolean", description: "Under liquidation" },
                                underKonkursbehandling: { type: "boolean", description: "Under bankruptcy proceedings" },
                                organisasjonsform: { type: "array", items: { type: "string" }, description: "Organizational forms" },
                                hjemmeside: { type: "string", description: "Website" },
                                kommunenummer: { type: "array", items: { type: "string" }, description: "Municipality numbers" },
                                naeringskode: { type: "array", items: { type: "string" }, description: "Industry codes" },
                                size: { type: "number", description: "Page size (default 20)" },
                                page: { type: "number", description: "Page number" },
                                sort: { type: "string", description: "Sort field and order (e.g., 'navn,ASC')" }
                            }
                        }
                    },
                    {
                        name: "get_entity",
                        description: "Get detailed information about a specific Norwegian business entity",
                        inputSchema: {
                            type: "object",
                            properties: {
                                organisasjonsnummer: { type: "string", description: "9-digit organization number" }
                            },
                            required: ["organisasjonsnummer"]
                        }
                    },
                    {
                        name: "get_entity_roles",
                        description: "Get all roles for a specific entity",
                        inputSchema: {
                            type: "object",
                            properties: {
                                organisasjonsnummer: { type: "string", description: "9-digit organization number" }
                            },
                            required: ["organisasjonsnummer"]
                        }
                    },
                    {
                        name: "search_sub_entities",
                        description: "Search for Norwegian business sub-entities (underenheter) with various filters",
                        inputSchema: {
                            type: "object",
                            properties: {
                                navn: { type: "string", description: "Sub-entity name (1-180 characters)" },
                                navnMetodeForSoek: { type: "string", enum: ["FORTLOEPENDE"], description: "Search method for name parameter" },
                                organisasjonsnummer: { type: "array", items: { type: "string" }, description: "List of organization numbers (9 digits)" },
                                overordnetEnhet: { type: "string", description: "Parent entity organization number" },
                                fraAntallAnsatte: { type: "number", description: "Minimum number of employees" },
                                tilAntallAnsatte: { type: "number", description: "Maximum number of employees" },
                                registrertIMvaregisteret: { type: "boolean", description: "Registered in VAT registry" },
                                fraOppstartsdato: { type: "string", description: "Start date from (ISO-8601 yyyy-MM-dd)" },
                                tilOppstartsdato: { type: "string", description: "Start date to (ISO-8601 yyyy-MM-dd)" },
                                fraDatoEierskifte: { type: "string", description: "Ownership change date from (ISO-8601 yyyy-MM-dd)" },
                                tilDatoEierskifte: { type: "string", description: "Ownership change date to (ISO-8601 yyyy-MM-dd)" },
                                fraNedleggelsesdato: { type: "string", description: "Closure date from (ISO-8601 yyyy-MM-dd)" },
                                tilNedleggelsesdato: { type: "string", description: "Closure date to (ISO-8601 yyyy-MM-dd)" },
                                organisasjonsform: { type: "array", items: { type: "string" }, description: "Organizational forms" },
                                hjemmeside: { type: "string", description: "Website" },
                                kommunenummer: { type: "array", items: { type: "string" }, description: "Municipality numbers" },
                                naeringskode: { type: "array", items: { type: "string" }, description: "Industry codes" },
                                size: { type: "number", description: "Page size (default 20)" },
                                page: { type: "number", description: "Page number" },
                                sort: { type: "string", description: "Sort field and order" }
                            }
                        }
                    },
                    {
                        name: "get_sub_entity",
                        description: "Get detailed information about a specific Norwegian business sub-entity",
                        inputSchema: {
                            type: "object",
                            properties: {
                                organisasjonsnummer: { type: "string", description: "9-digit organization number" }
                            },
                            required: ["organisasjonsnummer"]
                        }
                    },
                    {
                        name: "get_organizational_forms",
                        description: "Get all organizational forms used in the Norwegian business registry",
                        inputSchema: {
                            type: "object",
                            properties: {
                                sort: { type: "string", description: "Sort order (ASC/DESC)" },
                                size: { type: "number", description: "Page size" },
                                page: { type: "number", description: "Page number" }
                            }
                        }
                    },
                    {
                        name: "get_organizational_form",
                        description: "Get information about a specific organizational form",
                        inputSchema: {
                            type: "object",
                            properties: {
                                organisasjonskode: { type: "string", description: "Organizational form code (e.g., 'AS', 'ASA')" }
                            },
                            required: ["organisasjonskode"]
                        }
                    },
                    {
                        name: "get_municipalities",
                        description: "Get all Norwegian municipalities",
                        inputSchema: {
                            type: "object",
                            properties: {
                                sort: { type: "string", description: "Sort order" },
                                size: { type: "number", description: "Page size" },
                                page: { type: "number", description: "Page number" }
                            }
                        }
                    },
                    {
                        name: "get_municipality",
                        description: "Get information about a specific Norwegian municipality",
                        inputSchema: {
                            type: "object",
                            properties: {
                                kommunenummer: { type: "string", description: "4-digit municipality number (e.g., '0301' for Oslo)" }
                            },
                            required: ["kommunenummer"]
                        }
                    },
                    {
                        name: "get_entity_updates",
                        description: "Get updates on entities for maintaining a local copy of the registry",
                        inputSchema: {
                            type: "object",
                            properties: {
                                dato: { type: "string", description: "Show updates from this timestamp (ISO-8601)" },
                                oppdateringsid: { type: "string", description: "Show updates from this update ID" },
                                organisasjonsnummer: { type: "array", items: { type: "string" }, description: "Filter by organization numbers" },
                                page: { type: "number", description: "Page number" },
                                size: { type: "number", description: "Page size (default 20, max 10000)" },
                                sort: { type: "string", description: "Sort by ID (ASC/DESC)" }
                            }
                        }
                    },
                    {
                        name: "get_sub_entity_updates",
                        description: "Get updates on sub-entities for maintaining a local copy of the registry",
                        inputSchema: {
                            type: "object",
                            properties: {
                                dato: { type: "string", description: "Show updates from this timestamp (ISO-8601)" },
                                oppdateringsid: { type: "string", description: "Show updates from this update ID" },
                                organisasjonsnummer: { type: "array", items: { type: "string" }, description: "Filter by organization numbers" },
                                page: { type: "number", description: "Page number" },
                                size: { type: "number", description: "Page size (default 20, max 10000)" },
                                sort: { type: "string", description: "Sort by ID (ASC/DESC)" }
                            }
                        }
                    },
                    {
                        name: "get_role_updates",
                        description: "Get role updates for entities",
                        inputSchema: {
                            type: "object",
                            properties: {
                                afterTime: { type: "string", description: "Get events after this timestamp (ISO-8601)" },
                                afterId: { type: "number", description: "Get events after this ID" },
                                organisasjonsnummer: { type: "array", items: { type: "string" }, description: "Filter by organization numbers" },
                                size: { type: "number", description: "Number of events to retrieve (default 100, max 10000)" }
                            }
                        }
                    },
                    {
                        name: "search_voluntary_organizations",
                        description: "Search voluntary organizations in the voluntary organization registry",
                        inputSchema: {
                            type: "object",
                            properties: {
                                searchAfter: { type: "string", description: "Search after this organization number for pagination" },
                                size: { type: "number", description: "Maximum number of organizations (default 100)" },
                                spraak: { type: "string", description: "Language for code descriptions (e.g., 'NOB')" }
                            }
                        }
                    },
                    {
                        name: "get_voluntary_organization",
                        description: "Get detailed information about a specific voluntary organization",
                        inputSchema: {
                            type: "object",
                            properties: {
                                organisasjonsnummer: { type: "string", description: "9-digit organization number" },
                                spraak: { type: "string", description: "Language for code descriptions (e.g., 'NOB')" }
                            },
                            required: ["organisasjonsnummer"]
                        }
                    },
                    {
                        name: "get_icnpo_categories",
                        description: "Get ICNPO (International Classification of Non-Profit Organisation) categories",
                        inputSchema: {
                            type: "object",
                            properties: {
                                spraak: { type: "string", description: "Language for descriptions (e.g., 'NOB')" }
                            }
                        }
                    }
                ],
            }];
    });
}); });
server.setRequestHandler(types_js_1.CallToolRequestSchema, function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, entityResults, organisasjonsnummer, entity, orgNum, roles, subEntityResults, subOrgNum, subEntity, orgForms, organisasjonskode, orgForm, municipalities, kommunenummer, municipality, entityUpdates, subEntityUpdates, roleUpdates, voluntaryOrgs, _b, volOrgNum, spraak, voluntaryOrg, icnpoCategories, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 33, , 34]);
                _a = request.params.name;
                switch (_a) {
                    case "search_entities": return [3 /*break*/, 1];
                    case "get_entity": return [3 /*break*/, 3];
                    case "get_entity_roles": return [3 /*break*/, 5];
                    case "search_sub_entities": return [3 /*break*/, 7];
                    case "get_sub_entity": return [3 /*break*/, 9];
                    case "get_organizational_forms": return [3 /*break*/, 11];
                    case "get_organizational_form": return [3 /*break*/, 13];
                    case "get_municipalities": return [3 /*break*/, 15];
                    case "get_municipality": return [3 /*break*/, 17];
                    case "get_entity_updates": return [3 /*break*/, 19];
                    case "get_sub_entity_updates": return [3 /*break*/, 21];
                    case "get_role_updates": return [3 /*break*/, 23];
                    case "search_voluntary_organizations": return [3 /*break*/, 25];
                    case "get_voluntary_organization": return [3 /*break*/, 27];
                    case "get_icnpo_categories": return [3 /*break*/, 29];
                }
                return [3 /*break*/, 31];
            case 1: return [4 /*yield*/, apiClient.searchEntities(request.params.arguments)];
            case 2:
                entityResults = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(entityResults, null, 2),
                            },
                        ],
                    }];
            case 3:
                organisasjonsnummer = request.params.arguments.organisasjonsnummer;
                return [4 /*yield*/, apiClient.getEntity(organisasjonsnummer)];
            case 4:
                entity = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(entity, null, 2),
                            },
                        ],
                    }];
            case 5:
                orgNum = request.params.arguments.organisasjonsnummer;
                return [4 /*yield*/, apiClient.getEntityRoles(orgNum)];
            case 6:
                roles = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(roles, null, 2),
                            },
                        ],
                    }];
            case 7: return [4 /*yield*/, apiClient.searchSubEntities(request.params.arguments)];
            case 8:
                subEntityResults = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(subEntityResults, null, 2),
                            },
                        ],
                    }];
            case 9:
                subOrgNum = request.params.arguments.organisasjonsnummer;
                return [4 /*yield*/, apiClient.getSubEntity(subOrgNum)];
            case 10:
                subEntity = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(subEntity, null, 2),
                            },
                        ],
                    }];
            case 11: return [4 /*yield*/, apiClient.getOrganizationalForms()];
            case 12:
                orgForms = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(orgForms, null, 2),
                            },
                        ],
                    }];
            case 13:
                organisasjonskode = request.params.arguments.organisasjonskode;
                return [4 /*yield*/, apiClient.getOrganizationalForm(organisasjonskode)];
            case 14:
                orgForm = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(orgForm, null, 2),
                            },
                        ],
                    }];
            case 15: return [4 /*yield*/, apiClient.getMunicipalities()];
            case 16:
                municipalities = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(municipalities, null, 2),
                            },
                        ],
                    }];
            case 17:
                kommunenummer = request.params.arguments.kommunenummer;
                return [4 /*yield*/, apiClient.getMunicipality(kommunenummer)];
            case 18:
                municipality = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(municipality, null, 2),
                            },
                        ],
                    }];
            case 19: return [4 /*yield*/, apiClient.getEntityUpdates(request.params.arguments)];
            case 20:
                entityUpdates = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(entityUpdates, null, 2),
                            },
                        ],
                    }];
            case 21: return [4 /*yield*/, apiClient.getSubEntityUpdates(request.params.arguments)];
            case 22:
                subEntityUpdates = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(subEntityUpdates, null, 2),
                            },
                        ],
                    }];
            case 23: return [4 /*yield*/, apiClient.getRoleUpdates(request.params.arguments)];
            case 24:
                roleUpdates = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(roleUpdates, null, 2),
                            },
                        ],
                    }];
            case 25: return [4 /*yield*/, apiClient.searchVoluntaryOrganizations(request.params.arguments)];
            case 26:
                voluntaryOrgs = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(voluntaryOrgs, null, 2),
                            },
                        ],
                    }];
            case 27:
                _b = request.params.arguments, volOrgNum = _b.organisasjonsnummer, spraak = _b.spraak;
                return [4 /*yield*/, apiClient.getVoluntaryOrganization(volOrgNum, { spraak: spraak })];
            case 28:
                voluntaryOrg = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(voluntaryOrg, null, 2),
                            },
                        ],
                    }];
            case 29: return [4 /*yield*/, apiClient.getIcnpoCategories(request.params.arguments)];
            case 30:
                icnpoCategories = _c.sent();
                return [2 /*return*/, {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(icnpoCategories, null, 2),
                            },
                        ],
                    }];
            case 31: throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, "Unknown tool: ".concat(request.params.name));
            case 32: return [3 /*break*/, 34];
            case 33:
                error_1 = _c.sent();
                if (error_1 instanceof types_js_1.McpError) {
                    throw error_1;
                }
                throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Error executing tool: ".concat(error_1));
            case 34: return [2 /*return*/];
        }
    });
}); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = new stdio_js_1.StdioServerTransport();
                    return [4 /*yield*/, server.connect(transport)];
                case 1:
                    _a.sent();
                    console.error("Norwegian Business Registry MCP server running on stdio");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
