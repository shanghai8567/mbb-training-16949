/**
 * 汽车电子 EMS — 工厂典型场景 × 六西格玛生动解析（14 模块）
 * 目标：现场感 + 专业工具映射 + 30 秒致用
 */
const FACTORY_SCENARIOS = {
  1: {
    title: "夜班铃声：错版 SOC 还没贴片就被拦下",
    station: "离线烧录区 · 烧录器 #7 · SMT 入口门禁",
    products: ["ADAS 域控 DCU-A", "车身域控 DCU-B"],
    dmaicTag: "战略 · σ 语言 · 工艺段地图",
    scene:
      "凌晨 2:17，SMT 线边屏幕弹出红色拦截：Batch#ADAS-8842 的 SOC_FW 与 CSR 清单不一致。烧录员老王松了口气——要是这道门失效，U12 贴完才发现，整批报废加上 OEM 停线索赔，故事就变成「事后英雄」而不是「事前黑带」。",
    dialogue: [
      { who: "烧录员老王", line: "Checksum 红灯我能理解，但 HU 那批为啥也卡住？" },
      { who: "MBB 张工", line: "因为五产品共用烧录器≠共用程序；混 Profile 的统计会骗过你。" },
      { who: "Champion 李总", line: "我要的是：哪段工艺省钱、哪段省钱但埋雷——用 DPMO 说。" },
    ],
    sigmaStory:
      "六西格玛在这里不是「喊口号降不良」，而是 **用 σ/DPMO 统一语言**，把 **离线烧录 → SMT → X-Ray → FCT** 拆成可度量 CTQ。MBB 的价值是画清「产品×工艺段」地图：错版是 **Define 前就该关掉的门**；SPI Cpk 再漂亮，也替代不了 Eth FCT 的 p 图。",
    tools: ["SIPOC（范围）", "DPMO/ppm（战略沟通）", "五产品 routing 表"],
    pitfall: "把五类产品 FCT 良率合并汇报 —— Champion 会听到「假繁荣」。",
    applyNow:
      "打开 routing 表：用 3 种颜色标 ADAS/车身/HU 的 FCT 工站号；向同事用 1 句话解释「为何离线烧录必须在 SMT 前」。",
    funFact: "记住口诀：**「烧录不对，后面全废；分段统计，MBB 不背锅。」**",
  },
  2: {
    title: "OEM 邮件：Eth 丢包不是「加强检验」能解决的",
    station: "会议室 · FCT-DCU-A-05 数据投影",
    products: ["ADAS 域控 DCU-A"],
    dmaicTag: "Define · Charter · CTQ 树",
    scene:
      "客户质量工程师发来 SCAR：「高速 Eth 丢包上升」。产线经理提议「FCT 加严全检」。MBB 把邮件投屏：问题陈述里写着「降低不良」——没有基线%、没有批次窗、没有工站号。",
    dialogue: [
      { who: "产线经理", line: "加 2 台 FCT 重测不就行了？" },
      { who: "MBB", line: "重测是掩盖，不是 Define；先写清 Eth 一次通过率从多少到多少。" },
      { who: "BB 学员", line: "那离线烧录 Checksum 要进 Charter 吗？" },
      { who: "MBB", line: "必须进——软件版本是 CTQ，不是附件。" },
    ],
    sigmaStory:
      "**Define** 的核心是 **可测量问题陈述 + 范围边界**。汽车电子 SCAR 要写明四段工艺（离线烧录/SMT/手插/装配/FCT），排除整车路试。CTQ 树把 VOC「感知可靠」拆到 Eth%、Checksum、Profile#——后面 Measure/Analyze 才有合法数据表。",
    tools: ["项目章程", "CTQ 树", "SIPOC 边界"],
    pitfall: "用对策当问题（「加强烧录管理」）— 阶段门应 No-Go。",
    applyNow: "用 1 句话重写问题陈述：含指标、时间窗、FCT-05、不含对策。",
    funFact: "Champion 最爱听：**「从 99.2% 到 97.1%，20 批，FCT-05。」**",
  },
  3: {
    title: "计量还是计数？SPI 体积与 FCT 良率的「身份误会」",
    station: "SMT 线 · SPI 工站 · 质量日报墙",
    products: ["ADAS DCU-A", "组合仪表 IC"],
    dmaicTag: "Measure · 数据类型 · 抽样",
    scene:
      "质量部贴出「SPI Cpk=1.45，今日质量优秀」。同一面墙，FCT 一次通过率 p 图越界。新人问：「Cpk 不是已经很好了吗？」MBB 指着空洞 Pareto：「一个在量焊膏体积，一个在数合格不合格——混图等于混语言。」",
    dialogue: [
      { who: "质量工程师", line: "我把 SPI 和 FCT 做在一个 Xbar 图里行吗？" },
      { who: "MBB", line: "不行；计量用 I-MR/Cpk，属性用 p/np，前提不同。" },
    ],
    sigmaStory:
      "**Measure** 先判定 **连续 vs 属性**：SPI 体积、BGA 空洞% 是计量；FCT pass/fail 是属性。抽样计划要写 **操作定义**（Profile#、Program_ID、工站号）。否则 Analyze 的检验选型从根上就错。",
    tools: ["数据类型判定", "抽样计划", "操作定义"],
    pitfall: "用 Cpk 汇报 FCT 客户体验 —— OEM 审计会追问 CTQ 对齐。",
    applyNow: "选今日一个 CTQ：写清「计量/属性 + 推荐控制图类型」。",
    funFact: "焊膏看 **体积**，Eth 看 **过不过** —— 别谈婚论嫁。",
  },
  4: {
    title: "GRR=28% 的 SPI，还能开控制限吗？",
    station: "MSA 室 · SPI 测厚仪 · ADAS 钢网库",
    products: ["ADAS DCU-A", "座舱 DCU-C"],
    dmaicTag: "Measure · MSA · Gage R&R",
    scene:
      "三台 SPI 比对，%GRR=28%。工艺想「先上线，以后再改善」。MBB 翻开 AIAG MSA-4 判据：>30% 不可接受，10–30% 边缘。「边缘不是通行证，是改进项目。」",
    dialogue: [
      { who: "工艺工程师", line: "28% 差不多能用吧？" },
      { who: "MBB", line: "边缘区要立项改进，不是口头放行。" },
    ],
    sigmaStory:
      "**MSA 是 Measure 阶段的门禁**：%GRR、ndc、偏倚要进报告。汽车电子常见陷阱：座舱与 ADAS 共用测点却不评审；SL 全检期数据混入 MP 抽检期。MBB 签字的条件是：**测量系统合格 + 分层数据**。",
    tools: ["Gage R&R", "ndc", "分层（SL/MP）"],
    pitfall: "MSA 不合格仍报 Cpk 达标对外汇报。",
    applyNow: "写下：若 GRR=28%，你建议「可用/改进/停用」哪一项及 1 条理由。",
    funFact: "GRR 像秤：**不准的秤，越称越冤。**",
  },
  5: {
    title: "Eth 失败：是错版批次，还是炉温 Profile？",
    station: "Analyze 战情室 · X-Ray SL 全检区",
    products: ["ADAS DCU-A"],
    dmaicTag: "Analyze · 假设检验 · 缺陷矩阵",
    scene:
      "Pareto 显示 Eth_FAIL 占 62%。BB 想「炉温调高试试」。MBB 拉出列联表：Checksum_FAIL 与 Eth_FAIL 在错版批次高度相关；炉温只在 SL 切换后次要。",
    dialogue: [
      { who: "BB", line: "我把炉温 +5℃ 试产？" },
      { who: "MBB", line: "先证明不是错版批次——列联表比直觉靠谱。" },
    ],
    sigmaStory:
      "**Analyze** 用 **缺陷-过程矩阵** 链到离线烧录/SMT/X-Ray/FCT。假设检验前检查前提；**统计显著≠业务显著** 要讲清效应量。汽车电子切忌：混入 HU 的 FCT-03 数据讲 ADAS 故事。",
    tools: ["Pareto", "列联表/卡方", "5Why + 可验证根因"],
    pitfall: "观察性相关直接改量产 Profile，无 DOE 确认。",
    applyNow: "画 3×3 缺陷矩阵草图：行=失效模式，列=四段工艺。",
    funFact: "MBB 口头禅：**「先分层，再回归；先版本，再炉温。」**",
  },
  6: {
    title: "2³ DOE：Profile# 与空洞的「对话」",
    station: "NPI 试产线 · 回流炉 #3 · Minitab 工作站",
    products: ["ADAS DCU-A"],
    dmaicTag: "Improve · DOE · 交互",
    scene:
      "因子：峰值温度、驻留时间、钢网开口。主效应图显示开口×温度交互显著。工艺兴奋：「最高点量产！」MBB 拦住：**「试验区外外推 = 赌博。」**",
    dialogue: [
      { who: "工艺", line: "Minitab 说这一点最好，明天就改产！" },
      { who: "MBB", line: "先确认运行 3 批，再谈扩产。" },
    ],
    sigmaStory:
      "**DOE** 回答「哪些因子显著、有无交互、稳健区在哪」。Improve 要 **Pilot + 确认运行** 而非一次试产就扩产。汽车电子要把 Profile#、钢网编号写进实验日志，便于复制。",
    tools: ["2^k 因子设计", "主效应/交互图", "确认运行"],
    pitfall: "优化器给出试验区外最优点直接量产。",
    applyNow: "列出 2 个因子 + 1 个你关心的响应（如空洞%）。",
    funFact: "DOE 像菜谱：**单改盐不行，盐和火一起才香。**",
  },
  7: {
    title: "Analyze 门评审：PPT 很美，证据链断了",
    station: "阶段门会议室 · 投影 ADAS SCAR 故事板",
    products: ["ADAS DCU-A", "车身 DCU-B"],
    dmaicTag: "Analyze 门 · 整合 · 故事板",
    scene:
      "BB 汇报 40 页 PPT，唯独缺 DCU-B 对照组与 X-Ray 切换日标注。OEM 接口人问：「车身 CAN 间歇怎么证明不是 ADAS 炉温实验的副作用？」MBB 敲桌：**「阶段门看证据链，不看动画。」**",
    dialogue: [
      { who: "OEM", line: "车身线的回归证据在哪？" },
      { who: "MBB", line: "打回，补 FCT-04 对照与 X-Ray 切换日。" },
    ],
    sigmaStory:
      "DMAIC **阶段门** 是 **整合 Analyze**：D+M+A 摘要、分产品对照、MSA 状态、未解风险。MBB 打回理由必须可执行：「补 FCT-04 回归」「标 SL→MP 日期」。",
    tools: ["阶段门 checklist", "故事板", "D+M+A 一页纸"],
    pitfall: "口头汇报无分层数据 —— No-Go。",
    applyNow: "写 3 条「若你是 MBB，本门会通过/打回」理由。",
    funFact: "门评审像安检：**液体可以带，逻辑不能漏。**",
  },
  8: {
    title: "PFMEA 里的 U12：空洞 RPN 与探测度",
    station: "PFMEA 墙贴 · SMT·X-Ray 联合工段",
    products: ["ADAS DCU-A"],
    dmaicTag: "Improve · PFMEA · 探测度",
    scene:
      "团队把 RPN 从 180 降到 120——全靠调低 O 值。MBB 问：「Checksum 探测度变了吗？」沉默。正确动作：离线烧录 100% 比对、X-Ray SL 全检写进 **探测度 2**。",
    dialogue: [
      { who: "BB", line: "O 值下调 RPN 就安全了。" },
      { who: "MBB", line: "问探测度：现场能不能 100% 拦住错版？" },
    ],
    sigmaStory:
      "**PFMEA** 按工艺段分行：离线烧录错版 S 高、U12 空洞 S 高、车身继电器浮高独立行。**探测度** 必须对应实物控制（Checksum、X-Ray、FCT 探针），不是「加强检验」口号。",
    tools: ["PFMEA", "RPN", "探测度/发生度/严重度"],
    pitfall: "仅降 O 值不加强探测 —— 审计红灯。",
    applyNow: "写 1 行 PFMEA：ADAS 离线烧录错版，含 S/O/D 各 1 词理由。",
    funFact: "RPN 不是化妆：**数字小了，探测得真。**",
  },
  9: {
    title: "RSM 稳健区：不是「最陡的坡」而是「平台」",
    station: "试产中心 · Profile 优化看板",
    products: ["ADAS DCU-A", "中控 HU"],
    dmaicTag: "Improve · RSM · 稳健参数",
    scene:
      "响应曲面找到空洞最低区，但边界窄。HU 线想共用 ADAS 参数。MBB：**「产品不同，稳健区不同；复制要实验，不是复制 Excel。」**",
    dialogue: [
      { who: "HU 线长", line: "ADAS 参数我们抄一份？" },
      { who: "MBB", line: "抄逻辑不抄数字——先确认 HU 的 BGA 尺寸。" },
    ],
    sigmaStory:
      "**RSM** 找稳健平台而非单点最优。Improve 结束要有 **确认运行 3 批** 与 **控制计划预演**。MBB 关注：是否影响车身 FCT-04 回归。",
    tools: ["RSM", "确认运行", "Pugh 矩阵"],
    pitfall: "HU 与 ADAS 共用未评审的 Profile。",
    applyNow: "用一句话定义「稳健」对你工段意味着什么。",
    funFact: "量产爱平台，不爱悬崖。",
  },
  10: {
    title: "控制计划墙上：Checksum 100% 不是「写在纸上」",
    station: "产线尾端 · 控制计划电子看板 · FCT-05",
    products: ["五产品全矩阵"],
    dmaicTag: "Control · SPC · 控制计划",
    scene:
      "审核员抽检控制计划：ADAS 行写「离线烧录 Checksum 100%」，现场却是抽检 10%。MBB 带着班长重做：**反应计划** 要写停线码、追溯字段、谁有权放行。",
    dialogue: [
      { who: "班长", line: "100% 太慢，我们抽检 10%。" },
      { who: "MBB", line: "计划写 100% 就要 100%——反应计划写停线码。" },
    ],
    sigmaStory:
      "**Control** 把 Improve 成果固化：I-MR/p 图选对、**Western Electric 规则**培训、**反应计划**可执行。追溯字段：Program_ID、烧录批次、X-Ray 阶段、PCB_ID。",
    tools: ["控制计划", "p 图/I-MR", "反应计划"],
    pitfall: "控制图代替 MSA；计划与现场不一致。",
    applyNow: "写 1 条反应计划：当 Eth p 图越界时，第一步做什么。",
    funFact: "控制计划是 **刹车系统**，不是 **备忘录**。",
  },
  11: {
    title: "QFD 屋顶：OEM 要时延，EMS 改什么焊盘？",
    station: "DFSS 研讨室 · 质量屋白板",
    products: ["ADAS DCU-A", "座舱 DCU-C"],
    dmaicTag: "DFSS · QFD · DMADV",
    scene:
      "OEM VOC：「感知时延 < 80ms」。团队争论加散热还是加算力。MBB 引导 QFD：**「先关联到 SOC BGA、镜像大小、FCT 场景库——DFSS 不是堆功能。」**",
    dialogue: [
      { who: "结构工程师", line: "加散热鳍片够不够？" },
      { who: "MBB", line: "先问：时延 CTQ 落在镜像、算力还是 FCT 场景？" },
    ],
    sigmaStory:
      "**DFSS/DMADV** 把 VOC 翻译成 **可设计 CTQ**（镜像、焊盘、散热、烧录容量）。Verify 不能跳过 **离线烧录镜像** 与 **FCT 场景覆盖**。",
    tools: ["QFD", "DMADV", "Pugh 概念选择"],
    pitfall: "DFSS 跳过离线烧录设计；QFD 一人打分。",
    applyNow: "写 1 条 VOC→CTQ 链条（动词+可测）。",
    funFact: "质量屋像翻译官：**客户话 → 工程话。**",
  },
  12: {
    title: "第一波复制：ADAS 模板能否拯救 HU 线？",
    station: "集团 EMS 培训室 · 四模板看板",
    products: ["HU", "IC", "DCU-C", "DCU-A", "DCU-B"],
    dmaicTag: "部署 · Kotter · 模板复制",
    scene:
      "总部要求 90 天复制「ADAS 空洞模板」到 HU。HU 班长抗议：「我们没有 U12 大 BGA！」MBB 调整：**先复制「分层 FCT + 烧录版本系统」，再复制「因子设置」。**",
    dialogue: [
      { who: "HU 班长", line: "空洞模板对我们不适用！" },
      { who: "MBB", line: "先复制版本门禁和 FCT 分层，再谈 DOE 因子。" },
    ],
    sigmaStory:
      "**组织部署** 看复制率与 waves：Kotter/ADKAR 要配 **项目漏斗**。MBB 防止「工具先行无项目」；仪表 IC 线也要纳入第一波，否则数据孤岛。",
    tools: ["Kotter 8 步", "ADKAR", "模板 A–D"],
    pitfall: "采购 Minitab 许可但没有项目支撑。",
    applyNow: "列出 1 个「可复制」项 + 1 个「不可直接复制」项及原因。",
    funFact: "复制不是复印：**改页码，不改结论。**",
  },
  13: {
    title: "辅导椅上的 BB：「我帮你跑 Minitab 吧」",
    station: "MBB 办公室 · GROW 对话 · 双屏 FCT 数据",
    products: ["车身 DCU-B", "ADAS DCU-A"],
    dmaicTag: "MBB 辅导 · GROW · Rubric",
    scene:
      "BB 说：「车身 CAN 间歇，我帮你把 Minitab 跑完。」MBB 推开键盘：**「你讲，我问；FCT-04 数据你自己拉。我只评审证据链。」** 五分钟后 BB 发现自己混了 FCT-05 批次。",
    dialogue: [
      { who: "BB", line: "张工你帮我跑一下回归？" },
      { who: "MBB", line: "先说 FCT-04 的 Program_ID 分层——我不代劳。" },
    ],
    sigmaStory:
      "**MBB 辅导** 用 GROW + **项目 Rubric**：不代做分析，给 **可执行反馈**（「补离线烧录/SMT 分层」）。评审口语：混杂、无 MSA、无效应量 —— 对应 Rubric 1–5 分。",
    tools: ["GROW", "BB 项目 Rubric", "可执行反馈句"],
    pitfall: "MBB 代做统计并签署控制计划。",
    applyNow: "写 1 句 GROW 的 R（Reality）提问，逼 BB 说工站号。",
    funFact: "好教练像后视镜：**你不替开车，但让你看见盲区。**",
  },
  14: {
    title: "毕业答辩：15 分钟讲完四段工艺证据链",
    station: "OEM 远程评审 · ADAS SCAR Capstone",
    products: ["ADAS DCU-A"],
    dmaicTag: "Capstone · 答辩 · ROI",
    scene:
      "学员开场：「我们改善了质量。」OEM 打断：「Eth 基线？Checksum 门禁？SL 与 MP X-Ray 切换日？」MBB 在旁微笑——这是 **最后一课：把 14 模块压成 15 分钟故事线**。",
    dialogue: [
      { who: "学员", line: "我们团队很努力，质量提升了。" },
      { who: "OEM", line: "Eff 基线数字？四段工艺证据各一行。" },
    ],
    sigmaStory:
      "**Capstone** 结构：问题与效益 → **离线烧录/SMT/X-Ray/FCT 四段证据** → 车身/座舱无回归 → ASIL 边界 → 复制计划。L1 满分 ≠ 企业 MBB；答辩看 **可教、可审、可谈 ROI**。",
    tools: ["答辩大纲", "证据链", "ROI 3 分钟陈述"],
    pitfall: "声称「14 天=MBB 资质」；只有 FCT 截图无工艺段。",
    applyNow: "写 3min 大纲：四段工艺各 1 句 + 1 个数字。",
    funFact: "答辩像电梯演讲：**一层工艺，一句证据。**",
  },
};

module.exports = { FACTORY_SCENARIOS };
