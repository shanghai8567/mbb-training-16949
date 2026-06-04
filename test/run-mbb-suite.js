/**
 * 一键运行 MBB 培训包全部验收脚本
 * 运行: node test/run-mbb-suite.js
 */
const { spawnSync } = require("child_process");
const path = require("path");

const scripts = [
  "homework-grader.test.js",
  "learning-dashboard.test.js",
  "self-assessment.test.js",
  "mcq-coverage-matrix.js",
  "red-team-verify.js",
  "verify-mbb-training.js",
  "upgrade-status.js",
  "c2-checklist.test.js",
  "interactive-learning.test.js",
  "factory-scenarios.test.js",
  "version-consistency.test.js",
];

let fail = 0;
console.log("MBB TEST SUITE\n---");
for (const s of scripts) {
  const r = spawnSync(process.execPath, [path.join(__dirname, s)], {
    encoding: "utf8",
    cwd: path.join(__dirname, ".."),
  });
  const ok = r.status === 0;
  if (!ok) fail++;
  console.log((ok ? "PASS" : "FAIL") + " " + s);
  if (!ok && r.stdout) console.log(r.stdout.slice(-500));
  if (!ok && r.stderr) console.error(r.stderr.slice(-500));
}
console.log("---");
console.log(fail ? `SUITE FAIL (${fail})` : "SUITE ALL PASS");
process.exit(fail ? 1 : 0);
