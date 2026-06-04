/**
 * 按模块勾选 C2 截图交付 — 同步学习仪表盘
 */
(function () {
  "use strict";

  const BY_DAY_KEY = "mbb-c2-by-day-v1";
  const LEGACY_KEY = "mbb-c2-checklist-v1";

  function loadByDay() {
    try {
      return JSON.parse(localStorage.getItem(BY_DAY_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveByDay(all) {
    localStorage.setItem(BY_DAY_KEY, JSON.stringify(all));
    const done = countDone(all);
    localStorage.setItem(
      LEGACY_KEY,
      JSON.stringify({ done, total: 14, at: new Date().toISOString() })
    );
    window.dispatchEvent(new CustomEvent("mbb-c2-updated", { detail: { done } }));
  }

  function countDone(map) {
    let n = 0;
    for (let d = 1; d <= 14; d++) {
      if (map[String(d)]) n++;
    }
    return n;
  }

  function setDay(day, value) {
    const all = loadByDay();
    if (value) all[String(day)] = true;
    else delete all[String(day)];
    saveByDay(all);
  }

  function isDayDone(day) {
    return !!loadByDay()[String(day)];
  }

  function init() {
    const cb = document.getElementById("c2-done-cb");
    if (!cb) return;
    const day = Number(cb.getAttribute("data-day"));
    if (!day) return;
    cb.checked = isDayDone(day);
    cb.addEventListener("change", () => setDay(day, cb.checked));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.MBBC2Checklist = {
    BY_DAY_KEY,
    loadByDay,
    countDone,
    setDay,
    isDayDone,
  };
})();
