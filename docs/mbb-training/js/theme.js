/**
 * 深色 / 浅色 / 跟随系统 主题切换
 */
(function () {
  "use strict";

  var STORAGE_KEY = "mbb-theme";
  var root = document.documentElement;

  function resolveTheme(stored) {
    if (stored === "light" || stored === "dark") return stored;
    if (stored === "system" || !stored) {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    return "dark";
  }

  function applyTheme(mode) {
    var resolved = resolveTheme(mode);
    root.setAttribute("data-theme", resolved);
    root.setAttribute("data-theme-mode", mode || "system");
    updateButtons(mode || "system");
  }

  function updateButtons(mode) {
    document.querySelectorAll("button[data-theme-pick]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-theme-pick") === mode);
    });
  }

  function setTheme(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
    applyTheme(mode);
  }

  function initSwitcher() {
    document.querySelectorAll(".theme-switcher").forEach(function (bar) {
      if (bar.dataset.bound) return;
      bar.dataset.bound = "1";
      bar.querySelectorAll("button[data-theme-pick]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setTheme(btn.getAttribute("data-theme-pick"));
        });
      });
    });
  }

  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }
  if (!stored) stored = "system";
  applyTheme(stored);

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
      var m = localStorage.getItem(STORAGE_KEY);
      if (!m || m === "system") applyTheme("system");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSwitcher);
  } else {
    initSwitcher();
  }

  window.MBBTheme = { setTheme: setTheme, applyTheme: applyTheme };
})();
