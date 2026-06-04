/**
 * 交互式培训 — 核心逻辑（浏览器 + Node 测试共用）
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.MBBInteractiveCore = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  "use strict";

  const STORAGE_SECTIONS = "mbb-section-progress-v1";
  const STORAGE_LAST = "mbb-last-module-v1";

  const DEFAULT_SECTION_ORDER = [
    "sec-a",
    "sec-b",
    "sec-b2",
    "sec-auto",
    "sec-c",
    "sec-c2",
    "sec-d",
    "sec-e",
    "sec-f",
    "sec-g",
    "sec-h",
    "sec-factory",
  ];

  const SECTION_LABELS = {
    "sec-a": "A 学习目标",
    "sec-b": "B 核心概念",
    "sec-b2": "B+ 生产线",
    "sec-auto": "◎ 汽车电子",
    "sec-c": "C 工具",
    "sec-c2": "C2 Lab",
    "sec-d": "D 案例",
    "sec-e": "E 练习",
    "sec-f": "F 作业",
    "sec-g": "G 自测",
    "sec-h": "H 自评",
    "sec-factory": "🏭 工厂实景",
  };

  function loadAllProgress() {
    try {
      return JSON.parse(
        typeof localStorage !== "undefined"
          ? localStorage.getItem(STORAGE_SECTIONS) || "{}"
          : "{}"
      );
    } catch {
      return {};
    }
  }

  function saveAllProgress(all) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_SECTIONS, JSON.stringify(all));
    }
  }

  function getDayProgress(day, all) {
    const key = String(day);
    const store = all || loadAllProgress();
    return store[key] && typeof store[key] === "object" ? { ...store[key] } : {};
  }

  function setSectionDone(day, sectionId, done, all) {
    const store = { ...(all || loadAllProgress()) };
    const key = String(day);
    const dayMap = { ...getDayProgress(day, store) };
    if (done) dayMap[sectionId] = { at: new Date().toISOString(), manual: true };
    else delete dayMap[sectionId];
    store[key] = dayMap;
    saveAllProgress(store);
    return store;
  }

  function markSectionVisited(day, sectionId, all, manual) {
    const store = { ...(all || loadAllProgress()) };
    const key = String(day);
    const dayMap = { ...getDayProgress(day, store) };
    if (!dayMap[sectionId]) {
      dayMap[sectionId] = {
        at: new Date().toISOString(),
        manual: !!manual,
      };
      store[key] = dayMap;
      saveAllProgress(store);
    }
    return store;
  }

  function calcModulePercent(sectionIds, dayMap) {
    if (!sectionIds.length) return 0;
    let n = 0;
    sectionIds.forEach((id) => {
      if (dayMap[id]) n++;
    });
    return Math.round((n / sectionIds.length) * 100);
  }

  function getNextSectionId(sectionIds, dayMap) {
    for (const id of sectionIds) {
      if (!dayMap[id]) return id;
    }
    return sectionIds[sectionIds.length - 1] || null;
  }

  function pickResumeModule(lastModule, doneDays, maxDay) {
    const last = parseInt(lastModule, 10);
    if (last >= 1 && last <= maxDay) return last;
    const done = Array.isArray(doneDays) ? doneDays : [];
    for (let i = 1; i <= maxDay; i++) {
      if (done.indexOf(i) < 0) return i;
    }
    return maxDay;
  }

  function gradeOneMcqItem(item, day, qIndex, doc) {
    const isMulti = item.type === "multi";
    const name = `mcq-d${day}-q${qIndex}`;
    const wantArr = isMulti
      ? (item.correctValues || item.options.filter((o) => o.correct).map((o) => o.v)).sort()
      : null;
    const want = isMulti
      ? wantArr.join(",")
      : item.correctValue || (item.options.find((o) => o.correct) || {}).v || "a";

    if (isMulti) {
      const checked = doc.querySelectorAll(`input[name="${name}[]"]:checked`);
      const picked = [...checked].map((el) => el.value).sort();
      if (!picked.length) return { ok: false, msg: "请先选择选项", unanswered: true };
      const ok =
        picked.length === wantArr.length && picked.every((v, i) => v === wantArr[i]);
      return { ok, msg: ok ? "✓ 正确" : "✗ 请再试（多选须全对）", picked, want: wantArr };
    }

    const picked = doc.querySelector(`input[name="${name}"]:checked`);
    if (!picked) return { ok: false, msg: "请先选择选项", unanswered: true };
    const ok = picked.value === want;
    return { ok, msg: ok ? "✓ 正确" : "✗ 请再试", picked: picked.value, want };
  }

  return {
    STORAGE_SECTIONS,
    STORAGE_LAST,
    DEFAULT_SECTION_ORDER,
    SECTION_LABELS,
    loadAllProgress,
    saveAllProgress,
    getDayProgress,
    setSectionDone,
    markSectionVisited,
    calcModulePercent,
    getNextSectionId,
    pickResumeModule,
    gradeOneMcqItem,
  };
});
