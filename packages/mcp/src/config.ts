export const DEFAULT_PROFILEKIT_BASE_URL = "https://profilekit.vercel.app/api";

export function getProfileKitBaseUrl(): string {
  const raw = process.env.PROFILEKIT_BASE_URL?.trim() || DEFAULT_PROFILEKIT_BASE_URL;
  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("PROFILEKIT_BASE_URL must use http or https");
  }
  if (url.username || url.password) {
    throw new Error("PROFILEKIT_BASE_URL must not include credentials");
  }
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/+$/, "");
}

export function getProfileKitCatalogUrl(): string {
  return process.env.PROFILEKIT_CATALOG_URL?.trim() || `${getProfileKitBaseUrl()}/catalog`;
}
