/**
 * 汽车电子 EMS — 仪表/中控/座舱·车身·ADAS 域控
 * 工艺段：离线烧录(SMT前) | SMT(含BGA) | 手插/波峰 | 装配 | 测试(ICT/FCT)
 */
/** 贵司现场 1:1 配置 — 写入课件与路由表 */
module.exports.SITE_CONFIG = {
  offlineTiming: "全部离线烧录在 SMT 之前完成",
  xrayPolicy: "BGA X-Ray：安全投产(Safe Launch) 100% 全检；量产后按 CSR 抽检",
  fctBodyDcu: "车身域控使用独立 FCT 工站 FCT-DCU-B-04（与座舱/ADAS 分机台）",
};

module.exports.AUTO_PRO = {
  1: {
    iso: "IATF 16949 + IPC-A-610；功能安全项目须界定 ASIL 边界",
    automotive: {
      iatf: "4.3 相关方；7.1.5 监视测量覆盖烧录器、炉温、扭矩枪",
      aiag: "CSR：追溯、ECN、软件版本、BGA 验收",
      scenario:
        "EMS 厂 5 类产品并行；贵司已锁定：①离线烧录均在 SMT 前 ②BGA X-Ray 安全投产全检、量产抽检 ③车身域控独立 FCT 台。详见 reference/site-config.html。",
      checklist: [
        "process-routing-electronics.csv 是否标注「SMT前」与 FCT 台号？",
        "X-Ray 控制计划是否区分 Safe Launch 全检 vs 量产抽检切换条件？",
        "车身域控 FCT 数据是否仅来自 FCT-DCU-B-04？",
        "离线烧录版本门禁是否独立于人检？",
      ],
      deliverableExtra: "五类产品工艺路由表（离线烧录/SMT/手插/装配）",
    },
    refs: ["templates/process-routing-electronics.csv", "IPC-A-610", "IATF 16949 CSR"],
    pitfalls: ["五类产品混用同一 FCT 程序", "离线烧录未纳入 PPAP 数据包"],
  },
  2: {
    iso: "APQP — 多域控并行立项",
    automotive: {
      iatf: "8.2 顾客输入 — 含软件交付物清单",
      aiag: "APQP Phase 1",
      scenario:
        "SCAR：ADAS 域控量产 FCT 通过率下降；Suspect 链：离线烧录 SOC 镜像版本混杂 + SMT BGA U12 空洞偏高；Charter 须列 4 工艺段范围。",
      checklist: [
        "Charter 区分 DCU-C / DCU-B / DCU-A",
        "CTQ 按段：烧录 Checksum、SPI、BGA 空洞、FCT 项",
        "SIPOC 到 OEM 整车但不含路测",
      ],
      deliverableExtra: "ADAS 域控 Charter + 工艺段特殊特性矩阵",
    },
    tools: [
      ["工艺路由表", "5 产品×4 段"],
      ["CSR 软件清单", "Boot/SOC/eMMC"],
      ["特殊特性", "BGA 位号级"],
      ["APQP/PPAP", "分产品提交"],
    ],
  },
  3: {
    automotive: {
      iatf: "7.1.5 — 各段测量系统清单",
      scenario:
        "建立数据字典：离线烧录(版本/Checksum)、SMT(SPI/AOI 空洞%)、手插(不良类别)、装配(扭矩)、测试(ICT/FCT 代码)。",
      checklist: ["ADAS 与车身域控分线体分层", "炉温 Profile ID 追溯"],
    },
    refs: ["data/automotive-offline-program.csv", "data/automotive-bga-aoi.csv"],
  },
  4: {
    iso: "MSA — SPI / 扭矩 / 选测；FCT 用 p 图",
    automotive: {
      iatf: "PPAP 提交 MSA 清单按工艺段",
      aiag: "MSA-4",
      scenario:
        "SPI %GRR（座舱域控）；烧录 Checksum 设备 GR&R；BGA 空洞 AOI 一致性；FCT 探针 GRR；车身域控手插通断检 MSA。",
      checklist: [
        "BGA 空洞判定标准与 CSR 一致",
        "离线烧录 0% 错版目标须有探测度证据",
        "勿对 FCT 良率做 Cpk",
      ],
      deliverableExtra: "分工艺段 MSA 计划表（≥3 段）",
    },
    refs: [
      "data/automotive-spi-msa.csv",
      "data/automotive-offline-program.csv",
      "data/automotive-bga-aoi.csv",
    ],
    tools: [
      ["Gage R&R", "SPI/烧录/探针"],
      ["SPI Cpk", "SMT"],
      ["p 图", "FCT/烧录一次通过"],
      ["X-Ray", "SL 全检 / MP 抽检"],
    ],
  },
  5: {
    automotive: {
      scenario:
        "缺陷-过程矩阵：ADAS FCT Eth 失败 ↔ 离线烧录(SMT前)错版 OR BGA U12 空洞 OR X-Ray 从全检切抽检后漏检；卡方/对比检验。",
      checklist: [
        "混杂：不同 DCU 产品不可合并分析",
        "车身问题勿用 ADAS FCT 工站数据",
        "对比 X-Ray SL 全检期 vs MP 抽检期 Pareto",
      ],
    },
    refs: ["data/automotive-fct-yield.csv"],
  },
  6: {
    automotive: {
      scenario:
        "DOE：① SMT 印刷参数对 SPI；② 回流 Profile 对 BGA 空洞；③ 离线烧录夹具压力对一次通过率（若适用）。",
      checklist: ["DOE 板=BOM 等效", "Profile 变更走 ECN"],
    },
  },
  7: {
    automotive: {
      scenario:
        "ADAS SCAR 阶段门：证明根因段（离线烧录/SMT）+ 对车身/座舱线无回归；PPAP 变更项列表。",
      checklist: ["8D 与 DMAIC 附件映射", "Safe Launch 批次"],
    },
  },
  8: {
    automotive: {
      scenario:
        "对策：SMT 前烧录双人复核；Profile 收紧；Safe Launch 维持 X-Ray 全检直至 FCT 稳定；车身域控手插治具翻新（FCT-04 独立统计）。",
      deliverableExtra: "pfmea-electronics.csv（含 4 工艺段）",
    },
  },
  9: {
    automotive: {
      scenario: "SPI/BGA 空洞稳健区确认；ADAS FCT≥目标 3 批；离线烧录错版=0。",
    },
  },
  10: {
    iso: "8.5.1.1 控制计划 — 分产品分工艺段",
    automotive: {
      scenario:
        "control-plan-electronics.csv：IC/HU/DCU-C/DCU-B/DCU-A 各行；离线烧录/SMT/手插/装配/FCT 反应计划含追溯号。",
      deliverableExtra: "五类产品控制计划齐套",
    },
  },
  11: {
    automotive: {
      scenario:
        "新 ADAS 平台 NPI — QFD：感知融合、ASIL、启动时延→SOC BGA 设计→离线烧录→SMT Profile→FCT 用例。",
    },
  },
  12: {
    automotive: {
      scenario: "集团 EMS：统一烧录版本系统、BGA 空洞标准、四类工艺段 BB 项目模板复制。",
    },
  },
  13: {
    automotive: {
      scenario: "BB 拟仅加 FCT 重测掩盖 BGA/烧录 — MBB 要求分工艺段证据链+不混淆三域控。",
    },
  },
  14: {
    automotive: {
      scenario:
        "答辩：ADAS 域控 SCAR — 离线烧录+SMT BGA+装配扭矩+FCT；说明与车身/座舱差异；模拟 OEM 电子与功能安全接口人。",
      checklist: ["ASIL 相关项不越界承诺", "数据脱敏"],
    },
  },
};

