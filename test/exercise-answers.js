/**
 * E 节课堂练习 — 参考答案（与 applyAutomotive 合并后的 exercises 顺序一致）
 */
const EXERCISE_ANSWERS_BY_DAY = {
  1: [
    {
      answer:
        "routing 表标注：① 离线@SMT前 + Checksum；② X-Ray SL 100% / MP 抽检 + 切换日；③ 车身 FCT-DCU-B-04 与 ADAS FCT-05 分线。",
      explain: "三条规则须与 site-config 问卷及 B+ 表一致，不可写「加强管理」。",
    },
    {
      answer:
        "SIPOC：供料 → 离线烧录 → SMT(SPI/AOI) → X-Ray → FCT-05 → OEM；范围止于 EMS 出厂测试。",
      explain: "Supplier/Input 要含 Program_ID、Profile#；Output 为 FCT 合格板。",
    },
    {
      answer: "FCT 一次通过率是属性数据（合格/不合格），应使用 p 图或 np 图；Cpk 用于计量型 CTQ（如 SPI 体积、空洞%）。",
      explain: "混用会导致阶段门证据被 MBB 打回。",
    },
    {
      answer: "BB 约 70% 时间做 DMAIC 分析与工具；MBB 约 50% 部署/辅导/阶段门，30% 组合管理，≤20% 亲自做分析。",
      explain: "MBB 不代做 Minitab，只教练与评审证据链。",
    },
    {
      answer: "Define 门：① 签字章程（问题陈述可测量）② SIPOC/范围 ③ CTQ 操作定义草案 + Champion 承诺。",
      explain: "缺任一项应 No-Go 或条件通过。",
    },
  ],
  2: [
    {
      answer:
        "问题陈述示例：「ADAS 域控 Eth 一次通过率由 99.2% 降至 97.1%（连续 20 批，FCT-05）」— 不含对策。",
      explain: "须可测量、有时间窗、有工站号。",
    },
    {
      answer:
        "SIPOC 四段：离线#7 → SMT#5 →（手插若适用）→ FCT-05；Input 含 SOC_FW、eMMC_IMG。",
      explain: "与 B+ CTQ 分解表逐行对应。",
    },
    {
      answer: "CTQ 树：OEM「感知可靠」→ Eth 误码率 / 启动时延；每层须有操作定义。",
      explain: "VOC 原话不可直接当规格。",
    },
    {
      answer: "150 字问题陈述：ADAS 域控 Eth 一次通过率由 99.2% 降至 97.1%（连续 20 批，FCT-DCU-A-05），不含对策。",
      explain: "与 enrichment 范例一致，可替换为贵司基线%。",
    },
    {
      answer: "CTQ 示例：Eth 误码率≤X ppm（FCT 环回项#12）；启动时延≤Ys（冷启动到 CAN 就绪）；Checksum 一次通过率 100%。",
      explain: "每条含测量方法、工站、规格来源（CSR/OEM）。",
    },
  ],
  3: [
    {
      answer: "SPI 体积：钢网 ID、测点位置、单位 %、测量系统编号；判定按 CSR 上下限。",
      explain: "操作定义要可执行、可审计。",
    },
    {
      answer: "DCU-A 与 DCU-B 分表统计 FCT；字段含 Fail_code、工站、Program_ID。",
      explain: "禁止柔性线合并批次。",
    },
    {
      answer: "离线错版率 → p/np 图；SPI 体积 → I-MR 或 Xbar-R（MSA 合格后）。",
      explain: "数据类型决定控制图，见 B+ 数据字典。",
    },
    {
      answer: "为 CTQ 写操作定义：指标名、单位、测点/工站、判定规则、抽样窗、责任人。",
      explain: "MSA 与能力分析的前置条件。",
    },
    {
      answer: "FCT 良率：属性 → p 图；SPI 体积：计量 → 直方图/I-MR/Xbar-R（视子组）。",
      explain: "勿对 0/1 良率求 Cpk。",
    },
  ],
  4: [
    {
      answer: "spi-msa：%GRR≈18% → Accept（<10% 理想，10–30% 边缘需改进计划）；ndc≥5 方可区分零件变差。",
      explain: "以 Minitab 报告 %研究变异(RR) 行为准。",
    },
    {
      answer: "FCT 一次通过率是合格/不合格属性，用 p/np 图监控；Cpk 仅用于 SPI 体积、空洞% 等计量 CTQ。",
      explain: "客户审计常查此混用。",
    },
    {
      answer: "车身手插通断检 MSA：3 操作员×10 板×2 次，响应通/断；目标 Kappa/一致率≥0.9，记录治具号。",
      explain: "与 ADAS SPI GRR 分开研究。",
    },
    {
      answer: "%RR=18%：测量系统可接受，可报告 SPI Cpk（须附 GRR 摘要）；ndc 不足则先改量具分辨力。",
      explain: "18% 在 10–30% 边缘区，建议持续改进。",
    },
    {
      answer: "Cp 高 Cpk 低：变异宽度尚可但均值偏离目标（钢网厚度/刮刀/压力）；对策调中心而非仅缩公差。",
      explain: "与 FCT 程序错误、离线版本无关时需分 CTQ 查。",
    },
  ],
  5: [
    {
      answer: "缺陷×工艺矩阵：行 Eth_FAIL/Checksum_FAIL/U12_void；列 离线/SMT/手插/FCT；格内填 n 或 %。",
      explain: "Analyze 门核心证据。",
    },
    {
      answer: "fct-yield.csv：按 SOC_FW/Program_ID 分层，禁止 DCU-B 与 ADAS 合并；列联或 2 样本比较版本间通过率。",
      explain: "混杂版本会导致假显著。",
    },
    {
      answer: "p=0.03 但 Eth 仅改善 0.05%：统计显著未必有商业意义；须算年化效益 vs 换钢网/停线成本再决策。",
      explain: "MBB 常在此打回贸然 Improve。",
    },
    {
      answer: "连续近似正态、方差齐 → 2 样本 t；偏态或 n 小 → Mann-Whitney；比例 → 卡方/双比例。",
      explain: "先 Levene/正态再选检验。",
    },
    {
      answer: "H0：两批 Eth 通过率无差异；H1：有差异（或指定方向）。α=0.05，报告差值 CI 与百分点。",
      explain: "H0 永远写「无差异/无效应」，不写「有改善」。",
    },
  ],
  6: [
    {
      answer: "2³ 全因子：A/B/C 各 ±1，共 8 运行 + 可选中心点；列：标准序、运行序（随机）、A,B,C,Y。",
      explain: "运行序必须随机化。",
    },
    {
      answer: "交互图：两线不平行即有交互；显著交互时不可固定一因子调另一因子，须看组合最优区。",
      explain: "如 Peak×TAL 对 U12 空洞%。",
    },
  ],
  7: [
    {
      answer: "Measure 门 5 项：① SPI GRR ② 离线 Checksum GR&R ③ BGA 空洞基线（SL/MP 标注）④ FCT-05 基线 p 图 ⑤ 数据计划签字。",
      explain: "缺分段 MSA 应打回。",
    },
    {
      answer: "Analyze 打回：根因未验证、五产品混杂、无 X-Ray 切换日分层、DCU-B 未证明无回归。",
      explain: "可执行打回须写「补什么数据」。",
    },
    {
      answer: "打回示例：① 只报总良率未分 ADAS/车身 ② 无效应量 ③ 效益重复计 SPI 报废与 FCT 报废。",
      explain: "故事板一页一门。",
    },
    {
      answer: "D：Eth 97.1%→问题+Charter；M：分段 MSA+基线；A：缺陷矩阵+版本列联+U12 Pareto（各 1 句结论）。",
      explain: "供阶段门 PPT 粘贴。",
    },
  ],
  8: [
    {
      answer: "PFMEA 行：离线 SOC 错版 S=10 O=3 D=2（Checksum）；SMT U12 空洞 S=9 O=4 D=3（Profile+AOI+AXI）。",
      explain: "探测度须对应实际门禁。",
    },
    {
      answer: "车身手插浮高：S=8 O=5 D=4 → RPN=160，优先降 O（治具定位）或 D（通断检 100%）。",
      explain: "RPN 排序非唯一决策。",
    },
    {
      answer: "Pugh：准则（效益/风险/周期）×权重；方案 A 炉温曲线 vs B 焊膏；选加权总分高且 CTQ 无牺牲者。",
      explain: "须 Pilot 同框架验证。",
    },
    {
      answer: "反应计划：特殊原因 → 停线查 Profile#/钢网 ID → BB 2h 内 Minitab 确认 → MBB 24h 评审是否 Safe Launch。",
      explain: "须写清谁、时限、升级路径。",
    },
  ],
  9: [
    {
      answer: "Safe Launch 3 批：① U12 空洞≤SL 目标 ② FCT Eth≥99.5% ③ 无新增 Fail_code Top3；任一批不达标则停扩产。",
      explain: "CSR 常规定 3–5 批。",
    },
    {
      answer: "外推禁止：Minitab 最优点在 DOE 立方体外 → 须 3 点确认运行（含预测区间覆盖），ECN 前不得量产。",
      explain: "曲率不显著不必上 RSM。",
    },
    {
      answer: "RSM/CCD：曲率显著、因子≥2、需找稳健平台时用；筛选阶段用 2^(k-p) 即可。",
      explain: "ADAS Profile 优化典型场景。",
    },
    {
      answer: "确认运行表：3 点（预测最优、最优±Δ）、每点 n≥3 板、随机序、响应空洞% 与 FCT 抽检。",
      explain: "附预测 vs 实测对比表。",
    },
  ],
  10: [
    {
      answer: "control-plan：ADAS X-Ray 行注明 SL 100% / MP 抽检% + 切换日期 + 反应（升级 SL）；DCU-B 手插通断 100%。",
      explain: "与 pfmea-electronics 探测一致。",
    },
    {
      answer: "车身：手插浮高 → 通断检；FCT-04 → Eth/CAN 项；各 1 行含规格、频次、反应、负责人。",
      explain: "工站号不得写错 FCT-05。",
    },
    {
      answer: "n=1 子组/慢节拍 → I-MR；n=4–5 子组快节拍 → Xbar-R；缺陷率 → p 图。",
      explain: "改进前后须阶段分隔。",
    },
    {
      answer: "反应计划：Western 规则 1 点出界 → 查 MS → 查 Profile# → 通知 BB；连续 8 点同侧 → 查原材料批次。",
      explain: "操作员可执行、可培训。",
    },
  ],
  11: [
    {
      answer: "WHAT→HOW：OEM 启动时延 → HOW：SOC 镜像版本 + Profile# + FCT 脚本；屋顶：镜像版本与 Profile 强正相关。",
      explain: "EMS 验证止于 FCT；整车时延 OEM 测。",
    },
    {
      answer: "EMS：SPI/FCT/Checksum/AXI；OEM：整车 Eth 路试、功能安全确认、OTA — 质量屋 HOW 不越界写 OEM 责任。",
      explain: "接口 CTQ 在合同中界定。",
    },
    {
      answer: "VOC 原话 3 条：① Eth 丢包投诉 ② 启动>8s ③ 夜间 CAN 休眠异常 — 转可测 CTQ。",
      explain: "勿直接写解决方案。",
    },
    {
      answer: "屋顶：Profile# 与钢网厚度 ○ 正相关；冷却斜率与空洞% △ 负相关（示意一对即可）。",
      explain: "团队共识打分，非一人填。",
    },
  ],
  12: [
    {
      answer: "模板：routing-electronics、pfmea-electronics、control-plan-electronics、project-charter、bb-rubric — 分别用于地图/FMEA/控制/立项/评审。",
      explain: "复制率 MBB KPI。",
    },
    {
      answer: "烧录员 ADKAR-A：1h 微课「Checksum 为何在 SMT 前」+ 现场观摩错版拦截 + 考核 3 题。",
      explain: "Awareness 先于 Ability。",
    },
    {
      answer: "失败模式：① 培训无项目 ② 证书墙无效益 ③ KPI 与六西格玛脱节。",
      explain: "Kotter 8 步对照。",
    },
    {
      answer: "第 1 波：20 GB + 40 项目门；甘特含培训周、项目 Define 门、复制评审 Q4。",
      explain: "绑定 Champion 资源。",
    },
  ],
  13: [
    {
      answer: "GROW 示例：G-本周 Eth 通过率目标；R-缺 SOC 分层数据；O-补 Program_ID 字段或卡方；W-周五前导出 CSV 给 MBB。",
      explain: "各 1 句，针对 ADAS BB。",
    },
    {
      answer: "Rubric 1 分理由：无工艺段证据、合并五产品数据、问题陈述含对策 — 各 1 条可执行反馈。",
      explain: "另附 2 条改进建议即可凑 5 条。",
    },
    {
      answer: "G：本阶段门目标？R：卡方 p 显著但样本混杂？O：分层或补采？W：谁何时提交缺陷矩阵？",
      explain: "四问各 1 句。",
    },
    {
      answer: "1 分：商业对齐 0 分（无 CTQ/OEM 语言）；统计 1 分（只报 p 无效应量）；证据 0 分（无 FCT 工站号）。",
      explain: "用 bb-project-rubric.csv 四维。",
    },
  ],
  14: [
    {
      answer: "3min 大纲：离线-Checksum 门禁；SMT-SPI+Profile#；X-Ray-SL/MP 切换；FCT-Eth 基线与复制计划 — 各 1 句 + 年化 ROI。",
      explain: "CFO 关心硬效益与风险。",
    },
    {
      answer: "OEM 尖锐问：① SL 降 MP 后空洞漏检责任 ② DCU-B 回归证据 ③ %RR>25% 仍报 Cpk 如何审计。",
      explain: "准备数据页码应答。",
    },
    {
      answer: "ROI：报废↓X万/年 + FCT 返工↓Y小时 + 停线风险↓；假设 n=20 批、单价 Z；敏感：样本加倍不改变业务决策。",
      explain: "勿夸大软效益。",
    },
    {
      answer: "MSA 微课 15min：① 属性 vs 计量 ② %RR 三区 ③ SPI/FCT 分 CTQ ④ 课堂练习判 Accept/Reject。",
      explain: "教会 BB 工具选型非代做。",
    },
  ],
};

function buildFallbackAnswer(exerciseText, dayN) {
  return {
    answer: `要点见模块 ${String(dayN).padStart(2, "0")} B+ 节与当堂笔记；本题：${exerciseText}`,
    explain: "提交 F 节作业前用本答案自检是否覆盖工艺段关键词。",
  };
}

function getExerciseAnswers(dayN, exercises) {
  const preset = EXERCISE_ANSWERS_BY_DAY[dayN] || [];
  const list = exercises || [];
  return list.map((ex, i) => {
    if (preset[i] && !preset[i]._isFallback) return preset[i];
    const byText = preset.find((p) => p._for === ex);
    if (byText) return { answer: byText.answer, explain: byText.explain };
    return buildFallbackAnswer(ex, dayN);
  });
}

/** 验收：模块 1–14 均有非占位标杆答 */
function countPresetAnswersForDay(dayN) {
  return (EXERCISE_ANSWERS_BY_DAY[dayN] || []).length;
}

module.exports = {
  EXERCISE_ANSWERS_BY_DAY,
  getExerciseAnswers,
  countPresetAnswersForDay,
};
