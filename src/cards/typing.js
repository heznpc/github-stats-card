const { escapeHtml } = require("../common/utils");

function renderTypingCard({
  lines,
  font = "monospace",
  size = 20,
  weight = 400,
  color = "#58a6ff",
  bgColor,
  width = 500,
  height = 50,
  speed = 100,
  pause = 1500,
  loop = true,
  cursor = true,
  cursorColor,
  cursorWidth = 2,
  align = "left",
}) {
  const totalChars = lines.reduce((sum, l) => sum + l.length, 0);
  const actualCursorColor = cursorColor || color;
  const textAnchor =
    align === "center" ? "middle" : align === "right" ? "end" : "start";
  const textX =
    align === "center"
      ? width / 2
      : align === "right"
        ? width - 20
        : 20;

  // Build keyframe animation for typing each line
  const segments = [];
  let totalTime = 0;

  for (let i = 0; i < lines.length; i++) {
    const charCount = lines[i].length;
    const typeDuration = charCount * speed; // ms to type
    const displayDuration = pause; // ms to pause after typing
    const eraseDuration = charCount * (speed / 2); // erase faster
    const gapDuration = 300; // pause before next line

    segments.push({
      line: lines[i],
      typeStart: totalTime,
      typeDuration,
      displayEnd: totalTime + typeDuration + displayDuration,
      eraseEnd:
        totalTime + typeDuration + displayDuration + eraseDuration,
    });
    totalTime =
      totalTime +
      typeDuration +
      displayDuration +
      eraseDuration +
      gapDuration;
  }

  const totalDurationS = (totalTime / 1000).toFixed(2);

  // CSS animation approach: use multiple text elements with visibility keyframes
  const styles = lines
    .map((line, i) => {
      const seg = segments[i];
      const showStart = ((seg.typeStart / totalTime) * 100).toFixed(2);
      const showEnd = ((seg.eraseEnd / totalTime) * 100).toFixed(2);

      return `
    @keyframes type${i} {
      0%, ${showStart}% { opacity: 0; }
      ${(+showStart + 0.01).toFixed(2)}% { opacity: 1; }
      ${showEnd}% { opacity: 1; }
      ${(+showEnd + 0.01).toFixed(2)}% { opacity: 0; }
      100% { opacity: 0; }
    }
    .line${i} {
      opacity: 0;
      animation: type${i} ${totalDurationS}s ${loop ? "infinite" : "forwards"};
    }`;
    })
    .join("");

  const cursorStyle = cursor
    ? `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .cursor {
      animation: blink 0.8s step-end infinite;
    }`
    : "";

  const bgRect = bgColor
    ? `<rect width="${width}" height="${height}" fill="${bgColor}" rx="4.5"/>`
    : "";

  const textY = height / 2;
  const textElements = lines
    .map(
      (line, i) =>
        `<text x="${textX}" y="${textY}" dominant-baseline="central" text-anchor="${textAnchor}"
          font-family="${font}" font-size="${size}" font-weight="${weight}"
          fill="${color}" class="line${i}">${escapeHtml(line)}</text>`
    )
    .join("\n  ");

  const cursorMarkup = cursor
    ? `<line x1="${textX}" y1="${textY - size * 0.5}" x2="${textX}" y2="${textY + size * 0.5}"
        stroke="${actualCursorColor}" stroke-width="${cursorWidth}" class="cursor"/>`
    : "";

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>${styles}${cursorStyle}
  </style>
  ${bgRect}
  ${textElements}
  ${cursorMarkup}
</svg>`;
}

module.exports = { renderTypingCard };
