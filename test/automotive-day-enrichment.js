/**
 * 汽车电子 EMS — 每日培训深化 + 与考核题 1:1 对齐
 * 工艺段：离线烧录(SMT前) | SMT·BGA | 手插/波峰 | 装配 | ICT/FCT
 */
const PROCESS_FLOW = `离线烧录(SMT前) → SMT(印刷/SPI/贴片/回流/AOI) → X-Ray(SL全检/MP抽检) → 手插/波峰 → ICT → FCT → 装配/EOL`;

const PRODUCTS = {
  ic: "组合仪表 IC — MCU 预烧、扭矩/ICT、FCT-IC-01",
  hu: "中控 HU — eMMC+主控、DDR BGA、FCT-HU-02",
  dcuC: "座舱域控 DCU-C — MCU+Switch+eMMC、关键 BGA、FCT-DCU-C-03",
  dcuB: "车身域控 DCU-B — MCU 离线烧录、继电器/接插件手插、FCT-DCU-B-04 独立台、CAN/LIN",
  dcuA: "ADAS 域控 DCU-A — SOC+eMMC 离线烧录、大 BGA(U12)、FCT-DCU-A-05、Eth/CAN",
};

const { PRODUCT_MATRIX_FULL, renderMatrixTableHtml } = require("./product-matrix-full");

