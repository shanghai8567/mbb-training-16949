/**
 * C2 按模块勾选逻辑
 */
const fs = require("fs");
const path = require("path");

let pass = 0;
let fail = 0;

function ok(name, cond) {
  if (cond) {
    pass++;
    console.log("PASS:", name);
  } else {
    fail++;
    console.log("FAIL:", name);
  }
}

const js = fs.readFileSync(
  path.join(__dirname, "../docs/mbb-training/js/c2-module-checklist.js"),
  "utf8"
);
ok("c2 checklist key", js.includes("mbb-c2-by-day-v1"));
ok("syncs legacy key", js.includes("mbb-c2-checklist-v1"));

const dash = fs.readFileSync(
  path.join(__dirname, "../docs/mbb-training/js/learning-dashboard.js"),
  "utf8"
);
ok("dashboard reads by-day", dash.includes("C2_BY_DAY_KEY"));

console.log("\n---");
console.log(`RESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
