/**
 * 教研精编解析库（优先于 mcq-explain 规则模板）
 * 键："{dayN}-{qIndex}"，qIndex 从 1 起
 */
const FOCUS = {
  1: "战略 · 五产品×四工艺",
  2: "Define · ADAS Charter",
  3: "Measure · 分段数据计划",
  4: "MSA · SPI/烧录/BGA/FCT",
  5: "Analyze · 缺陷矩阵",
  6: "DOE · Profile/空洞",
  7: "阶段门 · ADAS SCAR",
  8: "Improve · PFMEA",
  9: "RSM · Safe Launch",
  10: "Control · SPC/CP",
  11: "DFSS · QFD",
  12: "部署 · 复制",
  13: "MBB · GROW/Rubric",
  14: "Capstone · 认证边界",
};

/** 精编覆盖：每模块 Q1–Q3 + Q5（纠错），共 4×14=56 题 */
const AUTHOR_LIB = {
  "1-1": {
    focus: "离线烧录必须在 SMT 前 — Checksum 门禁",
    rationale:
      "ADAS/车身 SOC·MCU 镜像须在贴片前烧录并 100% 比对；回流后补烧无法拦截错版，且污染追溯链。",
    distractors: {
      b: "回流后烧录属返工流程，不能作为预防控制。",
      c: "FCT 后烧录为失效模式，成本与风险最高。",
      d: "HU 与域控程序隔离是另一条线，不能替代版本核对。",
    },
    anchor: "B+ 表 · site-config q1 · routing「SMT前」",
  },
  "1-5": {
    focus: "纠错 — Cpk 不能代表 FCT 客户体验",
    rationale:
      "SPI Cpk 只说明焊膏体积能力；Eth FCT 为属性 CTQ，须独立 MSA + p 图 + 缺陷矩阵链到离线烧录/BGA。",
    distractors: {
      b: "1.33 是能力参考，非客户满意度充分条件。",
      c: "SPI 与软件版本、探针无关是错误因果。",
      d: "X-Ray 阶段必须纳入 Analyze 分层。",
    },
    anchor: "模块01 G Q5 · IATF 测量系统",
  },
  "2-5": {
    focus: "纠错 — Define 禁止写对策",
    rationale: "问题陈述只描述可测量症状；钢网/Profile 属于 Improve，写入章程会导致阶段门证据无效。",
    distractors: {
      b: "Define 阶段就要方案会混淆 VOC 与对策。",
      c: "MBB 不会在 Define 指定具体工艺参数。",
      d: "VOC 原话需翻译为 CTQ，不是直接对策。",
    },
    anchor: "templates/project-charter.csv",
  },
  "11-1": {
    focus: "DFSS · 座舱域控 DCU-C 验证边界",
    rationale:
      "DCU-C（MCU+Switch+eMMC）EMS 侧验证止于 FCT-DCU-C-03；整车以太时延由 OEM 路试，质量屋 HOW 不得越界。",
    distractors: {
      b: "OEM 责任不能写入 EMS PFMEA 探测度。",
      c: "HU 中控与 DCU-C 程序不同，不能合并 CTQ。",
      d: "跳过 Verify 仍须离线烧录 Checksum 设计。",
    },
    anchor: "PRODUCTS.dcuC · 模块11 B+",
  },
  "12-1": {
    focus: "部署 · 组合仪表 IC 线复制",
    rationale:
      "仪表 IC 扭矩/ICT 模板可复制到车身 DCU-B 手插线，但 FCT 工站与程序不得混用；复制率须分产品统计。",
    distractors: {
      b: "证书墙无项目支撑是部署失败模式。",
      c: "ADKAR 需按角色分 wave，不能一刀切。",
      d: "工具先行无 Champion 资源是 L2 干预点。",
    },
    anchor: "模块12 · 复制模板四件套",
  },
  "14-5": {
    focus: "纠错 — 14 天 L1 ≠ 企业 MBB",
    rationale:
      "本包 L1 为浏览器摸底；企业 MBB 还须多年项目组合、辅导记录、部署效益审计与 L3 Capstone。",
    distractors: {
      b: "60 分不是自动认证门槛。",
      c: "MBB 须组合管理，非仅技术。",
      d: "口头通过不构成阶段门证据。",
    },
    anchor: "mbb-certification-boundary.html",
  },
};

