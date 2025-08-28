# Norwegian Business Registry MCP Server

A Model Context Protocol (MCP) server providing comprehensive access to the Norwegian Business Registry (Brønnøysundregistrene) API. Query Norwegian companies, subsidiaries, board members, organizational data, and voluntary organizations through AI assistants like Claude.

## Features

- **Company Search**: Find Norwegian businesses by name, location, industry, employee count, and registration status
- **Detailed Company Information**: Access comprehensive data including financial status, contact information, and corporate structure
- **Board and Management Data**: Retrieve current board members, management roles, and corporate governance information
- **Subsidiary Relationships**: Explore parent-subsidiary relationships and corporate hierarchies
- **Reference Data**: Access organizational forms, municipalities, industry classifications, and regulatory information
- **Voluntary Organizations**: Query Norway's registry of non-profit organizations with ICNPO classifications
- **Real-time Updates**: Track changes in company registrations and corporate structures

## Installation

### Global Installation
```bash
npm install -g brreg-mcp-server
```

### Local Development
```bash
git clone https://github.com/reidar80/brreg-mcp-server.git
cd brreg-mcp-server
npm install
npm run build
```

## Usage

### With Claude Desktop

Add to your `claude_desktop_config.json`:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "brreg-api": {
      "command": "brreg-mcp",
      "args": []
    }
  }
}
```

After configuration, restart Claude Desktop. The Norwegian Business Registry tools will be available for queries.

### Example Queries

- "Find Norwegian oil and gas companies with more than 1000 employees"
- "Get detailed information about Equinor ASA"
- "Show me all board members of DNB Bank"
- "List subsidiaries of Telenor Group"
- "Find sports organizations in Oslo registered as voluntary organizations"
- "What are the different organizational forms available in Norway?"

## Available Tools

### Entity Operations
- `search_entities` - Search Norwegian companies with comprehensive filters
- `get_entity` - Retrieve detailed company information by organization number
- `get_entity_roles` - Get board members, management, and auditor information

### Sub-entity Operations  
- `search_sub_entities` - Find subsidiaries, branches, and departments
- `get_sub_entity` - Get detailed information about specific sub-entities

### Reference Data
- `get_organizational_forms` - Norwegian business entity types and descriptions
- `get_organizational_form` - Specific organizational form details
- `get_municipalities` - Norwegian municipalities and geographic codes
- `get_municipality` - Specific municipality information

### Voluntary Organizations
- `search_voluntary_organizations` - Search non-profit organizations
- `get_voluntary_organization` - Detailed voluntary organization information
- `get_icnpo_categories` - International Classification of Non-Profit Organisation categories

### Data Synchronization
- `get_entity_updates` - Track changes in company registrations
- `get_sub_entity_updates` - Monitor subsidiary changes
- `get_role_updates` - Follow board and management changes

## Use Cases

- **Due Diligence**: Research companies, their leadership, and corporate structure
- **Market Research**: Analyze industry sectors, company sizes, and geographic distribution
- **Compliance Monitoring**: Track regulatory changes and corporate governance updates
- **Business Intelligence**: Understand Norwegian market dynamics and competitive landscapes
- **Academic Research**: Access comprehensive data on Norwegian business ecosystem
- **Legal Research**: Verify corporate information and regulatory status

## Data Source

This MCP server uses the official Norwegian Business Registry API provided by Brønnøysundregistrene. The registry contains:

- Over 1 million registered entities
- Complete corporate hierarchies and ownership structures
- Real-time updates on business registrations and changes
- Comprehensive board and management information
- Full regulatory and compliance status data

All data is public information made available under the Norwegian License for Open Government Data (NLOD).

## Requirements

- Node.js 18.0.0 or higher
- NPM 8.0.0 or higher
- Internet connection for API access

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Issues and Support

- Report bugs or request features via [GitHub Issues](https://github.com/reidar80/brreg-mcp-server/issues)
- For questions about the Norwegian Business Registry data, consult [Brønnøysundregistrene documentation](https://www.brreg.no/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Norwegian Business Registry data is provided under the Norwegian License for Open Government Data (NLOD) by Brønnøysundregistrene.

## Author

**Reidar J. Boldevin**
- Email: reidar.boldevin@outlook.com
- GitHub: [@reidar80](https://github.com/reidar80)

## Sponsorship

If this MCP server helps your business or research, consider supporting its development:

- [GitHub Sponsors](https://github.com/sponsors/reidar80)
- [Buy me a coffee](https://buymeacoffee.com/reidar80)

Your support helps maintain and improve this tool for the Norwegian business community.

## Attribution

This MCP server provides a modern interface to data from Brønnøysundregistrene (The Brønnøysund Register Centre), Norway's official business registry. Special thanks to Brønnøysundregistrene for maintaining comprehensive open data APIs that make projects like this possible.