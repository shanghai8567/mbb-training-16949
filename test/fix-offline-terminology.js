/**
 * 术语统一：「离线」简写 →「离线烧录」（已含「离线烧录」处不重复）
 * 运行: node test/fix-offline-terminology.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PH = "\uE000OFFLINE_BURN_PLACEHOLDER\uE001";

const FILES = [
  "README.md",
  "docs/mbb-training/index.html",
  "docs/mbb-training/PROMPT-MBB-TUTOR.md",
  "docs/mbb-training/data/README.md",
  "docs/mbb-training/reference/automotive-iatf.html",
  "docs/mbb-training/reference/site-config.html",
  "docs/mbb-training/js/site-config-form.js",
  "docs/mbb-training/templates/capstone-defense-checklist.html",
  "docs/mbb-training/templates/capstone-adasis-scar/charter-outline.md",
  "docs/mbb-training/templates/pfmea-electronics.csv",
  "docs/mbb-training/templates/control-plan-electronics.csv",
  "docs/mbb-training/templates/process-routing-electronics.csv",
  "docs/mbb-training/data/automotive-offline-program.csv",
  "test/build-mbb-days.js",
  "test/verify-mbb-training.js",
  "test/automotive-day-enrichment.js",
  "test/product-matrix-full.js",
  "test/homework-grader.test.js",
  "test/homework-rubrics.js",
  "test/mcq-explain.js",
  "test/mcq-v2/supplement.js",
  "test/mcq-author-notes.js",
  "test/exercise-answers.js",
  "test/c2-lab-specs.js",
  "test/automotive-content.js",
];

for (let d = 1; d <= 14; d++) {
  FILES.push(`docs/mbb-training/days/day${String(d).padStart(2, "0")}.html`);
}

function fixText(text) {
  return text.split("离线烧录").join(PH).split("离线").join("离线烧录").split(PH).join("离线烧录");
}

let changed = 0;
for (const rel of FILES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) {
    console.warn("skip missing", rel);
    continue;
  }
  const before = fs.readFileSync(fp, "utf8");
  const after = fixText(before);
  if (after !== before) {
    fs.writeFileSync(fp, after, "utf8");
    changed++;
    console.log("updated", rel);
  }
}

console.log("---");
console.log(`done: ${changed} files updated`);
