/**
 * 按模块微调 Rubric 维度权重与关键词（叠加在全局 DIMENSIONS 上）
 */
const DAY_DIMENSION_TWEAKS = {
  1: {
    business: { weight: 22, keys: ["sipoc", "routing", "工艺段", "五产品", "成熟度"] },
    mbb: { weight: 18, keys: ["教练", "战略", "部署"] },
  },
  2: {
    business: { weight: 25, keys: ["charter", "问题陈述", "voc", "ctq", "范围"] },
    measure: { weight: 15 },
  },
  3: {
    measure: { weight: 30, keys: ["操作定义", "p 图", "np", "分层", "数据计划"] },
    stats: { weight: 20 },
  },
  4: {
    measure: { weight: 35, keys: ["grr", "%r&r", "msa", "偏倚", "再现性", "spi"] },
    stats: { weight: 20 },
  },
  5: {
    stats: { weight: 30, keys: ["pareto", "缺陷矩阵", "混杂", "分层", "根因"] },
    improve: { weight: 20 },
  },
  6: {
    stats: { weight: 35, keys: ["doe", "交互", "随机化", "效应量", "profile"] },
    improve: { weight: 20 },
  },
  7: {
    business: { weight: 20, keys: ["阶段门", "故事板", "效益", "证据链"] },
    mbb: { weight: 20, keys: ["评审", "打回", "签字"] },
  },
  8: {
    improve: { weight: 35, keys: ["pfmea", "rpn", "防错", "对策", "手插", "浮高"] },
  },
  9: {
    stats: { weight: 30, keys: ["响应曲面", "稳健", "safe launch", "pilot"] },
    improve: { weight: 25 },
  },
  10: {
    improve: { weight: 35, keys: ["控制计划", "spc", "p图", "反应计划", "追溯"] },
    measure: { weight: 20 },
  },
  11: {
    business: { weight: 20, keys: ["dfss", "qfd", "asil", "边界"] },
    improve: { weight: 25, keys: ["验证", "pilot", "镜像"] },
  },
  12: {
    business: { weight: 25, keys: ["复制", "模板", "adkar", "champion"] },
    mbb: { weight: 20, keys: ["战略", "效益", "部署"] },
  },
  13: {
    mbb: { weight: 30, keys: ["grow", "辅导", "rubric", "反馈", "教练"] },
    business: { weight: 15 },
  },
  14: {
    mbb: { weight: 28, keys: ["答辩", "capstone", "证据链", "asil", "评审"] },
    business: { weight: 22, keys: ["效益", "scar", "oem"] },
  },
};

function mergeDimensions(baseDims, dayN) {
  const tweak = DAY_DIMENSION_TWEAKS[dayN];
  if (!tweak) return baseDims;
  const out = {};
  Object.entries(baseDims).forEach(([key, dim]) => {
    const t = tweak[key];
    if (!t) {
      out[key] = { ...dim, keys: [...dim.keys] };
      return;
    }
    out[key] = {
      ...dim,
      weight: t.weight != null ? t.weight : dim.weight,
      keys: t.keys ? [...new Set([...dim.keys, ...t.keys])] : [...dim.keys],
      forbids: t.forbids ? [...dim.forbids, ...t.forbids] : [...dim.forbids],
    };
  });
  return out;
}

module.exports = { DAY_DIMENSION_TWEAKS, mergeDimensions };
