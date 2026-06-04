/**
 * 版本号单源一致性
 * 运行: node test/version-consistency.test.js
 */
const fs = require("fs");
const path = require("path");
const manifest = require("./mbb-package-manifest");

const ROOT = path.join(__dirname, "../docs/mbb-training");
let pass = 0;
let fail = 0;

function ok(c, m) {
  if (c) {
    pass++;
    console.log("PASS:", m);
  } else {
    fail++;
    console.log("FAIL:", m);
  }
}

for (let d = 1; d <= 14; d++) {
  const fn = `days/day${String(d).padStart(2, "0")}.html`;
  const html = fs.readFileSync(path.join(ROOT, fn), "utf8");
  ok(
    html.includes(`content="${manifest.packageVersion}"`),
    `${fn} meta version`
  );
}

const grad = fs.readFileSync(path.join(ROOT, "reference/graduation-report.html"), "utf8");
ok(grad.includes(`content="${manifest.packageVersion}"`), "graduation meta");
ok(grad.includes("querySelector('meta[name=\"mbb-package-version\"]')"), "graduation reads meta");
ok(!grad.includes("beta.1"), "graduation no stale beta.1");

const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
ok(index.includes(`<strong>${manifest.packageVersion}</strong>`), "index version banner");

const versionMd = fs.readFileSync(path.join(ROOT, "VERSION.md"), "utf8");
ok(versionMd.includes(manifest.packageVersion), "VERSION.md package");
ok(versionMd.includes(manifest.promptVersion), "VERSION.md prompt");

function scanDir(rel, ext) {
  const dir = path.join(ROOT, rel);
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) scanDir(path.join(rel, f.name), ext);
    else if (f.name.endsWith(ext)) {
      const t = fs.readFileSync(full, "utf8");
      ok(!t.includes("3.0.0-beta.1"), `no beta.1 in ${path.join(rel, f.name)}`);
    }
  }
}
scanDir("days", ".html");
scanDir("reference", ".html");

console.log("---");
console.log(fail ? `FAIL ${fail}` : `ALL PASS (${pass})`);
process.exit(fail ? 1 : 0);
