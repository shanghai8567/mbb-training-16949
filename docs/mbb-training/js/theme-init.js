/* 防闪烁：在首屏绘制前应用已存主题 */
(function () {
  var k = "mbb-theme";
  var m;
  try {
    m = localStorage.getItem(k);
  } catch (e) {
    m = null;
  }
  var t =
    m === "light" || m === "dark"
      ? m
      : window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
  document.documentElement.setAttribute("data-theme", t);
})();
