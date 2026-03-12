const { renderCard } = require("../common/card");
const { icons } = require("../common/icons");
const { escapeHtml } = require("../common/utils");

const typeIcons = {
  commit: icons.commits,
  pr: icons.prs,
  issue: icons.issues,
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const month = d.toLocaleString("en", { month: "short" });
  const day = d.getDate();
  return `${month} ${day}`;
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

function renderActivityCard(events, { colors, hideBorder, hideTitle, title }) {
  const cardTitle = title || "Recent Activity";
  const rowHeight = 28;
  const startY = hideTitle ? 20 : 50;
  const height = startY + events.length * rowHeight + 15;

  const rows = events
    .map((event, i) => {
      const y = startY + i * rowHeight;
      const icon = typeIcons[event.type] || typeIcons.commit;
      const detail = escapeHtml(truncate(event.detail, 40));
      const repo = escapeHtml(event.repo.split("/")[1]);
      const date = formatDate(event.date);
      const delay = i * 100;

      return `<g transform="translate(25, ${y})" class="stagger" style="animation-delay: ${delay}ms">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="${colors.icon}">
        ${icon}
      </svg>
      <text x="22" y="11" class="lang-name">${detail}</text>
      <text x="340" y="11" class="lang-pct" text-anchor="end">${repo}</text>
      <text x="410" y="11" class="lang-pct" text-anchor="end">${date}</text>
    </g>`;
    })
    .join("\n  ");

  return renderCard({
    width: 435,
    height,
    title: cardTitle,
    colors,
    hideBorder,
    hideTitle,
    body: rows,
  });
}

module.exports = { renderActivityCard };