module.exports.AUTO_DAYS = {
  1: {
    tags: ["战略", "汽车电子", "多域控", "2–3h"],
    case: "工厂产 IC、HU、座舱/车身/ADAS 域控；工艺：离线烧录、SMT(BGA)、手插、装配；OEM 要求分产品追溯与分工艺段基线。",
    homework: "完成 reference/site-config.html 现场配置问卷（单选/多选/其他），校验生成摘要并粘贴至 Charter。",
    toolSteps: [
      "打开 reference/site-config.html → 载入默认 → 校验并生成摘要",
      "阅读 reference/automotive-iatf.html",
      "打开 templates/process-routing-electronics.csv",
      "画 ADAS 域控 SIPOC（离线烧录→SMT→X-Ray→FCT）",
    ],
  },
  2: {
    tags: ["Define", "汽车电子", "ADAS", "Define ✓"],
    case: "SCAR：ADAS 域控 FCT 下降；怀疑离线烧录 SOC 版本混杂 + BGA U12 空洞；范围含离线烧录/SMT/测试，不含整车路测。",
    homework: "ADAS Charter + 分工艺段特殊特性（烧录/SPI/BGA/FCT）。",
  },
  3: {
    tags: ["Measure", "汽车电子", "分段"],
    case: "按工艺段建数据计划：离线烧录 program.csv、SPI、BGA AOI 空洞、FCT；分 DCU-A/B/C 不混批。",
    dataFile: "templates/process-routing-electronics.csv",
    toolSteps: [
      "核对 offline-program / bga-aoi / spi-msa 字段定义",
      "ICT 不良与 SMT 缺陷关联表",
    ],
  },
  4: {
    tags: ["Measure ✓", "MSA", "BGA", "PPAP"],
    case: "SPI %GRR；离线烧录 Checksum 比对可靠性；BGA 空洞 AOI 一致性；FCT 探针 GRR。",
    dataFile: "data/automotive-spi-msa.csv",
    toolSteps: [
      "Gage R&R：spi-msa.csv",
      "分析 offline-program.csv 错版率（p 图）",
      "bga-aoi.csv：U12 空洞率 vs 规格",
    ],
    quiz: [
      ["离线烧录要做 Cpk吗？", "用一次通过率/错版率 p/np。"],
      ["BGA 只看 AOI？", "CSR 要求时加 X-Ray。"],
      ["车身域控手插？", "独立 PFMEA/控制计划行。"],
      ["三域控能合并 FCT 数据？", "否；产品分开。"],
      ["【纠错】装配扭矩与 BGA 无关？", "装配段仍须 SPC；根因链可能跨段。"],
    ],
  },
  5: {
    tags: ["Analyze", "汽车电子", "ADAS"],
    case: "ADAS FCT Eth/CAN 失效 ↔ 离线烧录版本 batch + BGA 空洞批次 交叉表；排除 HU 程序误用。",
    dataFile: "data/automotive-fct-yield.csv",
    homework: "缺陷-过程矩阵（行=缺陷代码，列=离线烧录/SMT/手插/装配）。",
  },
  6: {
    tags: ["DOE", "汽车电子", "SMT"],
    case: "回流 Profile DOE 对 BGA U12 空洞；或印刷参数对 SPI；记录 Profile#ADAS-04。",
    dataFile: "data/automotive-bga-aoi.csv",
  },
  7: {
    tags: ["阶段门", "汽车电子", "Analyze ✓"],
    case: "ADAS SCAR 门评审；证据：错版率归零、BGA 空洞 Pareto 下降、FCT 恢复；评估对车身域控外溢风险。",
  },
  8: {
    tags: ["Improve", "汽车电子", "PFMEA"],
    case: "PFMEA 更新：离线烧录错版 S=10；BGA 空洞 S=9；手插浮高（车身线）；装配扭矩。",
    homework: "pfmea-electronics.csv 填 ADAS+车身各≥2 行；Pugh 选烧录门禁方案。",
    dataFile: "templates/pfmea-electronics.csv",
  },
  9: {
    tags: ["RSM", "汽车电子", "Improve ✓"],
    case: "SPI/空洞稳健区；3 批 ADAS Safe Launch：离线烧录 0 错版 + FCT≥99.5%。",
  },
  10: {
    tags: ["Control", "汽车电子", "PPAP", "Control ✓"],
    case: "五类产品 control-plan 齐套；ADAS 重点：离线烧录100%校验、SPI SPC、BGA 空洞、FCT p 图、装配扭矩。",
    homework: "control-plan-electronics.csv：IC/HU/DCU-C/DCU-B/DCU-A 各≥1 工序。",
    dataFile: "templates/control-plan-electronics.csv",
  },
  11: {
    tags: ["DFSS", "汽车电子", "ADAS NPI"],
    case: "新 ADAS 平台 — QFD：感知/ASIL/时延→SOC BGA→离线烧录镜像→Profile→FCT 场景库。",
  },
  12: {
    tags: ["部署", "汽车电子"],
    case: "三车间复制：烧录 MES 版本锁、BGA 标准、手插治具 PM、四类工艺段 BB 模板。",
  },
  13: {
    tags: ["MBB", "汽车电子"],
    case: "BB 将车身域控 FCT 与 ADAS 工站数据合并 — MBB 打回；须用 FCT-DCU-B-04 独立序列。",
  },
  14: {
    tags: ["认证", "汽车电子"],
    case: "答辩：ADAS SCAR 全工艺段（离线烧录/SMT/手插/装配/FCT）对 OEM + 功能安全接口说明边界。",
    homework: "毕业清单 + 3min 汇报（五类产品+四工艺段）。",
  },
};

