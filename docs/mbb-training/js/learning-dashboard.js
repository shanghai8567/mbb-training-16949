/**
 * L1 学习仪表盘 — 汇总 F/G/H + 权重 v2
 * 依赖：homework-scores 页内联或 MBBSelfAssessment
 */
(function () {
  "use strict";

  const HW_KEY = "mbb-hw-scores";
  const SA_KEY = "mbb-self-assessment-v1";
  const C2_KEY = "mbb-c2-checklist-v1";
  const C2_BY_DAY_KEY = "mbb-c2-by-day-v1";
  const CAP_KEY = "mbb-capstone-v1";

  const WEIGHTS = [
    { id: "g", label: "G 客观", w: 25 },
    { id: "f", label: "F 作业", w: 35 },
    { id: "c2", label: "C2 截图", w: 15 },
    { id: "h", label: "H 自评", w: 5 },
    { id: "cap", label: "Capstone", w: 20 },
  ];

  function loadJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  }

  function hwScores() {
    return loadJson(HW_KEY);
  }

  function saScores() {
    return loadJson(SA_KEY);
  }

  function splitHw(rec) {
    if (!rec || rec.total == null) return { g: null, f: null, total: null };
    const g = rec.mcqPercent != null ? Math.min(100, Math.round((rec.mcqPercent / 45) * 100)) : null;
    const f = rec.textPercent != null ? Math.min(100, Math.round((rec.textPercent / 55) * 100)) : null;
    return { g, f, total: rec.total };
  }

  function hPct(day) {
    const rec = saScores()[String(day)];
    if (!rec) return null;
    const nums = [rec.concept, rec.apply, rec.teach].map(Number).filter((n) => n >= 1 && n <= 5);
    if (nums.length < 3) return null;
    return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length / 5) * 100);
  }

  function countC2ModulesDone() {
    const byDay = loadJson(C2_BY_DAY_KEY);
    if (byDay && typeof byDay === "object" && Object.keys(byDay).length) {
      let n = 0;
      for (let d = 1; d <= 14; d++) {
        if (byDay[String(d)]) n++;
      }
      return n;
    }
    const d = loadJson(C2_KEY);
    return Number(d.done) || 0;
  }

  function getC2Percent() {
    const d = loadJson(C2_KEY);
    if (d.percent != null) return Number(d.percent);
    const done = countC2ModulesDone();
    return Math.round((done / 14) * 100);
  }

  function getCapstonePercent() {
    const d = loadJson(CAP_KEY);
    return d.percent != null ? Number(d.percent) : null;
  }

  function computeL1Composite() {
    const hw = hwScores();
    const sa = saScores();
    let gSum = 0;
    let gN = 0;
    let fSum = 0;
    let fN = 0;
    let hSum = 0;
    let hN = 0;

    for (let n = 1; n <= 14; n++) {
      const s = splitHw(hw[String(n)]);
      if (s.g != null) {
        gSum += s.g;
        gN++;
      }
      if (s.f != null) {
        fSum += s.f;
        fN++;
      }
      const hp = hPct(n);
      if (hp != null) {
        hSum += hp;
        hN++;
      }
    }

    const partial = {
      g: gN ? Math.round(gSum / gN) : null,
      f: fN ? Math.round(fSum / fN) : null,
      h: hN ? Math.round(hSum / hN) : null,
      c2: getC2Percent(),
      capstone: getCapstonePercent(),
    };

    let weighted = 0;
    let activeW = 0;
    if (partial.g != null) {
      weighted += (partial.g / 100) * 25;
      activeW += 25;
    }
    if (partial.f != null) {
      weighted += (partial.f / 100) * 35;
      activeW += 35;
    }
    if (partial.h != null) {
      weighted += (partial.h / 100) * 5;
      activeW += 5;
    }
    if (partial.c2 != null) {
      weighted += (partial.c2 / 100) * 15;
      activeW += 15;
    }
    if (partial.capstone != null) {
      weighted += (partial.capstone / 100) * 20;
      activeW += 20;
    }

    const composite = activeW ? Math.round((weighted / activeW) * 100) : 0;
    const fullTrack = partial.c2 != null && partial.capstone != null;
    const fullComposite = fullTrack
      ? Math.round(
          (partial.g || 0) * 0.25 +
            (partial.f || 0) * 0.35 +
            (partial.h || 0) * 0.05 +
            (partial.c2 || 0) * 0.15 +
            (partial.capstone || 0) * 0.2
        )
      : null;

    return {
      composite,
      fullComposite,
      activeW,
      partial,
      modulesWithHw: gN,
      modulesWithH: hN,
    };
  }

  function renderDashboard(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const data = computeL1Composite();
    const p = data.partial;

    const rows = WEIGHTS.map((w) => {
      const val = p[w.id === "cap" ? "capstone" : w.id];
      const cell =
        val != null
          ? `<strong>${val}%</strong>`
          : '<span style="color:var(--muted)">未录入</span>';
      return `<tr><td>${w.label}</td><td>${w.w}%</td><td>${cell}</td></tr>`;
    }).join("");

    el.innerHTML = `
      <div class="l1-composite-ring">
        <div class="hw-score-big ${data.composite >= 70 ? "pass" : "warn"}">${data.composite}<span style="font-size:1rem;color:var(--muted)">/100</span></div>
        <p style="font-size:0.9rem;color:var(--muted)">L1 综合（已录入权重 ${data.activeW}%）
          ${data.fullComposite != null ? ` · 全轨规划分 <strong>${data.fullComposite}</strong>/100` : ""}</p>
      </div>
      <table class="hw-dim-table">
        <thead><tr><th>维度</th><th>规划权重</th><th>当前均值</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="font-size:0.85rem;color:var(--muted)">作业 ${data.modulesWithHw}/14 · H 自评 ${data.modulesWithH}/14 ·
        <a href="../templates/capstone-adasis-scar/README.md">Capstone 包</a></p>
      <div class="c2-checklist-admin" style="margin-top:1rem">
        <p style="font-size:0.9rem;margin:0 0 0.5rem">C2 按模块勾选：${countC2ModulesDone()}/14（各模块 F 节下方勾选，或在此批量设置）</p>
        <label>C2 截图完成模块数 (0–14)
          <input type="number" id="c2-done-input" min="0" max="14" value="${countC2ModulesDone()}" style="width:4rem;margin-left:0.5rem" />
        </label>
        <label style="margin-left:1rem">Capstone L3 得分 (0–100)
          <input type="number" id="cap-score-input" min="0" max="100" value="${loadJson(CAP_KEY).percent ?? ""}" style="width:4rem;margin-left:0.5rem" />
        </label>
        <button type="button" class="btn" id="l1-extra-save">保存</button>
      </div>`;

    document.getElementById("l1-extra-save")?.addEventListener("click", () => {
      const done = Math.min(14, Math.max(0, Number(document.getElementById("c2-done-input")?.value) || 0));
      const cap = document.getElementById("cap-score-input")?.value;
      const byDay = {};
      for (let d = 1; d <= done; d++) byDay[String(d)] = true;
      localStorage.setItem(C2_BY_DAY_KEY, JSON.stringify(byDay));
      localStorage.setItem(C2_KEY, JSON.stringify({ done, total: 14, at: new Date().toISOString() }));
      if (cap !== "") {
        localStorage.setItem(CAP_KEY, JSON.stringify({ percent: Number(cap), at: new Date().toISOString() }));
      }
      renderDashboard(containerId);
    });
  }

  window.MBBLearningDashboard = {
    HW_KEY,
    SA_KEY,
    C2_KEY,
    C2_BY_DAY_KEY,
    CAP_KEY,
    computeL1Composite,
    renderDashboard,
    countC2ModulesDone,
    hPct,
    splitHw,
  };
})();
