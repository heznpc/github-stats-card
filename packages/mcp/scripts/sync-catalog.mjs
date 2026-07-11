import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..");
const sourcePath = resolve(packageRoot, "../../src/endpoints/catalog.js");
const targetPath = resolve(packageRoot, "src/catalog.ts");
const require = createRequire(import.meta.url);
const { buildCatalogResponse } = require(sourcePath);

function renderCatalog() {
  const { cards, themes } = buildCatalogResponse();
  return `// Generated from ../../src/endpoints/catalog.js by scripts/sync-catalog.mjs.
// Run \`npm run sync:catalog --workspace profilekit-mcp\` after catalog changes.

export interface CardEntry {
  description: string;
  required: string[];
  common_params: string[];
}

export const CATALOG: Record<string, CardEntry> = ${JSON.stringify(cards, null, 2)};

export const THEMES: string[] = ${JSON.stringify(themes, null, 2)};
`;
}

const expected = renderCatalog();
if (process.argv.includes("--check")) {
  const current = readFileSync(targetPath, "utf8");
  if (current !== expected) {
    console.error("MCP fallback catalog is stale. Run: npm run sync:catalog --workspace profilekit-mcp");
    process.exit(1);
  }
  console.log("MCP fallback catalog matches the ProfileKit catalog.");
} else {
  writeFileSync(targetPath, expected);
  console.log(`Updated ${targetPath}`);
}
