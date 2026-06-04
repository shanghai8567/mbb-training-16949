/**
 * 工厂实景卡片 — 三页签切换
 */
(function () {
  "use strict";

  function initTabs(root) {
    const tabs = root.querySelectorAll(".fs-tab");
    const panels = {
      scene: root.querySelector("#fs-panel-scene"),
      sigma: root.querySelector("#fs-panel-sigma"),
      apply: root.querySelector("#fs-panel-apply"),
    };

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const key = tab.getAttribute("data-fs-panel");
        tabs.forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        Object.keys(panels).forEach(function (k) {
          const p = panels[k];
          if (!p) return;
          const on = k === key;
          p.classList.toggle("is-active", on);
          if (on) p.removeAttribute("hidden");
          else p.setAttribute("hidden", "");
        });
        try {
          const day = root.getAttribute("data-factory-day");
          if (day && window.MBBInteractiveCore) {
            window.MBBInteractiveCore.markSectionVisited(parseInt(day, 10), "sec-factory");
          }
        } catch (e) {
          /* ignore */
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".factory-scenario").forEach(initTabs);
  });
})();
