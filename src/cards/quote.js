const { renderCard } = require("../common/card");
const { escapeHtml } = require("../common/utils");

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if (current.length + word.length + 1 > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function renderQuoteCard(quote, { colors, hideBorder, width }) {
  const cardWidth = width || 450;
  const maxChars = Math.floor(cardWidth / 8.5);
  const lines = wrapText(quote.text, maxChars);
  const lineHeight = 20;
  const startY = 35;
  const textHeight = lines.length * lineHeight;
  const height = startY + textHeight + 40;

  const quoteLines = lines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="35" y="${y}" class="stat-label" font-style="italic">"${i === 0 ? "" : ""}${escapeHtml(line)}${i === lines.length - 1 ? "" : ""}"</text>`;
    })
    .join("\n    ");

  // Fix: only show quotes around the full text
  const firstLine = lines[0];
  const lastLine = lines[lines.length - 1];
  const quoteMarkup = lines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      let display = escapeHtml(line);
      if (i === 0) display = `\u201C${display}`;
      if (i === lines.length - 1) display = `${display}\u201D`;
      return `<text x="30" y="${y}" class="stat-label" font-style="italic">${display}</text>`;
    })
    .join("\n    ");

  const authorY = startY + textHeight + 15;
  const authorMarkup = `<text x="${cardWidth - 25}" y="${authorY}" class="lang-pct" text-anchor="end">\u2014 ${escapeHtml(quote.author)}</text>`;

  const body = `${quoteMarkup}\n    ${authorMarkup}`;

  return renderCard({
    width: cardWidth,
    height,
    title: "",
    colors,
    hideBorder,
    hideTitle: true,
    body,
  });
}

module.exports = { renderQuoteCard };
