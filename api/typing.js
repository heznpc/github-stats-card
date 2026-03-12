const { renderTypingCard } = require("../src/cards/typing");
const { getTheme } = require("../src/common/themes");
const {
  parseBoolean,
  parseArray,
  parseIntSafe,
  cacheHeaders,
} = require("../src/common/utils");

module.exports = async (req, res) => {
  const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const lines = parseArray(params.get("lines"));
  const theme = params.get("theme") || "dark";
  const colors = getTheme(theme);

  if (lines.length === 0) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", cacheHeaders());
    return res.send(
      `<svg width="400" height="40" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="25" fill="#f85149" font-size="14" font-family="monospace">Missing ?lines= parameter</text>
      </svg>`
    );
  }

  const svg = renderTypingCard({
    lines,
    font: params.get("font") || "monospace",
    size: parseIntSafe(params.get("size"), 20),
    weight: parseIntSafe(params.get("weight"), 400),
    color: params.get("color")
      ? params.get("color").startsWith("#")
        ? params.get("color")
        : `#${params.get("color")}`
      : colors.title,
    bgColor: params.get("bg_color")
      ? params.get("bg_color").startsWith("#")
        ? params.get("bg_color")
        : `#${params.get("bg_color")}`
      : null,
    width: parseIntSafe(params.get("width"), 500),
    height: parseIntSafe(params.get("height"), 50),
    speed: parseIntSafe(params.get("speed"), 100),
    pause: parseIntSafe(params.get("pause"), 1500),
    loop: params.get("loop") !== null ? parseBoolean(params.get("loop")) : true,
    cursor: params.get("cursor") !== null ? parseBoolean(params.get("cursor")) : true,
    cursorColor: params.get("cursor_color"),
    cursorWidth: parseIntSafe(params.get("cursor_width"), 2),
    align: params.get("align") || "left",
  });

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", cacheHeaders());
  return res.send(svg);
};
