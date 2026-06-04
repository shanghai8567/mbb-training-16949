/**
 * 五产品考题覆盖矩阵
 * 运行: node test/mcq-coverage-matrix.js
 */
const { getMcqForDay } = require("./automotive-day-enrichment");
const { getMcqV2ForDay } = require("./mcq-v2/supplement");

const PRODUCTS = ["DCU-A", "DCU-B", "DCU-C", "HU", "IC"];
const ALIASES = {
  "DCU-A": [/DCU-A|ADAS|域控.*A|FCT-05|Eth/i],
  "DCU-B": [/DCU-B|车身|FCT-04|CAN\/LIN|继电器/i],
  "DCU-C": [/DCU-C|座舱/i],
  HU: [/HU|中控/i],
  IC: [/仪表|IC|扭矩/i],
};

function textOfItem(item) {
  const parts = [item.q, item.scenario || ""];
  (item.options || []).forEach((o) => parts.push(o.t));
  return parts.join(" ");
}

function countByProduct() {
  const counts = Object.fromEntries(PRODUCTS.map((p) => [p, 0]));
  const byDay = {};

  for (let d = 1; d <= 14; d++) {
    const items = [...getMcqForDay(d)];
    const v2 = getMcqV2ForDay(d);
    if (v2) items.push(v2);
    byDay[d] = {};
    PRODUCTS.forEach((p) => {
      byDay[d][p] = 0;
    });
    items.forEach((item) => {
      const blob = textOfItem(item);
      PRODUCTS.forEach((p) => {
        if (ALIASES[p].some((re) => re.test(blob))) {
          counts[p]++;
          byDay[d][p]++;
        }
      });
      (item.products || []).forEach((tag) => {
        const key = tag.replace("DCU-", "DCU-");
        if (counts[tag] !== undefined) counts[tag]++;
      });
    });
  }
  return { counts, byDay };
}

const { counts, byDay } = countByProduct();
let fail = 0;

console.log("MCQ COVERAGE MATRIX (五产品)");
console.log("---");
PRODUCTS.forEach((p) => {
  const ok = counts[p] >= 3;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"} ${p}: ${counts[p]} 题引用 (目标 ≥3)`);
});

console.log("\n按模块（有覆盖的格子）:");
for (let d = 1; d <= 14; d++) {
  const hits = PRODUCTS.filter((p) => byDay[d][p] > 0).map((p) => `${p}:${byDay[d][p]}`);
  if (hits.length) console.log(`  Day${String(d).padStart(2, "0")}: ${hits.join(", ")}`);
}

console.log("\n---");
console.log(fail ? `RESULT: ${fail} product(s) below threshold` : "RESULT: ALL PASS");
process.exit(fail > 0 ? 1 : 0);
