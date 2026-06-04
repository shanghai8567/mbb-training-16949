/**
 * 交互式培训核心逻辑测试
 * 运行: node test/interactive-learning.test.js
 */
const assert = require("assert");
const Core = require("../docs/mbb-training/js/interactive-learning-core");

let pass = 0;
let fail = 0;

function ok(cond, msg) {
  if (cond) {
    pass++;
    console.log("PASS:", msg);
  } else {
    fail++;
    console.log("FAIL:", msg);
  }
}

const ids = ["sec-a", "sec-b", "sec-c", "sec-g"];

ok(Core.calcModulePercent(ids, {}) === 0, "empty progress 0%");
ok(
  Core.calcModulePercent(ids, { "sec-a": {}, "sec-b": {} }) === 50,
  "half sections 50%"
);
ok(
  Core.calcModulePercent(ids, { "sec-a": {}, "sec-b": {}, "sec-c": {}, "sec-g": {} }) === 100,
  "all sections 100%"
);

ok(Core.getNextSectionId(ids, {}) === "sec-a", "next is first");
ok(Core.getNextSectionId(ids, { "sec-a": {} }) === "sec-b", "next after a");

ok(Core.pickResumeModule("5", [1, 2, 3], 14) === 5, "resume last module");
ok(Core.pickResumeModule("", [1, 2], 14) === 3, "resume first incomplete");
ok(Core.pickResumeModule("99", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14) === 14, "all done -> 14");

const item = {
  type: "single",
  correctValue: "b",
  options: [
    { v: "a", t: "A" },
    { v: "b", t: "B" },
  ],
};
const doc = {
  querySelector(sel) {
    if (sel.includes(":checked") && sel.includes("mcq-d3-q1")) {
      return { value: "b" };
    }
    return null;
  },
  querySelectorAll() {
    return [];
  },
};
const g = Core.gradeOneMcqItem(item, 3, 1, doc);
ok(g.ok && g.msg.includes("正确"), "single mcq correct");
ok(Core.SECTION_LABELS["sec-g"] === "G 自测", "section labels");

console.log("---");
console.log(fail ? `FAIL ${fail}` : `ALL PASS (${pass})`);
process.exit(fail ? 1 : 0);