const { DAY_ENRICHMENT } = require("./automotive-day-enrichment");

module.exports.applyAutomotive = function (days, pro) {
  for (const d of days) {
    const patch = module.exports.AUTO_DAYS[d.n];
    if (patch) Object.assign(d, patch);
    const enrich = DAY_ENRICHMENT[d.n];
    if (enrich) {
      if (enrich.conceptAdd) {
        d.concept = `${d.concept}\n\n【汽车电子 · ${enrich.focus}】${enrich.conceptAdd}`;
      }
      if (enrich.exercises && enrich.exercises.length) {
        d.exercises = [...enrich.exercises, ...(d.exercises || [])];
      }
      if (enrich.homeworkHint) {
        const fromPatch = patch && patch.homework;
        d.homework = fromPatch
          ? `${enrich.homeworkHint}；${fromPatch}`
          : enrich.homeworkHint;
      }
      if (enrich.mcq && enrich.mcq.length) {
        d.quiz = enrich.mcq.map((item) => [
          item.q,
          (item.options.find((o) => o.correct) || {}).t || "",
        ]);
      }
      d.enrichFocus = enrich.focus;
    }
    const hasAuto = d.tags.some((t) => /汽车/.test(t));
    if (!hasAuto && patch) d.tags.unshift("汽车电子");
  }
  for (const [n, patch] of Object.entries(module.exports.AUTO_PRO)) {
    const k = Number(n);
    pro[k] = { ...pro[k], ...patch };
    if (patch.automotive)
      pro[k].automotive = { ...(pro[k].automotive || {}), ...patch.automotive };
    if (patch.tools) pro[k].tools = patch.tools;
    if (patch.formulas) pro[k].formulas = patch.formulas;
    if (patch.refs) pro[k].refs = patch.refs;
    if (patch.pitfalls) pro[k].pitfalls = patch.pitfalls;
  }
};
