(function () {
  "use strict";

  var STORAGE_KEY = "mbb-day-done";

  function getDone() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function setDone(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function updateProgressBar() {
    var done = getDone();
    var bar = document.querySelector("#prog");
    var label = document.querySelector("#prog-pct");
    var pct = Math.round((done.length / 14) * 100);
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = done.length + " / 14 天 · " + pct + "%";
  }

  function markPlanLinks() {
    var done = getDone();
    document.querySelectorAll("#plan a").forEach(function (a, i) {
      var n = i + 1;
      if (done.indexOf(n) >= 0) a.classList.add("done");
      a.addEventListener("click", function () {
        if (done.indexOf(n) < 0) {
          done.push(n);
          setDone(done);
          a.classList.add("done");
          updateProgressBar();
        }
      });
    });
  }

  function initDayPage() {
    var body = document.body;
    var day = body.getAttribute("data-day");
    if (!day) return;

    var n = parseInt(day, 10);
    var done = getDone();
    var mini = document.querySelector("#day-mini-progress");
    if (mini) mini.textContent = "第 " + n + " / 14 天";

    var markBtn = document.querySelector("#mark-complete");
    if (markBtn) {
      if (done.indexOf(n) >= 0) {
        markBtn.textContent = "✓ 已完成";
        markBtn.classList.add("btn-primary");
      }
      markBtn.addEventListener("click", function () {
        if (done.indexOf(n) < 0) done.push(n);
        else return;
        setDone(done);
        markBtn.textContent = "✓ 已完成";
        markBtn.classList.add("btn-primary");
      });
    }

    var prev = document.querySelector("#nav-prev");
    var next = document.querySelector("#nav-next");
    if (prev && n > 1) prev.href = "day" + String(n - 1).padStart(2, "0") + ".html";
    if (next && n < 14) next.href = "day" + String(n + 1).padStart(2, "0") + ".html";

    document.querySelectorAll(".card").forEach(function (el, i) {
      el.style.animationDelay = Math.min(i * 0.06, 0.5) + "s";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateProgressBar();
    markPlanLinks();
    initDayPage();
  });
})();
