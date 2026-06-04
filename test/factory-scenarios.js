/**
 * 汽车电子 EMS — 工厂典型场景 × 六西格玛生动解析（14 模块 + 专题）
 * P0/P1 专业加深：效应量、前提、属性 MSA、8D/ROI、ICT、手插、ASIL、ECN 等
 */
const FACTORY_SCENARIOS = {
  1: {
    title: "夜班铃声：错版 SOC 还没贴片就被拦下",
    station: "离线烧录区 · 烧录器 #7 · SMT 入口门禁",
    products: ["ADAS 域控 DCU-A", "车身域控 DCU-B"],
    dmaicTag: "战略 · σ 语言 · 工艺段地图",
    standardAnchor: "ISO 13053-1 量化方法 · 组织级 σ 目标沟通",
    scene:
      "凌晨 2:17，SMT 线边屏幕弹出红色拦截：Batch#ADAS-8842 的 SOC_FW 与 CSR 清单不一致。烧录员老王松了口气——要是这道门失效，U12 贴完才发现，整批报废加上 OEM 停线索赔，故事就变成「事后英雄」而不是「事前黑带」。",
    dialogue: [
      { who: "烧录员老王", line: "Checksum 红灯我能理解，但 HU 那批为啥也卡住？" },
      { who: "MBB 张工", line: "因为五产品共用烧录器≠共用程序；混 Profile 的统计会骗过你。" },
      { who: "Champion 李总", line: "我要的是：哪段工艺省钱、哪段省钱但埋雷——用 DPMO 说。" },
    ],
    sigmaStory:
      "六西格玛在这里不是「喊口号降不良」，而是 **用 σ/DPMO 统一语言**，把 **离线烧录 → SMT → X-Ray → FCT** 拆成可度量 CTQ。MBB 的价值是画清「产品×工艺段」地图：错版是 **Define 前就该关掉的门**；SPI Cpk 再漂亮，也替代不了 Eth FCT 的 p 图。",
    sigmaDeep: [
      "**P0 · 1.5σ 惯例**：对客户报「6σ」或 Cpk 时，须说明是否采用行业 1.5σ 偏移假设、数据是否来自 Safe Launch 全检期——避免审计追问「短期数据代表长期吗」。",
      "**P0 · ROI 语言**：Champion 要听硬钱——错版拦截价值 ≈ 避免报废片数×单板成本 + 避免停线分钟×分钟产值（见模块 02 公式）。",
      "**P1 · 工艺段**：离线烧录门是 **成本最低的错误发现点**；越往后发现，DPMO 惩罚越大。",
    ],
    prepCheck: ["五产品 FCT 工站号已标注", "routing 表与 site-config 一致"],
    tools: ["SIPOC（范围）", "DPMO/ppm（战略沟通）", "五产品 routing 表"],
    pitfall: "把五类产品 FCT 良率合并汇报 —— Champion 会听到「假繁荣」。",
    applyNow:
      "打开 routing 表：用 3 种颜色标 ADAS/车身/HU 的 FCT 工站号；向同事用 1 句话解释「为何离线烧录必须在 SMT 前」。",
    quizLink: "回到本节 G 节 — 验证「合并良率」与「Checksum 门禁」题",
    funFact: "记住口诀：**「烧录不对，后面全废；分段统计，MBB 不背锅。」**",
  },
  2: {
    title: "OEM 邮件：Eth 丢包不是「加强检验」能解决的",
    station: "会议室 · FCT-DCU-A-05 数据投影",
    products: ["ADAS 域控 DCU-A"],
    dmaicTag: "Define · Charter · CTQ 树",
    standardAnchor: "IATF 16949 顾客导向 · 8D 与 DMAIC 可并行",
    scene:
      "客户质量工程师发来 SCAR：「高速 Eth 丢包上升」。产线经理提议「FCT 加严全检」。MBB 把邮件投屏：问题陈述里写着「降低不良」——没有基线%、没有批次窗、没有工站号。",
    dialogue: [
      { who: "产线经理", line: "加 2 台 FCT 重测不就行了？" },
      { who: "MBB", line: "重测是掩盖，不是 Define；先写清 Eth 一次通过率从多少到多少。" },
      { who: "BB 学员", line: "客户要 8D，我们还做 DMAIC 吗？" },
      { who: "MBB", line: "8D D1–D2 对齐 Charter；D3+ 用 DMAIC 证据，勿两套故事打架。" },
    ],
    sigmaStory:
      "**Define** 的核心是 **可测量问题陈述 + 范围边界**。汽车电子 SCAR 要写明四段工艺（离线烧录/SMT/手插/装配/FCT），排除整车路试。CTQ 树把 VOC「感知可靠」拆到 Eth%、Checksum、Profile#——后面 Measure/Analyze 才有合法数据表。",
    sigmaDeep: [
      "**P0 · 8D ↔ DMAIC**：8D 的 D2 描述问题 ≈ DMAIC Define；根因验证走 Analyze；对策与防再发 ≈ Improve+Control。MBB 职责是 **不让 8D 团队用对策冒充问题陈述**。",
      "**P0 · ROI 模板**：年化效益 ≈ Δ不良率 × 年产量 × 单板毛利 + 减少报废 × 成本 + 减少停线 h × 小时贡献毛利（须 Champion 签字假设）。",
      "**P1 · PPAP 意识**：Charter 范围外的软件版本变更若未走 ECN，后续 Control 全部失效（模块 10 展开）。",
    ],
    prepCheck: ["问题陈述无对策动词", "范围含四段工艺", "CTQ 含 Program_ID/Checksum"],
    tools: ["项目章程", "CTQ 树", "SIPOC 边界", "8D 对齐表"],
    pitfall: "用对策当问题（「加强烧录管理」）— 阶段门应 No-Go。",
    applyNow: "用 1 句话重写问题陈述：含指标、时间窗、FCT-05、不含对策；旁注对应 8D 哪一步。",
    quizLink: "G 节 — 「降低不良」是否合格问题陈述",
    funFact: "Champion 最爱听：**「从 99.2% 到 97.1%，20 批，FCT-05。」**",
  },
  3: {
    title: "计量还是计数？SPI 体积与 FCT 良率的「身份误会」",
    station: "SMT 线 · SPI 工站 · 质量日报墙",
    products: ["ADAS DCU-A", "组合仪表 IC"],
    dmaicTag: "Measure · 数据类型 · 抽样",
    standardAnchor: "AIAG SPC-3 控制图选型 · ISO 13053-1 数据收集",
    scene:
      "质量部贴出「SPI Cpk=1.45，今日质量优秀」。同一面墙，FCT 一次通过率 p 图越界。新人问：「Cpk 不是已经很好了吗？」MBB 指着空洞 Pareto：「一个在量焊膏体积，一个在数合格不合格——混图等于混语言。」",
    dialogue: [
      { who: "质量工程师", line: "我把 SPI 和 FCT 做在一个 Xbar 图里行吗？" },
      { who: "MBB", line: "不行；计量用 I-MR/Cpk，属性用 p/np，前提不同。" },
    ],
    sigmaStory:
      "**Measure** 先判定 **连续 vs 属性**：SPI 体积、BGA 空洞% 是计量；FCT pass/fail 是属性。抽样计划要写 **操作定义**（Profile#、Program_ID、工站号）。否则 Analyze 的检验选型从根上就错。",
    sigmaDeep: [
      "**P0 · 抽样**：属性 p 图建议 np≥5·n·p̄；计量 Cpk 需稳定过程与子组 rational subgroup（按批次/炉次，非随意凑 25 点）。",
      "**P1 · ICT 预警**：ICT 短路漏检会抬高 FCT 不良 —— 数据计划应保留 ICT→FCT 串联追溯（见专题「ICT 漏检」）。",
      "**P2 · 非正态 CTQ**：BGA 空洞% 右偏时 I-MR/Cpk 易失真；先正态性检验，再考虑 Box-Cox/Johnson（见 C2 Lab · 专题「空洞偏态」）。",
    ],
    prepCheck: ["每个 CTQ 已标计量/属性", "操作定义含工站号"],
    tools: ["数据类型判定", "抽样计划", "操作定义"],
    pitfall: "用 Cpk 汇报 FCT 客户体验 —— OEM 审计会追问 CTQ 对齐。",
    applyNow: "选今日一个 CTQ：写清「计量/属性 + 推荐控制图 + 最小样本量规则」。",
    quizLink: "G 节 — BGA 空洞率用哪种图",
    funFact: "焊膏看 **体积**，Eth 看 **过不过** —— 别谈婚论嫁。",
  },
  4: {
    title: "GRR=28% 的 SPI，还能开控制限吗？",
    station: "MSA 室 · SPI 测厚仪 · ADAS 钢网库",
    products: ["ADAS DCU-A", "座舱 DCU-C"],
    dmaicTag: "Measure · MSA · Gage R&R",
    standardAnchor: "AIAG MSA-4（计量 GRR）· AIAG MSA-4 属性一致性/Kappa",
    scene:
      "三台 SPI 比对，%GRR=28%。工艺想「先上线，以后再改善」。MBB 翻开 AIAG MSA-4 判据：>30% 不可接受，10–30% 边缘。「边缘不是通行证，是改进项目。」隔壁 AOI 工位，目检员甲丙对同一 BGA 空洞判不一致——Kappa 仅 0.55。",
    dialogue: [
      { who: "工艺工程师", line: "28% 差不多能用吧？" },
      { who: "MBB", line: "边缘区要立项改进，不是口头放行。" },
      { who: "AOI 主管", line: "目检靠老师傅，还要做 MSA 吗？" },
      { who: "MBB", line: "要——属性量测用 Kappa/一致性，和 SPI 的 GRR 不是一张表。" },
    ],
    sigmaStory:
      "**MSA 是 Measure 阶段的门禁**：计量 CTQ 用 %GRR、ndc、偏倚；**属性判定**（AOI 过/不过、FCT Pass/Fail 人工复判）用 **Kappa/一致性**。汽车电子陷阱：座舱与 ADAS 共用测点却不评审；SL 全检期数据混入 MP 抽检期。",
    sigmaDeep: [
      "**P0 · 计量 MSA**：%GRR=28% → 边缘，须 **改进量具/夹具/方法** 后再建 SPC 控制限；ndc<5 时区分能力不可靠。",
      "**P0 · 属性 MSA**：AOI 误判会同时伤害 Analyze（假根因）与 Control（假报警）；Kappa≥0.75 方可接受（行业惯例，以 CSR 为准）。",
      "**P1 · SL/MP 分层**：X-Ray Safe Launch 100% 与量产抽检数据 **禁止混算 GRR/Cpk**。",
    ],
    prepCheck: ["GRR 报告含 ndc", "属性站有 Kappa 或一致性", "数据按产品/阶段分层"],
    tools: ["Gage R&R", "Kappa/一致性", "ndc", "分层（SL/MP）"],
    pitfall: "MSA 不合格仍报 Cpk 达标；AOI 目检不做一致性评估。",
    applyNow: "填表：SPI（GRR=?）+ AOI（Kappa=?）各写 Accept/Marginal/Reject 及一条改进。",
    quizLink: "G 节 — %GRR 28% 能否放行",
    funFact: "计量像秤，目检像裁判：**秤不准别称重，裁判不一别判罚。**",
  },
  5: {
    title: "Eth 失败：是错版批次，还是炉温 Profile？",
    station: "Analyze 战情室 · X-Ray SL 全检区",
    products: ["ADAS DCU-A"],
    dmaicTag: "Analyze · 假设检验 · 缺陷矩阵",
    standardAnchor: "ISO 13053-1 分析阶段 · 假设检验前提",
    scene:
      "Pareto 显示 Eth_FAIL 占 62%。BB 想「炉温调高试试」。MBB 拉出列联表：错版批次 Eth 不良 8.2%，正常批次 0.4%；卡方 p=0.003。但 Champion 说：「8.2% 才差 7.8 个点，值得停线吗？」",
    dialogue: [
      { who: "BB", line: "我把炉温 +5℃ 试产？" },
      { who: "MBB", line: "先证明不是错版——列联表 + 效应量，别只甩 p 值。" },
      { who: "Champion", line: "统计显著就行了吧？" },
      { who: "MBB", line: "还要算比例差/OR 与 95% CI；若年化百万片，0.3% 也值钱。" },
    ],
    sigmaStory:
      "**Analyze** 用缺陷矩阵链到四段工艺。报告须含：**前提**（独立批次？期望频数？）、**p 值**、**效应量**（比例差/OR）、**业务翻译**。切忌 HU FCT-03 混入 ADAS 故事。",
    sigmaDeep: [
      "**P0 · 效应量**：p&lt;0.05 只说明「有证据」；Champion 看 **差多少** —— 例：错版批次 Eth 不良率差 7.8% + 95% CI。",
      "**P0 · 前提**：列联表期望频数&lt;5 时考虑 Fisher 精确检验；批次非独立则夸大显著性。",
      "**P1 · SL→MP X-Ray**：Analyze 必须标注 **X-Ray 切换日**；切换前后空洞 Pareto 不可合并。",
      "**P2 · 检验功效**：样本量过小会「检不出」错版效应 —— Analyze 前用功效分析定最小 n（与模块 06 DOE 功率分析同源）。",
      "**P2 · 非正态空洞**：X-Ray 空洞% 非正态勿硬报 Cpk；用变换或 Weibull + 单边规格，并写明分布假设。",
    ],
    prepCheck: ["H0/H1 与检验匹配", "报告有效应量或比例差", "X-Ray 阶段已分层"],
    tools: ["Pareto", "列联表/卡方", "效应量/OR", "5Why"],
    pitfall: "只报 p 值；观察性相关直接改 Profile 无 DOE。",
    applyNow: "画 3×3 缺陷矩阵；写 1 句「统计结论 + 业务结论 + 建议下一工具（DOE/8D）」。",
    quizLink: "G 节情景 — 合并 ADAS+车身良率",
    funFact: "MBB 口头禅：**「先分层，再回归；先版本，再炉温。」**",
  },
  6: {
    title: "2³ DOE：Profile# 与空洞的「对话」",
    station: "NPI 试产线 · 回流炉 #3 · Minitab 工作站",
    products: ["ADAS DCU-A"],
    dmaicTag: "Improve · DOE · 交互",
    standardAnchor: "ISO 13053-2 实验设计 · 确认运行",
    scene:
      "因子：峰值温度、驻留时间、钢网开口。主效应图显示开口×温度交互显著。工艺兴奋：「最高点量产！」MBB 拦住：**「试验区外外推 = 赌博。」** 并问：「每因子水平 replication≥2 了吗？功率够吗？」",
    dialogue: [
      { who: "工艺", line: "Minitab 说这一点最好，明天就改产！" },
      { who: "MBB", line: "先确认运行 3 批；DOE 显著≠长期稳健。" },
    ],
    sigmaStory:
      "**DOE** 回答因子显著性、交互与稳健区。Improve 须 **Pilot + 确认运行**；实验日志写 Profile#、钢网 ID、炉次。",
    sigmaDeep: [
      "**P0 · 样本量**：2³ 全因子至少每格 2–3 次重复；功率分析避免「实验做完才发现检不出」。",
      "**P0 · 随机化**：运行顺序随机/block，防炉温漂移混淆主效应。",
      "**P1 · 噪声因子（可选）**：湿度/焊膏批次作噪声因子可找稳健区（模块 09 RSM 延伸）。",
      "**P2 · 功效门槛**：α=0.05、功效≥0.8 时反算 n；若 n 超产线试产能力，须 Champion 接受「检不出小效应」风险。",
    ],
    prepCheck: ["随机顺序已记录", "响应为计量空洞% 且 MSA 合格"],
    tools: ["2^k 因子设计", "主效应/交互", "确认运行", "功率分析"],
    pitfall: "试验区外最优点直接量产；无确认运行。",
    applyNow: "列出 2 因子 + 响应 + 每组合最少运行次数。",
    quizLink: "G 节 — 无 DOE 直接改炉温",
    funFact: "DOE 像菜谱：**单改盐不行，盐和火一起才香。**",
  },
  7: {
    title: "Analyze 门评审：PPT 很美，证据链断了",
    station: "阶段门会议室 · 投影 ADAS SCAR 故事板",
    products: ["ADAS DCU-A", "车身域控 DCU-B"],
    dmaicTag: "Analyze 门 · 整合 · 故事板",
    standardAnchor: "DMAIC 阶段门 · OEM SCAR 证据要求",
    scene:
      "BB 汇报 40 页 PPT，缺 DCU-B 对照组、缺 X-Ray SL→MP 切换日。OEM 问：「车身 CAN 间歇怎么证明不是 ADAS 炉温实验副作用？」MBB 敲桌：**「门看证据链，不看动画。」**",
    dialogue: [
      { who: "OEM", line: "车身线的回归证据在哪？" },
      { who: "MBB", line: "打回：补 FCT-04 对照 + X-Ray 切换日 + MSA 摘要一页。" },
    ],
    sigmaStory:
      "阶段门整合 D+M+A：**一页纸**含问题基线、MSA 状态、关键检验/DOE 结论（含效应量）、未关闭风险。打回理由可执行。",
    sigmaDeep: [
      "**P0 · 门证据清单**：MSA 合格 · 分层数据 · 效应量 · 对照产品线 · 无对策混入问题陈述。",
      "**P1 · SL→MP**：故事板必须标 **切换日** 与 X-Ray 策略变化对空洞数据的影响。",
      "**P1 · 回归证明**：ADAS 实验期间车身 FCT-04 须 **同期监控** 证明无回归。",
    ],
    prepCheck: ["D+M+A 一页纸齐全", "车身对照数据附上"],
    tools: ["阶段门 checklist", "故事板", "D+M+A 摘要"],
    pitfall: "口头汇报；无 X-Ray 切换标注。",
    applyNow: "写 3 条通过/打回理由（含效应量、分层、对照）。",
    quizLink: "G 节 — Analyze 门缺什么",
    funFact: "门评审像安检：**液体可以带，逻辑不能漏。**",
  },
  8: {
    title: "手插浮高抢 RPN：车身 DCU-B 的独立战场",
    station: "手插/波峰工位 · DCU-B 继电器座 · PFMEA 墙",
    products: ["车身域控 DCU-B"],
    dmaicTag: "Improve · PFMEA · 探测度",
    standardAnchor: "AIAG-VDA FMEA · 手插/波峰工艺",
    scene:
      "PFMEA 会上，团队狂砍 U12 空洞 RPN，却把手插「继电器浮高」排在后面。车身班长拍桌：「ADAS 线的不空焊，我们座子歪 —— CAN 间歇全在 FCT-04！」MBB 把两行 PFMEA 拉开：**SMT 空洞与手插浮高不得合并一行；探测度要写到治具防呆。**",
    dialogue: [
      { who: "BB", line: "O 值下调 RPN 就安全了。" },
      { who: "MBB", line: "手插浮高探测度能到 3 吗？有防呆治具吗？" },
      { who: "车身班长", line: "我们不像 ADAS 有 X-Ray 全检。" },
      { who: "MBB", line: "那更要提高探测度或加 100% 外观/高度规。" },
    ],
    sigmaStory:
      "**PFMEA 按工艺段分行**：离线烧录错版、ADAS U12 空洞、**车身手插浮高** 各自独立。**探测度** 对应实物控制（防呆治具、通止规、FCT 探针），不是口号。",
    sigmaDeep: [
      "**P1 · 手插专节**：继电器浮高 → CAN 间歇 → 须在 **FCT-04 之前** 设控制；与 SMT 空洞根因不同，RPN 不可合并。",
      "**P0 · RPN 诚信**：禁止仅调 O；S/O/D 须有现场证据。",
      "**P1 · ICT**：手插后可加 ICT 垫刀检测，降低 FCT 假不良（链专题 ICT）。",
    ],
    prepCheck: ["手插行独立", "探测度对应治具/方法"],
    tools: ["PFMEA", "RPN", "手插防呆", "FCT-04 链接"],
    pitfall: "五类产品共用一个 PFMEA 模板不区分手插；仅降 O 值。",
    applyNow: "写 1 行「车身手插浮高」PFMEA：S/O/D + 探测措施各 1 条。",
    quizLink: "G 节 — 离线烧录错版 S 典型值",
    funFact: "RPN 不是化妆：**数字小了，探测得真。**",
  },
  9: {
    title: "RSM 稳健区：不是「最陡的坡」而是「平台」",
    station: "试产中心 · Profile 优化看板",
    products: ["ADAS DCU-A", "中控 HU"],
    dmaicTag: "Improve · RSM · 稳健参数",
    standardAnchor: "响应曲面 · 稳健参数设计（可选）",
    scene:
      "响应曲面找到空洞最低区，但边界窄。HU 线想共用 ADAS 参数。MBB：**「产品不同，稳健区不同；复制要实验，不是复制 Excel。」**",
    dialogue: [
      { who: "HU 线长", line: "ADAS 参数我们抄一份？" },
      { who: "MBB", line: "抄逻辑不抄数字——先确认 HU 的 BGA 尺寸。" },
    ],
    sigmaStory:
      "**RSM** 找稳健平台。结束要有 **确认运行 3 批** 与 **控制计划预演**；关注车身 FCT-04 无回归。",
    sigmaDeep: [
      "**P2 · 噪声因子**：炉温±5℃、湿度档作噪声，找「宽平台」而非尖峰（进阶）。",
      "**P0 · 外推**：预测点须在试验空间内或近邻确认运行验证。",
    ],
    prepCheck: ["稳健区在试验范围内", "3 批确认运行已排程"],
    tools: ["RSM", "确认运行", "Pugh 矩阵"],
    pitfall: "HU 与 ADAS 共用未评审 Profile。",
    applyNow: "一句话定义「稳健」+ 写出确认运行 3 批成功标准。",
    quizLink: "G 节 — 稳健区未确认就量产",
    funFact: "量产爱平台，不爱悬崖。",
  },
  10: {
    title: "控制计划墙上：Checksum 100% 不是「写在纸上」",
    station: "产线尾端 · 控制计划电子看板 · FCT-05",
    products: ["五产品全矩阵"],
    dmaicTag: "Control · SPC · 控制计划",
    standardAnchor: "AIAG-VDA 控制计划 · PPAP 变更联动",
    scene:
      "审核员抽检：ADAS 行写「离线烧录 Checksum 100%」，现场抽检 10%。更糟的是——昨晚 ECN 改了 SOC_FW，烧录程序仍跑旧版，**p 图还没报警，错版已出厂**。MBB 带着班长重做：**反应计划 + ECN 门禁**。",
    dialogue: [
      { who: "班长", line: "100% 太慢，我们抽检 10%。" },
      { who: "MBB", line: "计划写 100% 就要 100%；ECN 未同步=隐形错版。" },
    ],
    sigmaStory:
      "**Control** 固化 Improve：SPC 图型正确、Western Electric 培训、**反应计划**可执行。追溯：Program_ID、烧录批次、X-Ray 阶段、PCB_ID。",
    sigmaDeep: [
      "**P1 · ECN/PPAP**：任何 Program_ID 变更须触发 **烧录程序校验 + 首件 Checksum + FCT 首批加严**；否则控制计划空文。",
      "**P0 · 反应计划**：越界→停线码→谁放行→追溯字段，四要素缺一不可。",
      "**P1 · ICT→FCT**：控制计划写清 ICT 不良趋势与 FCT p 图联动规则。",
    ],
    prepCheck: ["计划=现场", "ECN 24h 内烧录同步", "反应计划含停线码"],
    tools: ["控制计划", "p 图/I-MR", "ECN 门禁", "反应计划"],
    pitfall: "控制图代替 MSA；ECN 未更新程序。",
    applyNow: "写 1 条 Eth p 图越界反应计划 + 1 条 ECN 触发的烧录校验步骤。",
    quizLink: "G 节 — ADAS 控制计划要素",
    funFact: "控制计划是 **刹车系统**，ECN 是 **红绿灯**。",
  },
  11: {
    title: "QFD 屋顶：OEM 要时延，EMS 改什么焊盘？",
    station: "DFSS 研讨室 · 质量屋白板",
    products: ["ADAS DCU-A", "座舱 DCU-C"],
    dmaicTag: "DFSS · QFD · DMADV",
    standardAnchor: "ISO 13053-2 设计 · 功能安全边界（ASIL）",
    scene:
      "OEM VOC：「感知时延 < 80ms」。团队争论加散热还是加算力。功能安全同事提醒：**「Eth 时延 CTQ 的 ASIL 等级由 OEM 定，EMS 不能自行降级验证项。」** MBB 引导 QFD 把需求落到可设计项。",
    dialogue: [
      { who: "结构工程师", line: "加散热鳍片够不够？" },
      { who: "MBB", line: "先问：时延 CTQ 落在镜像、算力还是 FCT 场景？" },
      { who: "功能安全", line: "EMS 签署范围止于出厂测试边界，不含整车 ASIL 分解。" },
    ],
    sigmaStory:
      "**DFSS** 把 VOC 译成可设计 CTQ。Verify 含离线烧录镜像与 FCT 场景覆盖。**ASIL 边界**须在 Charter/QFD 注明：哪些由 OEM、哪些由 EMS 承担。",
    sigmaDeep: [
      "**P1 · ASIL 边界**：EMS 可负责 **出厂可测 CTQ**（Eth 环回、Checksum）；**整车感知时延/ASIL 分解** 需 OEM 接口，勿写进 EMS PFMEA 当唯一责任。",
      "**P0 · QFD 纪律**：多人评分、关联强度需证据（仿真/试验），非一人拍脑袋。",
    ],
    prepCheck: ["ASIL/责任边界已标注", "HOW 可测可验证"],
    tools: ["QFD", "DMADV", "ASIL 边界表"],
    pitfall: "DFSS 跳过离线烧录；EMS 越权承诺 ASIL。",
    applyNow: "写 1 条 VOC→CTQ→设计项，并标「OEM/EMS 责任」。",
    quizLink: "G 节 — DFSS 跳过烧录设计",
    funFact: "质量屋像翻译官：**客户话 → 工程话 → 谁签字。**",
  },
  12: {
    title: "第一波复制：ADAS 模板能否拯救 HU 线？",
    station: "集团 EMS 培训室 · 四模板看板",
    products: ["HU", "IC", "DCU-C", "DCU-A", "DCU-B"],
    dmaicTag: "部署 · Kotter · 模板复制",
    standardAnchor: "组织变革 · 项目组合管理",
    scene:
      "总部要求 90 天复制「ADAS 空洞模板」到 HU。HU 班长抗议：「我们没有 U12 大 BGA！」MBB 调整：**先复制分层 FCT + 烧录版本系统**，并设 **复制率 KPI**（如 3 个月内 4/5 产品线有阶段门模板）。",
    dialogue: [
      { who: "HU 班长", line: "空洞模板对我们不适用！" },
      { who: "MBB", line: "先复制版本门禁和 FCT 分层，再谈 DOE 因子。" },
    ],
    sigmaStory:
      "**部署** 看复制率与 waves：Kotter/ADKAR + 项目漏斗。IC 线纳入第一波，防数据孤岛。",
    sigmaDeep: [
      "**P2 · 复制率 KPI**：模板下载数无意义；看 **完成阶段门的项目数/受益产品线数**。",
      "**P1 · 五产品均衡**：车身手插、仪表 IC 不可落下。",
    ],
    prepCheck: ["复制清单含非 ADAS 线", "有 Champion 资源承诺"],
    tools: ["Kotter", "ADKAR", "模板 A–D", "复制率 KPI"],
    pitfall: "只买 Minitab 无项目。",
    applyNow: "列 1 可复制项 + 1 不可复制项 + 建议第一波产品线。",
    quizLink: "G 节 — 工具先行无项目",
    funFact: "复制不是复印：**改页码，不改结论。**",
  },
  13: {
    title: "辅导椅上的 BB：「我帮你跑 Minitab 吧」",
    station: "MBB 办公室 · GROW 对话 · 双屏 FCT 数据",
    products: ["车身 DCU-B", "ADAS DCU-A"],
    dmaicTag: "MBB 辅导 · GROW · Rubric",
    standardAnchor: "辅导 Rubric · 统计报告评审",
    scene:
      "BB 汇报：「p=0.02，显著！」MBB 问：**「效应量？MSA？FCT-04 还是 05？」** BB 愣住。MBB 推开键盘：**「我不代跑；你缺的是证据链，不是软件。」**",
    dialogue: [
      { who: "BB", line: "张工你帮我跑一下回归？" },
      { who: "MBB", line: "先说 FCT-04 分层——报告里要有比例差或 OR。" },
    ],
    sigmaStory:
      "**MBB 辅导** 用 GROW + Rubric：反馈必须可执行。口语红线：只报 p、无 MSA、混杂工站、无效应量 → ≤3 分。",
    sigmaDeep: [
      "**P0 · 效应量**：辅导提问清单第一项：「差多少？CI？年化影响？」",
      "**P0 · MSA**：无 GRR/Kappa 摘要不得进入 Analyze 门。",
      "**P1 · 分层**：车身/ADAS/HU 数据不得单表合并。",
    ],
    prepCheck: ["BB 报告含效应量", "工站号已核对"],
    tools: ["GROW", "Rubric", "评审清单"],
    pitfall: "MBB 代做统计并签字。",
    applyNow: "写 1 句 GROW 提问 + 1 条 Rubric 扣分理由（对应效应量/MSA/分层）。",
    quizLink: "F 节 Rubric 示例",
    funFact: "好教练像后视镜：**你不替开车，但让你看见盲区。**",
  },
  14: {
    title: "毕业答辩：15 分钟讲完四段工艺证据链",
    station: "OEM 远程评审 · ADAS SCAR Capstone",
    products: ["ADAS DCU-A"],
    dmaicTag: "Capstone · 答辩 · ROI",
    standardAnchor: "MBB 评审 · 效益论证",
    scene:
      "学员开场：「我们改善了质量。」OEM 打断：「Eth 基线？Checksum？X-Ray 切换日？ASIL 谁签字？」MBB 微笑：**「最后一课：数字 + 四段证据 + ROI + 边界。」**",
    dialogue: [
      { who: "学员", line: "我们团队很努力，质量提升了。" },
      { who: "OEM", line: "Eff 基线？效益多少人民币？ASIL 范围？" },
    ],
    sigmaStory:
      "**Capstone**：问题效益 → 四段证据 → 无回归 → **ASIL/责任边界** → 复制。L1≠企业 MBB。",
    sigmaDeep: [
      "**P0 · ROI**：Δppm×年产量×单件毛利 + 报废节约 + 停线节约；假设表必须给 Champion 挑战。",
      "**P1 · ASIL**：陈述「EMS 负责出厂 CTQ 验证；整车 ASIL 由 OEM 体系负责」。",
      "**P0 · 证据链**：离线烧录/SMT/X-Ray/FCT 各 1 个数字 + 1 张图，勿 40 页空话。",
    ],
    prepCheck: ["3min 大纲含 ROI", "ASIL 边界一句话"],
    tools: ["答辩大纲", "ROI", "证据链", "ASIL 声明"],
    pitfall: "14 天=MBB 资质；仅 FCT 截图。",
    applyNow: "写 3min 大纲：四段工艺各 1 数字 + ROI 1 行 + ASIL 边界 1 句。",
    quizLink: "G 节 — Capstone 必备证据",
    funFact: "答辩像电梯演讲：**一层工艺，一句证据，一个数字。**",
  },
};