const PRODUCT_HINTS = [
  [/DCU-C|座舱域控/i, "座舱域控 DCU-C：FCT-DCU-C-03，Switch+eMMC 与 ADAS 程序隔离。"],
  [/HU|中控/i, "中控 HU：FCT 程序与域控分离，勿并入 ADAS Eth 分析。"],
  [/仪表|IC 扭矩/i, "组合仪表 IC：扭矩/ICT 为独立 CTQ，勿与 BGA 空洞混批。"],
  [/DCU-B|车身|FCT-04/i, "车身 DCU-B：独立 FCT-04，CAN/LIN 与 ADAS Eth 分表。"],
  [/DCU-A|ADAS|FCT-05|Eth/i, "ADAS DCU-A：FCT-05 + Eth 环回，离线烧录 SOC+eMMC。"],
];

function authorDistractor(text, question, dayN) {
  for (const [re, hint] of PRODUCT_HINTS) {
    if (re.test(text) || re.test(question)) return hint;
  }
  if (/合并|混|柔性|总良率/i.test(text)) return "五产品/工站须分层，MBB 评审一票否决合并统计。";
  if (/口头|跳过|无需/i.test(text)) return "阶段门与 MSA 须文档化，不可口头通过。";
  const short = text.length > 40 ? `${text.slice(0, 40)}…` : text;
  return `「${short}」与模块 ${String(dayN).padStart(2, "0")} ${FOCUS[dayN] || "B+"} 证据要求冲突。`;
}

/**
 * 精编模板（Q1–Q3、Q5 无手写条目时）
 */
function buildAuthorTemplate(item, dayN, qIndex) {
  const correct = item.options.find((o) => o.correct);
  const wrong = item.options.filter((o) => !o.correct);
  const isCorrection = /【纠错】/.test(item.q);
  const tag = isCorrection ? "纠错辨析" : `Q${qIndex}`;
  return {
    source: "author",
    focus: `${FOCUS[dayN] || "B+"} · ${tag}`,
    rationale: isCorrection
      ? `立场：${correct ? correct.t : ""}。题干已植入常见误区，须用工艺段证据反驳。`
      : `正解：${correct ? correct.t : ""}。答题时写出工站号/Profile#/Program_ID 中至少一项。`,
    distractors: Object.fromEntries(
      wrong.map((o) => [o.v, authorDistractor(o.t, item.q, dayN)])
    ),
    anchor: `教研精编 · 模块 ${String(dayN).padStart(2, "0")} B+ / C2 Lab`,
  };
}

function shouldUseAuthorTemplate(dayN, qIndex, item) {
  const key = `${dayN}-${qIndex}`;
  if (AUTHOR_LIB[key]) return true;
  if (/【纠错】/.test(item.q)) return true;
  return qIndex <= 3;
}

function getAuthorNote(dayN, qIndex, item) {
  const key = `${dayN}-${qIndex}`;
  if (AUTHOR_LIB[key]) {
    return { ...AUTHOR_LIB[key], source: "author" };
  }
  if (item && shouldUseAuthorTemplate(dayN, qIndex, item)) {
    return buildAuthorTemplate(item, dayN, qIndex);
  }
  return null;
}

function countAuthorCoverage() {
  let lib = Object.keys(AUTHOR_LIB).length;
  let template = 0;
  for (let d = 1; d <= 14; d++) {
    const { getMcqForDay } = require("./automotive-day-enrichment");
    getMcqForDay(d).forEach((item, i) => {
      const q = i + 1;
      if (AUTHOR_LIB[`${d}-${q}`]) return;
      if (shouldUseAuthorTemplate(d, q, item)) template++;
    });
  }
  return { lib, template, total: lib + template };
}

module.exports = {
  AUTHOR_LIB,
  FOCUS,
  getAuthorNote,
  buildAuthorTemplate,
  shouldUseAuthorTemplate,
  countAuthorCoverage,
};
