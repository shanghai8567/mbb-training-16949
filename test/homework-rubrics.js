/**
 * 各模块作业自动评分 + 与当日培训内容 1:1 的客观题
 */
const { getMcqForDay, getKeywordsForDay } = require("./automotive-day-enrichment");
const { shuffleOptions } = require("./mcq-shuffle");
const { attachExplainToMcq } = require("./mcq-explain");
const { mergeDimensions } = require("./day-rubric-tweaks");
const { getExerciseAnswers } = require("./exercise-answers");
const { getMcqV2ForDay } = require("./mcq-v2/supplement");

const EVIDENCE_FIELDS = [
  "工站",
  "fct-",
  "profile",
  "program_id",
  "checksum",
  "x-ray",
  "工艺段",
  "离线烧录",
  "sipoc",
  "分段",
  "截图",
];

const DIMENSIONS = {
  business: {
    label: "商业对齐",
    weight: 15,
    keys: [
      "ctq",
      "voc",
      "champion",
      "效益",
      "成本",
      "sipoc",
      "章程",
      "问题陈述",
      "dpmo",
      "ppm",
      "oem",
      "adas",
      "域控",
    ],
    forbids: ["应该采用", "建议使用 minitab", "上 minitab"],
  },
  measure: {
    label: "测量严谨",
    weight: 20,
    keys: [
      "msa",
      "操作定义",
      "抽样",
      "基线",
      "cpk",
      "grr",
      "%r&r",
      "spi",
      "checksum",
      "x-ray",
      "profile",
      "探针",
    ],
    forbids: [],
  },
  stats: {
    label: "统计有效",
    weight: 25,
    keys: [
      "显著",
      "α",
      "p值",
      "假设",
      "doe",
      "效应量",
      "anova",
      "回归",
      "卡方",
      "缺陷矩阵",
      "pareto",
    ],
    forbids: [],
  },
  improve: {
    label: "改进与控制",
    weight: 25,
    keys: ["fmea", "pfmea", "控制计划", "pilot", "对策", "8d", "spc", "p图", "反应计划", "u12", "空洞"],
    forbids: [],
  },
  mbb: {
    label: "MBB 表达",
    weight: 15,
    keys: ["champion", "阶段门", "复制", "故事板", "bb", "mbb", "教练", "评审", "工艺段"],
    forbids: [],
  },
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function prepareMcqForDay(dayN) {
  const raw = getMcqForDay(dayN);
  const v2 = getMcqV2ForDay(dayN);
  const merged = v2 ? [...raw, v2] : raw;
  const withExplain = attachExplainToMcq(merged, dayN);
  return withExplain.map((item, i) => {
    const sh = shuffleOptions(item.options, dayN, i + 1);
    const base = {
      ...item,
      options: sh.options,
      type: item.type || sh.type || "single",
    };
    if (base.type === "multi") {
      return {
        ...base,
        correctValues: sh.correctValues || item.correctValues,
      };
    }
    return {
      ...base,
      correctValue: sh.correctValue,
    };
  });
}

function buildRubricForDay(dayN) {
  const mcq = prepareMcqForDay(dayN);
  return {
    day: dayN,
    minChars: 150,
    passScore: 70,
    mcqWeight: 45,
    textWeight: 55,
    dayKeywords: getKeywordsForDay(dayN),
    evidenceFields: EVIDENCE_FIELDS,
    dimensions: mergeDimensions(DIMENSIONS, dayN),
    mcq,
  };
}

function renderExplainBlock(item, pickedVal) {
  const ex = item.explain || {};
  const isMulti = item.type === "multi";
  const wantSet = new Set(
    isMulti
      ? (item.correctValues || []).map((v) => v.toLowerCase())
      : [String(item.correctValue || "").toLowerCase()]
  );
  const pickedSet = new Set(
    Array.isArray(pickedVal)
      ? pickedVal.map((v) => String(v).toLowerCase())
      : pickedVal
        ? [String(pickedVal).toLowerCase()]
        : []
  );
  const correctOpts = item.options.filter((o) => wantSet.has(o.v));
  const sourceTag =
    ex.source === "author"
      ? '<span class="gq-explain-source author">精编解析</span>'
      : '<span class="gq-explain-source auto">规则解析</span>';

  const distractorLines = item.options
    .filter((o) => !wantSet.has(o.v))
    .map((o) => {
      const note = (ex.distractors && ex.distractors[o.v]) || "见题干干扰项设计。";
      const mark = pickedSet.has(o.v) ? " ← 您的选择" : "";
      return `<li><strong>${esc(o.v.toUpperCase())}</strong> ${esc(o.t)}${mark}<br><span class="gq-explain-dim">${esc(note)}</span></li>`;
    })
    .join("");

  const setsEqual =
    wantSet.size === pickedSet.size && [...wantSet].every((v) => pickedSet.has(v));
  const status = isMulti ? (setsEqual ? "pass" : "fail") : pickedVal === item.correctValue ? "pass" : "fail";
  const correctLabel = correctOpts.map((o) => o.v.toUpperCase()).join("+");

  return `<div class="gq-explain-block ${status}">
    ${sourceTag}
    <p class="gq-explain-focus"><strong>考点</strong> ${esc(ex.focus || "")}</p>
    <p class="gq-explain-rationale"><strong>正解${isMulti ? "（多选）" : ""}（${esc(correctLabel)}）</strong> ${esc(ex.rationale || correctOpts.map((o) => o.t).join("；") || "")}</p>
    ${!setsEqual && pickedSet.size ? `<p class="gq-explain-your"><strong>您的选择</strong> ${esc([...pickedSet].join(", ").toUpperCase())}</p>` : ""}
    <p class="gq-explain-distractor-title"><strong>误选简析</strong></p>
    <ul class="gq-explain-distractor-list obj-list">${distractorLines}</ul>
    ${ex.anchor ? `<p class="gq-explain-anchor">${esc(ex.anchor)}</p>` : ""}
  </div>`;
}

function renderRefDetail(item, i) {
  const isMulti = item.type === "multi";
  const want = isMulti ? item.correctValues || [] : [item.correctValue];
  const correctText = item.options
    .filter((o) => want.includes(o.v))
    .map((o) => o.t)
    .join("；");
  const picked = isMulti ? want : item.correctValue;
  const scenario = item.scenario ? `<p class="gq-ref-scenario">${esc(item.scenario)}</p>` : "";
  return `<div class="gq-ref-item" data-qindex="${i + 1}">
    <h4 class="gq-ref-q">Q${i + 1} ${esc(item.q)}</h4>
    ${scenario}
    <p class="gq-ref-ans"><span style="color:var(--accent)">✓ ${esc(correctText)}</span></p>
    ${renderExplainBlock(item, picked)}
  </div>`;
}

function renderGradableQuiz(dayN) {
  const rubric = buildRubricForDay(dayN);
  const blocks = rubric.mcq
    .map((item, i) => {
      const name = `mcq-d${dayN}-q${i + 1}`;
      const isMulti = item.type === "multi";
      const scenario = item.scenario
        ? `<p class="gq-scenario">${esc(item.scenario)}</p>`
        : "";
      const typeBadge = isMulti
        ? '<span class="gq-type-badge multi">多选</span>'
        : "";
      const opts = item.options
        .map((o) => {
          const inputType = isMulti ? "checkbox" : "radio";
          const inputName = isMulti ? `${name}[]` : name;
          return `<li class="opt"><input type="${inputType}" name="${inputName}" id="${name}-${o.v}" value="${o.v}" data-label="${esc(o.t)}" /><label for="${name}-${o.v}">${esc(o.t)}</label></li>`;
        })
        .join("");
      const correctAttr = isMulti
        ? `data-correct-multi="${(item.correctValues || []).join(",")}"`
        : `data-correct="${item.correctValue}"`;
      return `<div class="gq-block" ${correctAttr} data-qindex="${i + 1}" data-qtype="${item.type || "single"}">
        <p class="gq-title"><span class="gq-num">Q${i + 1}</span> ${typeBadge} ${esc(item.q)}</p>
        ${scenario}
        <ul class="gq-opts">${opts}</ul>
      </div>`;
    })
    .join("");

  const refDetails = rubric.mcq.map((item, i) => renderRefDetail(item, i)).join("");

  return `<div class="gradable-quiz" id="gradable-quiz" data-day="${dayN}">
    <p class="gq-intro">以下题目<strong>只考本模块 B+ 节与 ◎ 汽车电子专题</strong>所讲要点（离线烧录/SMT·BGA/手插/装配/域控 FCT），请先学完再答。占综合分 <strong>${rubric.mcqWeight}%</strong>（含 Q6 情景多选）。选项顺序已打乱，请勿猜测字母规律。</p>
    ${blocks}
  </div>
  <details class="quiz-answers-ref" id="quiz-answers-ref"><summary>题库解析（提交后将自动展开）</summary><div class="gq-ref-wrap">${refDetails}</div></details>`;
}

function renderHomeworkForm(dayN) {
  const r = buildRubricForDay(dayN);
  const enrich = require("./automotive-day-enrichment").DAY_ENRICHMENT[dayN];
  const hint = enrich && enrich.homeworkHint ? enrich.homeworkHint : "结合本模块 B+ 工艺段要点作答";
  return `<div class="hw-submit-panel" id="hw-submit-panel">
    <label for="hw-text" class="hw-label">粘贴或输入课后作业（须体现汽车电子现场）</label>
    <p class="hw-hint"><strong>评分要点：</strong>${esc(hint)}。建议字数 ≥ ${r.minChars}，含模块关键词（如 ${r.dayKeywords.slice(0, 6).join("、")}…）。未达字数时文本分按比例封顶。</p>
    <textarea id="hw-text" class="hw-textarea" rows="8" placeholder="例：ADAS 域控 / 车身域控 / 离线烧录@SMT前 / BGA U12 / X-Ray SL全检 / FCT-DCU-B-04 …"></textarea>
    <div class="form-actions hw-actions">
      <button type="button" class="btn btn-primary" id="hw-submit-btn">提交作业并自动评分</button>
      <button type="button" class="btn" id="hw-save-draft">保存草稿</button>
    </div>
    <div id="hw-result" class="hw-result" aria-live="polite"></div>
    <div id="hw-mcq-review" class="hw-mcq-review" aria-live="polite"></div>
  </div>`;
}

function renderExerciseSection(dayN, exercises) {
  const answers = getExerciseAnswers(dayN, exercises);
  return exercises
    .map((ex, i) => {
      const a = answers[i];
      return `<li class="exercise-item">
        <strong>E${i + 1}.</strong> ${esc(ex)}
        <details class="exercise-answer-ref">
          <summary>参考答案</summary>
          <p class="ex-ans-body"><strong>要点：</strong>${esc(a.answer)}</p>
          <p class="ex-ans-explain">${esc(a.explain)}</p>
        </details>
      </li>`;
    })
    .join("");
}

const HOMEWORK_RUBRICS = {};
for (let n = 1; n <= 14; n++) HOMEWORK_RUBRICS[n] = buildRubricForDay(n);

module.exports = {
  HOMEWORK_RUBRICS,
  buildRubricForDay,
  prepareMcqForDay,
  renderGradableQuiz,
  renderHomeworkForm,
  renderExerciseSection,
  renderExplainBlock,
};
