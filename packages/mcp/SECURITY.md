# Security Policy

## Reporting a vulnerability

Please **do not** open public GitHub issues for vulnerabilities in this package.

Preferred channel — **GitHub private vulnerability reporting**:
[Report a vulnerability](https://github.com/starter-series/ProfileKit/security/advisories/new)

A response is sent within 7 days. A fix or mitigation plan is shared within 30 days of confirmation. The report can cover the MCP package, hosted API, or browser studio; identify the affected surface when possible.

## Scope

In scope:
- This npm package `profilekit-mcp` (source: `packages/mcp/src/`, build: `packages/mcp/dist/`).
- Tool definitions exposed via MCP (`list_cards`, `list_themes`, `render`).
- Catalog fetch path (`src/fetch-catalog.ts`) and URL construction (`src/url.ts`).

Out of scope:
- Vulnerabilities in `@modelcontextprotocol/sdk` — report upstream at <https://github.com/modelcontextprotocol/typescript-sdk/security>.
- Misconfiguration in the *consuming* MCP host (Claude Code, Codex CLI, ChatGPT Apps).

## Supported versions

Only the latest minor on npm receives security fixes. Pre-1.0, breaking fixes may ship in patch releases — pin a minor (`~0.2.0`) if you need stability.
