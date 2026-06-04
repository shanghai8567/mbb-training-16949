/**
 * 结业权重 v3（L1 规划 — 浏览器可算部分）
 */
const GRADUATION_WEIGHTS_V2 = {
  version: "3.0.0",
  items: [
    { id: "g", label: "G 客观题", weight: 25, storageKey: "mcq", from: "hw-scores" },
    { id: "f", label: "F 作业文本+Rubric", weight: 35, storageKey: "text", from: "hw-scores" },
    { id: "c2", label: "C2 截图交付", weight: 15, storageKey: "c2", manual: true },
    { id: "h", label: "H 能力自评", weight: 5, storageKey: "h", from: "self-assessment" },
    { id: "capstone", label: "Capstone / L3", weight: 20, storageKey: "capstone", manual: true },
  ],
  passComposite: 70,
};

function splitHwScore(rec) {
  if (!rec) return { g: null, f: null };
  const mcq = rec.mcqPercent != null ? rec.mcqPercent : null;
  const text = rec.textPercent != null ? rec.textPercent : null;
  const g = mcq != null ? Math.round((mcq / 45) * 100) : null;
  const f = text != null ? Math.round((text / 55) * 100) : null;
  return { g, f };
}

function computeComposite(scores) {
  const { g, f, h, c2, capstone } = scores;
  let weighted = 0;
  let totalW = 0;
  const w = GRADUATION_WEIGHTS_V2.items;

  function add(id, pct, weight) {
    if (pct == null || Number.isNaN(pct)) return;
    weighted += (pct / 100) * weight;
    totalW += weight;
  }

  add("g", g, 25);
  add("f", f, 35);
  add("h", h, 5);
  if (c2 != null) add("c2", c2, 15);
  if (capstone != null) add("capstone", capstone, 20);

  const autoOnly = capstone == null && c2 == null;
  const denom = autoOnly ? totalW || 65 : 100;
  const composite = totalW ? Math.round((weighted / denom) * 100) : 0;
  return { composite, totalW, autoOnly, partial: { g, f, h, c2, capstone } };
}

module.exports = { GRADUATION_WEIGHTS_V2, splitHwScore, computeComposite };
