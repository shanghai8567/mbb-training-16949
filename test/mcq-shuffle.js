/**
 * 确定性选项打乱（按模块+题号种子，重建 HTML 结果稳定）
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleOptions(options, dayN, qIndex) {
  const seed = dayN * 1009 + qIndex * 97 + 13;
  const rng = mulberry32(seed);
  const arr = options.map((o) => ({ ...o }));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const labels = ["a", "b", "c", "d"];
  const relabeled = arr.map((o, idx) => ({
    t: o.t,
    correct: !!o.correct,
    v: labels[idx] || String.fromCharCode(97 + idx),
  }));
  const correctOnes = relabeled.filter((o) => o.correct);
  const isMulti = correctOnes.length > 1;
  if (isMulti) {
    return {
      options: relabeled,
      correctValues: correctOnes.map((o) => o.v).sort(),
      type: "multi",
    };
  }
  const correct = correctOnes[0];
  return {
    options: relabeled,
    correctValue: correct ? correct.v : "a",
    type: "single",
  };
}

module.exports = { shuffleOptions, mulberry32 };
