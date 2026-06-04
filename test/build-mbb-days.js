/**
 * 按 PROMPT-MBB-TUTOR.md v2.1 生成完整八模块 HTML 课件
 * 运行: node test/build-mbb-days.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../docs/mbb-training");
const DAYS_DIR = path.join(ROOT, "days");
const { applyAutomotive, SITE_CONFIG } = require("./automotive-content");
const {
  HOMEWORK_RUBRICS,
  renderGradableQuiz,
  renderHomeworkForm,
  renderExerciseSection,
} = require("./homework-rubrics");
const { DAY_ENRICHMENT, renderDeepDiveHtml } = require("./automotive-day-enrichment");
const { renderTopbarBrand, renderPrintHeader, renderThemeSwitcher } = require("./brand-html");
const { renderC2Lab, getC2LabForDay } = require("./c2-lab-specs");
const { renderSelfAssessmentSection } = require("./render-self-assessment");
const {
  renderFactoryScenarioHtml,
  renderFactoryHubCards,
  renderFactoryTopicCards,
} = require("./render-factory-scenario");

const { packageVersion: PACKAGE_VERSION } = require("./mbb-package-manifest");

const THEME_HEAD = `  <script src="../js/theme-init.js"></script>
  <link rel="stylesheet" href="../css/theme.css" />`;

const DAYS = [
  {
    n: 1,
    title: "六西格玛战略与 MBB 角色",
    tags: ["战略", "2–3h"],
    gate: null,
    deliverable: "五维成熟度雷达 + MBB 行动建议",
    primaryTool: "Excel / Miro",
    dataFile: null,
    tutorialAnchor: "excel-deploy",
    objectives: [
      "解释 σ、DPMO、Cpk 的商业含义",
      "区分 BB、MBB、Champion 职责",
      "完成组织五维成熟度初评",
    ],
    concept:
      "六西格玛是以数据减少变异、以项目创造财务结果的管理系统。DMAIC 改良现有流程；DFSS 设计新流程。",
    analogy: "黑带找漏水段；MBB 设计全市管网检修标准并向市长证明预算。",
    toolsTheory:
      "σ 水平是目标语言；1.5σ 偏移是行业惯例，教学时须说明与纯统计含义差异。",
    toolSteps: [
      "Excel：五列（领导/方法/人员/指标/文化）1–5 分 → 插入雷达图",
      "Miro：五泳道 SIPOC 模板，导出 PNG 嵌入章程",
    ],
    audit: ["勿把六西格玛说成纯统计课", "成熟度自评需有证据而非感觉"],
    case: "电商客服 VOC「回复慢」— MBB 先锁定 CTQ 与是否值得立项，不急于 t 检验。",
    mbbQs: ["CTQ 操作定义？", "基线数据谁拥有？", "Champion 谁签字？"],
    exercises: [
      "用一句话区分 BB 与 MBB 时间分配差异",
      "列出 Define 阶段门必过的 3 项证据",
    ],
    homework:
      "绘制五维成熟度雷达（1–5）+ 200 字短板与一条 MBB 行动；可选下载 templates/project-charter.csv 预习。",
    quiz: [
      ["6σ 与 4σ DPMO 差异说明什么？", "变异对客户体验的毁灭性；用商业语言解释。"],
      ["Champion 缺位怎么办？", "记风险；试点快速赢再争取阶段门。"],
      ["DMAIC 与 PDCA？", "DMAIC 是结构化 PDCA。"],
      ["MBB 能否替 BB 做分析？", "否；教练与评审，非代劳。"],
      ["【纠错】Cpk=1.8 一定客户满意？", "否；须 MSA 合格、CTQ 对齐、长期稳定。"],
    ],
  },
  {
    n: 2,
    title: "Define — 项目章程与 VOC/CTQ",
    tags: ["DMAIC-D", "Define ✓", "3h"],
    gate: "Define",
    deliverable: "Project Charter v1",
    primaryTool: "Excel / Minitab",
    dataFile: "templates/project-charter.csv",
    tutorialAnchor: "excel-deploy",
    objectives: [
      "撰写可评审的项目章程",
      "完成 VOC→CTQ 树→规格",
      "用 SIPOC 界定范围",
    ],
    concept: "问题陈述像医生主诉：描述症状，不能开药方当问题。",
    analogy: "CTQ 树像翻译：客户「快」→「首次响应≤5分钟」。",
    toolsTheory: "亲和图归类原话；项目筛选矩阵=影响×可行性。",
    toolSteps: [
      "下载 templates/project-charter.csv 填写",
      "Excel SmartArt：VOC→CTQ 三级缩进",
      "Minitab：可选 Assistant>项目章程向导（若有）",
    ],
    audit: ["问题陈述无方案", "范围有起点终点", "效益分硬软"],
    case: "医院门诊等候 — 问题陈述须可测量分钟数。",
    mbbQs: ["是否全球项目？", "数据历史谁保管？", "复制潜力？"],
    exercises: ["写 150 字问题陈述", "列 3 条 CTQ 含操作定义"],
    homework: "提交完整一页 Charter；用 /review 作业 批改。",
    quiz: [
      ["「降低抱怨」能做问题陈述吗？", "否；改可测量指标。"],
      ["CTQ 与 KPI？", "CTQ 来自 VOC；KPI 可含财务。"],
      ["SIPOC 终点？", "对客户交付的输出。"],
      ["Define 门否决理由？", "范围过大、无 Champion。"],
      ["【纠错】章程可写「上 Minitab」？", "否；方案放 Improve。"],
    ],
  },
  {
    n: 3,
    title: "Measure — 概率与数据收集",
    tags: ["DMAIC-M", "统计"],
    gate: null,
    deliverable: "数据收集计划",
    primaryTool: "Minitab / JMP",
    dataFile: "data/capability-diameter.csv",
    tutorialAnchor: "minitab-capability",
    objectives: [
      "区分离散/连续数据与图表",
      "理解 CLT 对样本均值的意义",
      "编写数据收集计划",
    ],
    concept: "没有操作定义的数据=垃圾进垃圾出。",
    analogy: "抽样像尝汤：搅匀、随机舀一勺，别只舀表面油花。",
    toolsTheory: "正态适用多独立小误差叠加；偏态用变换或非参数。",
    toolSteps: [
      "Minitab：统计>基本统计>描述统计；图形>直方图+概率图",
      "JMP：分析>分布",
      "数据列：C1=内径；检查 AD 正态性 p 值",
    ],
    audit: ["样本量写 rationale", "独立性/时间顺序记录"],
    case: "注塑尺寸 — 先定「测量系统+抽样频率」再收 30 件。",
    mbbQs: ["是否分层？", "是否受控环境？", "缺失数据规则？"],
    exercises: ["为 CTQ 写操作定义", "选直方图还是 p 图"],
    homework: "数据收集计划一页（Who/What/When/How/n）。",
    quiz: [
      ["n=5 均值可正态？", "CLT；严重偏态需更大 n。"],
      ["有序 Likert 能均值得？", "谨慎；用中位数/非参数。"],
      ["CLT 作用？", "均值分布近似正态，推断基础。"],
      ["收集计划必含？", "操作定义、抽样、防呆。"],
      ["【纠错】越多越好样本？", "否；须成本与功效平衡。"],
    ],
  },
  {
    n: 4,
    title: "MSA 与过程能力 Cp/Cpk",
    tags: ["Measure ✓", "MSA"],
    gate: "Measure",
    deliverable: "MSA 报告 + 能力判定",
    primaryTool: "Minitab",
    dataFile: "data/gage-rr-stacked.csv",
    tutorialAnchor: "minitab-gage",
    objectives: [
      "解读 Gage R&R 与 ndc",
      "区分 Cp/Cpk",
      "MSA 不过关时暂停能力判定",
    ],
    concept: "生锈卷尺量身高 — MSA 是尺子是否靠谱。",
    analogy: "Cp 是车道宽度；Cpk 是车是否压线。",
    toolsTheory: "%RR<10% 可接受；>30% 停报 Cpk。",
    toolSteps: [
      "导入 data/gage-rr-stacked.csv（堆叠格式）",
      "统计>质量工具>量具研究>研究交叉型量具",
      "能力：统计>能力分析>正态；LSL 9.5 USL 10.5；用 capability-diameter.csv",
    ],
    audit: ["%RR>30% 禁只报 Cpk", "非正态勿硬套正态能力"],
    case: "检具 RR=28% — MBB 要求改进量具再验 Cpk。",
    mbbQs: ["重复性与再现性谁大？", "ndc 几？", "是否含交互？"],
    exercises: ["解读 RR=18% 结论", "Cp高Cpk低说明什么"],
    homework: "MSA 判定书 1 页 + 能力图截图说明。",
    quiz: [
      ["ndc<5？", "测量系统分辨力不足。"],
      ["Cp高Cpk低？", "居中问题。"],
      ["%RR 30% 能报达标？", "MBB：不宜，先改 MS。"],
      ["能力分析前提？", "稳定、独立、MSA 可接受。"],
      ["【纠错】Cpk 代替客户满意度？", "否；多 CTQ 综合。"],
    ],
  },
  {
    n: 5,
    title: "Analyze — 假设检验与根因",
    tags: ["DMAIC-A"],
    gate: null,
    deliverable: "检验决策树",
    primaryTool: "Minitab / JMP",
    dataFile: "data/hypothesis-yield.csv",
    tutorialAnchor: "minitab-ttest",
    objectives: [
      "建立检验决策树",
      "解释 p 值与效应量",
      "5Why 得到可验证根因",
    ],
    concept: "p 值不是 H0 为真的概率。",
    analogy: "ANOVA 显著后像发现「有差异」，Tukey 才告诉「谁和谁差」。",
    toolsTheory: "先 Levene/正态；再选 t/ANOVA/非参数。",
    toolSteps: [
      "导入 hypothesis-yield.csv；C1 前 C2 后",
      "统计>基本统计>2 样本 t；勾选等方差检验",
      "报告差值 CI 与业务百分点",
    ],
    audit: ["报效应量", "n 大时 0.049 未必重要"],
    case: "良率 97.8→99.2 — 差 1.4pct 是否值回改造成本？",
    mbbQs: ["独立吗？", "是否多重比较？", "根因可测量吗？"],
    exercises: ["选 t 还是 Mann-Whitney", "写 H0/H1"],
    homework: "手绘检验决策树（连续 Y，3 组因子）。",
    quiz: [
      ["ANOVA 后下一步？", "多重比较。"],
      ["I 类 II 类错误？", "α 误杀；β 漏检。"],
      ["「员工不认真」根因？", "MBB 否决；要操作定义。"],
      ["显著但差 0.1%？", "可能无业务意义。"],
      ["【纠错】p=0.04 就实施？", "还须效应量与成本。"],
    ],
  },
  {
    n: 6,
    title: "回归与 DOE 入门",
    tags: ["DOE", "2³"],
    gate: null,
    deliverable: "2³ 设计表 + 随机化",
    primaryTool: "Minitab / JMP",
    dataFile: "data/doe-2k3-run.csv",
    tutorialAnchor: "minitab-doe",
    objectives: [
      "解读回归 R² 与残差",
      "创建分析 2³ 全因子",
      "区分相关与因果",
    ],
    concept: "回归闻香味猜菜谱；DOE 盲测换调料。",
    analogy: "交互=空调温度效果取决于湿度档位。",
    toolsTheory: "分数因子仅筛选；确认须随机化运行序。",
    toolSteps: [
      "DOE>创建因子设计 2^3；填响应",
      "导入 doe-2k3-run.csv 按运行序",
      "分析因子设计；主效应+交互图",
    ],
    audit: ["残差检验", "外推禁止"],
    case: "注塑翘曲 — AB 交互显著时的设定策略。",
    mbbQs: ["中心点要吗？", "混杂？", "重复误差？"],
    exercises: ["列 2³ 表", "交互图怎么读"],
    homework: "2³ 设计+随机化说明 1 页。",
    quiz: [
      ["R²高就好？", "看残差与逻辑。"],
      ["交互显著？", "因子不可单独优化。"],
      ["观察性回归？", "不能当因果。"],
      ["运行序？", "必须随机化。"],
      ["【纠错】最优在试验外？", "须确认运行。"],
    ],
  },
  {
    n: 7,
    title: "DMAIC 中期整合与阶段门",
    tags: ["里程碑", "Analyze ✓"],
    gate: "Analyze",
    deliverable: "阶段门评审稿",
    primaryTool: "Minitab + PPT",
    dataFile: null,
    tutorialAnchor: "storyboard",
    objectives: [
      "主持 Define/Measure/Analyze 门",
      "整合 PCB 虚焊案例",
      "互评作业",
    ],
    concept: "阶段门=投资委员会，不是走过场。",
    analogy: "像电影三幕：每幕结束要有「是否继续投拍」证据。",
    toolsTheory: "故事板每阶段 1 页：问题→数据→结论→效益。",
    toolSteps: [
      "Minitab 图表右键复制到 PPT",
      "一页纸：门检查表+红黄绿",
    ],
    audit: ["打回须可执行", "效益勿重复计算"],
    case: "虚焊 4200ppm→ANOVA 炉温×焊膏交互。",
    mbbQs: ["数据分层？", "资金批？", "谁养控制图？"],
    exercises: ["写 3 条打回理由", "做 D+M+A 摘要"],
    homework: "提交 DMAIC 三阶段摘要 + 自评<3 重修。",
    quiz: [
      ["Measure 门？", "MSA+基线。"],
      ["Analyze 门？", "验证根因。"],
      ["伪相关？", "打回。"],
      ["故事板？", "高管沟通载体。"],
      ["【纠错】门可跳过？", "否；文档化风险。"],
    ],
  },
  {
    n: 8,
    title: "Improve — 方案与 FMEA",
    tags: ["DMAIC-I"],
    gate: null,
    deliverable: "2 方案 + PFMEA",
    primaryTool: "Excel FMEA",
    dataFile: null,
    tutorialAnchor: "fmea",
    objectives: [
      "方案筛选矩阵",
      "PFMEA 前 5 行",
      "Pilot 验证思路",
    ],
    concept: "改进像换药：先过敏测试再推广。",
    analogy: "Pugh=选秀打分；FMEA=彩排排雷。",
    toolsTheory: "RPN 参考；优先 S 高且 O 高。",
    toolSteps: [
      "Excel Pugh：准则×权重×方案",
      "PFMEA 表：Sev/Occ/Det",
    ],
    audit: ["改进不牺牲其他 CTQ", "Pilot 同框架验证"],
    case: "虚焊方案：炉温曲线 vs 焊膏升级。",
    mbbQs: ["贸易-off？", "实施窗口？", "培训？"],
    exercises: ["Pugh 两方案比", "写反应计划一行"],
    homework: "2 方案 + PFMEA 5 行。",
    quiz: [
      ["Pilot 目的？", "验证非全面实施。"],
      ["FMEA RPN？", "排序参考非唯一。"],
      ["改进显著？", "前后同检验框架。"],
      ["Pugh？", "加权评分。"],
      ["【纠错】只改发生度？", "可能需防错探测。"],
    ],
  },
  {
    n: 9,
    title: "DOE 进阶 — RSM 与确认",
    tags: ["Improve ✓", "RSM"],
    gate: "Improve",
    deliverable: "确认运行计划",
    primaryTool: "Minitab",
    dataFile: "data/doe-2k3-run.csv",
    tutorialAnchor: "minitab-doe",
    objectives: [
      "CCD/RSM 概念",
      "响应优化器",
      "确认运行 3 点",
    ],
    concept: "RSM 找山坡最平缓平台，不单峰冒险。",
    analogy: "炒菜火候曲面：甜区比单点最高温更安全。",
    toolsTheory: "曲率显著才 RSM；外推禁止。",
    toolSteps: [
      "DOE>响应曲面>创建设计",
      "DOE>响应优化器",
      "确认运行不在试验区外",
    ],
    audit: ["预测区间验证", "成本周期"],
    case: "注塑最优温度压力 — 3 点确认。",
    mbbQs: ["稳健性？", "噪声因子？", "生产节拍的因子水平？"],
    exercises: ["何时用 RSM", "写确认运行表"],
    homework: "确认运行计划含预测检验。",
    quiz: [
      ["CCD 用途？", "拟合二次曲面。"],
      ["外推？", "禁止。"],
      ["筛选 DOE？", "2^(k-p)。"],
      ["优化器输出？", "需确认运行。"],
      ["【纠错】计算机最优=投产？", "须验证。"],
    ],
  },
  {
    n: 10,
    title: "Control — SPC 与控制计划",
    tags: ["Control ✓", "SPC"],
    gate: "Control",
    deliverable: "控制计划 + SPC",
    primaryTool: "Minitab",
    dataFile: "data/control-imr.csv",
    tutorialAnchor: "minitab-imr",
    objectives: [
      "选对控制图",
      "西方电气规则",
      "控制计划表",
    ],
    concept: "控制图是心电图；出界先查测量与规程。",
    analogy: "I-MR 像每日体检；Xbar-R 像每组抽检。",
    toolsTheory: "子组 n=1 用 I-MR；缺陷率用 p 图。",
    toolSteps: [
      "导入 control-imr.csv",
      "统计>控制图>I-MR",
      "填 templates/control-plan.csv",
    ],
    audit: ["反应计划可执行", "12 月效益跟踪"],
    case: "改进后阶段分隔控制图。",
    mbbQs: ["谁反应？", "培训？", "系统自动采集？"],
    exercises: ["选 I-MR 还是 Xbar-R", "写反应计划"],
    homework: "控制计划 5 行 + 控制图类型论证。",
    quiz: [
      ["特殊原因？", "先查 MS 再庆祝发现。"],
      ["p 图 LCL 负？", "改图或精确二项。"],
      ["控制计划链？", "FMEA-SOP-培训。"],
      ["收尾？", "复制+故事板。"],
      ["【纠错】控制图万能？", "须 MS 稳定。"],
    ],
  },
  {
    n: 11,
    title: "DFSS / DMADV 与 QFD",
    tags: ["DFSS"],
    gate: null,
    deliverable: "简化 QFD 屋",
    primaryTool: "Excel QFD",
    dataFile: null,
    tutorialAnchor: "qfd",
    objectives: [
      "DMAIC vs DFSS 选型",
      "DMADV 五阶段",
      "质量屋构建",
    ],
    concept: "修房用 DMAIC；盖新房用 DFSS。",
    analogy: "QFD 屋顶=工程特性打架关系。",
    toolsTheory: "1:10:100 设计阶段成本法则。",
    toolSteps: [
      "Excel：WHATs×HOWs 相关矩阵",
      "屋顶：○正相关 △负相关",
    ],
    audit: ["关系打分团队化", "权重验算"],
    case: "新品耳机续航 — CTQ 从 VOC 分解。",
    mbbQs: ["概念 Pugh？", "验证计划？", "供应链 CTQ？"],
    exercises: ["列 3 VOC", "画屋顶一对相关"],
    homework: "简化 QFD 屋 ≥3 VOC。",
    quiz: [
      ["何时 DFSS？", "新流程/产品。"],
      ["IDOV？", "Identify-Design-Optimize-Verify。"],
      ["QFD 屋顶？", "HOWs 相关性。"],
      ["DMAIC 并行？", "可共存不同项目。"],
      ["【纠错】DFSS 无数据？", "仍须 Verify 测量。"],
    ],
  },
  {
    n: 12,
    title: "变革管理与六西格玛部署",
    tags: ["部署", "12月"],
    gate: null,
    deliverable: "部署甘特草图",
    primaryTool: "MS Project / Excel",
    dataFile: null,
    tutorialAnchor: "excel-deploy",
    objectives: [
      "Kotter 8 步与 ADKAR",
      "培训路线图",
      "项目漏斗",
    ],
    concept: "证书墙≠文化；项目+效益+复制才行。",
    analogy: "连锁餐饮：MBB 定菜谱，BB 管单店盈利。",
    toolsTheory: "平衡计分卡链：财务←客户←流程←学习。",
    toolSteps: [
      "Excel 甘特：波次培训+项目门",
      "Miro 部署仪表盘",
    ],
    audit: ["培训绑定项目", "KPI 奖惩一致"],
    case: "工厂 3 年部署 — 第 1 年 20 GB + 40 项目。",
    mbbQs: ["资源冲突？", "IT 系统？", "高管节奏？"],
    exercises: ["列 3 个失败模式", "写第 1 波培训目标"],
    homework: "12 个月甘特草图。",
    quiz: [
      ["培训无项目？", "证书墙失败模式。"],
      ["ADKAR A？", "Awareness 认知。"],
      ["复制率？", "MBB 考核指标。"],
      ["Champion 角色？", "资源与阶段门。"],
      ["【纠错】工具先行？", "须战略链接。"],
    ],
  },
  {
    n: 13,
    title: "MBB 辅导、评审与组合管理",
    tags: ["MBB 核心"],
    gate: null,
    deliverable: "Rubric 评分 + 5 条反馈",
    primaryTool: "Excel Rubric",
    dataFile: "templates/bb-project-rubric.csv",
    tutorialAnchor: "rubric",
    objectives: [
      "使用 BB 项目 Rubric",
      "GROW 辅导对话",
      "组合看板",
    ],
    concept: "MBB 提问代替给答案。",
    analogy: "裁判看规则也看动作规范，不替运动员打球。",
    toolsTheory: "红黄绿组合；效益已实现 vs 承诺。",
    toolSteps: [
      "下载 bb-project-rubric.csv 评分",
      "记录辅导 GROW 四问",
    ],
    audit: ["不替 BB 分析", "反馈可执行"],
    case: "BB 说显著但 Cpk 仍 1.0 — 你如何辅导？",
    mbbQs: ["下周 Will？", "资源阻塞？", "阶段门日期？"],
    exercises: ["GROW 问 4 句", "Rubric 打 1 分理由"],
    homework: "评 Day7 案例 + 5 条 MBB 反馈。",
    quiz: [
      ["GROW G？", "Goal 目标。"],
      ["组合管理？", "优先级与资源。"],
      ["辅导禁忌？", "替做分析。"],
      ["Rubric 5 分？", "可复制+文档全。"],
      ["【纠错】MBB 全做技术？", "须部署与战略。"],
    ],
  },
  {
    n: 14,
    title: "认证模拟与 Capstone",
    tags: ["毕业", "4h+"],
    gate: "毕业",
    deliverable: "答辩 + 微课大纲",
    primaryTool: "综合",
    dataFile: null,
    tutorialAnchor: "capstone",
    objectives: [
      "完成认证模拟",
      "口头答辩 CFO",
      "15min 微课",
    ],
    concept: "MBB 是终身复盘工具误用案例。",
    analogy: "答辩像上市路演：数据+故事+风险。",
    toolsTheory: "书面+案例+答辩+教学四关。",
    toolSteps: [
      "汇编 14 天产出物 ZIP",
      "PPT 故事板 10 页内",
    ],
    audit: ["效益审计", "不泄公司机密"],
    case: "综合虚焊项目全流程答辩。",
    mbbQs: ["ROI 审计？", "复制计划？", "若样本加倍 p 变小？"] ,
    exercises: ["3 分钟 ROI 陈述", "教 MSA 大纲"],
    homework: "完成毕业 Checklist 全部勾选。",
    quiz: [
      ["RR 25% 报 Cpk？", "不宜。"],
      ["AB 交互？", "设定含交互。"],
      ["样本加倍？", "p 可能变小未必更有价值。"],
      ["MBB vs BB 评审？", "组合+方法+辅导。"],
      ["【纠错】14 天=企业 MBB？", "还须多年项目组合。"],
    ],
  },
];

/** 黑带专业课件元数据 — ISO 13053 / ASQ CSSBB 能力域对齐 */
const PRO = {
  1: { dmaic: "overview", belt: "BB", competency: "BB-STR-01", iso: "ISO 13053-1 §7 组织与项目环境", tools: [["σ / DPMO", "统一质量战略语言"], ["五维成熟度", "部署现状诊断"], ["SIPOC", "范围边界"]], formulas: ["DPMO = (缺陷数 ÷ (单位数×机会数)) × 10⁶"], pitfalls: ["将项目等同于统计软件操作", "无 Champion 批准章程"], refs: ["ASQ CSSBB — Organizational Deployment"] },
  2: { dmaic: "define", belt: "BB", competency: "BB-D-01", iso: "ISO 13053-1 — 定义阶段输出", tools: [["项目章程", "立项"], ["VOC / CTQ", "客户声音翻译"], ["SIPOC", "流程边界"], ["亲和图", "归类原话"]], formulas: [], pitfalls: ["问题陈述含解决方案", "CTQ 不可测量"], refs: ["IATF 16949 APQP 顾客输入（制造业）"] },
  3: { dmaic: "measure", belt: "BB", competency: "BB-M-01", iso: "ISO 13053-1 — 测量阶段", tools: [["操作定义", "MSA 前提"], ["描述统计", "基线"], ["概率图", "分布假定"]], formulas: ["X̄ ~ N(μ, σ²/n)（CLT，独立同分布前提）"], pitfalls: ["样本无随机/独立", "混淆精确度与准确度"], refs: ["Minitab 基本统计 — 图形化汇总"] },
  4: { dmaic: "measure", belt: "BB", competency: "BB-M-02", iso: "ISO 22514 / 测量系统分析", tools: [["Gage R&R 交叉", "MSA"], ["Cp / Cpk", "过程能力"], ["正态/非正态能力", "分布适配"]], formulas: ["Cp=(USL−LSL)/(6σwithin)", "Cpk=min[(USL−μ)/3σ,(μ−LSL)/3σ]"], pitfalls: ["%R&R>30% 仍报 Cpk 达标", "短期数据当长期绩效"], refs: ["AIAG MSA 手册（汽车行业参考）"] },
  5: { dmaic: "analyze", belt: "BB", competency: "BB-A-01", iso: "ISO 13053-1 — 分析阶段", tools: [["假设检验", "均值/比例比较"], ["ANOVA", "多组均值"], ["鱼骨 / 5Why", "根因框架"]], formulas: ["α = P(拒绝H₀ | H₀为真)"], pitfalls: ["只报 p 不报效应量与业务差", "多重比较未校正"], refs: ["检验决策树 — 见工具矩阵"] },
  6: { dmaic: "analyze", belt: "BB", competency: "BB-A-02", iso: "实验设计 — 因子筛选", tools: [["多元回归", "相关≠因果"], ["2^k 全因子", "主效应/交互"], ["残差诊断", "模型有效"]], formulas: ["Y = β₀ + Σβᵢxᵢ + Σβᵢⱼxᵢxⱼ + ε"], pitfalls: ["未随机化运行序", "外推未试验区域"], refs: ["Montgomery — DOE 经典参考"] },
  7: { dmaic: "analyze", belt: "BB", competency: "BB-INT-01", iso: "阶段门评审 — 项目管理", tools: [["故事板", "阶段汇报"], ["阶段门检查表", "Go/No-Go"]], formulas: [], pitfalls: ["Analyze 门无验证数据", "效益重复核算"], refs: ["DMAIC 整合案例 — PCB 虚焊"] },
  8: { dmaic: "improve", belt: "BB", competency: "BB-I-01", iso: "ISO 13053-1 — 改进阶段", tools: [["Pugh 矩阵", "方案筛选"], ["PFMEA", "风险预防"], ["Pilot", "小范围验证"]], formulas: ["RPN = S × O × D（排序参考）"], pitfalls: ["改进牺牲其他 CTQ", "无 Pilot 数据全厂切换"], refs: ["FMEA AIAG/VDA 手册"] },
  9: { dmaic: "improve", belt: "BB", competency: "BB-I-02", iso: "响应曲面 / 稳健参数设计", tools: [["CCD / RSM", "优化"], ["响应优化器", "设定点"], ["确认运行", "验证预测"]], formulas: ["二次响应曲面模型"], pitfalls: ["计算机最优未做确认运行", "曲率不显著仍用 RSM"], refs: ["Minitab DOE — 响应优化"] },
  10: { dmaic: "control", belt: "BB", competency: "BB-C-01", iso: "ISO 7870 / SPC 控制图", tools: [["I-MR / X̄-R", "变量图"], ["p / u 图", "属性图"], ["控制计划", "标准化"]], formulas: ["UCL/LCL — 按图类型查公式"], pitfalls: ["未定义反应计划", "控制图未培训操作员"], refs: ["Western Electric 规则"] },
  11: { dmaic: "dfss", belt: "BB", competency: "BB-DFSS-01", iso: "ISO 13053-2 新过程设计", tools: [["DMADV", "设计流程"], ["QFD", "质量屋"], ["概念 Pugh", "方案选择"]], formulas: [], pitfalls: ["跳过 Verify 测量", "QFD 一人打分"], refs: ["DMADV / IDOV 企业标准"] },
  12: { dmaic: "leadership", belt: "MBB", competency: "MBB-DEP-01", iso: "组织变革与能力构建", tools: [["Kotter 8 步", "变革"], ["ADKAR", "个体采纳"], ["项目漏斗", "组合"]], formulas: [], pitfalls: ["培训无项目支撑", "无复制率指标"], refs: ["平衡计分卡 — 战略链接"] },
  13: { dmaic: "leadership", belt: "MBB", competency: "MBB-COACH-01", iso: "黑带辅导与评审", tools: [["GROW", "辅导"], ["项目 Rubric", "评分"], ["组合看板", "优先级"]], formulas: [], pitfalls: ["MBB 代做统计分析", "反馈不可执行"], refs: ["templates/bb-project-rubric.csv"] },
  14: { dmaic: "leadership", belt: "MBB", competency: "MBB-CAP-01", iso: "认证能力综合", tools: [["书面考", "工具选型"], ["答辩", "ROI"], ["微课", "传授 BB 工具"]], formulas: [], pitfalls: ["14 天等同企业 MBB 资历", "泄密的案例数据"], refs: ["ASQ CSSBB 考试大纲（结构参考，非原题）"] },
};

