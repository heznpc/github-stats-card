const { renderCard } = require("../common/card");
const { formatNumber } = require("../common/utils");

function interpolateColor(empty, filled, intensity) {
  const parse = (hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(empty);
  const [r2, g2, b2] = parse(filled);
  const r = Math.round(r1 + (r2 - r1) * intensity);
  const g = Math.round(g1 + (g2 - g1) * intensity);
  const b = Math.round(b1 + (b2 - b1) * intensity);
  return `rgb(${r},${g},${b})`;
}

function renderContributionsCard(
  data,
  { colors, hideBorder, hideTitle, title, color, weeks: weekCount }
) {
  const cardTitle =
    title || `${formatNumber(data.total)} contributions in the last year`;
  const accentColor = color || colors.icon;
  const emptyColor = colors.border;

  // Take last N weeks
  const weeks = data.weeks.slice(-weekCount);

  // Find max for intensity scaling
  let maxCount = 0;
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > maxCount) maxCount = day.contributionCount;
    }
  }
  if (maxCount === 0) maxCount = 1;

  const cellSize = 11;
  const cellGap = 2;
  const step = cellSize + cellGap;
  const startX = 25;
  const startY = hideTitle ? 20 : 50;
  const graphWidth = weeks.length * step;
  const graphHeight = 7 * step;
  const width = graphWidth + 50;
  const height = startY + graphHeight + 30;

  // Day labels
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  const labels = dayLabels
    .map((label, i) => {
      if (!label) return "";
      const y = startY + i * step + cellSize - 1;
      return `<text x="${startX - 5}" y="${y}" text-anchor="end" class="lang-pct">${label}</text>`;
    })
    .filter(Boolean)
    .join("\n    ");

  // Month labels
  const monthLabels = [];
  let lastMonth = "";
  for (let w = 0; w < weeks.length; w++) {
    const firstDay = weeks[w].contributionDays[0];
    if (!firstDay) continue;
    const d = new Date(firstDay.date);
    const month = d.toLocaleString("en", { month: "short" });
    if (month !== lastMonth) {
      const x = startX + w * step;
      monthLabels.push(
        `<text x="${x}" y="${startY - 5}" class="lang-pct">${month}</text>`
      );
      lastMonth = month;
    }
  }

  // Cells
  const cells = [];
  for (let w = 0; w < weeks.length; w++) {
    for (const day of weeks[w].contributionDays) {
      const x = startX + w * step;
      const y = startY + day.weekday * step;
      const intensity = day.contributionCount / maxCount;
      const fill =
        day.contributionCount === 0
          ? emptyColor
          : interpolateColor(emptyColor, accentColor, 0.25 + intensity * 0.75);
      cells.push(
        `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${fill}"><title>${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}</title></rect>`
      );
    }
  }

  const body = `
    ${labels}
    ${monthLabels.join("\n    ")}
    ${cells.join("\n    ")}
  `;

  return renderCard({
    width,
    height,
    title: cardTitle,
    colors,
    hideBorder,
    hideTitle,
    body,
  });
}

module.exports = { renderContributionsCard };
