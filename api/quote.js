const { getRandomQuote, getDailyQuote } = require("../src/data/quotes");
const { renderQuoteCard } = require("../src/cards/quote");
const { getTheme } = require("../src/common/themes");
const {
  parseBoolean,
  parseIntSafe,
  cacheHeaders,
} = require("../src/common/utils");

module.exports = async (req, res) => {
  const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const theme = params.get("theme") || "dark";
  const hideBorder = parseBoolean(params.get("hide_border"));
  const daily = parseBoolean(params.get("daily"));
  const width = parseIntSafe(params.get("width"), 450);

  const colors = getTheme(theme, {
    bg: params.get("bg_color"),
    text: params.get("text_color"),
    title: params.get("title_color"),
    icon: params.get("icon_color"),
    border: params.get("border_color"),
  });

  const quote = daily ? getDailyQuote() : getRandomQuote();
  const svg = renderQuoteCard(quote, { colors, hideBorder, width });

  res.setHeader("Content-Type", "image/svg+xml");
  // Random quotes cache shorter, daily quotes cache longer
  res.setHeader(
    "Cache-Control",
    daily
      ? "public, max-age=43200, s-maxage=43200"
      : cacheHeaders()
  );
  return res.send(svg);
};