/** @type {Record<number, object>} */
const DAY_ENRICHMENT = {
  1: {
    focus: "战略 + 五产品四段工艺地图",
    conceptAdd:
      "汽车电子 EMS 的黑带项目必须按「产品 × 工艺段」建基线：离线烧录错版在 SMT 前就应拦截；BGA 空洞在 SMT/X-Ray 段度量；车身与 ADAS 的 FCT 禁止混批统计。",
    deepDive: {
      title: "五类产品 × 四段工艺（贵司）",
      bullets: [
        "离线烧录@SMT前：ADAS 烧 SOC+eMMC 镜像；车身烧 MCU+CAN 矩阵 Boot",
        "SMT：SPI 体积 → 贴片 → 回流 Profile# → AOI 空洞%",
        "X-Ray：Safe Launch 100% 全检；量产后 CSR 抽检（Analyze 须标切换日）",
        "手插：车身域控继电器座浮高是独立 PFMEA 行",
        "FCT：DCU-B 用 FCT-04；DCU-A 用 FCT-05；程序与数据隔离",
      ],
      table: PRODUCT_MATRIX_FULL.rows.map((r) => [r[0], r[1], r[4]]),
      fullMatrix: true,
    },
    exercises: [
      "在 process-routing 表标出：贵司三条现场规则（SMT前离线烧录 / X-Ray SL·MP / 车身独立 FCT）",
      "用 SIPOC 画 ADAS 域控：供应商料 → 离线烧录 → SMT → FCT → OEM",
      "说明：为何 FCT 良率不能用 Cpk（应用 p 图）",
    ],
    homeworkHint: "须含：五产品、四工艺段、FCT 工站号、X-Ray SL/MP 切换；并完成 site-config 问卷",
    mcq: [
      {
        q: "贵司 ADAS/车身域控「离线烧录」应在何时完成？",
        options: [
          { v: "a", t: "全部在 SMT 贴片之前，Checksum 100% 比对", correct: true },
          { v: "b", t: "回流焊后对成品板补烧 SOC", correct: false },
          { v: "c", t: "仅 FCT 失败后再返工烧录", correct: false },
          { v: "d", t: "与中控 HU 共用同一条烧录程序不核对版本", correct: false },
        ],
      },
      {
        q: "分析「车身域控 CAN 间歇」时，FCT 数据应取自哪一工站？",
        options: [
          { v: "a", t: "FCT-DCU-B-04，且不得混入 ADAS FCT-05 批次", correct: true },
          { v: "b", t: "任意域控柔性线合并统计", correct: false },
          { v: "c", t: "仅看 SMT AOI，不看 FCT", correct: false },
          { v: "d", t: "OEM 整车路试数据库", correct: false },
        ],
      },
      {
        q: "BGA 空洞率属于哪类数据？应优先用什么图？",
        options: [
          { v: "a", t: "连续/计量型 — SPI、AOI 空洞% 用 I-MR 或 Cpk（MSA 先合格）", correct: true },
          { v: "b", t: "属性型 — 直接对空洞% 做 Cpk 无需 MSA", correct: false },
          { v: "c", t: "与 FCT 一次通过率相同，合并做 p 图", correct: false },
          { v: "d", t: "仅记录不需控制图", correct: false },
        ],
      },
      {
        q: "MBB 在 ADAS SCAR 项目中的首要职责？",
        options: [
          { v: "a", t: "教练 BB、阶段门评审、跨工艺段证据链，不代替做分析", correct: true },
          { v: "b", t: "代替 BB 操作 Minitab 并签署控制计划", correct: false },
          { v: "c", t: "只审 FCT 不加查离线烧录/SMT", correct: false },
          { v: "d", t: "合并五类产品数据求总良率", correct: false },
        ],
      },
      {
        q: "【纠错】SPI Cpk=1.9 能否证明 ADAS Eth FCT 一定合格？",
        options: [
          { v: "a", t: "否；须 CTQ 对齐、MSA 合格，且 FCT 用 p 图/缺陷矩阵链到离线烧录/BGA", correct: true },
          { v: "b", t: "能；Cpk>1.33 即客户满意", correct: false },
          { v: "c", t: "能；SPI 只管焊膏，与软件版本无关", correct: false },
          { v: "d", t: "能；忽略 X-Ray 阶段", correct: false },
        ],
      },
    ],
    keywords: ["工艺段", "离线烧录", "smt", "bga", "fct", "dcu", "域控", "sipoc", "routing"],
  },
  2: {
    focus: "Define — ADAS SCAR Charter",
    conceptAdd:
      "问题陈述示例：「ADAS 域控 FCT Eth 一次通过率由 99.2% 降至 97.1%（n=连续 20 批）」— 禁止写「加强烧录管理」当问题。范围必须写明：离线烧录/SMT/手插/装配/FCT，排除整车路测。",
    deepDive: {
      title: "ADAS SCAR — CTQ 按工艺段分解",
      bullets: [
        "VOC→CTQ：Eth 丢包率、启动时延、功能安全相关项（界定 ASIL 边界）",
        "离线烧录 CTQ：SOC_FW + eMMC_IMG Checksum 与 CSR 一致",
        "SMT CTQ：SPI 体积%、U12 空洞%、Profile#ADAS-04",
        "FCT CTQ：Eth/CAN 环回 100% 项、工站 FCT-DCU-A-05",
      ],
    },
    exercises: [
      "写 ADAS 问题陈述（含基线%、样本窗、不含对策）",
      "列 4 段 SIPOC：离线烧录器#7 → SMT 线#5 → （手插若适用）→ FCT-05",
      "CTQ 树：OEM「感知可靠」→ Eth 误码率 / 启动时延",
    ],
    homeworkHint: "Charter 含：范围四段工艺、Champion、硬效益（ppm/报废）、软件版本追溯字段",
    mcq: [
      {
        q: "「降低 ADAS FCT 不良」适合作为问题陈述吗？",
        options: [
          { v: "a", t: "否；应改为可测量指标如 Eth 一次通过率%、时间范围", correct: true },
          { v: "b", t: "是；足够清晰", correct: false },
          { v: "c", t: "是；可加上「上 X-Ray」", correct: false },
          { v: "d", t: "否；应写「员工加强检验」", correct: false },
        ],
      },
      {
        q: "ADAS 域控 Charter 范围应止于？",
        options: [
          { v: "a", t: "EMS 出厂 FCT/EOL；不含 OEM 整车路测", correct: true },
          { v: "b", t: "OEM 售后市场", correct: false },
          { v: "c", t: "仅 SMT 段", correct: false },
          { v: "d", t: "仅离线烧录", correct: false },
        ],
      },
      {
        q: "车身域控 DCU-B 与 ADAS 的 CTQ 能否共用同一 FCT 项清单？",
        options: [
          { v: "a", t: "否；车身 CAN/LIN 与 ADAS Eth 程序/工站不同", correct: true },
          { v: "b", t: "是；都是域控", correct: false },
          { v: "c", t: "是；合并降本", correct: false },
          { v: "d", t: "仅合并统计不合并程序", correct: false },
        ],
      },
      {
        q: "Define 阶段门被否决的常见原因？",
        options: [
          { v: "a", t: "范围含全厂所有产品且无 Champion", correct: true },
          { v: "b", t: "已列出 BGA 位号 U12", correct: false },
          { v: "c", t: "已附 process-routing 表", correct: false },
          { v: "d", t: "已区分 SL/MP X-Ray", correct: false },
        ],
      },
      {
        q: "【纠错】章程写「立即更换钢网并收紧 Profile」？",
        options: [
          { v: "a", t: "否；对策属 Improve，问题陈述只描述可测量症状", correct: true },
          { v: "b", t: "是；Define 就要写方案", correct: false },
          { v: "c", t: "是；MBB 要求", correct: false },
          { v: "d", t: "可以；写在 VOC 里", correct: false },
        ],
      },
    ],
    keywords: ["charter", "ctq", "voc", "adas", "eth", "问题陈述", "sipoc", "checksum"],
  },
  3: {
    focus: "Measure — 分段数据计划",
    conceptAdd:
      "FCT 一次通过率、离线烧录错版率是属性数据 → p/np 图；SPI 体积、BGA 空洞%、扭矩是计量数据 → I-MR/Xbar-R/Cpk。数据计划按工艺段分表，字段须能追溯到 Profile#、烧录批次、X-Ray 阶段(SL/MP)。",
    deepDive: {
      title: "数据字典（按段）",
      bullets: [
        "离线烧录：Program_ID、Checksum_OK、烧录器#、批次",
        "SMT：SPI_vol%、炉温 Profile#、AOI_void%、PCB_ID",
        "手插：不良代码（浮高/通断）、波峰#2（车身）",
        "FCT：Fail_code、工站号、SOC_FW（须与离线烧录一致）",
      ],
    },
    exercises: [
      "为 SPI 体积写操作定义（钢网 ID、测点、单位 %）",
      "说明 FCT 良率分层：DCU-A / DCU-B 分表",
      "选图：离线烧录错版率用 p 还是 Xbar-R",
    ],
    mcq: [
      {
        q: "ADAS 域控「离线烧录 SOC 错版率」宜用哪种图？",
        options: [
          { v: "a", t: "p 图或 np 图（属性数据）", correct: true },
          { v: "b", t: "I-MR 对错版 0/1 求 Cpk", correct: false },
          { v: "c", t: "与 SPI 体积合并 Xbar-R", correct: false },
          { v: "d", t: "不需要图", correct: false },
        ],
      },
      {
        q: "BGA U12「空洞率%」收集计划必含？",
        options: [
          { v: "a", t: "操作定义、AOI/X-Ray 判定标准、Profile#、抽样与 SL/MP 阶段标记", correct: true },
          { v: "b", t: "仅 FCT 失败后再量测", correct: false },
          { v: "c", t: "只测首件不记炉温", correct: false },
          { v: "d", t: "与员工班次无关", correct: false },
        ],
      },
      {
        q: "车身域控手插「继电器浮高」数据应如何分层？",
        options: [
          { v: "a", t: "按 DCU-B 线体/波峰#2/班次，不与 ADAS SMT 合并", correct: true },
          { v: "b", t: "与 ADAS BGA 空洞合并求平均", correct: false },
          { v: "c", t: "只记 FCT-05", correct: false },
          { v: "d", t: "用 Likert 均值即可", correct: false },
        ],
      },
      {
        q: "比较「X-Ray 全检期 vs 抽检期」空洞不良应？",
        options: [
          { v: "a", t: "两阶段分层 + 标注切换日期，避免混杂", correct: true },
          { v: "b", t: "合并全年数据求总平均", correct: false },
          { v: "c", t: "删除抽检期数据", correct: false },
          { v: "d", t: "只分析 ICT", correct: false },
        ],
      },
      {
        q: "【纠错】FCT 良率样本「越多越好」？",
        options: [
          { v: "a", t: "否；须定义抽样窗、成本，且注意独立批次假设", correct: true },
          { v: "b", t: "是；无限抽即可", correct: false },
          { v: "c", t: "是；可跨产品合并", correct: false },
          { v: "d", t: "否；不要记录 Fail_code", correct: false },
        ],
      },
    ],
    keywords: ["数据计划", "p图", "spi", "操作定义", "分层", "profile", "fail_code"],
  },
  4: {
    focus: "MSA — SPI / 烧录 / BGA 空洞 / FCT 探针",
    conceptAdd:
      "SPI %GRR 评估「焊膏体积」测量；烧录 Checksum 比对设备做属性 GR&R；BGA 空洞 AOI 与 X-Ray 一致性研究；FCT 探针接触为计数型 GRR。%R&R>30% 时禁止仅报 SPI Cpk 给客户。",
    deepDive: {
      title: "分工艺段 MSA 清单（示例）",
      bullets: [
        "SMT：SPI#3 体积 — 交叉型 GRR，目标 %GRR<10%",
        "离线烧录：Checksum 比对 — 研究再现性（不同烧录器#）",
        "BGA：AOI 空洞 vs AXI#2 金标准一致性",
        "测试：FCT 探针 — 接触电阻/误测率",
      ],
    },
    exercises: [
      "解读 spi-msa.csv：%GRR 是否可接受",
      "说明：为何不对 FCT 通过率做 Cpk",
      "列出车身手插通断检 MSA 计划一行",
    ],
    mcq: [
      {
        q: "离线烧录「Checksum 一次通过率」应如何评价 MS？",
        options: [
          { v: "a", t: "属性测量 GR&R 或 Kappa；目标错版检出可靠", correct: true },
          { v: "b", t: "直接做 Cpk，USL=100%", correct: false },
          { v: "c", t: "无需 MSA，100% 比对即可", correct: false },
          { v: "d", t: "与 SPI 体积同一 GRR 研究", correct: false },
        ],
      },
      {
        q: "SPI %GRR=32% 时，MBB 应？",
        options: [
          { v: "a", t: "暂停对外报 SPI Cpk，先改进测量系统/钢网再现性", correct: true },
          { v: "b", t: "照常报 Cpk=1.8 给客户", correct: false },
          { v: "c", t: "改报 FCT p 图代替", correct: false },
          { v: "d", t: "仅重做 ADAS FCT", correct: false },
        ],
      },
      {
        q: "BGA 空洞判定：AOI 与 X-Ray 不一致时？",
        options: [
          { v: "a", t: "以 CSR 规定金标准为准，做 MSA 一致性/偏倚研究", correct: true },
          { v: "b", t: "取两者平均值报 Cpk", correct: false },
          { v: "c", t: "只信 AOI 取消 X-Ray", correct: false },
          { v: "d", t: "只信工人目检", correct: false },
        ],
      },
      {
        q: "Cp 高 Cpk 低在 SMT SPI 上通常意味着？",
        options: [
          { v: "a", t: "体积变异尚可但中心偏移（钢网/压力/刮刀）", correct: true },
          { v: "b", t: "FCT 程序错误", correct: false },
          { v: "c", t: "离线烧录版本对", correct: false },
          { v: "d", t: "手插浮高", correct: false },
        ],
      },
      {
        q: "【纠错】BGA 空洞% 与 FCT Eth 失败可用同一 Cpk 报告？",
        options: [
          { v: "a", t: "否；不同 CTQ、不同测量系统，FCT 用 p 图", correct: true },
          { v: "b", t: "是；都是质量指标", correct: false },
          { v: "c", t: "是；合并更省事", correct: false },
          { v: "d", t: "否；都不要 MSA", correct: false },
        ],
      },
    ],
    keywords: ["msa", "grr", "spi", "cpk", "aoi", "x-ray", "checksum", "探针"],
  },
  5: {
    focus: "Analyze — 缺陷-过程矩阵 + ADAS FCT",
    conceptAdd:
      "用缺陷-过程矩阵：行=Eth_FAIL/CAN_FAIL/Checksum_FAIL；列=离线烧录/SMT/手插/装配。卡方或对比检验比较「错版批次 vs 正常批次」FCT；须对比 X-Ray SL 全检期与 MP 抽检期的空洞 Pareto。",
    deepDive: {
      title: "ADAS SCAR 假设检验路径",
      bullets: [
        "H0：离线烧录版本与 FCT 失败独立 — 用列联表/卡方",
        "两样本：SL 期 vs MP 期 U12 空洞率 — 2 样本 t 或 Mann-Whitney",
        "禁止：合并 DCU-B 车身 FCT 数据",
      ],
    },
    exercises: [
      "填缺陷-过程矩阵（至少 3 行缺陷 × 4 列工艺）",
      "用 fct-yield.csv 说明如何按 SOC_FW 分层",
      "解释 p=0.03 但 Eth 改善 0.05% 是否实施",
    ],
    mcq: [
      {
        q: "ADAS Eth 失败上升，首先应排除？",
        options: [
          { v: "a", t: "HU 中控程序误测、车身 FCT-04 数据混入", correct: true },
          { v: "b", t: "SPI 已合格", correct: false },
          { v: "c", t: "仪表 IC 扭矩", correct: false },
          { v: "d", t: "OEM 品牌", correct: false },
        ],
      },
      {
        q: "离线烧录 SOC v2.4.0/v2.4.1 混杂，适宜分析？",
        options: [
          { v: "a", t: "按 Program_ID 分层对比 FCT 通过率/缺陷 Pareto", correct: true },
          { v: "b", t: "全厂总良率 t 检验", correct: false },
          { v: "c", t: "只问产线班长", correct: false },
          { v: "d", t: "忽略版本", correct: false },
        ],
      },
      {
        q: "X-Ray 由 SL 全检改为 MP 抽检后空洞漏检，Analyze 应？",
        options: [
          { v: "a", t: "标注切换日，分阶段 Pareto + 与 FCT 失败时间对齐", correct: true },
          { v: "b", t: "删除抽检期", correct: false },
          { v: "c", t: "只分析装配扭矩", correct: false },
          { v: "d", t: "停止 X-Ray", correct: false },
        ],
      },
      {
        q: "「操作员不认真」作为根因？",
        options: [
          { v: "a", t: "MBB 否决；改为可测因素如 Checksum 门禁、Profile 漂移", correct: true },
          { v: "b", t: "接受；加培训即可", correct: false },
          { v: "c", t: "接受；扣绩效", correct: false },
          { v: "d", t: "写入 PFMEA 即可", correct: false },
        ],
      },
      {
        q: "【纠错】p=0.04 就全产线换钢网？",
        options: [
          { v: "a", t: "否；须效应量、成本、锁定 SMT 段证据", correct: true },
          { v: "b", t: "是；显著就行", correct: false },
          { v: "c", t: "是；只改 FCT", correct: false },
          { v: "d", t: "否；永远不要显著", correct: false },
        ],
      },
    ],
    keywords: ["缺陷矩阵", "卡方", "eth", "u12", "分层", "x-ray", "错版", "fct"],
  },
  6: {
    focus: "DOE — Profile / SPI 参数",
    conceptAdd:
      "确认性 DOE：回流 Peak、TAL、冷却速率对 U12 空洞%；或刮刀压力/速度对 SPI 体积。运行序随机；板卡须 BOM 等效；Profile# 变更走 ECN。",
    deepDive: {
      title: "2³ 示例因子（SMT）",
      bullets: [
        "A 峰值温度、B 液相线以上时间、C 冷却斜率 → 响应：空洞%",
        "交互显著 → 不可单因子优化",
        "外推禁止：计算机最优须确认运行",
      ],
    },
    mcq: [
      {
        q: "回流焊 DOE 响应变量宜选？",
        options: [
          { v: "a", t: "U12 BGA 空洞%（AOI/X-Ray 同标准）", correct: true },
          { v: "b", t: "员工满意度", correct: false },
          { v: "c", t: "仓库存货天数", correct: false },
          { v: "d", t: "FCT 程序行数", correct: false },
        ],
      },
      {
        q: "DOE 运行序必须？",
        options: [
          { v: "a", t: "随机化，防时间混杂", correct: true },
          { v: "b", t: "按温度从低到高", correct: false },
          { v: "c", t: "只做一次", correct: false },
          { v: "d", t: "由班长决定", correct: false },
        ],
      },
      {
        q: "交互项显著（温度×时间）意味着？",
        options: [
          { v: "a", t: "不能固定时间单独调温度", correct: true },
          { v: "b", t: "删除交互即可", correct: false },
          { v: "c", t: "DOE 失败", correct: false },
          { v: "d", t: "只改离线烧录", correct: false },
        ],
      },
      {
        q: "Minitab 最优在试验区外？",
        options: [
          { v: "a", t: "须追加确认运行，禁止直接量产", correct: true },
          { v: "b", t: "直接写入 Profile#ADAS-04", correct: false },
          { v: "c", t: "只改控制计划文字", correct: false },
          { v: "d", t: "忽略", correct: false },
        ],
      },
      {
        q: "【纠错】观察性「炉温高→空洞高」可当因果？",
        options: [
          { v: "a", t: "否；须 DOE 或受控干预验证", correct: true },
          { v: "b", t: "是；相关即可", correct: false },
          { v: "c", t: "是；写 PFMEA 即可", correct: false },
          { v: "d", t: "否；永远不要 DOE", correct: false },
        ],
      },
    ],
    keywords: ["doe", "profile", "空洞", "spi", "交互", "随机", "ecN"],
  },
  7: {
    focus: "阶段门 — ADAS SCAR",
    conceptAdd:
      "阶段门证据按工艺段装订：Measure=分段 MSA+基线；Analyze=缺陷矩阵+错版/X-Ray 分层；通过须证明 DCU-B 无回归。",
    deepDive: {
      title: "ADAS SCAR 阶段门检查单",
      bullets: [
        "Measure：SPI/烧录/BGA 空洞 MSA + FCT 基线（仅 FCT-05）",
        "Analyze：U12 空洞 Pareto、SOC 版本列联、X-Ray SL→MP 日期",
        "Improve/Control：Profile#、控制计划、Safe Launch 3 批",
      ],
    },
    exercises: ["列 Measure 门 5 项证据", "写 Analyze 门打回条件（混杂/无分层）"],
    homeworkHint: "阶段门纪要：各段证据页码、签字、对车身域控外溢评估",
    mcq: [
      {
        q: "Measure 门对 ADAS 项目的核心证据？",
        options: [
          { v: "a", t: "分段 MSA 合格 + 离线烧录/SMT/FCT 基线", correct: true },
          { v: "b", t: "仅口头汇报", correct: false },
          { v: "c", t: "仅 HU 数据", correct: false },
          { v: "d", t: "跳过 MSA", correct: false },
        ],
      },
      {
        q: "Analyze 门打回理由？",
        options: [
          { v: "a", t: "根因未验证、混杂五类产品、无 X-Ray 阶段分层", correct: true },
          { v: "b", t: "已附缺陷-过程矩阵", correct: false },
          { v: "c", t: "已区分 DCU-A/B", correct: false },
          { v: "d", t: "已做卡方", correct: false },
        ],
      },
      {
        q: "故事板对 OEM 汇报应含？",
        options: [
          { v: "a", t: "工艺段证据链、效益、复制与未决风险", correct: true },
          { v: "b", t: "仅 Minitab 截图", correct: false },
          { v: "c", t: "仅 FCT 程序代码", correct: false },
          { v: "d", t: "员工名单", correct: false },
        ],
      },
      {
        q: "证明对车身域控无回归应？",
        options: [
          { v: "a", t: "DCU-B 独立 FCT-04 批对比，无异常趋势", correct: true },
          { v: "b", t: "不测车身", correct: false },
          { v: "c", t: "合并 ADAS+车身良率", correct: false },
          { v: "d", t: "只改 ADAS 程序", correct: false },
        ],
      },
      {
        q: "【纠错】阶段门可口头通过？",
        options: [
          { v: "a", t: "否；须文档化证据与签字", correct: true },
          { v: "b", t: "是；Champion 忙", correct: false },
          { v: "c", t: "是；BB 决定", correct: false },
          { v: "d", t: "是；只改 X-Ray", correct: false },
        ],
      },
    ],
    keywords: ["阶段门", "故事板", "回归", "dcu-b", "证据链"],
  },
  8: {
    focus: "Improve — PFMEA 四段",
    conceptAdd:
      "PFMEA 按离线烧录/SMT/手插/装配/FCT 分行：离线烧录错版 S=10；ADAS U12 空洞 S=9；车身手插浮高 S=8；探测度须对应 X-Ray、Checksum 门禁。",
    deepDive: {
      title: "PFMEA 工艺段行（示例）",
      bullets: [
        "离线烧录@SMT前：SOC 镜像错版 — 探测度 2（Checksum）",
        "SMT：U12 空洞 — 关联 Profile#、AOI、AXI",
        "手插：DCU-B 继电器浮高 — 通断检",
        "FCT：禁止用重测掩盖 SMT/离线烧录问题",
      ],
    },
    exercises: ["pfmea 填 ADAS 离线烧录+SMT 各 1 行", "车身手插浮高 1 行 RPN 排序"],
    homeworkHint: "pfmea-electronics：ADAS+车身各≥2 行；含 S/O/D 与对策",
    mcq: [
      {
        q: "离线烧录错版在 PFMEA 中严重度 S 典型？",
        options: [
          { v: "a", t: "9–10（功能安全/整车风险相关）", correct: true },
          { v: "b", t: "2–3", correct: false },
          { v: "c", t: "只看外观", correct: false },
          { v: "d", t: "与扭矩相同", correct: false },
        ],
      },
      {
        q: "车身域控手插「浮高」对策优先级？",
        options: [
          { v: "a", t: "治具 MSA + 通断检防错，独立 PFMEA 行", correct: true },
          { v: "b", t: "加严 ADAS X-Ray", correct: false },
          { v: "c", t: "改 SOC 镜像", correct: false },
          { v: "d", t: "合并到 HU 线", correct: false },
        ],
      },
      {
        q: "BGA 空洞对策除 Profile 外可？",
        options: [
          { v: "a", t: "钢网清洗周期、SPI SPC、SL 期维持 100% X-Ray", correct: true },
          { v: "b", t: "仅增加 FCT 重测", correct: false },
          { v: "c", t: "取消 AOI", correct: false },
          { v: "d", t: "离线烧录不校验", correct: false },
        ],
      },
      {
        q: "Pugh 矩阵用于？",
        options: [
          { v: "a", t: "烧录门禁方案等多方案加权选型", correct: true },
          { v: "b", t: "代替 PFMEA", correct: false },
          { v: "c", t: "代替控制计划", correct: false },
          { v: "d", t: "算 Cpk", correct: false },
        ],
      },
      {
        q: "【纠错】只降 PFMEA 发生度 O 就够？",
        options: [
          { v: "a", t: "否；可能还需探测度 D、防错、X-Ray 策略", correct: true },
          { v: "b", t: "是；O 降了就结案", correct: false },
          { v: "c", t: "是；只改 FCT", correct: false },
          { v: "d", t: "否；不要 PFMEA", correct: false },
        ],
      },
    ],
    keywords: ["pfmea", "rpn", "浮高", "错版", "u12", "对策", "pugh"],
  },
  9: {
    focus: "RSM — SPI/空洞稳健区",
    conceptAdd:
      "确认运行：在 Profile#ADAS-04 稳健区内试产 3 批，每批离线烧录 0 错版、SL 期 X-Ray 全检、FCT≥99.5%。",
    deepDive: {
      title: "Safe Launch 验证批",
      bullets: ["批记录：烧录批次、炉温曲线号、X-Ray 阶段=SL", "响应：SPI Cpk、U12 空洞%、FCT Eth%"],
    },
    exercises: ["写 3 批 Safe Launch 判定标准", "说明外推禁止的边界"],
    homeworkHint: "含 Profile 稳健区截图或因子水平表 + 3 批结果表",
    mcq: [
      {
        q: "CCD 用于 ADAS 项目的典型响应？",
        options: [
          { v: "a", t: "SPI 体积% 或 U12 空洞% 的二次曲面", correct: true },
          { v: "b", t: "员工年龄", correct: false },
          { v: "c", t: "仓单数量", correct: false },
          { v: "d", t: "FCT 代码行数", correct: false },
        ],
      },
      {
        q: "Safe Launch 验证批 ADAS 须？",
        options: [
          { v: "a", t: "离线烧录 0 错版 + FCT≥目标 连续 3 批 + X-Ray SL 全检", correct: true },
          { v: "b", t: "只测 1 片", correct: false },
          { v: "c", t: "跳过 SPI", correct: false },
          { v: "d", t: "与车身合并批", correct: false },
        ],
      },
      {
        q: "响应曲面外推？",
        options: [
          { v: "a", t: "禁止；须边界内优化+确认运行", correct: true },
          { v: "b", t: "允许；计算机最优即可", correct: false },
          { v: "c", t: "只对 HU 允许", correct: false },
          { v: "d", t: "只对 ICT 允许", correct: false },
        ],
      },
      {
        q: "稳健区确认后写入？",
        options: [
          { v: "a", t: "Profile#、控制计划、PPAP 变更", correct: true },
          { v: "b", t: "仅 BB 笔记本", correct: false },
          { v: "c", t: "口头", correct: false },
          { v: "d", t: "FCT 程序注释", correct: false },
        ],
      },
      {
        q: "【纠错】优化器输出=可量产？",
        options: [
          { v: "a", t: "否；须现场确认运行与 FCT 验证", correct: true },
          { v: "b", t: "是；R²>0.9", correct: false },
          { v: "c", t: "是；MBB 签字即可", correct: false },
          { v: "d", t: "否；不要优化", correct: false },
        ],
      },
    ],
    keywords: ["rsm", "ccd", "safe launch", "profile", "稳健"],
  },
  10: {
    focus: "Control — 五产品控制计划",
    conceptAdd:
      "控制计划反应计划须写清：错版→停线隔离；SPI 低→停线清钢网；空洞超→复测 X-Ray；FCT 跌→追溯烧录+Profile。",
    deepDive: {
      title: "ADAS 控制计划关键行",
      bullets: [
        "050 离线烧录@SMT前 — Checksum 100%",
        "145 X-Ray — SL 全检 / MP 抽检切换条件",
        "420 FCT-05 — p 图 + Fail_code",
      ],
    },
    exercises: ["control-plan 标 ADAS X-Ray 切换条件", "车身 DCU-B 手插+ FCT-04 各 1 行"],
    homeworkHint: "五产品各≥1 工序；ADAS 含离线烧录/SPI/X-Ray/FCT",
    mcq: [
      {
        q: "ADAS 控制计划须单独一行？",
        options: [
          { v: "a", t: "离线烧录 100% Checksum、SPI SPC、X-Ray SL/MP、FCT p 图、装配扭矩", correct: true },
          { v: "b", t: "只写 FCT", correct: false },
          { v: "c", t: "与车身合并一行", correct: false },
          { v: "d", t: "只写目检", correct: false },
        ],
      },
      {
        q: "p 图 LCL 为负时？",
        options: [
          { v: "a", t: "改图或用精确二项限；FCT/错版率常用", correct: true },
          { v: "b", t: "忽略 LCL", correct: false },
          { v: "c", t: "改 Cpk", correct: false },
          { v: "d", t: "停 FCT", correct: false },
        ],
      },
      {
        q: "控制图特殊原因先查？",
        options: [
          { v: "a", t: "测量系统（SPI/探针）再庆祝发现", correct: true },
          { v: "b", t: "立即换人", correct: false },
          { v: "c", t: "直接结案", correct: false },
          { v: "d", t: "删点", correct: false },
        ],
      },
      {
        q: "反应计划须含追溯？",
        options: [
          { v: "a", t: "烧录批次、Profile#、X-Ray 阶段、PCB_ID", correct: true },
          { v: "b", t: "只写停线", correct: false },
          { v: "c", t: "不需要", correct: false },
          { v: "d", t: "只追溯 HU", correct: false },
        ],
      },
      {
        q: "【纠错】控制图可代替 MSA？",
        options: [
          { v: "a", t: "否；MS 须先稳定", correct: true },
          { v: "b", t: "是；万能", correct: false },
          { v: "c", t: "是；只对 BGA", correct: false },
          { v: "d", t: "否；不要控制图", correct: false },
        ],
      },
    ],
    keywords: ["控制计划", "p图", "spc", "反应计划", "追溯"],
  },
  11: {
    focus: "DFSS — ADAS NPI",
    conceptAdd:
      "新 ADAS 平台：QFD 将感知时延、ASIL 需求转化为 SOC BGA 焊盘设计、镜像大小、散热、离线烧录容量与 FCT 场景库。",
    deepDive: {
      title: "DMADV × 四段工艺",
      bullets: ["Define：OEM VOC+ASIL 边界", "Measure：NPI Pilot SPI/BGA/FCT MSA", "Verify：不可跳过离线烧录镜像 CTQ"],
    },
    exercises: ["质量屋 1 个 WHAT→HOW（如时延→镜像/Profile）", "界定 EMS vs OEM 验证边界"],
    homeworkHint: "含 QFD 一级展开 + 四段工艺特殊特性草案",
    mcq: [
      {
        q: "新 ADAS 平台应用 DFSS 因？",
        options: [
          { v: "a", t: "新 SOC BGA 设计+离线烧录镜像+新 FCT 场景", correct: true },
          { v: "b", t: "量产良率已稳定", correct: false },
          { v: "c", t: "只改标签", correct: false },
          { v: "d", t: "车身继电器", correct: false },
        ],
      },
      {
        q: "QFD 将「启动时延」转化为？",
        options: [
          { v: "a", t: "SOC 选型、镜像大小、SMT 散热与 FCT 用例", correct: true },
          { v: "b", t: "仓库位置", correct: false },
          { v: "c", t: "员工人数", correct: false },
          { v: "d", t: "只改包装", correct: false },
        ],
      },
      {
        q: "功能安全 ASIL 项在 EMS？",
        options: [
          { v: "a", t: "界定边界：EMS 负责工艺符合性，系统验证在 OEM", correct: true },
          { v: "b", t: "EMS 承担全部 ASIL 认证", correct: false },
          { v: "c", t: "忽略", correct: false },
          { v: "d", t: "只写 PFMEA S=1", correct: false },
        ],
      },
      {
        q: "DFSS Verify 段须？",
        options: [
          { v: "a", t: "Pilot 测量：SPI/BGA/FCT 与 MSA", correct: true },
          { v: "b", t: "无数据", correct: false },
          { v: "c", t: "只访谈", correct: false },
          { v: "d", t: "只改商标", correct: false },
        ],
      },
      {
        q: "【纠错】DFSS 可跳过离线烧录设计？",
        options: [
          { v: "a", t: "否；镜像版本是 CTQ，须在 SMT 前锁定", correct: true },
          { v: "b", t: "是；上线再烧", correct: false },
          { v: "c", t: "是；只信 FCT", correct: false },
          { v: "d", t: "否；不要 DFSS", correct: false },
        ],
      },
    ],
    keywords: ["dfss", "qfd", "asil", "npi", "soc", "verify"],
  },
  12: {
    focus: "部署 — 复制四段模板",
    conceptAdd:
      "复制包：烧录 MES 版本锁、BGA 空洞标准、X-Ray SL/MP 规则、分产品 FCT 工站程序、手插治具 PM 日历。",
    deepDive: {
      title: "可复制 BB 项目模板（四段）",
      bullets: ["模板 A：离线烧录错版 p 图", "模板 B：SPI+空洞", "模板 C：车身手插", "模板 D：ADAS FCT Eth"],
    },
    exercises: ["列 4 个可复制模板名称与适用产品", "ADKAR 对烧录员 Awareness 一项措施"],
    homeworkHint: "部署路线图：先 ADAS 线再车身线，含 Champion",
    mcq: [
      {
        q: "集团 EMS 复制首要？",
        options: [
          { v: "a", t: "烧录 MES 版本锁 + BGA 空洞标准 + 分产品 FCT 工站模板", correct: true },
          { v: "b", t: "只复制 ppt", correct: false },
          { v: "c", t: "合并所有域控产线", correct: false },
          { v: "d", t: "取消 X-Ray", correct: false },
        ],
      },
      {
        q: "Champion 在复制中的角色？",
        options: [
          { v: "a", t: "资源与阶段门，防范围漂移", correct: true },
          { v: "b", t: "写 FCT 代码", correct: false },
          { v: "c", t: "操作 SPI", correct: false },
          { v: "d", t: "代替 MBB", correct: false },
        ],
      },
      {
        q: "培训无项目配套？",
        options: [
          { v: "a", t: "证书墙失败模式", correct: true },
          { v: "b", t: "最佳实践", correct: false },
          { v: "c", t: "MBB 推荐", correct: false },
          { v: "d", t: "IATF 要求", correct: false },
        ],
      },
      {
        q: "手插治具 PM 属于？",
        options: [
          { v: "a", t: "车身域控段复制清单项", correct: true },
          { v: "b", t: "只针对 ADAS SOC", correct: false },
          { v: "c", t: "不需要", correct: false },
          { v: "d", t: "OEM 仓库", correct: false },
        ],
      },
      {
        q: "【纠错】工具先行无战略？",
        options: [
          { v: "a", t: "须链接 OEM SCAR/效益", correct: true },
          { v: "b", t: "可以；六西格玛=工具", correct: false },
          { v: "c", t: "可以；只学 Minitab", correct: false },
          { v: "d", t: "否；不要战略", correct: false },
        ],
      },
    ],
    keywords: ["部署", "复制", "mes", "champion", "模板"],
  },
  13: {
    focus: "MBB 辅导",
    conceptAdd:
      "辅导场景：BB 用 FCT-05 数据讲车身问题 — MBB 要求换 FCT-04 序列；BB 只加 FCT 重测 — MBB 要求补离线烧录/SMT 证据。",
    deepDive: {
      title: "MBB 辅导红线",
      bullets: ["禁止混杂 DCU-A/B/C FCT", "禁止 %RR>30% 仍报 Cpk", "要求工艺路由表贯穿批次"],
    },
    exercises: ["GROW 四问各写 1 句（针对 ADAS BB）", "Rubric 评 1 份作业 3 条反馈"],
    homeworkHint: "含 Rubric 四维打分示例 + 5 条可执行反馈",
    mcq: [
      {
        q: "BB 合并 ADAS+车身 FCT 数据，MBB？",
        options: [
          { v: "a", t: "打回；要求 FCT-04/05 分序列", correct: true },
          { v: "b", t: "表扬省时间", correct: false },
          { v: "c", t: "忽略", correct: false },
          { v: "d", t: "帮合并", correct: false },
        ],
      },
      {
        q: "GROW 的 G 指？",
        options: [
          { v: "a", t: "Goal 目标", correct: true },
          { v: "b", t: "GRR", correct: false },
          { v: "c", t: "Gate", correct: false },
          { v: "d", t: "Gage", correct: false },
        ],
      },
      {
        q: "MBB 辅导禁忌？",
        options: [
          { v: "a", t: "替 BB 做 Minitab 分析", correct: true },
          { v: "b", t: "问阶段门证据", correct: false },
          { v: "c", t: "挑战混杂", correct: false },
          { v: "d", t: "要求故事板", correct: false },
        ],
      },
      {
        q: "Rubric 5 分项目典型？",
        options: [
          { v: "a", t: "可复制+文档全+分工艺段证据", correct: true },
          { v: "b", t: "只完成 ppt", correct: false },
          { v: "c", t: "只改 FCT 重测", correct: false },
          { v: "d", t: "无 Champion", correct: false },
        ],
      },
      {
        q: "【纠错】MBB 只做技术？",
        options: [
          { v: "a", t: "否；含部署、战略、辅导", correct: true },
          { v: "b", t: "是；MBB=高级 BB", correct: false },
          { v: "c", t: "是；只审 Cpk", correct: false },
          { v: "d", t: "否；MBB 不做评审", correct: false },
        ],
      },
    ],
    keywords: ["grow", "rubric", "辅导", "混杂", "fct-04"],
  },
  14: {
    focus: "Capstone 答辩",
    conceptAdd:
      "答辩 15min 结构：问题与效益 → 四段证据（离线烧录/SMT/X-Ray/FCT）→ 对车身/座舱无回归 → ASIL 边界声明 → 复制计划。",
    deepDive: {
      title: "ADAS SCAR 答辩故事线",
      bullets: [
        "Why：Eth% 下降与 OEM 风险",
        "How：错版门禁+Profile+SL X-Ray",
        "So What：ppm/报废节约与 PPAP 变更号",
      ],
      table: [
        ["对比", "车身 DCU-B", "ADAS DCU-A"],
        ["关键段", "手插+CAN FCT-04", "BGA U12+Eth FCT-05"],
        ["数据", "独立 p 图", "独立缺陷矩阵"],
      ],
    },
    exercises: ["3min 口头大纲（四段工艺各 1 句）", "准备 OEM 可能问的 3 个尖锐问题"],
    homeworkHint: "毕业清单+答辩大纲；含五产品四段语汇",
    mcq: [
      {
        q: "ADAS SCAR 答辩须展示？",
        options: [
          { v: "a", t: "离线烧录/SMT/X-Ray/FCT 四段证据链与效益", correct: true },
          { v: "b", t: "仅 FCT 截图", correct: false },
          { v: "c", t: "仅 HU 案例", correct: false },
          { v: "d", t: "员工培训签到", correct: false },
        ],
      },
      {
        q: "与车身域控差异说明应？",
        options: [
          { v: "a", t: "DCU-B 手插+CAN FCT-04 vs DCU-A BGA+Eth", correct: true },
          { v: "b", t: "相同工艺", correct: false },
          { v: "c", t: "不必说明", correct: false },
          { v: "d", t: "合并讲", correct: false },
        ],
      },
      {
        q: "功能安全接口人关注点？",
        options: [
          { v: "a", t: "ASIL 边界、未越界承诺、数据脱敏", correct: true },
          { v: "b", t: "仓库温度", correct: false },
          { v: "c", t: "SPI 颜色", correct: false },
          { v: "d", t: "全部 ASIL 认证由 EMS 完成", correct: false },
        ],
      },
      {
        q: "%R&R=25% 仍报 Cpk 答辩？",
        options: [
          { v: "a", t: "MBB 应质疑测量系统先行", correct: true },
          { v: "b", t: "通过", correct: false },
          { v: "c", t: "加分", correct: false },
          { v: "d", t: "无关", correct: false },
        ],
      },
      {
        q: "【纠错】14 天课程=企业 MBB 资质？",
        options: [
          { v: "a", t: "否；还须多年项目组合与评审记录", correct: true },
          { v: "b", t: "是；自动认证", correct: false },
          { v: "c", t: "是；考试 60 分即可", correct: false },
          { v: "d", t: "否；课程无效", correct: false },
        ],
      },
    ],
    keywords: ["答辩", "capstone", "asil", "证据链", "dcu"],
  },
};

