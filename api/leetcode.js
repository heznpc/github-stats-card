const { fetchLeetcode } = require("../src/fetchers/leetcode");
const { renderLeetcodeCard } = require("../src/cards/leetcode");
const { renderError } = require("../src/common/card");
const { getTheme } = require("../src/common/themes");
const {
  parseBoolean,
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
    const stats = await fetchLeetcode(username);
    const svg = renderLeetcodeCard(stats, { colors, hideBorder, hideTitle, title });

    res.setHeader("Cache-Control", cacheHeaders());
    return res.send(svg);
  } catch (err) {
    res.setHeader("Cache-Control", errorCacheHeaders());
    return res.send(renderError(err.message, colors));
  }
};
