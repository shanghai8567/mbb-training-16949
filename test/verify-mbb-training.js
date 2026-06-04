/**
 * MBB 培训包验收脚本 — 对齐 PROMPT-MBB-TUTOR.md v2.1
 * 运行: node test/verify-mbb-training.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../docs/mbb-training");
let pass = 0;
let fail = 0;

function ok(msg) {
  pass++;
  console.log("PASS:", msg);
}
function bad(msg) {
  fail++;
  console.log("FAIL:", msg);
}

const required = [
  "index.html",
  "PROMPT-MBB-TUTOR.md",
  "SYSTEM-PROMPT.txt",
  "START.html",
  "css/style.css",
  "js/course.js",
  "tools/tutorials.html",
  "data/gage-rr-stacked.csv",
  "data/capability-diameter.csv",
  "data/hypothesis-yield.csv",
  "data/doe-2k3-run.csv",
  "data/control-imr.csv",
  "templates/project-charter.csv",
  "templates/control-plan.csv",
  "templates/bb-project-rubric.csv",
];

for (const f of required) {
  if (fs.existsSync(path.join(ROOT, f))) ok(f);
  else bad("missing " + f);
}

const modules = ["学习目标", "C2", "专业软件实操", "客观自测", "能力自评"];
const proFiles = [
  "css/pro.css",
  "js/academy.js",
  "reference/glossary.html",
  "reference/tool-matrix.html",
  "reference/sigma-table.html",
  "reference/automotive-iatf.html",
  "reference/site-config.html",
  "js/site-config-form.js",
  "js/homework-grader.js",
  "css/site-config.css",
  "css/homework-grader.css",
  "css/premium.css",
  "css/brand.css",
  "css/print-light.css",
  "assets/enterprise-logo.svg",
  "js/brand.js",
  "reference/homework-scores.html",
  "reference/mbb-certification-boundary.html",
  "VERSION.md",
  "UPGRADE-TODO.md",
  "CONTENT-TRACEABILITY.md",
  "MBB-RED-TEAM-CHECKLIST.md",
  "data/README.md",
  "templates/gate-review-adasis-scar.html",
  "templates/coaching-grow-rubric.html",
  "templates/capstone-defense-checklist.html",
  "js/self-assessment.js",
  "js/learning-dashboard.js",
  "js/c2-module-checklist.js",
  "js/interactive-learning-core.js",
  "js/interactive-learning.js",
  "css/interactive-learning.css",
  "css/factory-scenario.css",
  "js/factory-scenario.js",
  "reference/factory-floor-lab.html",
  "reference/graduation-report.html",
  "ops/mcq-pilot-calibration.csv",
  "ops/mcq-blind-review-record.md",
  "ops/mock-gate-review-drill.md",
  "data/minitab/README.md",
  "data/minitab/day04-msa.mpx",
  "data/minitab/day06-doe.mpx",
  "data/minitab/day10-spc.mpx",
  "data/automotive-xray-log.csv",
  "css/automotive.css",
  "templates/control-plan-automotive.csv",
  "templates/pfmea-automotive.csv",
  "data/automotive-spi-msa.csv",
  "data/automotive-fct-yield.csv",
  "templates/control-plan-electronics.csv",
  "templates/pfmea-electronics.csv",
  "templates/process-routing-electronics.csv",
  "data/automotive-offline-program.csv",
  "data/automotive-bga-aoi.csv",
];
for (const f of proFiles) {
  if (fs.existsSync(path.join(ROOT, f))) ok(f);
  else bad("missing " + f);
}
for (let i = 1; i <= 14; i++) {
  const fn = `days/day${String(i).padStart(2, "0")}.html`;
  const p = path.join(ROOT, fn);
  if (!fs.existsSync(p)) {
    bad(fn + " missing");
    continue;
  }
  const html = fs.readFileSync(p, "utf8");
  let dayOk = true;
  for (const m of modules) {
    if (!html.includes(m)) {
      bad(fn + " missing " + m);
      dayOk = false;
    }
  }
  if (!html.includes("layout-course")) bad(fn + " missing pro layout");
  if (!html.includes("sec-auto")) bad(fn + " missing automotive section");
  if (!html.includes("BB-") && !html.includes("MBB-")) bad(fn + " missing competency code");
  if (dayOk && html.includes("layout-course")) ok(fn + " pro eight modules");
  if (html.includes("hw-submit-btn") && html.includes("gradable-quiz")) ok(fn + " auto homework grader");
  else bad(fn + " missing homework grader UI");
  if (html.includes("brand-logo") && html.includes("print-light.css")) ok(fn + " brand + print theme");
  else bad(fn + " missing brand or print-light");
  if (html.includes("theme.css") && html.includes("theme-init.js") && html.includes("theme-switcher"))
    ok(fn + " dark/light theme");
  else bad(fn + " missing theme.css / theme-init / switcher");
  if (html.includes("homework-grader-core.js") && html.includes("hw-mcq-review"))
    ok(fn + " homework grader v2");
  else bad(fn + " missing grader core or mcq review");
  if (html.includes("gq-explain-focus") && html.includes("exercise-answer-ref"))
    ok(fn + " mcq explain + E section answers");
  else bad(fn + " missing explain blocks");
  const correctLetters = new Set();
  const re = /data-correct="([a-d])"/g;
  let m;
  while ((m = re.exec(html)) !== null) correctLetters.add(m[1]);
  if (correctLetters.size >= 2) ok(fn + " shuffled mcq answers");
  else bad(fn + " all mcq still same letter (shuffle broken)");
  if (html.includes("sec-b2") && html.includes("automotive-deep")) ok(fn + " B+ process alignment");
  else bad(fn + " missing B+ automotive deep dive");
  if (html.includes("c2-lab-card") && html.includes("c2-lab-steps")) ok(fn + " C2 menu-path lab");
  else bad(fn + " missing C2 lab card");
  if (html.includes("data-qtype=\"multi\"") || html.includes("gq-scenario")) ok(fn + " mcq v2 multi/scenario");
  else bad(fn + " missing mcq v2 Q6");
  if (html.includes("gq-explain-source")) ok(fn + " explain source tag in ref");
  else bad(fn + " missing explain source in quiz ref");
  if (html.includes("self-assessment-panel")) ok(fn + " H self-assessment panel");
  else bad(fn + " missing H self-assessment");
  if (html.includes("c2-done-cb")) ok(fn + " C2 per-module checkbox");
  else bad(fn + " missing C2 checkbox");
  if (html.includes("interactive-learning.js") && html.includes("interactive-learning-core.js"))
    ok(fn + " interactive learning UX");
  else bad(fn + " missing interactive learning scripts");
  if (html.includes("sec-factory") && html.includes("factory-scenario"))
    ok(fn + " factory floor scenario section");
  else bad(fn + " missing factory scenario section");
  if (html.includes("fs-deep") && html.includes("标准锚点"))
    ok(fn + " factory P0/P1 sigmaDeep block");
  else bad(fn + " missing factory P0/P1 block");
  if (i === 1 && html.includes("product-matrix-full")) ok(fn + " B+ full product matrix");
  if (html.includes('meta name="mbb-package-version"')) ok(fn + " package version meta");
  else bad(fn + " missing package version meta");
  if (html.includes("FCT-DCU") || html.includes("离线烧录") || html.includes("BGA"))
    ok(fn + " automotive production terms");
  else bad(fn + " missing automotive terms in day");
  if (/离线(?!烧录)/.test(html)) bad(fn + " uses abbreviated 离线 (require 离线烧录)");
  else ok(fn + " offline burn terminology");
}

const prompt = fs.readFileSync(path.join(ROOT, "PROMPT-MBB-TUTOR.md"), "utf8");
if (prompt.includes("C2.") && prompt.includes("/教程")) ok("prompt v2.1 tools");
else bad("prompt incomplete");
if (prompt.includes("v3.0") && prompt.includes("L1") && prompt.includes("L3")) ok("prompt v3.0 three-level eval");
else bad("prompt missing v3 L1/L3");
const routing = fs.readFileSync(path.join(ROOT, "templates/process-routing-electronics.csv"), "utf8");
if (routing.includes("SMT前") && routing.includes("FCT-DCU-B-04")) ok("site routing SMT前+车身FCT");
else bad("process-routing missing site fields");
if (routing.includes("全检") && routing.includes("抽检")) ok("site routing X-Ray SL/MP");
else bad("process-routing missing X-Ray policy");
const siteHtml = fs.readFileSync(path.join(ROOT, "reference/site-config.html"), "utf8");
if (siteHtml.includes("单选") && siteHtml.includes("多选") && siteHtml.includes("其他补充"))
  ok("site-config questionnaire UI");
else bad("site-config missing question types");
if (siteHtml.includes("theme.css") && siteHtml.includes("theme-init.js"))
  ok("site-config theme support");
else bad("site-config missing theme");
const themeCss = fs.readFileSync(path.join(ROOT, "css/theme.css"), "utf8");
if (themeCss.includes('[data-theme="light"]') && themeCss.includes('[data-theme="dark"]'))
  ok("theme.css dual palette");
else bad("theme.css incomplete");

const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
if (indexHtml.includes("eval-levels") && indexHtml.includes("L1") && indexHtml.includes("L3"))
  ok("index three-level evaluation banner");
else bad("index missing L1/L2/L3 banner");
const factoryHub = fs.readFileSync(path.join(ROOT, "reference/factory-floor-lab.html"), "utf8");
if (factoryHub.includes("专题加深") && factoryHub.includes("ict-fct"))
  ok("factory-floor-lab topic supplements");
else bad("factory-floor-lab missing P1 topics");

const { countPresetAnswersForDay } = require("./exercise-answers");
for (let i = 1; i <= 14; i++) {
  if (countPresetAnswersForDay(i) >= 2) ok(`exercise preset answers day${i}`);
  else bad(`exercise preset answers insufficient day${i}`);
}

console.log("\n---");
console.log(`RESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
