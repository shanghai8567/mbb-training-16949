/**
 * 为静态 HTML 注入 Logo、主题、打印样式
 * node test/patch-brand-pages.js
 */
const fs = require("fs");
const path = require("path");
const { renderTopbarBrand, renderPrintHeader, renderThemeSwitcher } = require("./brand-html");

const ROOT = path.join(__dirname, "../docs/mbb-training");

const THEME_HEAD = `
  <script src="{{P}}js/theme-init.js"></script>
  <link rel="stylesheet" href="{{P}}css/theme.css" />`;

const HEAD_LINKS = `
  <link rel="stylesheet" href="{{P}}css/brand.css" />
  <link rel="stylesheet" href="{{P}}css/print-light.css" media="print" />
  <script src="{{P}}js/theme.js" defer></script>
  <script src="{{P}}js/brand.js" defer></script>`;

const THEME_SWITCHER = renderThemeSwitcher();

const HERO_BRAND = `
      <div class="hero-brand-row">
        <div class="hero-logo-slot" title="替换 assets/enterprise-logo.svg 为贵司 Logo">
          <img src="assets/enterprise-logo.svg" alt="企业 Logo" />
        </div>
        <span class="hero-brand-divider" aria-hidden="true"></span>
        <div>
          <p class="eyebrow" style="margin:0">Six Sigma Black Belt · Automotive Edition</p>
          <p style="margin:0.35rem 0 0;font-size:0.8rem;color:var(--muted)">Logo：见 assets/LOGO.txt</p>
        </div>
      </div>`;

function injectThemeHead(html, prefix) {
  if (html.includes("theme-init.js")) return html;
  const themeBlock = THEME_HEAD.replace(/\{\{P\}\}/g, prefix);
  if (html.includes('href="' + prefix + 'css/style.css"')) {
    return html.replace(
      new RegExp(`(<link rel="stylesheet" href="${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}css/style\\.css" />)`),
      themeBlock + "\n  $1"
    );
  }
  if (html.includes('href="css/style.css"')) {
    return html.replace(
      /(<link rel="stylesheet" href="css\/style\.css" \/>)/,
      themeBlock + "\n  $1"
    );
  }
  return html;
}

function injectNavThemeSwitcher(html) {
  if (html.includes("theme-switcher")) return html;
  return html.replace(/(<\/nav>)/, `      ${THEME_SWITCHER}\n    $1`);
}

function patchFile(rel, opts) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  let html = fs.readFileSync(p, "utf8");
  const prefix = opts.prefix || "";
  const home = opts.home || "index.html";

  html = injectThemeHead(html, prefix);

  if (!html.includes("brand.css")) {
    html = html.replace(
      /(<link rel="stylesheet" href="[^"]*premium\.css" \/>)/,
      `$1${HEAD_LINKS.replace(/\{\{P\}\}/g, prefix)}`
    );
    if (!html.includes("brand.css")) {
      html = html.replace(
        /(<link rel="stylesheet" href="[^"]*automotive\.css" \/>)/,
        `$1${HEAD_LINKS.replace(/\{\{P\}\}/g, prefix)}`
      );
    }
    if (!html.includes("brand.css") && html.includes("site-config.css")) {
      html = html.replace(
        /(<link rel="stylesheet" href="[^"]*site-config\.css" \/>)/,
        `$1${HEAD_LINKS.replace(/\{\{P\}\}/g, prefix)}`
      );
    }
  }

  if (!html.includes("theme.js") && html.includes("brand.js")) {
    html = html.replace(
      /(<script src="[^"]*brand\.js" defer><\/script>)/,
      `  <script src="${prefix}js/theme.js" defer></script>\n  $1`
    );
  }

  if (!html.includes("print-header") && opts.printTitle) {
    html = html.replace(
      /<div class="page-bg"><\/div>/,
      `<div class="page-bg"></div>\n  ${renderPrintHeader(prefix, opts.printTitle)}`
    );
  }

  if (opts.fixTopbar && html.includes('class="brand"') && !html.includes("brand-logo-wrap")) {
    html = html.replace(
      /<a class="brand"[^>]*>[\s\S]*?<\/a>/,
      renderTopbarBrand(home, prefix)
    );
  }

  if (opts.heroBrand && !html.includes("hero-brand-row")) {
    html = html.replace(
      /<p class="eyebrow">Six Sigma Black Belt/,
      `${HERO_BRAND}\n      <p class="eyebrow" style="display:none">Six Sigma Black Belt`
    );
  }

  if (opts.themeNav !== false) {
    html = injectNavThemeSwitcher(html);
  }

  if (!html.includes("print-footer-line") && html.includes('class="footer"')) {
    html = html.replace(
      /<\/footer>/,
      `    <span class="print-footer-line">— 机密文件 · 仅供内部培训 —</span>\n  </footer>`
    );
  }

  fs.writeFileSync(p, html, "utf8");
  console.log("patched", rel);
}

patchFile("index.html", {
  prefix: "",
  home: "index.html",
  printTitle: "MBB 14 模块培训课程总览",
  heroBrand: true,
});

patchFile("reference/site-config.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "现场配置问卷",
  fixTopbar: true,
});

patchFile("reference/automotive-iatf.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "汽车电子 EMS 工艺手册",
  fixTopbar: true,
});

patchFile("reference/homework-scores.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "作业成绩汇总",
  fixTopbar: true,
});

patchFile("reference/glossary.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "术语表",
  fixTopbar: true,
});

patchFile("reference/tool-matrix.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "DMAIC 工具矩阵",
  fixTopbar: true,
});

patchFile("reference/sigma-table.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "σ · DPMO 对照",
  fixTopbar: true,
});

patchFile("tools/tutorials.html", {
  prefix: "../",
  home: "../index.html",
  printTitle: "Minitab 教程库",
  fixTopbar: true,
});

console.log("done");
