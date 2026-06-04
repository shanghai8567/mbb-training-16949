/**
 * H 节能力自评 — localStorage 入库
 */
(function () {
  "use strict";

  const KEY = "mbb-self-assessment-v1";

  function loadAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveDay(day, payload) {
    const all = loadAll();
    all[String(day)] = { ...payload, at: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(all));
    return all;
  }

  function getDay(day) {
    return loadAll()[String(day)] || null;
  }

  function avgScores(record) {
    if (!record) return null;
    const nums = [record.concept, record.apply, record.teach]
      .map((v) => Number(v))
      .filter((n) => n >= 1 && n <= 5);
    if (!nums.length) return null;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }

  function hPercentForDay(day) {
    const rec = getDay(day);
    const avg = avgScores(rec);
    if (avg == null) return null;
    return Math.round((avg / 5) * 100);
  }

  function initPanel() {
    const panel = document.getElementById("self-assessment-panel");
    if (!panel) return;
    const day = Number(panel.getAttribute("data-day"));
    if (!day) return;

    const rec = getDay(day);
    if (rec) {
      ["concept", "apply", "teach"].forEach((dim) => {
        const el = document.getElementById(`sa-${dim === "teach" ? "teach" : dim}`);
        if (el && rec[dim] != null) el.value = String(rec[dim]);
      });
      const ev = document.getElementById("sa-evidence");
      if (ev && rec.evidence) ev.value = rec.evidence;
    }

    document.getElementById("sa-save-btn")?.addEventListener("click", () => {
      const concept = Number(document.getElementById("sa-concept")?.value);
      const apply = Number(document.getElementById("sa-apply")?.value);
      const teach = Number(document.getElementById("sa-teach")?.value);
      const evidence = (document.getElementById("sa-evidence")?.value || "").trim();
      if (![concept, apply, teach].every((n) => n >= 1 && n <= 5)) {
        alert("请为三项能力各选择 1–5 分");
        return;
      }
      saveDay(day, { concept, apply, teach, evidence });
      const status = document.getElementById("sa-status");
      if (status) status.textContent = "已保存 " + new Date().toLocaleString();
      const warn = document.getElementById("sa-warn");
      const low = [concept, apply, teach].some((n) => n < 3);
      if (warn) warn.style.display = low ? "block" : "none";
      window.dispatchEvent(new CustomEvent("mbb-sa-saved", { detail: { day } }));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPanel);
  } else {
    initPanel();
  }

  window.MBBSelfAssessment = {
    KEY,
    loadAll,
    saveDay,
    getDay,
    avgScores,
    hPercentForDay,
  };
})();
