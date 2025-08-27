#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const BASE_URL = "https://data.brreg.no";
class BrregApiClient {
    async makeRequest(endpoint, params) {
        const url = new URL(`${BASE_URL}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
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
        const response = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            if (response.status === 404) {
                throw new types_js_1.McpError(types_js_1.ErrorCode.InvalidRequest, `Resource not found: ${endpoint}`);
            }
            throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, `API request failed: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }
    async searchEntities(params = {}) {
        return this.makeRequest('/enhetsregisteret/api/enheter', params);
    }
    async getEntity(orgNumber) {
        return this.makeRequest(`/enhetsregisteret/api/enheter/${orgNumber}`);
    }
    async getEntityRoles(orgNumber) {
        return this.makeRequest(`/enhetsregisteret/api/enheter/${orgNumber}/roller`);
    }
    async searchSubEntities(params = {}) {
        return this.makeRequest('/enhetsregisteret/api/underenheter', params);
    }
    async getSubEntity(orgNumber) {
        return this.makeRequest(`/enhetsregisteret/api/underenheter/${orgNumber}`);
    }
    async getOrganizationalForms() {
        return this.makeRequest('/enhetsregisteret/api/organisasjonsformer');
    }
    async getOrganizationalForm(code) {
        return this.makeRequest(`/enhetsregisteret/api/organisasjonsformer/${code}`);
    }
    async getMunicipalities() {
        return this.makeRequest('/enhetsregisteret/api/kommuner');
    }
    async getMunicipality(municipalityNumber) {
        return this.makeRequest(`/enhetsregisteret/api/kommuner/${municipalityNumber}`);
    }
    async getEntityUpdates(params = {}) {
        return this.makeRequest('/enhetsregisteret/api/oppdateringer/enheter', params);
    }
    async getSubEntityUpdates(params = {}) {
        return this.makeRequest('/enhetsregisteret/api/oppdateringer/underenheter', params);
    }
    async getRoleUpdates(params = {}) {
        return this.makeRequest('/enhetsregisteret/api/oppdateringer/roller', params);
    }
    async searchVoluntaryOrganizations(params = {}) {
        return this.makeRequest('/frivillighetsregisteret/api/frivillige-organisasjoner', params);
    }
    async getVoluntaryOrganization(orgNumber, params = {}) {
        return this.makeRequest(`/frivillighetsregisteret/api/frivillige-organisasjoner/${orgNumber}`, params);
    }
    async getIcnpoCategories(params = {}) {
        return this.makeRequest('/frivillighetsregisteret/api/icnpo-kategorier', params);
    }
}
const server = new index_js_1.Server({
    name: "brreg-api",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
const apiClient = new BrregApiClient();
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
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
    };
});
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    try {
        switch (request.params.name) {
            case "search_entities":
                const entityResults = await apiClient.searchEntities(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(entityResults, null, 2),
                        },
                    ],
                };
            case "get_entity":
                const { organisasjonsnummer } = request.params.arguments;
                const entity = await apiClient.getEntity(organisasjonsnummer);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(entity, null, 2),
                        },
                    ],
                };
            case "get_entity_roles":
                const { organisasjonsnummer: orgNum } = request.params.arguments;
                const roles = await apiClient.getEntityRoles(orgNum);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(roles, null, 2),
                        },
                    ],
                };
            case "search_sub_entities":
                const subEntityResults = await apiClient.searchSubEntities(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(subEntityResults, null, 2),
                        },
                    ],
                };
            case "get_sub_entity":
                const { organisasjonsnummer: subOrgNum } = request.params.arguments;
                const subEntity = await apiClient.getSubEntity(subOrgNum);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(subEntity, null, 2),
                        },
                    ],
                };
            case "get_organizational_forms":
                const orgForms = await apiClient.getOrganizationalForms();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(orgForms, null, 2),
                        },
                    ],
                };
            case "get_organizational_form":
                const { organisasjonskode } = request.params.arguments;
                const orgForm = await apiClient.getOrganizationalForm(organisasjonskode);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(orgForm, null, 2),
                        },
                    ],
                };
            case "get_municipalities":
                const municipalities = await apiClient.getMunicipalities();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(municipalities, null, 2),
                        },
                    ],
                };
            case "get_municipality":
                const { kommunenummer } = request.params.arguments;
                const municipality = await apiClient.getMunicipality(kommunenummer);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(municipality, null, 2),
                        },
                    ],
                };
            case "get_entity_updates":
                const entityUpdates = await apiClient.getEntityUpdates(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(entityUpdates, null, 2),
                        },
                    ],
                };
            case "get_sub_entity_updates":
                const subEntityUpdates = await apiClient.getSubEntityUpdates(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(subEntityUpdates, null, 2),
                        },
                    ],
                };
            case "get_role_updates":
                const roleUpdates = await apiClient.getRoleUpdates(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(roleUpdates, null, 2),
                        },
                    ],
                };
            case "search_voluntary_organizations":
                const voluntaryOrgs = await apiClient.searchVoluntaryOrganizations(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(voluntaryOrgs, null, 2),
                        },
                    ],
                };
            case "get_voluntary_organization":
                const { organisasjonsnummer: volOrgNum, spraak } = request.params.arguments;
                const voluntaryOrg = await apiClient.getVoluntaryOrganization(volOrgNum, { spraak });
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(voluntaryOrg, null, 2),
                        },
                    ],
                };
            case "get_icnpo_categories":
                const icnpoCategories = await apiClient.getIcnpoCategories(request.params.arguments);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(icnpoCategories, null, 2),
                        },
                    ],
                };
            default:
                throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
        }
    }
    catch (error) {
        if (error instanceof types_js_1.McpError) {
            throw error;
        }
        throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, `Error executing tool: ${error}`);
    }
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Norwegian Business Registry MCP server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
//# sourceMappingURL=brreg-mcp-server.js.map