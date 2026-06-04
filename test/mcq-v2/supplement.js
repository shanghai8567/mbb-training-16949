/**
 * 考题 v2：情景 + 多选（每模块追加 1 题，为 Q6）
 */
const MCQ_V2_BY_DAY = {
  1: {
    type: "multi",
    bloom: "analyze",
    products: ["DCU-A", "DCU-B"],
    scenario:
      "【情景】质量部拟将 ADAS FCT-05 与车身 FCT-04 批次合并算总良率，并仅用 SPI Cpk 对外汇报 ADAS SCAR 进展。",
    q: "下列哪些做法违反本课 B+ 与 MBB 原则？（多选，须全对才得分）",
    options: [
      { t: "合并 ADAS+车身 FCT 数据做总良率", correct: true },
      { t: "仅用 SPI Cpk 代表 Eth FCT 改善", correct: true },
      { t: "按 Program_ID 分层比较 FCT 通过率", correct: false },
      { t: "离线烧录 Checksum 100% 在 SMT 前完成", correct: false },
    ],
  },
  2: {
    type: "multi",
    bloom: "apply",
    products: ["DCU-A"],
    scenario: "【情景】Charter 草案写：「降低不良，措施：更换钢网、收紧 Profile#ADAS-04」。",
    q: "哪些条目不应出现在 Define 阶段交付物中？（多选）",
    options: [
      { t: "更换钢网（对策）", correct: true },
      { t: "收紧 Profile（对策）", correct: true },
      { t: "Eth 一次通过率基线% + 时间窗", correct: false },
      { t: "范围止于 EMS FCT（不含整车路试）", correct: false },
    ],
  },
  3: {
    type: "multi",
    bloom: "apply",
    products: ["DCU-B"],
    scenario: "【情景】车身 DCU-B 继电器浮高与 ADAS U12 空洞被合并求平均不良率。",
    q: "哪些统计处理不当？（多选）",
    options: [
      { t: "手插浮高与 BGA 空洞合并平均", correct: true },
      { t: "对离线烧录错版率使用 I-MR 求 Cpk", correct: true },
      { t: "DCU-B 与 DCU-A 分表建 p 图", correct: false },
      { t: "SPI 体积用计量型控制图", correct: false },
    ],
  },
  4: {
    type: "multi",
    bloom: "evaluate",
    products: ["DCU-A", "DCU-C"],
    scenario: "【情景】SPI %GRR=32%，报告仍对外宣称 Cpk=1.8 达标；座舱 DCU-C 沿用同一 SPI 测点未评审。",
    q: "MBB 应否决的做法有？（多选）",
    options: [
      { t: "%GRR>30% 仍只报 Cpk", correct: true },
      { t: "DCU-C 未评审 SPI 测点适用性", correct: true },
      { t: "先改进量具再复验能力", correct: false },
      { t: "FCT 通过率用 p 图监控", correct: false },
    ],
  },
  5: {
    type: "multi",
    bloom: "analyze",
    products: ["HU"],
    scenario: "【情景】分析 Eth 失败时混入中控 HU FCT-03 数据，且未按 SOC_FW 分层。",
    q: "哪些导致根因结论不可信？（多选）",
    options: [
      { t: "HU 数据混入 ADAS 域控", correct: true },
      { t: "未按 Program_ID/SOC_FW 分层", correct: true },
      { t: "缺陷-过程矩阵四段工艺列齐全", correct: false },
      { t: "X-Ray SL/MP 切换日标注", correct: false },
    ],
  },
  6: {
    type: "multi",
    bloom: "apply",
    products: ["DCU-A"],
    scenario: "【情景】观察性回归显示炉温↑空洞↑，团队拟直接改 Profile 量产，无 DOE。",
    q: "违反 DOE/因果原则的有？（多选）",
    options: [
      { t: "观察性相关直接量产", correct: true },
      { t: "无随机化运行序", correct: true },
      { t: "2³ 设计 + 随机序 + 确认运行", correct: false },
      { t: "交互显著时联合优化", correct: false },
    ],
  },
  7: {
    type: "multi",
    bloom: "evaluate",
    products: ["DCU-B"],
    scenario: "【情景】Analyze 门评审：仅 PPT 口头汇报，无 DCU-B 回归证据。",
    q: "应打回的理由包括？（多选）",
    options: [
      { t: "阶段门口头通过无签字", correct: true },
      { t: "未证明对车身域控无回归", correct: true },
      { t: "Measure 门附分段 MSA", correct: false },
      { t: "故事板含效益与风险", correct: false },
    ],
  },
  8: {
    type: "multi",
    bloom: "apply",
    products: ["DCU-A", "DCU-B"],
    scenario: "【情景】PFMEA 仅降低 O 值，未加强离线烧录 Checksum 探测度。",
    q: "不充分的改进有？（多选）",
    options: [
      { t: "只降 O 不加强探测", correct: true },
      { t: "离线烧录错版仍无 Checksum 门禁", correct: true },
      { t: "手插浮高增加通断检", correct: false },
      { t: "ADAS U12 空洞关联 Profile#", correct: false },
    ],
  },
  9: {
    type: "multi",
    bloom: "evaluate",
    products: ["DCU-A"],
    scenario: "【情景】Minitab 优化器给出试验区外最优点，团队计划下周直接扩产。",
    q: "禁止项有？（多选）",
    options: [
      { t: "未做确认运行即量产", correct: true },
      { t: "外推未试验区域", correct: true },
      { t: "3 批 Safe Launch 判定", correct: false },
      { t: "预测区间验证", correct: false },
    ],
  },
  10: {
    type: "multi",
    bloom: "apply",
    products: ["DCU-C"],
    scenario: "【情景】座舱 DCU-C 控制计划未写 X-Ray SL→MP 切换条件，仅用控制图代替 MSA。",
    q: "控制阶段缺陷有？（多选）",
    options: [
      { t: "用控制图代替 MSA", correct: true },
      { t: "未定义 X-Ray 切换反应计划", correct: true },
      { t: "FCT 探针 MSA 合格记录", correct: false },
      { t: "I-MR 阶段分隔改进前后", correct: false },
    ],
  },
  11: {
    type: "multi",
    bloom: "analyze",
    products: ["DCU-C", "HU"],
    scenario: "【情景】QFD 将 OEM 整车路试时延写入 EMS PFMEA 探测度，HU 与 DCU-C 共用同一 HOW。",
    q: "质量屋错误有？（多选）",
    options: [
      { t: "EMS 承担 OEM 路试责任", correct: true },
      { t: "HU 与 DCU-C HOW 混用", correct: true },
      { t: "WHAT→HOW 映射启动时延→镜像版本", correct: false },
      { t: "屋顶标明 Profile 与钢网相关", correct: false },
    ],
  },
  12: {
    type: "multi",
    bloom: "apply",
    products: ["IC"],
    scenario: "【情景】部署仅采购 Minitab 许可，无项目漏斗；仪表 IC 线未纳入第一波培训。",
    q: "部署失败模式包括？（多选）",
    options: [
      { t: "工具先行无项目", correct: true },
      { t: "仪表 IC 线被遗漏", correct: true },
      { t: "12 月甘特绑定 Champion", correct: false },
      { t: "复制模板四件套", correct: false },
    ],
  },
  13: {
    type: "multi",
    bloom: "evaluate",
    products: ["DCU-A"],
    scenario: "【情景】MBB 代替 BB 完成 Minitab 并签署控制计划。",
    q: "违反辅导原则的有？（多选）",
    options: [
      { t: "MBB 代做分析", correct: true },
      { t: "MBB 代签控制计划", correct: true },
      { t: "GROW 四问记录", correct: false },
      { t: "Rubric 可执行反馈", correct: false },
    ],
  },
  14: {
    type: "multi",
    bloom: "evaluate",
    products: ["DCU-A", "DCU-B", "DCU-C"],
    scenario: "【情景】学员声称「14 天 L1 满分 = 公司 MBB」，RR=25% 仍对外报 Cpk。",
    q: "答辩应纠正的说法有？（多选）",
    options: [
      { t: "L1 满分等于企业 MBB", correct: true },
      { t: "RR 25% 仍只报 Cpk", correct: true },
      { t: "Capstone 含四段工艺证据链", correct: false },
      { t: "L3 抽审由企业自定", correct: false },
    ],
  },
};

function normalizeV2(raw, dayN) {
  const labels = ["a", "b", "c", "d"];
  const options = raw.options.map((o, i) => ({
    v: labels[i],
    t: o.t,
    correct: !!o.correct,
  }));
  return {
    type: raw.type || "multi",
    bloom: raw.bloom,
    products: raw.products || [],
    scenario: raw.scenario || "",
    q: raw.q,
    options,
    correctValues: options.filter((o) => o.correct).map((o) => o.v),
  };
}

function getMcqV2ForDay(dayN) {
  const raw = MCQ_V2_BY_DAY[dayN];
  return raw ? normalizeV2(raw, dayN) : null;
}

module.exports = { MCQ_V2_BY_DAY, getMcqV2ForDay, normalizeV2 };
