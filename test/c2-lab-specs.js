/**
 * C2 专业软件实操 Lab 规范（菜单路径级）
 * 生成：build-mbb-days.js → sec-c2
 */
const C2_LAB_BY_DAY = {
  1: {
    primaryTool: "Excel / Miro",
    version: "Excel 365 / Miro",
    tutorialAnchor: "excel-deploy",
    dataFiles: ["templates/process-routing-electronics.csv"],
    columns: "工艺段、产品、关键控制、工站号",
    menuSteps: [
      "打开 reference/site-config.html → 完成问卷 → 导出 JSON 摘要",
      "Excel：打开 templates/process-routing-electronics.csv，筛选 ADAS/车身行",
      "Miro：五泳道 SIPOC（供料→离线→SMT→FCT→OEM），标注 FCT-04/05",
    ],
    sessionRead: "核对三条现场规则与 routing 表、问卷摘要一致。",
    audit: ["五产品 FCT 程序不得混批", "离线必须在 SMT 前"],
    practice: "在 routing 表用高亮标出 SMT前离线 / X-Ray SL·MP / 车身独立 FCT。",
    deliverables: ["site-config 摘要截图", "routing 表标注截图", "SIPOC 导出 PNG"],
  },
  2: {
    primaryTool: "Excel / Minitab",
    version: "Minitab 22",
    tutorialAnchor: "excel-deploy",
    dataFiles: ["templates/project-charter.csv"],
    columns: "Charter：问题陈述、范围、CTQ、Champion",
    menuSteps: [
      "Excel：填写 project-charter.csv — 问题陈述仅症状、无对策",
      "SmartArt 或缩进表：VOC → CTQ 三级（含操作定义）",
      "Minitab（可选）：Assistant 项目章程向导 — 仅作结构参考",
    ],
    sessionRead: "问题陈述含：指标名、基线%、时间窗、工站（如 FCT-05）。",
    audit: ["范围止于 EMS FCT，不含整车路试", "禁止把 Improve 对策写进问题陈述"],
    practice: "写 ADAS Eth 一次通过率问题陈述 2 句（可测量）。",
    deliverables: ["Charter 一页 PDF/截图", "CTQ 树截图"],
  },
  3: {
    primaryTool: "Minitab / JMP",
    version: "Minitab 22",
    tutorialAnchor: "minitab-capability",
    dataFiles: ["data/capability-diameter.csv", "data/automotive-fct-yield.csv"],
    columns: "C1=计量值；FCT 批次=属性合格/不合格",
    menuSteps: [
      "统计 > 基本统计 > 描述统计 + 图形 > 直方图（capability-diameter.csv）",
      "图形 > 概率图 — 判断正态性（AD p 值）",
      "对 fct-yield：按 DCU-A/B 分表，计划 p 图（勿做 Cpk）",
    ],
    sessionRead: "Session：AD 正态性 p 值；均值/标准差与规格无关前先 MSA。",
    audit: ["属性数据禁止 I-MR 求 Cpk", "数据计划含 Program_ID、Profile#"],
    practice: "为「离线错版率」写操作定义 3 行 + 选图（p 或 I-MR）。",
    deliverables: ["直方图+概率图截图", "数据计划表一页"],
  },
  4: {
    primaryTool: "Minitab",
    version: "Minitab 22",
    tutorialAnchor: "minitab-gage",
    dataFiles: ["data/automotive-spi-msa.csv", "data/capability-diameter.csv"],
    columns: "spi-msa：零件、操作员、重复；C1=体积%",
    menuSteps: [
      "统计 > 质量工具 > 量具研究 > 研究交叉型量具 — 导入 spi-msa.csv",
      "查看：%研究变异(RR)、ndc、可区分性",
      "统计 > 质量工具 > 能力分析 > 正态 — capability-diameter.csv，LSL/USL",
      "对比：%RR>30% 时不得对外仅报 Cpk 达标",
    ],
    sessionRead: "Gage 报告：%RR 行、ndc 行；能力报告：Cp/Cpk、AD 正态性。",
    audit: ["%RR>30% 禁只报 Cpk", "FCT 通过率用 p 图不用 Cpk", "BGA 空洞与 FCT 分 CTQ"],
    practice: "手抄 spi-msa 的 %RR 与 ndc，写 Accept/Marginal/Reject 判定。",
    deliverables: ["GRR 报告截图（%RR+ndc）", "能力图截图", "MSA 判定书草稿"],
  },
  5: {
    primaryTool: "Minitab / JMP",
    version: "Minitab 22",
    tutorialAnchor: "minitab-ttest",
    dataFiles: ["data/hypothesis-yield.csv", "data/automotive-fct-yield.csv"],
    columns: "分组列=版本/阶段；响应=通过率或计量",
    menuSteps: [
      "统计 > 基本统计 > 2 样本 t（或 2 方差）— 检验前检查方差",
      "统计 > 表格 > 卡方 — 缺陷与工艺段列联（缺陷矩阵后）",
      "图形 > 帕累托 — Fail_code / 空洞类缺陷",
    ],
    sessionRead: "报告 p 值 + 差值 CI + 效应量/百分点；注明 SL/MP 分层。",
    audit: ["禁止合并 DCU-A/B 数据", "p 显著不等于可实施"],
    practice: "对 Program_ID 分层做 2 样本 t 或卡方（写明 H0/H1）。",
    deliverables: ["检验输出截图", "缺陷-过程矩阵表"],
  },
  6: {
    primaryTool: "Minitab / JMP",
    version: "Minitab 22",
    tutorialAnchor: "minitab-doe",
    dataFiles: ["data/doe-2k3-run.csv"],
    columns: "StdOrder、RunOrder、A/B/C 因子、Y=响应",
    menuSteps: [
      "统计 > DOE > 因子 > 创建因子设计 — 2 水平 3 因子",
      "统计 > DOE > 因子 > 分析因子设计 — 含交互项",
      "图形 > 主效应 / 交互作用图",
    ],
    sessionRead: "Pareto 效应；R²；是否需变换；随机化 RunOrder。",
    audit: ["必须随机化", "观察性相关不能当因果"],
    practice: "写 2³ 设计表 8 行 + 随机序。",
    deliverables: ["DOE 分析表", "主效应图截图"],
  },
  7: {
    primaryTool: "Minitab + PowerPoint",
    version: "Minitab 22",
    tutorialAnchor: "storyboard",
    dataFiles: ["templates/project-charter.csv"],
    columns: "阶段门证据分页：MSA/基线/分析/对策",
    menuSteps: [
      "整理 Measure/Analyze 输出为故事板 4 页（问题→证据→效益→风险）",
      "一页纸：阶段门通过/打回勾选 + 签字栏",
      "DCU-B FCT-04 无回归批对比图",
    ],
    sessionRead: "评委能在 5 分钟内找到各工艺段证据页码。",
    audit: ["口头通过无效", "须证明车身域控无回归"],
    practice: "列出 Analyze 门打回 3 条具体理由（混杂/无分层）。",
    deliverables: ["故事板 PDF", "阶段门一页纸"],
  },
  8: {
    primaryTool: "Excel / APIS IQ-FMEA",
    version: "Excel 365",
    tutorialAnchor: "fmea",
    dataFiles: ["templates/pfmea-electronics.csv", "templates/pfmea-automotive.csv"],
    columns: "工艺段、失效模式、S/O/D、RPN",
    menuSteps: [
      "pfmea-electronics：ADAS 离线错版 + SMT U12 空洞各 1 行",
      "车身：手插继电器浮高独立行",
      "Excel Pugh 矩阵：烧录门禁方案加权",
    ],
    sessionRead: "RPN 前 5 与对策责任人、完成日。",
    audit: ["离线错版 S≥9", "勿只降 O 忽略探测度"],
    practice: "填 1 行 BGA 空洞 PFMEA（含探测：AOI/X-Ray）。",
    deliverables: ["PFMEA 摘录截图", "Pugh 表"],
  },
  9: {
    primaryTool: "Minitab / JMP",
    version: "Minitab 22",
    tutorialAnchor: "minitab-doe",
    dataFiles: ["data/doe-2k3-run.csv"],
    columns: "RSM：因子水平 ≥3；响应 Y",
    menuSteps: [
      "统计 > DOE > 响应曲面 > 创建曲面设计（CCD）",
      "统计 > DOE > 响应曲面 > 分析曲面设计",
      "统计 > DOE > 响应优化器 — 边界内优化",
      "计划 3 批 Safe Launch 确认运行",
    ],
    sessionRead: "优化器解须在试验域内；外推须追加确认运行。",
    audit: ["禁止未验证直接量产", "Safe Launch 含离线 0 错版"],
    practice: "写 3 批 ADAS Safe Launch 判定标准各 1 行。",
    deliverables: ["曲面图/优化器截图", "Safe Launch 计划表"],
  },
  10: {
    primaryTool: "Minitab",
    version: "Minitab 22",
    tutorialAnchor: "minitab-imr",
    dataFiles: ["data/control-imr.csv", "templates/control-plan-electronics.csv"],
    columns: "子组=1 → I-MR；FCT 率 → p 图",
    menuSteps: [
      "统计 > 控制图 > 变量 > I-MR — control-imr.csv",
      "统计 > 控制图 > 属性 > p — FCT 一次通过率",
      "control-plan-electronics：离线 Checksum、SPI、X-Ray、FCT 各行",
    ],
    sessionRead: "特殊原因规则；p 图 LCL 为负时的处理说明。",
    audit: ["控制图不能代替 MSA", "反应计划含追溯字段"],
    practice: "标 ADAS X-Ray SL→MP 切换条件 1 行。",
    deliverables: ["控制图截图", "控制计划摘录"],
  },
  11: {
    primaryTool: "Excel QFD / JMP",
    version: "Excel 365",
    tutorialAnchor: "qfd",
    dataFiles: ["templates/project-charter.csv"],
    columns: "WHAT=客户需求；HOW=工艺/设计参数",
    menuSteps: [
      "质量屋：OEM 时延/可靠 → SOC/镜像/Profile/FCT 用例",
      "界定 EMS vs OEM 验证边界（ASIL）",
      "DFSS Verify：Pilot SPI/BGA/FCT MSA 计划",
    ],
    sessionRead: "屋顶关系强度；冲突项与优先级。",
    audit: ["镜像版本是 SMT 前 CTQ", "EMS 不替代整车 ASIL 认证"],
    practice: "写 1 条 WHAT→HOW（启动时延→镜像/Profile）。",
    deliverables: ["QFD 截图", "ASIL 边界声明段落"],
  },
  12: {
    primaryTool: "MS Project / Excel",
    version: "Excel 365",
    tutorialAnchor: "excel-deploy",
    dataFiles: ["templates/process-routing-electronics.csv"],
    columns: "部署：模板名、适用产品、Owner",
    menuSteps: [
      "列 4 个可复制模板（离线 p 图/SPI+空洞/手插/FCT）",
      "甘特：先 ADAS 线后车身线",
      "ADKAR：烧录员 Awareness 措施 1 条",
    ],
    sessionRead: "Champion 与阶段门在路线图可见。",
    audit: ["复制须含 MES 版本锁", "工具先行需链接 SCAR 效益"],
    practice: "模板清单表 4 行。",
    deliverables: ["部署甘特截图", "模板清单"],
  },
  13: {
    primaryTool: "Excel Rubric",
    version: "Excel 365",
    tutorialAnchor: "excel-deploy",
    dataFiles: ["templates/bb-project-rubric.csv"],
    columns: "四维 1–5 分 + 可执行反馈",
    menuSteps: [
      "打开 bb-project-rubric.csv — 对范例作业打四维分",
      "GROW：Goal/Reality/Options/Will 各 1 问（ADAS BB）",
      "记录：禁止替 BB 做 Minitab",
    ],
    sessionRead: "反馈句可执行（谁、何时、交付物）。",
    audit: ["合并 FCT 数据须打回", "Rubric 5 分须含工艺段证据"],
    practice: "写 3 条可执行反馈（范例 BB 作业）。",
    deliverables: ["Rubric 打分表", "GROW 记录"],
  },
  14: {
    primaryTool: "综合",
    version: "—",
    tutorialAnchor: "storyboard",
    dataFiles: ["reference/homework-scores.html"],
    columns: "答辩：四段工艺证据 + 效益 + 复制",
    menuSteps: [
      "整理 14 模块 L1 成绩 + 最强 1 个 ADAS SCAR 故事线",
      "3min 大纲：离线/SMT/X-Ray/FCT 各 1 句",
      "准备 OEM 尖锐问 3 个 + 车身 vs ADAS 对比表",
    ],
    sessionRead: "15min 故事：Why→How→So What→复制。",
    audit: ["14 天≠MBB 资质", "%RR>25% 仍报 Cpk 须质疑"],
    practice: "口头大纲录音 3min 自评。",
    deliverables: ["答辩大纲", "毕业清单勾选"],
  },
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getC2LabForDay(dayN) {
  return C2_LAB_BY_DAY[dayN] || null;
}

function renderC2Lab(dayN, dayMeta, escFn) {
  const esc = escFn || esc;
  const lab = getC2LabForDay(dayN);
  if (!lab) {
    const steps = (dayMeta && dayMeta.toolSteps) || [];
    return `<ol class="obj-list" style="list-style:decimal;padding-left:1.5rem">${steps
      .map((s) => `<li>${esc(s)}</li>`)
      .join("")}</ol>`;
  }

  const dataLinks = (lab.dataFiles || [])
    .map((f) => `<a href="../${f}" download>${esc(f.split("/").pop())}</a>`)
    .join(" · ");

  const stepsHtml = lab.menuSteps
    .map((s, i) => `<li><strong>${i + 1}.</strong> <code>${esc(s)}</code></li>`)
    .join("");

  const deliverHtml = (lab.deliverables || [])
    .map((d) => `<li>${esc(d)}</li>`)
    .join("");

  return `<div class="c2-lab-card" id="c2-lab-d${dayN}">
    <p class="c2-lab-meta"><strong>主工具</strong> ${esc(lab.primaryTool)} · <strong>版本</strong> ${esc(lab.version)}
      · <a href="../tools/tutorials.html#${esc(lab.tutorialAnchor)}">完整教程 →</a></p>
    <p class="c2-lab-meta"><strong>数据</strong> ${dataLinks || "—"} · <strong>列定义</strong> ${esc(lab.columns)}</p>
    <h3 class="c2-lab-h3">跟做步骤（菜单路径）</h3>
    <ol class="c2-lab-steps">${stepsHtml}</ol>
    <p class="c2-lab-read"><strong>输出解读</strong> ${esc(lab.sessionRead)}</p>
    <h3 class="c2-lab-h3">课堂练习</h3>
    <p>${esc(lab.practice)}</p>
    <h3 class="c2-lab-h3" style="color:var(--bb-gold)">F 节建议截图交付</h3>
    <ul class="obj-list c2-lab-deliver">${deliverHtml}</ul>
    <h3 class="c2-lab-h3" style="color:var(--bb-gold)">MBB 审计点</h3>
    <ul class="obj-list">${(lab.audit || []).map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
  </div>`;
}

module.exports = { C2_LAB_BY_DAY, getC2LabForDay, renderC2Lab };
