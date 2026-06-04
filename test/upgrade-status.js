/**
 * 解析 UPGRADE-TODO.md 完成率
 * 运行: node test/upgrade-status.js
 */
const fs = require("fs");
const path = require("path");

const TODO_PATH = path.join(__dirname, "../docs/mbb-training/UPGRADE-TODO.md");
const text = fs.readFileSync(TODO_PATH, "utf8");

const rows = [
  ...text.matchAll(/\|\s*(S0-\d+|D\d-\d+|M\d|P3-\d+|F\d-\d+|P4-\d+)\s*\|(?:[^|\n]*\|){2,4}\s*(⬜|🔄|✅)\s*\|/g),
];
let done = 0;
let wip = 0;
let todo = 0;
const byStatus = { "✅": [], "🔄": [], "⬜": [] };

for (const m of rows) {
  const id = m[1];
  const st = m[2];
  byStatus[st].push(id);
  if (st === "✅") done++;
  else if (st === "🔄") wip++;
  else todo++;
}

const total = done + wip + todo;
const pct = total ? Math.round((done / total) * 100) : 0;

console.log("MBB UPGRADE STATUS");
console.log("---");
console.log(`Tasks tracked: ${total}`);
console.log(`✅ Done: ${done}  🔄 WIP: ${wip}  ⬜ Todo: ${todo}`);
console.log(`Completion: ${pct}%`);
if (byStatus["🔄"].length) {
  console.log("In progress:", byStatus["🔄"].join(", "));
}
process.exit(total > 0 && done === total ? 0 : 0);
