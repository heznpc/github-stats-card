const { fetchContributions } = require("../src/fetchers/contributions");
const { renderContributionsCard } = require("../src/cards/contributions");
const { renderError } = require("../src/common/card");
const { getTheme } = require("../src/common/themes");
const {
  parseBoolean,
  parseIntSafe,
  cacheHeaders,
  errorCacheHeaders,
} = require("../src/common/utils");

module.exports = async (req, res) => {
  const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const username = params.get("username");
  const theme = params.get("theme") || "dark";
  const hideBorder = parseBoolean(params.get("hide_border"));
  const hideTitle = parseBoolean(params.get("hide_title"));
  const title = params.get("title");
  const color = params.get("color");
  const weeks = parseIntSafe(params.get("weeks"), 52);

  const colors = getTheme(theme, {
    bg: params.get("bg_color"),
    text: params.get("text_color"),
    title: params.get("title_color"),
    icon: params.get("icon_color"),
    border: params.get("border_color"),
  });

  res.setHeader("Content-Type", "image/svg+xml");

  if (!username) {
    res.setHeader("Cache-Control", errorCacheHeaders());
    return res.send(renderError("Missing ?username= parameter", colors));
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("GITHUB_TOKEN not configured");

    const data = await fetchContributions(username, token);
    const clampedWeeks = Math.min(Math.max(weeks, 1), 52);
    const svg = renderContributionsCard(data, {
      colors,
      hideBorder,
      hideTitle,
      title,
      color: color ? (color.startsWith("#") ? color : `#${color}`) : null,
      weeks: clampedWeeks,
    });

    res.setHeader("Cache-Control", cacheHeaders());
    return res.send(svg);
  } catch (err) {
    res.setHeader("Cache-Control", errorCacheHeaders());
    return res.send(renderError(err.message, colors));
  }
};
