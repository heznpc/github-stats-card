const { fetchRepo, fetchPinnedRepos } = require("../src/fetchers/repos");
const { renderRepoCard } = require("../src/cards/repos");
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
  const repoName = params.get("repo");
  const theme = params.get("theme") || "dark";
  const hideBorder = parseBoolean(params.get("hide_border"));

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

  if (!repoName) {
    res.setHeader("Cache-Control", errorCacheHeaders());
    return res.send(renderError("Missing ?repo= parameter", colors));
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("GITHUB_TOKEN not configured");

    const repo = await fetchRepo(username, repoName, token);
    const svg = renderRepoCard(repo, { colors, hideBorder });

    res.setHeader("Cache-Control", cacheHeaders());
    return res.send(svg);
  } catch (err) {
    res.setHeader("Cache-Control", errorCacheHeaders());
    return res.send(renderError(err.message, colors));
  }
};
