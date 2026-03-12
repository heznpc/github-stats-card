const { renderCard } = require("../common/card");
const { escapeHtml } = require("../common/utils");

const difficultyColors = {
  easy: "#00b8a3",
  medium: "#ffc01e",
  hard: "#ff375f",
};

function renderLeetcodeCard(stats, { colors, hideBorder, hideTitle, title }) {
  const cardTitle = title || `${escapeHtml(stats.username)}'s LeetCode`;
  const width = 400;
  const startY = hideTitle ? 20 : 50;

  // Total solved circle
  const circleR = 40;
  const circleX = 70;
  const circleY = startY + 50;
  const circumference = 2 * Math.PI * circleR;
  const solvedPct = stats.totalQuestions > 0 ? stats.totalSolved / stats.totalQuestions : 0;
  const dashOffset = circumference * (1 - solvedPct);

  const circleMarkup = `
    <circle cx="${circleX}" cy="${circleY}" r="${circleR}" fill="none" stroke="${colors.border}" stroke-width="5"/>
    <circle cx="${circleX}" cy="${circleY}" r="${circleR}" fill="none" stroke="${colors.icon}" stroke-width="5"
      stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"
      stroke-linecap="round" transform="rotate(-90 ${circleX} ${circleY})"/>
    <text x="${circleX}" y="${circleY - 8}" text-anchor="middle" class="stat-value" font-size="18">${stats.totalSolved}</text>
    <text x="${circleX}" y="${circleY + 12}" text-anchor="middle" class="lang-pct">/ ${stats.totalQuestions}</text>
  `;

  // Difficulty bars
  const barStartX = 160;
  const barWidth = 200;
  const difficulties = [
    { key: "easy", label: "Easy", data: stats.easy },
    { key: "medium", label: "Medium", data: stats.medium },
    { key: "hard", label: "Hard", data: stats.hard },
  ];

  const barsMarkup = difficulties
    .map((diff, i) => {
      const y = startY + 20 + i * 32;
      const pct = diff.data.total > 0 ? diff.data.solved / diff.data.total : 0;
      const fillWidth = barWidth * pct;
      const color = difficultyColors[diff.key];

      return `<g transform="translate(${barStartX}, ${y})">
      <text x="0" y="10" class="lang-name" fill="${color}">${diff.label}</text>
      <text x="${barWidth}" y="10" text-anchor="end" class="lang-pct">${diff.data.solved} / ${diff.data.total}</text>
      <rect x="0" y="16" width="${barWidth}" height="6" rx="3" fill="${colors.border}"/>
      <rect x="0" y="16" width="${fillWidth}" height="6" rx="3" fill="${color}"/>
    </g>`;
    })
    .join("\n    ");

  const height = startY + 120;
  const body = `${circleMarkup}\n    ${barsMarkup}`;

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

module.exports = { renderLeetcodeCard };
