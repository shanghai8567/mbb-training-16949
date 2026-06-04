/**
 * 打印页日期、打印前展开测验解析
 */
(function () {
  "use strict";

  var d = new Date();
  var dateStr = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  document.querySelectorAll(".print-date").forEach(function (el) {
    el.textContent = dateStr;
  });

  if (window.matchMedia && window.matchMedia("print").matches) {
    document.querySelectorAll(".quiz-answers-ref").forEach(function (el) {
      el.setAttribute("open", "");
    });
  }

  window.addEventListener("beforeprint", function () {
    document.querySelectorAll(".quiz-answers-ref").forEach(function (el) {
      el.setAttribute("open", "");
    });
  });
})();