/** 专题实景（P1 补强，不占用 14 模块序号） */
const FACTORY_TOPICS = [
  {
    id: "ict-fct",
    title: "ICT 漏检：短路逃到 FCT 的「背锅侠」",
    station: "ICT 工站 → FCT-05",
    sigmaDeep: [
      "ICT 检出短路失败时，FCT 不良会虚高——Analyze 须分层「ICT 已检出/漏检」。",
      "控制计划：ICT 不良率趋势与 FCT p 图联动反应。",
    ],
    link: { day: 3, hash: "sec-factory" },
  },
  {
    id: "hand-insert",
    title: "车身手插：继电器浮高与 ADAS 空洞不是一回事",
    station: "手插/波峰 · DCU-B",
    sigmaDeep: [
      "PFMEA 必须独立行；探测度写到防呆治具或通止规。",
      "FCT-04 CAN 间歇优先查手插，而非抄 ADAS 炉温对策。",
    ],
    link: { day: 8, hash: "sec-factory" },
  },
  {
    id: "aoi-kappa",
    title: "AOI 目检 Kappa：和 SPI 的 GRR 两张表",
    station: "SMT 后 AOI",
    sigmaDeep: [
      "计量 SPI 用 %GRR；属性 AOI 用 Kappa/一致性。",
      "Kappa&lt;0.6 时 Analyze 基于 AOI 的分层不可靠。",
    ],
    link: { day: 4, hash: "sec-factory" },
  },
  {
    id: "ecn-program",
    title: "ECN 到了，烧录程序还在跑旧版",
    station: "离线烧录 · 工程变更",
    sigmaDeep: [
      "Program_ID 变更未同步 → 隐性错版；须 ECN→烧录校验→首件 Checksum→FCT 首批加严。",
      "PPAP 提交数据包须含程序版本追溯。",
    ],
    link: { day: 10, hash: "sec-factory" },
  },
  {
    id: "asil-boundary",
    title: "ASIL 边界：EMS 出厂测什么、不签什么",
    station: "DFSS / Capstone",
    sigmaDeep: [
      "EMS：Eth 环回、Checksum、FCT 场景覆盖等出厂可测 CTQ。",
      "OEM：整车感知时延、ASIL 分解——勿写入 EMS 唯一责任。",
    ],
    link: { day: 11, hash: "sec-factory" },
  },
  {
    id: "8d-dmaic",
    title: "SCAR 来了：8D 与 DMAIC 怎么不打架",
    station: "OEM 质量会议",
    sigmaDeep: [
      "8D D2≈Define；根因验证走 Analyze；对策防再发≈Improve+Control。",
      "一套数据、一套版本追溯，两套表格同步更新。",
    ],
    link: { day: 2, hash: "sec-factory" },
  },
  {
    id: "nonnormal-void",
    title: "BGA 空洞偏态：别硬套正态 Cpk",
    station: "X-Ray · SMT 质量室",
    sigmaDeep: [
      "空洞% 右偏常见 → 先做正态性检验，再选能力指数或数据变换。",
      "MBB 审厂会问：Cpk 来自哪条分布假设？SL 全检期数据不可代表 MP。",
    ],
    link: { day: 5, hash: "sec-factory" },
  },
];

module.exports = { FACTORY_SCENARIOS, FACTORY_TOPICS };
