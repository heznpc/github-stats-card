const { renderCard } = require("../common/card");
const { icons } = require("../common/icons");
const { formatNumber, escapeHtml } = require("../common/utils");

function truncate(str, max) {
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

function renderRepoCard(repo, { colors, hideBorder }) {
  const name = escapeHtml(repo.name);
  const desc = escapeHtml(truncate(repo.description || "No description", 60));
  const stars = formatNumber(repo.stargazerCount);
  const forks = formatNumber(repo.forkCount);
  const lang = repo.primaryLanguage;
  const langColor = lang ? lang.color || colors.muted : colors.muted;
  const langName = lang ? escapeHtml(lang.name) : "";

  const width = 400;
  const height = 120;

  const langMarkup = lang
    ? `<g transform="translate(25, 85)">
      <circle cx="5" cy="5" r="5" fill="${langColor}"/>
      <text x="14" y="9" class="lang-pct">${langName}</text>
    </g>`
    : "";

  const body = `
    <text x="25" y="35" class="header">${name}</text>
    ${repo.isArchived ? `<text x="${25 + name.length * 10 + 10}" y="35" class="lang-pct">[archived]</text>` : ""}
    <text x="25" y="58" class="lang-pct">${desc}</text>
    ${langMarkup}
    <g transform="translate(200, 85)">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="${colors.muted}">
        ${icons.stars}
      </svg>
      <text x="18" y="11" class="lang-pct">${stars}</text>
    </g>
    <g transform="translate(260, 85)">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="${colors.muted}">
        <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
      </svg>
      <text x="18" y="11" class="lang-pct">${forks}</text>
    </g>
  `;

  return renderCard({
    width,
    height,
    title: "",
    colors,
    hideBorder,
    hideTitle: true,
    body,
  });
}

module.exports = { renderRepoCard };
