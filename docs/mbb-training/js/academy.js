(function () {
  "use strict";

  document.querySelectorAll(".course-sidebar a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll(".course-sidebar a").forEach(function (a) {
          a.classList.remove("active");
        });
        link.classList.add("active");
      }
    });
  });

  if ("IntersectionObserver" in window) {
    var sections = document.querySelectorAll(".course-main .card[id]");
    var links = document.querySelectorAll(".course-sidebar a[href^='#']");
    if (sections.length && links.length) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              var id = en.target.getAttribute("id");
              links.forEach(function (a) {
                a.classList.toggle("active", a.getAttribute("href") === "#" + id);
              });
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      sections.forEach(function (s) {
        obs.observe(s);
      });
    }
  }
})();
