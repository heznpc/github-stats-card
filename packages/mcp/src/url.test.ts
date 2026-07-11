import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  buildCardUrl,
  buildMarkdownSnippet,
  buildHtmlSnippet,
  PROFILEKIT_BASE,
} from "./url.js";
import {
  DEFAULT_PROFILEKIT_BASE_URL,
  getProfileKitCatalogUrl,
} from "./config.js";

const originalBaseUrl = process.env.PROFILEKIT_BASE_URL;
const originalCatalogUrl = process.env.PROFILEKIT_CATALOG_URL;

afterEach(() => {
  if (originalBaseUrl === undefined) delete process.env.PROFILEKIT_BASE_URL;
  else process.env.PROFILEKIT_BASE_URL = originalBaseUrl;
  if (originalCatalogUrl === undefined) delete process.env.PROFILEKIT_CATALOG_URL;
  else process.env.PROFILEKIT_CATALOG_URL = originalCatalogUrl;
});

test("buildCardUrl keeps falsy-but-valid values (false, 0) and drops empty/undefined", () => {
  const url = buildCardUrl("stats", {
    username: "h",
    hide_border: false,
    langs_count: 0,
    theme: "",
    extra: undefined,
    other: null,
  });
  assert.ok(url.includes("hide_border=false"), "false must be kept");
  assert.ok(url.includes("langs_count=0"), "0 must be kept");
  assert.ok(!url.includes("theme="), "empty string must be dropped");
  assert.ok(!url.includes("extra="), "undefined must be dropped");
  assert.ok(!url.includes("other="), "null must be dropped");
});

test("buildCardUrl is a no-op encode for simple card types (documented output preserved)", () => {
  assert.equal(
    buildCardUrl("stats", { username: "heznpc" }),
    `${PROFILEKIT_BASE}/stats?username=heznpc`
  );
});

test("buildCardUrl targets a self-hosted ProfileKit base and removes a trailing slash", () => {
  process.env.PROFILEKIT_BASE_URL = "http://127.0.0.1:3000/api/";
  assert.equal(
    buildCardUrl("glitch", { text: "LOCAL" }),
    "http://127.0.0.1:3000/api/glitch?text=LOCAL"
  );
  assert.equal(getProfileKitCatalogUrl(), "http://127.0.0.1:3000/api/catalog");
});

test("explicit catalog URL overrides the base-derived catalog URL", () => {
  process.env.PROFILEKIT_BASE_URL = "http://127.0.0.1:3000/api";
  process.env.PROFILEKIT_CATALOG_URL = "data:application/json,%7B%7D";
  assert.equal(getProfileKitCatalogUrl(), "data:application/json,%7B%7D");
});

test("PROFILEKIT_BASE_URL rejects non-http protocols and embedded credentials", () => {
  process.env.PROFILEKIT_BASE_URL = "file:///tmp/profilekit";
  assert.throws(() => buildCardUrl("stats"), /must use http or https/);
  process.env.PROFILEKIT_BASE_URL = "https://user:secret@example.com/api";
  assert.throws(() => buildCardUrl("stats"), /must not include credentials/);
});

test("PROFILEKIT_BASE remains the hosted compatibility constant", () => {
  assert.equal(PROFILEKIT_BASE, DEFAULT_PROFILEKIT_BASE_URL);
});

test("buildCardUrl encodes the type segment so a catalog key cannot path-traverse", () => {
  const url = buildCardUrl("../health", { username: "h" });
  assert.ok(!url.includes("/../"), `must not contain raw traversal: ${url}`);
  assert.ok(url.includes("..%2Fhealth"), `expected encoded segment: ${url}`);
});

test("buildHtmlSnippet escapes a card type containing a double quote (no attribute injection)", () => {
  const out = buildHtmlSnippet('x" onerror="alert(1)', "https://x/y");
  assert.ok(!out.includes('" onerror="alert(1)'), `injection survived: ${out}`);
  assert.ok(out.includes("&quot;"), `expected escaped quote: ${out}`);
});

test("buildHtmlSnippet leaves a normal type untouched (documented output preserved)", () => {
  assert.equal(
    buildHtmlSnippet("stats", "https://x/y"),
    '<img src="https://x/y" alt="stats" />'
  );
});

test("buildMarkdownSnippet escapes ] in alt so it cannot break out of the image syntax", () => {
  const out = buildMarkdownSnippet("stats", "https://x/y", "a]b[c");
  assert.ok(out.includes("a\\]b\\[c"), `expected escaped brackets: ${out}`);
});

test("buildMarkdownSnippet leaves a normal alt untouched (documented output preserved)", () => {
  assert.equal(
    buildMarkdownSnippet("pin", "https://x/y", undefined),
    "![pin](https://x/y)"
  );
});
