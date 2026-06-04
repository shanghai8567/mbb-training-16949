/**
 * MCQ 结构化解析：考点 / 正解理由 / 误选简析
 */
const FOCUS_BY_DAY = {
  1: "战略部署 · 五产品×四工艺段",
  2: "Define · Charter 与 VOC/CTQ",
  3: "Measure · 数据计划与选图",
  4: "Measure · MSA 与过程能力",
  5: "Analyze · 根因与分层",
  6: "Improve · DOE 与回归",
  7: "DMAIC 阶段门与故事板",
  8: "Improve · PFMEA 与对策",
  9: "Improve · RSM / Safe Launch",
  10: "Control · 控制计划与 SPC",
  11: "DFSS · QFD 与验证边界",
  12: "部署复制 · ADKAR",
  13: "MBB 辅导 · GROW / Rubric",
  14: "Capstone · 答辩与认证边界",
};

const DISTRACTOR_HINTS = [
  [/合并|混|柔性|总良率|HU|中控/i, "勿合并产品/工站数据，违反分层原则。"],
  [/回流.*烧|补烧|FCT.*再烧/i, "离线烧录须在 SMT 前完成，事后烧录无法拦截错版。"],
  [/Cpk.*满意|1\.33|忽略.*X-Ray/i, "单点 Cpk 不能替代 CTQ 链与 MSA。"],
  [/Minitab|代替.*分析|替 BB/i, "MBB 教练不代劳分析。"],
  [/口头|自动认证|60 分/i, "认证须证据与评审记录。"],
  [/观察.*因果|直接量产|外推/i, "须 DOE/确认运行，禁止未验证外推。"],
  [/阶段门.*口头/i, "阶段门须文档化签字。"],
  [/章程.*方案|Define.*方案|更换钢网/i, "对策属 Improve，非问题陈述。"],
  [/越多越好/i, "抽样须定义窗与独立性。"],
  [/I-MR.*错版|属性.*Cpk/i, "属性/计量数据与图表须匹配。"],
];

function inferDistractorNote(wrongText, question) {
  for (const [re, hint] of DISTRACTOR_HINTS) {
    if (re.test(wrongText) || re.test(question)) return hint;
  }
  const short = wrongText.length > 48 ? `${wrongText.slice(0, 48)}…` : wrongText;
  return `「${short}」与本课 B+ 工艺证据链或 DMAIC 阶段要求不一致。`;
}

function buildRationale(correctText, question) {
  if (/【纠错】/.test(question)) {
    return `纠偏：${correctText}。须用可测证据链支撑，而非经验口号。`;
  }
  return `${correctText}。须能在离线烧录/SMT/X-Ray/手插/FCT 分段举证，并与当日 CTQ 对齐。`;
}

/**
 * @param {object} item - mcq item with options
 * @param {number} dayN
 * @param {number} qIndex - 1-based
 */
const { getAuthorNote } = require("./mcq-author-notes");

function buildMcqExplain(item, dayN, qIndex) {
  if (item.explain && item.explain.rationale && item.explain.source) return item.explain;

  const authored = getAuthorNote(dayN, qIndex, item);
  if (authored) return authored;

  const correct = item.options.find((o) => o.correct);
  const wrong = item.options.filter((o) => !o.correct);
  const distractors = {};
  wrong.forEach((o) => {
    distractors[o.v] = inferDistractorNote(o.t, item.q);
  });

  const tag = /【纠错】/.test(item.q) ? "纠错辨析" : "现场判断";
  return {
    source: "auto",
    focus: `考点（模块 ${String(dayN).padStart(2, "0")} · ${FOCUS_BY_DAY[dayN] || "B+"}）— ${tag}`,
    rationale: buildRationale(correct ? correct.t : "", item.q),
    distractors,
    anchor: "对照本节 B+ 工艺表、F 作业 Rubric 与 G 题干关键词。",
  };
}

function attachExplainToMcq(mcq, dayN) {
  return mcq.map((item, i) => ({
    ...item,
    explain: buildMcqExplain(item, dayN, i + 1),
  }));
}

module.exports = { buildMcqExplain, attachExplainToMcq, FOCUS_BY_DAY };
