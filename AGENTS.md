# ProfileKit

Composable SVG card endpoints for GitHub profiles, READMEs, blogs, and personal
sites. Vanilla Node, no runtime dependencies, Vercel API routes plus Docker
self-hosting.

## Run this repo

```bash
npm ci
npm run check
npm test
npm run verify:mcp
docker build -t profilekit:local .
docker run --rm -p 3000:3000 profilekit:local
```

## Structure

```
api/
  [endpoint].js  -> Vercel adapter dispatching named endpoints
src/
  endpoints/     -> endpoint handlers and response headers
  cards/         -> card renderers
  common/        -> shared SVG/query/theme helpers
server.js        -> local/self-host HTTP adapter
tests/           -> node:test coverage for endpoints and renderers
packages/mcp/    -> published profilekit-mcp stdio package
  src/           -> MCP tools, catalog client, URL helpers
  scripts/       -> MCP smoke and package-surface checks
```

## Invariants

- Keep endpoints deterministic: same query string means same SVG.
- Treat every query parameter as untrusted input. Clamp numbers, whitelist
  enum-like strings, and escape text before embedding in SVG.
- Do not add user ranking, scoring, ratings, or analytics capture.
- Do not introduce a database or server-side persistence for card rendering.
- Docker and Vercel paths must stay behaviorally equivalent.
- Keep `packages/mcp` URL-only: it discovers the catalog and returns embed
  snippets, but never duplicates the SVG renderer or fetches rendered SVGs.
- Regenerate the MCP fallback after catalog changes with
  `npm run sync:catalog --workspace profilekit-mcp`.
