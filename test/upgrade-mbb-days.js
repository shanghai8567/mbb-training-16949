const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../docs/mbb-training/days");

for (let n = 2; n <= 14; n++) {
  const file = path.join(dir, `day${String(n).padStart(2, "0")}.html`);
  let c = fs.readFileSync(file, "utf8");
  if (c.includes('class="topbar"')) continue;

  const titleMatch = c.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : `Day ${n}`;
  const prev = n > 1 ? `day${String(n - 1).padStart(2, "0")}.html` : "#";
  const next = n < 14 ? `day${String(n + 1).padStart(2, "0")}.html` : "#";
  const prevVis = n === 1 ? ' style="visibility:hidden"' : "";

  const head = `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <link rel="stylesheet" href="../css/style.css" />
  <script src="../js/course.js" defer></script>
</head>`;

  const top = `<body data-day="${n}">
  <div class="page-bg"></div>
  <header class="topbar">
    <a class="brand" href="../index.html"><span>σ</span> MBB 特训营</a>
    <nav>
      <a class="btn" href="../index.html">总览</a>
      <a class="btn" id="nav-prev"${prevVis} href="${prev}">← 上一天</a>
      <a class="btn btn-primary" id="nav-next" href="${next}">下一天 →</a>
      <button type="button" class="btn" id="mark-complete">标记完成</button>
    </nav>
  </header>
  <div class="wrap">`;

  c = c.replace(/<head>[\s\S]*?<\/head>/, head);
  c = c.replace(
    /<body>\s*<div class="wrap">\s*<a class="back"[^>]*>[\s\S]*?<\/a>\s*/i,
    top + "\n    <div class=\"day-hero\">\n      "
  );

  const h1Match = c.match(/<h1>([^<]+)<\/h1>/);
  if (h1Match) {
    const tagsMatch = c.match(/<p>(\s*<span class="tag">[\s\S]*?)<\/p>/);
    const tags = tagsMatch ? tagsMatch[1] : "";
    c = c.replace(
      /<div class="day-hero">\s*<h1>[^<]+<\/h1>\s*(?:<p>[\s\S]*?<\/p>\s*)?/,
      `<div class="day-hero">
      <h1>${h1Match[1]}</h1>
      <div class="day-meta">${tags}<span class="day-progress-mini" id="day-mini-progress">第 ${n} / 14 天</span></div>
    </div>
`
    );
    if (tagsMatch) c = c.replace(tagsMatch[0], "");
  }

  c = c.replace(/<table>/g, '<div class="table-wrap"><table>');
  c = c.replace(/<\/table>/g, "</table></div>");
  c = c.replace(/<\/table><\/div><\/div>/g, "</table></div>");

  if (!c.includes('class="footer"')) {
    c = c.replace(
      "</body>",
      `  <footer class="footer"><strong>Day ${n} / 14</strong> · <a href="../index.html">返回总览</a></footer>\n</body>`
    );
  }

  fs.writeFileSync(file, c, "utf8");
  console.log("upgraded", file);
}

console.log("all done");
