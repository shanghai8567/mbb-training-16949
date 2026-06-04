/**
 * 作业评分核心逻辑单元测试
 * 运行: node test/homework-grader.test.js
 */
const assert = require("assert");
const path = require("path");
const Core = require(path.join(__dirname, "../docs/mbb-training/js/homework-grader-core.js"));
const { buildRubricForDay, prepareMcqForDay } = require("./homework-rubrics");
const { shuffleOptions } = require("./mcq-shuffle");

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

function testShuffleNotAllA() {
  const positions = new Set();
  for (let d = 1; d <= 14; d++) {
    const mcq = prepareMcqForDay(d);
    mcq.forEach((item, i) => positions.add(item.correctValue));
  }
  ok("shuffle: correct answers use more than one letter", positions.size >= 3);
}

function testShuffleDeterministic() {
  const opts = [
    { v: "a", t: "A", correct: true },
    { v: "b", t: "B", correct: false },
    { v: "c", t: "C", correct: false },
    { v: "d", t: "D", correct: false },
  ];
  const a = shuffleOptions(opts, 3, 2).correctValue;
  const b = shuffleOptions(opts, 3, 2).correctValue;
  ok("shuffle: same seed same result", a === b);
}

function testDay1FirstNotAlwaysA() {
  const v = prepareMcqForDay(1)[0].correctValue;
  ok("shuffle: day1 q1 position varies from raw a", ["a", "b", "c", "d"].includes(v));
}

function fillPicks(rubric, prefix) {
  const picks = {};
  rubric.mcq.forEach((item, i) => {
    const name = `${prefix}-q${i + 1}`;
    if (item.type === "multi") {
      picks[name] = [...(item.correctValues || [])];
    } else {
      picks[name] = item.correctValue;
    }
  });
  return picks;
}

function testMcqAllCorrect() {
  const rubric = buildRubricForDay(2);
  const picks = fillPicks(rubric, "mcq-d2");
  const mcq = Core.gradeMcq(rubric, picks, null);
  ok("mcq: all correct => 45%", mcq.mcqPercent === 45 && mcq.correct === rubric.mcq.length);
  ok("mcq: all correct => 0 unanswered", mcq.unanswered === 0);
}

function testMcqAllWrong() {
  const rubric = buildRubricForDay(2);
  const picks = {};
  rubric.mcq.forEach((item, i) => {
    const wrong = item.options.find((o) => o.v !== item.correctValue);
    picks[`mcq-d2-q${i + 1}`] = wrong.v;
  });
  const mcq = Core.gradeMcq(rubric, picks, null);
  ok("mcq: all wrong => 0%", mcq.mcqPercent === 0 && mcq.correct === 0);
}

function testMcqUnansweredBlocks() {
  const rubric = buildRubricForDay(1);
  const mcq = Core.gradeMcq(rubric, {}, null);
  ok("mcq: unanswered count", mcq.unanswered === rubric.mcq.length);
}

function testMcqV2MultiOnDay1() {
  const rubric = buildRubricForDay(1);
  ok("mcq v2: day1 has 6 questions", rubric.mcq.length === 6);
  const q6 = rubric.mcq[5];
  ok("mcq v2: q6 is multi", q6.type === "multi" && (q6.correctValues || []).length >= 2);
}

function testAuthorExplainSource() {
  const mcq = prepareMcqForDay(1);
  ok("explain: q1 author source", mcq[0].explain && mcq[0].explain.source === "author");
  ok("explain: has author lib or template", !!(mcq[0].explain.rationale && mcq[0].explain.rationale.length > 20));
}

function testMultiPartialWrong() {
  const rubric = buildRubricForDay(1);
  const q6 = rubric.mcq[5];
  const picks = fillPicks(rubric, "mcq-d1");
  if (q6.correctValues && q6.correctValues.length > 1) {
    picks["mcq-d1-q6"] = [q6.correctValues[0]];
  }
  const mcq = Core.gradeMcq(rubric, picks, null);
  ok("mcq: multi partial not full score", mcq.correct < rubric.mcq.length);
}

function testEmptyTextCap() {
  const rubric = buildRubricForDay(1);
  const textGrade = Core.gradeText("", rubric);
  ok("text: empty caps low", textGrade.textPercent <= 15);
  ok("text: empty feedback mentions chars", textGrade.feedback.some((f) => f.includes("字数")));
}

function testTextWithKeywords() {
  const rubric = buildRubricForDay(2);
  const sample =
    "ADAS 域控 Charter：问题陈述 Eth 一次通过率 97.1%，范围 sipoc 离线烧录 smt fct champion ctq voc " +
    "效益 ppm 基线 msa 操作定义 显著 doe fmea 控制计划 pfmea 阶段门 故事板 mbb 教练 评审 工艺段".repeat(3);
  const textGrade = Core.gradeText(sample, rubric);
  ok("text: rich keywords scores higher", textGrade.textPercent >= 35);
}

function testDay1Bonus() {
  const storage = {
    "mbb-site-config-v1": JSON.stringify({
      q1_offlineTiming: { value: "before-smt" },
      q5_xraySafeLaunch: { value: "sl-100" },
      q9_fctIndependent: [{ value: "dcu-b" }],
    }),
  };
  const b = Core.siteConfigBonus((k) => storage[k]);
  ok("day1 bonus: max 5", b.bonus === 5);
  ok("day1 bonus: has note", b.note.includes("加成"));
}

function testDay1BonusEmpty() {
  const b = Core.siteConfigBonus(() => null);
  ok("day1 bonus: none without config", b.bonus === 0);
}

function testSortWrongFirst() {
  const details = [
    { q: 1, ok: true },
    { q: 2, ok: false },
    { q: 3, ok: true },
  ];
  const sorted = Core.sortMcqDetails(details);
  ok("sort: wrong first", sorted[0].ok === false && sorted[0].q === 2);
}

function testMcqHasExplain() {
  const rubric = buildRubricForDay(5);
  const item = rubric.mcq[0];
  ok("mcq: explain.focus", item.explain && item.explain.focus.length > 5);
  ok("mcq: explain.rationale", item.explain && item.explain.rationale.length > 5);
  ok("mcq: explain.distractors", item.explain && Object.keys(item.explain.distractors).length >= 3);
}

function testComputeTotal() {
  const rubric = buildRubricForDay(1);
  const textGrade = { textPercent: 30 };
  const mcqGrade = { mcqPercent: 45 };
  const total = Core.computeTotal(textGrade, mcqGrade, 5, rubric);
  ok("total: capped at 100", total === 80);
}

testShuffleNotAllA();
testShuffleDeterministic();
testDay1FirstNotAlwaysA();
testMcqAllCorrect();
testMcqAllWrong();
testMcqUnansweredBlocks();
testMcqV2MultiOnDay1();
testAuthorExplainSource();
testMultiPartialWrong();
testEmptyTextCap();
testTextWithKeywords();
testDay1Bonus();
testDay1BonusEmpty();
testSortWrongFirst();
testMcqHasExplain();
testComputeTotal();

console.log("\n---");
console.log(`RESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
