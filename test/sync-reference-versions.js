/**
 * 将参考页 / 门户版本与 mbb-package-manifest 对齐
 * 运行: node test/sync-reference-versions.js
 */
const fs = require("fs");
const path = require("path");
const manifest = require("./mbb-package-manifest");

const ROOT = path.join(__dirname, "../docs/mbb-training");

function setMeta(html, version) {
  if (html.includes('name="mbb-package-version"')) {
    return html.replace(
      /meta name="mbb-package-version" content="[^"]*"/,
      `meta name="mbb-package-version" content="${version}"`
    );
  }
  return html.replace(
    /<head>/,
    `<head>\n  <meta name="mbb-package-version" content="${version}" />`
  );
}

function syncIndex() {
  const p = path.join(ROOT, "index.html");
  let html = fs.readFileSync(p, "utf8");
  html = setMeta(html, manifest.packageVersion);
  html = html.replace(
    /包版本 <strong>[^<]+<\/strong> · 工厂实景 <strong>[^<]+<\/strong>/,
    `包版本 <strong>${manifest.packageVersion}</strong> · 工厂实景 <strong>${manifest.factoryScenarios}</strong>`
  );
  fs.writeFileSync(p, html, "utf8");
  console.log("index.html OK");
}

function syncGraduationReport() {
  const p = path.join(ROOT, "reference/graduation-report.html");
  let html = fs.readFileSync(p, "utf8");
  html = setMeta(html, manifest.packageVersion);
  const metaBlock = `        const pv =
          document.querySelector('meta[name="mbb-package-version"]')?.content || "${manifest.packageVersion}";
        document.getElementById("report-meta").textContent =
          "生成时间：" +
          new Date().toLocaleString() +
          " · 包版本 " +
          pv +
          " · 工厂实景 ${manifest.factoryScenarios}";`;
  if (html.includes('getElementById("report-meta")')) {
    html = html.replace(
      /document\.getElementById\("report-meta"\)\.textContent\s*=[\s\S]*?;/,
      metaBlock
    );
  }
  fs.writeFileSync(p, html, "utf8");
  console.log("graduation-report.html OK");
}

function syncVersionMd() {
  const p = path.join(ROOT, "VERSION.md");
  let md = fs.readFileSync(p, "utf8");
  md = md.replace(
    /\| \*\*教材 HTML\*\* \| `[^`]+`/,
    `| **教材 HTML** | \`${manifest.packageVersion}\``
  );
  md = md.replace(
    /\| \*\*PROMPT 助教\*\* \|[^\n]+\n/,
    `| **PROMPT 助教** | \`${manifest.promptVersion}\` | 三级评价 · C2 Lab · 工厂实景指引 |\n`
  );
  md = md.replace(
    /版本：`[^`]+`/,
    `版本：\`${manifest.packageVersion}\``
  );
  fs.writeFileSync(p, md, "utf8");
  console.log("VERSION.md OK");
}

function syncTraceability() {
  const p = path.join(ROOT, "CONTENT-TRACEABILITY.md");
  let md = fs.readFileSync(p, "utf8");
  md = md.replace(
    /版本：`[^`]+`/,
    `版本：\`${manifest.packageVersion}\``
  );
  fs.writeFileSync(p, md, "utf8");
  console.log("CONTENT-TRACEABILITY.md OK");
}

syncIndex();
syncGraduationReport();
syncVersionMd();
syncTraceability();