const PIPELINE_STEPS = [
  { label: "离线烧录@SMT前", accent: true },
  { label: "SMT·SPI" },
  { label: "回流·AOI" },
  { label: "X-Ray" },
  { label: "手插/波峰" },
  { label: "ICT" },
  { label: "FCT" },
  { label: "装配/EOL" },
];

function renderPipelineHtml(esc) {
  const parts = PIPELINE_STEPS.map((s, i) => {
    const cls = s.accent ? "step accent" : "step";
    const arrow = i < PIPELINE_STEPS.length - 1 ? '<span class="arrow">→</span>' : "";
    return `<span class="${cls}">${esc(s.label)}</span>${arrow}`;
  }).join("");
  return `<div class="process-pipeline" aria-label="工艺主线">${parts}</div>`;
}

function renderDeepDiveHtml(enrich, escFn) {
  const esc = escFn || ((s) => s);
  if (!enrich || !enrich.deepDive) return "";
  const dd = enrich.deepDive;
  let tableHtml = "";
  if (dd.fullMatrix) {
    tableHtml = renderMatrixTableHtml(esc);
  } else if (dd.table && dd.table.length) {
    const [head, ...rows] = dd.table;
    tableHtml = `<div class="table-wrap" style="margin-top:1.25rem"><table><thead><tr>${head
      .map((c) => `<th>${esc(c)}</th>`)
      .join("")}</tr></thead><tbody>${rows
      .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody></table></div>`;
  }
  return `<article class="card pro automotive-deep" id="sec-b2">
    <h2><span class="section-num">B+</span>本课与生产线对齐 · ${esc(dd.title || enrich.focus || "")}</h2>
    ${renderPipelineHtml(esc)}
    <ul class="obj-list">${(dd.bullets || []).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    ${tableHtml}
    <p class="exam-align-hint">▼ <strong>G 客观题</strong>与 <strong>F 作业</strong>仅考核本节要点（车身 FCT-04 / ADAS BGA·FCT-05）</p>
  </article>`;
}

function getMcqForDay(dayN) {
  const e = DAY_ENRICHMENT[dayN];
  return e && e.mcq ? e.mcq : [];
}

function getKeywordsForDay(dayN) {
  const e = DAY_ENRICHMENT[dayN];
  const base = e && e.keywords ? e.keywords : [];
  return [...new Set([...base, "离线烧录", "smt", "bga", "fct", "域控", "装配", "手插"])];
}

/** 同步到 homework-rubrics：每题 4 选项含 automotive 干扰项 */
function exportQuizBank() {
  const bank = {};
  for (let n = 1; n <= 14; n++) {
    const mcq = getMcqForDay(n);
    bank[n] = mcq.map((item) => [item.q, item.options.find((o) => o.correct).t]);
  }
  return bank;
}

module.exports = {
  DAY_ENRICHMENT,
  PROCESS_FLOW,
  PRODUCTS,
  PRODUCT_MATRIX_FULL,
  renderDeepDiveHtml,
  renderMatrixTableHtml,
  getMcqForDay,
  getKeywordsForDay,
  exportQuizBank,
};
