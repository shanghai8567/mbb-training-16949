/**
 * 结业权重 v2 单元测试
 */
const assert = require("assert");
const { GRADUATION_WEIGHTS_V2, computeComposite } = require("./graduation-weights");

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

ok("weights sum to 100", GRADUATION_WEIGHTS_V2.items.reduce((s, i) => s + i.weight, 0) === 100);

const full = computeComposite({ g: 80, f: 70, h: 60, c2: 100, capstone: 90 });
ok("full composite computed", full.composite >= 70 && full.composite <= 100);

const partial = computeComposite({ g: 100, f: 100, h: null, c2: null, capstone: null });
ok("partial uses active weights", partial.autoOnly && partial.composite === 100);

console.log("\n---");
console.log(`RESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