applyAutomotive(DAYS, PRO);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderDay(d) {
  const p = PRO[d.n] || PRO[1];
  const prev = d.n > 1 ? `day${String(d.n - 1).padStart(2, "0")}.html` : "#";
  const next = d.n < 14 ? `day${String(d.n + 1).padStart(2, "0")}.html` : "#";
  const prevVis = d.n === 1 ? ' style="visibility:hidden"' : "";
  const beltClass = p.belt === "MBB" ? "belt-track mbb" : "belt-track";
  const gateTag = d.gate ? `<span class="tag gold">阶段门 ${esc(d.gate)}</span>` : "";
  const dataLink = d.dataFile
    ? `<p style="margin-top:1rem"><a class="btn btn-primary" href="../${d.dataFile}" download>↓ 下载实验数据（CSV）</a></p>`
    : "";
  const c2LabHtml = renderC2Lab(d.n, d, esc);
  const c2DeliverHint =
    getC2LabForDay(d.n) && getC2LabForDay(d.n).deliverables
      ? `<p class="c2-deliver-hint"><strong>C2 截图清单：</strong>${getC2LabForDay(d.n).deliverables.join("、")}</p>`
      : "";
  const rubricJson = JSON.stringify(HOMEWORK_RUBRICS[d.n] || HOMEWORK_RUBRICS[1]).replace(
    /</g,
    "\\u003c"
  );
  const quizHtml = renderGradableQuiz(d.n);
  const homeworkFormHtml = renderHomeworkForm(d.n, d.homework);
  const deepDiveHtml = renderDeepDiveHtml(DAY_ENRICHMENT[d.n], esc);
  const factoryHtml = renderFactoryScenarioHtml(d.n, esc);
  const enrichFocus = d.enrichFocus ? `<span class="tag auto">本课主线：${esc(d.enrichFocus)}</span>` : "";
  const objHtml = d.objectives.map((o) => `<li>${esc(o)}</li>`).join("");
  const exHtml = renderExerciseSection(d.n, d.exercises);
  const mbbHtml = d.mbbQs.map((q) => `<li>${esc(q)}</li>`).join("");
  const toolsTable = p.tools
    .map(([t, u]) => `<tr><td>${esc(t)}</td><td>${esc(u)}</td></tr>`)
    .join("");
  const formulasHtml = (p.formulas || [])
    .map((f) => `<div class="formula-pro"><div class="label">关键公式</div><code>${esc(f)}</code></div>`)
    .join("");
  const pitfallsHtml = (p.pitfalls || [])
    .map((x) => `<div class="pitfall"><strong>常见缺陷</strong> ${esc(x)}</div>`)
    .join("");
  const refsHtml = (p.refs || []).map((r) => `<li>${esc(r)}</li>`).join("");
  const coachLabel = p.belt === "MBB" ? "MBB / Champion" : "黑带教练追问";
  const auto = p.automotive;
  const autoHtml = auto
    ? `<article class="card pro automotive" id="sec-auto">
      <h2><span class="section-num">◎</span>汽车电子 EMS（五产品·离线烧录/SMT/手插/装配）</h2>
      <p><span class="tag auto">汽车制造</span> <strong>IATF：</strong>${esc(auto.iatf || "见 automotive-iatf.html")}</p>
      ${auto.aiag ? `<p><strong>AIAG：</strong>${esc(auto.aiag)}</p>` : ""}
      <p style="margin-top:0.75rem">${esc(auto.scenario || "")}</p>
      ${auto.deliverableExtra ? `<p><strong>汽车交付补充：</strong>${esc(auto.deliverableExtra)}</p>` : ""}
      <h3 style="margin-top:1rem;color:var(--bb-gold)">审核检查清单</h3>
      <ul class="obj-list">${(auto.checklist || []).map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
      <div class="aiag-criteria">
        <div class="ok"><strong>&lt;10%</strong>%GRR 可接受</div>
        <div class="warn"><strong>10–30%</strong>边缘/改进</div>
        <div class="no"><strong>&gt;30%</strong>不可接受</div>
      </div>
      ${SITE_CONFIG ? `<div class="auto-banner" style="margin-top:1rem"><strong>贵司现场配置</strong><ul class="obj-list"><li>${esc(SITE_CONFIG.offlineTiming)}</li><li>${esc(SITE_CONFIG.xrayPolicy)}</li><li>${esc(SITE_CONFIG.fctBodyDcu)}</li></ul><a class="btn btn-primary" href="../reference/site-config.html">1:1 配置页 →</a></div>` : ""}
      <p style="margin-top:0.75rem"><a class="btn" href="../reference/automotive-iatf.html">IATF × DMAIC 对照手册 →</a></p>
    </article>`
    : "";

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>模块 ${d.n} — ${esc(d.title)} | 六西格玛黑带</title>
  <meta name="description" content="六西格玛黑带 ${p.competency} — ${esc(d.title)}" />
  <meta name="mbb-package-version" content="${PACKAGE_VERSION}" />
${THEME_HEAD}
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/pro.css" />
  <link rel="stylesheet" href="../css/automotive.css" />
  <link rel="stylesheet" href="../css/homework-grader.css" />
  <link rel="stylesheet" href="../css/brand.css" />
  <link rel="stylesheet" href="../css/premium.css" />
  <link rel="stylesheet" href="../css/print-light.css" media="print" />
  <link rel="stylesheet" href="../css/interactive-learning.css" />
  <link rel="stylesheet" href="../css/factory-scenario.css" />
  <script src="../js/course.js" defer></script>
  <script src="../js/theme.js" defer></script>
  <script src="../js/brand.js" defer></script>
</head>
<body data-day="${d.n}">
  <div class="page-bg"></div>
  ${renderPrintHeader("../", `模块 ${String(d.n).padStart(2, "0")} — ${d.title}`)}
  <header class="topbar">
    ${renderTopbarBrand("../index.html", "../")}
    <nav>
      <a class="btn" href="../index.html">课程总览</a>
      <a class="btn" href="../reference/tool-matrix.html">工具矩阵</a>
      <a class="btn" href="../tools/tutorials.html">Minitab 教程</a>
      <a class="btn" id="nav-prev"${prevVis} href="${prev}">← 上一模块</a>
      <a class="btn btn-primary" id="nav-next" href="${next}">下一模块 →</a>
      <button type="button" class="btn" id="mark-complete">标记完成</button>
      ${renderThemeSwitcher()}
    </nav>
  </header>

  <div class="layout-course">
    <aside class="course-sidebar">
      <div class="sb-title">模块 ${d.n} 目录</div>
      <a href="#sec-a">A 学习目标</a>
      <a href="#sec-b">B 核心概念</a>
      <a href="#sec-b2">B+ 生产线对齐</a>
      <a href="#sec-c">C 工具与公式</a>
      <a href="#sec-c2">C2 软件实操</a>
      <a href="#sec-d">D 行业案例</a>
      <a href="#sec-e">E 课堂练习</a>
      <a href="#sec-f">F 课后作业</a>
      <a href="#sec-g">G 客观自测</a>
      <a href="#sec-h">H 能力自评</a>
      <a href="#sec-factory">🏭 工厂实景</a>
      <div class="sb-title" style="margin-top:1rem">参考资料</div>
      <a href="../reference/factory-floor-lab.html">场景总览</a>
      <a href="../reference/glossary.html">术语表</a>
      <a href="../reference/sigma-table.html">σ · DPMO</a>
      <a href="../reference/automotive-iatf.html">汽车 IATF 专题</a>
      <a href="../reference/homework-scores.html">我的作业成绩</a>
    </aside>

    <main class="course-main">
      <header class="pro-header day-hero" style="border:none;padding:0">
        <p class="module-id">模块 ${String(d.n).padStart(2, "0")} / 14 · ${esc(p.competency)}</p>
        <h1>${esc(d.title)}</h1>
        <div class="day-meta" style="margin-top:1rem">
          <span class="dmaic-ribbon ${esc(p.dmaic)}">${esc(p.dmaic)}</span>
          <span class="${beltClass}">${esc(p.belt)} 能力域</span>
          ${gateTag}
          <span class="tag gold">交付：${esc(d.deliverable)}</span>
        </div>
        <div class="ref-box" style="margin-top:1rem">
          <strong>标准对齐</strong> ${esc(p.iso)}
        </div>
      </header>

      ${autoHtml}

      <article class="card pro" id="sec-a">
        <h2><span class="section-num">A</span>学习目标（Learning Objectives）</h2>
        <ul class="obj-list">${objHtml}</ul>
        <p style="margin-top:0.75rem;font-size:0.88rem;color:var(--muted)">学完应能独立向 Champion 说明本模块对黑带项目的价值。</p>
      </article>

      <article class="card pro" id="sec-b">
        <h2><span class="section-num">B</span>核心概念与理论框架</h2>
        ${d.concept
          .split(/\n\n+/)
          .map((p) => `<p>${esc(p)}</p>`)
          .join("")}
        <div class="analogy"><strong>专业类比</strong> — ${esc(d.analogy)}</div>
        <p style="margin-top:1rem">${esc(d.toolsTheory)}</p>
        ${formulasHtml}
        <p style="margin-top:1rem">${enrichFocus}</p>
      </article>

      ${deepDiveHtml}

      ${factoryHtml}

      <article class="card pro" id="sec-c">
        <h2><span class="section-num">C</span>工具清单与适用边界</h2>
        <p>主平台：<strong>${esc(d.primaryTool)}</strong> ·
          <a href="../tools/tutorials.html#${d.tutorialAnchor}">分步操作教程</a> ·
          <a href="../reference/tool-matrix.html">DMAIC 工具矩阵</a></p>
        <div class="table-wrap tool-matrix" style="margin-top:1rem">
          <table><thead><tr><th>工具 / 方法</th><th>本模块用途</th></tr></thead><tbody>${toolsTable}</tbody></table>
        </div>
        ${pitfallsHtml}
      </article>

      <article class="card pro tip" id="sec-c2">
        <h2><span class="section-num">C2</span>专业软件实操 Lab（${esc(d.primaryTool || "见教程")}）</h2>
        <p style="font-size:0.85rem;color:var(--muted)">包版本 ${PACKAGE_VERSION} · 跟做后完成 F 节截图交付</p>
        ${c2LabHtml}
        ${dataLink}
      </article>

      <article class="card pro" id="sec-d">
        <h2><span class="section-num">D</span>行业迷你案例与 ${coachLabel}</h2>
        <p>${esc(d.case)}</p>
        <h3>${coachLabel}</h3>
        <ul class="obj-list">${mbbHtml}</ul>
      </article>

      <article class="card pro" id="sec-e">
        <h2><span class="section-num">E</span>课堂练习（先作答再对答案）</h2>
        <ul class="obj-list">${exHtml}</ul>
      </article>

      <article class="card pro warn" id="sec-f">
        <h2><span class="section-num">F</span>课后作业（可交付物）</h2>
        <p><strong>交付要求：</strong>${esc(d.homework)}</p>
        ${c2DeliverHint}
        <p class="c2-module-check"><label><input type="checkbox" id="c2-done-cb" data-day="${d.n}" /> 本模块 C2 Lab 跟做截图已交付（计入结业 15%）</label></p>
        ${homeworkFormHtml}
        <p style="margin-top:0.75rem;font-size:0.88rem;color:var(--muted)">自动评分后仍可提交 AI 深度批改：<code>/review 作业</code></p>
      </article>

      <article class="card pro quiz" id="sec-g">
        <h2><span class="section-num">G</span>客观自测（自动判分 · 含纠错题）</h2>
        ${quizHtml}
        <p class="quiz-submit-row" style="font-size:0.88rem;color:var(--muted)">客观题与 F 节作业一并计入综合分，请点击 F 节「提交作业并自动评分」。</p>
      </article>

      <article class="card pro" id="sec-h">
        <h2><span class="section-num">H</span>能力自评（黑带认证口径 1–5）</h2>
        ${renderSelfAssessmentSection(d.n)}
        <p style="margin-top:0.75rem">任一项 &lt; 3：重修本模块；建议 <code>/day ${d.n}</code> 答疑。</p>
        <div class="ref-box"><strong>延伸阅读</strong><ul class="obj-list">${refsHtml}</ul></div>
      </article>
    </main>
  </div>

  <footer class="footer">
    <strong>六西格玛黑带学院</strong> · 模块 ${d.n}/14 · ${esc(p.competency)} ·
    <a href="../index.html">课程总览</a> ·
    <a href="../reference/homework-scores.html">我的成绩</a> ·
    <a href="javascript:window.print()">打印本模块（浅色版式）</a>
    <span class="print-footer-line">— 机密文件 · 仅供内部培训 —</span>
  </footer>
  <script type="application/json" id="hw-rubric-data">${rubricJson}</script>
  <script src="../js/homework-grader-core.js"></script>
  <script src="../js/interactive-learning-core.js"></script>
  <script src="../js/homework-grader.js" defer></script>
  <script src="../js/interactive-learning.js" defer></script>
  <script src="../js/factory-scenario.js" defer></script>
  <script src="../js/self-assessment.js" defer></script>
  <script src="../js/c2-module-checklist.js" defer></script>
  <script src="../js/academy.js" defer></script>
</body>
</html>`;
}

for (const d of DAYS) {
  const out = path.join(DAYS_DIR, `day${String(d.n).padStart(2, "0")}.html`);
  fs.writeFileSync(out, renderDay(d), "utf8");
  console.log("built", out);
}
console.log("14 days OK");

const hubHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>工厂实景实验室 — 14 模块场景总览</title>
  <script src="../js/theme-init.js"></script>
  <link rel="stylesheet" href="../css/theme.css" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/pro.css" />
  <link rel="stylesheet" href="../css/factory-scenario.css" />
  <link rel="stylesheet" href="../css/brand.css" />
  <script src="../js/theme.js" defer></script>
  <script src="../js/brand.js" defer></script>
</head>
<body>
  <div class="page-bg"></div>
  <header class="topbar">
    <a class="brand" href="../index.html">
      <span class="belt-mark fallback-mark">σ</span>
      <span class="brand-text-wrap">
        <span class="brand-org-name">六西格玛黑带学院</span>
        <span class="brand-org-sub">工厂实景实验室</span>
      </span>
    </a>
    <nav>
      <a class="btn" href="../index.html">课程总览</a>
      <a class="btn btn-primary" href="../days/day01.html#sec-factory">从模块 01 开始</a>
    </nav>
  </header>
  <div class="wrap">
    <div class="card pro">
      <h1 style="margin-top:0">🏭 汽车电子 EMS 工厂实景实验室</h1>
      <p style="color:var(--muted);max-width:720px">
        每条场景 = <strong>产线故事</strong> + <strong>六西格玛解析</strong> + <strong>30 秒致用</strong>，点击进入对应模块。
      </p>
      <h2 class="fs-hub-section-title">14 模块主线场景</h2>
      <div class="fs-hub-grid">${renderFactoryHubCards(esc)}</div>
      <h2 class="fs-hub-section-title">专题加深（P0 / P1）</h2>
      <p style="font-size:0.88rem;color:var(--muted)">ICT · 手插 · AOI Kappa · ECN · ASIL · 8D · 非正态空洞</p>
      <div class="fs-hub-grid">${renderFactoryTopicCards(esc)}</div>
    </div>
  </div>
  <footer class="footer"><a href="../index.html">返回课程总览</a></footer>
</body>
</html>`;
fs.writeFileSync(
  path.join(__dirname, "../docs/mbb-training/reference/factory-floor-lab.html"),
  hubHtml,
  "utf8"
);
console.log("factory-floor-lab.html OK");
require("./sync-reference-versions");
