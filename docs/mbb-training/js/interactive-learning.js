/**
 * 交互式培训体验 — 章节进度、滚动导航、G 节逐题即时反馈
 */
(function () {
  "use strict";

  const Core = window.MBBInteractiveCore;
  if (!Core) return;

  let toastTimer = null;

  function showToast(msg) {
    const old = document.querySelector(".il-toast");
    if (old) old.remove();
    const el = document.createElement("div");
    el.className = "il-toast";
    el.setAttribute("role", "status");
    el.textContent = msg;
    document.body.appendChild(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.remove();
    }, 4200);
  }

  function getSectionIds() {
    const main = document.querySelector(".course-main");
    if (!main) return [];
    const found = [];
    main.querySelectorAll("article[id^='sec-']").forEach(function (art) {
      found.push(art.id);
    });
    return found.length ? found : Core.DEFAULT_SECTION_ORDER.filter(function (id) {
      return document.getElementById(id);
    });
  }

  function loadRubric() {
    const el = document.getElementById("hw-rubric-data");
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch {
      return null;
    }
  }

  function highlightMcqBlock(block, item, result, day, qIndex) {
    const Grader = window.MBBHomeworkGraderCore;
    if (Grader && Grader.gradeMcq) {
      const rubric = loadRubric();
      if (rubric) Grader.gradeMcq(rubric, null, document);
    }
    let fb = block.querySelector(".il-check-feedback");
    if (!fb) {
      fb = document.createElement("div");
      fb.className = "il-check-feedback";
      block.appendChild(fb);
    }
    fb.className = "il-check-feedback " + (result.ok ? "pass" : "fail");
    fb.textContent = result.msg;
    if (!result.ok && !result.unanswered && item.explain && item.explain.focus) {
      fb.textContent += " — 提示：" + item.explain.focus;
    }
  }

  function initMcqInstantCheck(day) {
    const rubric = loadRubric();
    if (!rubric || !rubric.mcq) return;
    document.querySelectorAll("#gradable-quiz .gq-block").forEach(function (block) {
      const qIndex = parseInt(block.getAttribute("data-qindex"), 10);
      if (!qIndex || block.querySelector(".il-check-one")) return;
      const item = rubric.mcq[qIndex - 1];
      if (!item) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn il-check-one";
      btn.textContent = "检查本题（即时反馈）";
      btn.addEventListener("click", function () {
        const result = Core.gradeOneMcqItem(item, day, qIndex, document);
        highlightMcqBlock(block, item, result, day, qIndex);
        if (result.ok) {
          Core.markSectionVisited(day, "sec-g");
          refreshUI(day);
        }
      });
      block.appendChild(btn);
    });
  }

  function renderSidebarPanel(day, sectionIds, dayMap, pct) {
    let panel = document.getElementById("il-sidebar-panel");
    if (!panel) {
      const sidebar = document.querySelector(".course-sidebar");
      if (!sidebar) return;
      panel = document.createElement("div");
      panel.id = "il-sidebar-panel";
      panel.className = "il-sidebar-panel";
      const title = sidebar.querySelector(".sb-title");
      if (title && title.nextSibling) sidebar.insertBefore(panel, title.nextSibling);
      else sidebar.prepend(panel);
    }
    panel.innerHTML =
      '<div class="il-ring-wrap">' +
      '<div class="il-ring" style="--il-pct:' +
      pct +
      '"><span>' +
      pct +
      "%</span></div>" +
      '<div class="il-ring-label"><strong>本章学习进度</strong><br>滚动阅读或点击章节标记完成</div></div>" +
      '<ul class="il-section-list" id="il-section-list"></ul>';
    const list = panel.querySelector("#il-section-list");
    sectionIds.forEach(function (id) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.section = id;
      const label = Core.SECTION_LABELS[id] || id;
      const done = !!dayMap[id];
      if (done) btn.classList.add("il-done");
      btn.innerHTML =
        '<span class="il-dot"></span><span>' + label + "</span>";
      btn.addEventListener("click", function () {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        Core.markSectionVisited(day, id, null, true);
        btn.classList.add("il-done");
        refreshUI(day);
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function updateSidebarActive(sectionId) {
    document.querySelectorAll(".il-section-list button").forEach(function (b) {
      b.classList.toggle("il-active", b.dataset.section === sectionId);
    });
    document.querySelectorAll(".course-sidebar a[href='#" + sectionId + "']").forEach(function (a) {
      a.classList.add("il-nav-active");
    });
    document.querySelectorAll(".course-sidebar a").forEach(function (a) {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#sec-") && href !== "#" + sectionId) a.classList.remove("il-nav-active");
    });
  }

  function renderFloatBar(day, sectionIds, dayMap, pct) {
    let bar = document.getElementById("il-float-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "il-float-bar";
      bar.className = "il-float-bar";
      document.body.appendChild(bar);
    }
    const nextId = Core.getNextSectionId(sectionIds, dayMap);
    const nextLabel = nextId ? Core.SECTION_LABELS[nextId] || nextId : "已完成";
    bar.innerHTML =
      '<span class="il-float-pct">本章 <strong>' +
      pct +
      "%</strong></span>" +
      '<button type="button" class="btn" id="il-next-sec">下一节：' +
      nextLabel +
      "</button>" +
      (pct >= 100
        ? '<button type="button" class="btn btn-primary" id="il-mark-all">标记本章完成</button>'
        : "");
    const nextBtn = bar.querySelector("#il-next-sec");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (nextId) {
          const el = document.getElementById(nextId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
    const markAll = bar.querySelector("#il-mark-all");
    if (markAll) {
      markAll.addEventListener("click", function () {
        const markBtn = document.getElementById("mark-complete");
        if (markBtn) markBtn.click();
        showToast("本章已标记完成 — 可在课程总览查看 14 模块进度");
      });
    }
  }

  function refreshUI(day) {
    const sectionIds = getSectionIds();
    const dayMap = Core.getDayProgress(day);
    const pct = Core.calcModulePercent(sectionIds, dayMap);
    renderSidebarPanel(day, sectionIds, dayMap, pct);
    renderFloatBar(day, sectionIds, dayMap, pct);
    const ring = document.querySelector(".il-ring");
    if (ring) ring.style.setProperty("--il-pct", String(pct));
    if (pct >= 100) {
      const key = "mbb-il-complete-toast-" + day;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        showToast("恭喜 — 本章各节已学完，请完成 F 节作业提交与 G 节自测");
      }
    }
    return { sectionIds, dayMap, pct };
  }

  function initScrollSpy(day, sectionIds) {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;
          const id = entry.target.id;
          Core.markSectionVisited(day, id);
          updateSidebarActive(id);
          refreshUI(day);
        });
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0.35, 0.55] }
    );
    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  function initDayPage() {
    const day = parseInt(document.body.getAttribute("data-day"), 10);
    if (!day) return;
    try {
      localStorage.setItem(Core.STORAGE_LAST, String(day));
    } catch (e) {
      /* ignore */
    }
    const sectionIds = getSectionIds();
    const state = refreshUI(day);
    initScrollSpy(day, state.sectionIds);
    initMcqInstantCheck(day);

    document.querySelectorAll(".exercise-answer-ref").forEach(function (det) {
      det.addEventListener("toggle", function () {
        if (det.open) Core.markSectionVisited(day, "sec-e");
      });
    });
  }

  function initIndexPage() {
    const card = document.getElementById("il-resume-card");
    if (!card) return;
    let last = 1;
    try {
      last = parseInt(localStorage.getItem(Core.STORAGE_LAST) || "1", 10);
    } catch (e) {
      last = 1;
    }
    let done = [];
    try {
      done = JSON.parse(localStorage.getItem("mbb-day-done") || "[]");
    } catch (e) {
      done = [];
    }
    const resume = Core.pickResumeModule(last, done, 14);
    const all = Core.loadAllProgress();
    let totalPct = 0;
    for (let d = 1; d <= 14; d++) {
      const ids = Core.DEFAULT_SECTION_ORDER;
      totalPct += Core.calcModulePercent(ids, Core.getDayProgress(d, all));
    }
    const avgPct = Math.round(totalPct / 14);
    const href = "days/day" + String(resume).padStart(2, "0") + ".html";
    card.querySelector("#il-resume-link").setAttribute("href", href);
    card.querySelector("#il-resume-module").textContent = "模块 " + resume;
    card.querySelector("#il-avg-pct").textContent = avgPct + "%";
    card.querySelector("#il-done-count").textContent = done.length + " / 14";
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.body.getAttribute("data-day")) initDayPage();
    initIndexPage();
  });
})();
