/**
 * 课后作业自动评分：Rubric 关键词（55%）+ 客观题 MCQ（45%）
 */
(function () {
  "use strict";

  const Core = window.MBBHomeworkGraderCore;
  if (!Core) return;

  const SCORES_KEY = "mbb-hw-scores";
  const DRAFT_PREFIX = "mbb-hw-draft-d";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function saveScore(day, payload) {
    let all = {};
    try {
      all = JSON.parse(localStorage.getItem(SCORES_KEY) || "{}");
    } catch {
      all = {};
    }
    all[String(day)] = { ...payload, at: new Date().toISOString() };
    localStorage.setItem(SCORES_KEY, JSON.stringify(all));
  }

  function renderExplainBlock(item, pickedVal) {
    const ex = item.explain || {};
    const isMulti = item.type === "multi";
    const wantSet = new Set(
      isMulti
        ? (item.correctValues || []).map((v) => String(v).toLowerCase())
        : [String(item.correctValue || "").toLowerCase()]
    );
    const pickedSet = new Set(
      Array.isArray(pickedVal)
        ? pickedVal.map((v) => String(v).toLowerCase())
        : pickedVal
          ? [String(pickedVal).toLowerCase()]
          : []
    );
    const sourceTag =
      ex.source === "author"
        ? '<span class="gq-explain-source author">精编解析</span>'
        : '<span class="gq-explain-source auto">规则解析</span>';
    const distractorLines = item.options
      .filter((o) => !wantSet.has(o.v))
      .map((o) => {
        const note = (ex.distractors && ex.distractors[o.v]) || "见题干干扰项设计。";
        const mark = pickedSet.has(o.v) ? " ← 您的选择" : "";
        return `<li><strong>${esc(o.v.toUpperCase())}</strong> ${esc(o.t)}${mark}<br><span class="gq-explain-dim">${esc(note)}</span></li>`;
      })
      .join("");
    const setsEqual =
      wantSet.size === pickedSet.size && [...wantSet].every((v) => pickedSet.has(v));
    const status = isMulti ? (setsEqual ? "pass" : "fail") : pickedVal === item.correctValue ? "pass" : "fail";
    const correctOpts = item.options.filter((o) => wantSet.has(o.v));
    return `<div class="gq-explain-block ${status}">
      ${sourceTag}
      <p class="gq-explain-focus"><strong>考点</strong> ${esc(ex.focus || "")}</p>
      <p class="gq-explain-rationale"><strong>正解</strong> ${esc(ex.rationale || correctOpts.map((o) => o.t).join("；") || "")}</p>
      <p class="gq-explain-distractor-title"><strong>误选简析</strong></p>
      <ul class="gq-explain-distractor-list obj-list">${distractorLines}</ul>
      ${ex.anchor ? `<p class="gq-explain-anchor">${esc(ex.anchor)}</p>` : ""}
    </div>`;
  }

  function renderMcqReview(mcqGrade) {
    const panel = document.getElementById("hw-mcq-review");
    if (!panel) return;
    const sorted = Core.sortMcqDetails(mcqGrade.details);
    const html = sorted
      .map((d) => {
        const badge = d.ok
          ? '<span class="hw-badge pass">正确</span>'
          : '<span class="hw-badge fail">错误</span>';
        return `<section class="hw-mcq-review-item ${d.ok ? "is-ok" : "is-wrong"}" data-q="${d.q}">
          <h4>Q${d.q} ${badge}</h4>
          <p class="hw-mcq-qtext">${esc(d.item.q)}</p>
          ${renderExplainBlock(d.item, d.picked)}
        </section>`;
      })
      .join("");
    panel.innerHTML = `<h3 class="hw-mcq-review-title">客观题解析（错题置顶）</h3>${html}`;
    panel.classList.add("is-visible");
  }

  function openQuizAnswersRef() {
    const ref = document.getElementById("quiz-answers-ref");
    if (ref) {
      ref.open = true;
      ref.classList.add("is-open-after-submit");
    }
    const wrongBlocks = document.querySelectorAll("#gradable-quiz .gq-block");
    wrongBlocks.forEach((block) => {
      const hasWrong = block.querySelector(".wrong-pick");
      if (hasWrong) block.classList.add("gq-block-wrong");
    });
  }

  function renderResult(rubric, textGrade, mcqGrade, total, extras) {
    const panel = document.getElementById("hw-result");
    if (!panel) return;

    const cls = total >= 85 ? "pass" : total >= rubric.passScore ? "warn" : "fail";
    const passLabel = total >= rubric.passScore ? "达标" : "未达标（建议重修）";

    const dimRows = Object.entries(textGrade.dimResults)
      .map(
        ([, r]) =>
          `<tr><td>${esc(r.label)}</td><td>${r.score}/5</td><td>${r.weight}%</td><td>${esc(r.note)}</td></tr>`
      )
      .join("");

    panel.innerHTML = `
      <div class="hw-score-ring">
        <div class="hw-score-big ${cls}">${total}<span style="font-size:1rem;color:var(--muted)">/100</span></div>
        <div>
          <span class="hw-badge ${total >= rubric.passScore ? "pass" : "fail"}">${passLabel}</span>
          <p style="margin-top:0.5rem;font-size:0.9rem;color:var(--muted)">
            作业文本 ${textGrade.textPercent} 分 + 客观题 ${mcqGrade.mcqPercent} 分
            ${extras.bonus ? ` + 现场问卷加成 ${extras.bonus} 分` : ""}
          </p>
          <p style="font-size:0.85rem;color:var(--muted)">客观题 ${mcqGrade.correct}/${mcqGrade.total} 正确
            ${mcqGrade.unanswered ? ` · ${mcqGrade.unanswered} 题未答` : ""}</p>
        </div>
      </div>
      <table class="hw-dim-table">
        <thead><tr><th>Rubric 维度</th><th>得分</th><th>权重</th><th>说明</th></tr></thead>
        <tbody>${dimRows}</tbody>
      </table>
      <ul class="hw-feedback obj-list">
        ${textGrade.feedback.map((f) => `<li>${esc(f)}</li>`).join("")}
        ${extras.bonusNote ? `<li>${esc(extras.bonusNote)}</li>` : ""}
        <li>如需深度批改，可将作业粘贴至 AI 教练：<code>/review 作业</code></li>
      </ul>
      <p style="margin-top:1rem">
        <a class="btn" href="../reference/homework-scores.html">查看全部模块成绩 →</a>
      </p>`;
    panel.classList.add("is-visible");
  }

  function init() {
    const rubric = loadRubric();
    const day = rubric?.day || Number(document.body.getAttribute("data-day"));
    if (!rubric || !day) return;

    const textarea = document.getElementById("hw-text");
    const draftKey = DRAFT_PREFIX + day;

    try {
      const draft = localStorage.getItem(draftKey);
      if (draft && textarea && !textarea.value) textarea.value = draft;
    } catch {
      /* ignore */
    }

    document.getElementById("hw-save-draft")?.addEventListener("click", () => {
      if (!textarea) return;
      localStorage.setItem(draftKey, textarea.value);
      alert("草稿已保存");
    });

    document.getElementById("hw-submit-btn")?.addEventListener("click", () => {
      const text = (textarea?.value || "").trim();
      const mcq = Core.gradeMcq(rubric, null, document);

      if (mcq.unanswered > 0) {
        alert(`请先完成全部客观题（还有 ${mcq.unanswered} 题未选）`);
        return;
      }

      const textGrade = Core.gradeText(text, rubric);
      let bonus = 0;
      let bonusNote = "";
      if (day === 1) {
        const b = Core.siteConfigBonus((k) => localStorage.getItem(k));
        bonus = b.bonus;
        bonusNote = b.note;
      }

      const total = Core.computeTotal(textGrade, mcq, bonus, rubric);

      saveScore(day, {
        total,
        textPercent: textGrade.textPercent,
        mcqPercent: mcq.mcqPercent,
        bonus,
        rubricAvg: textGrade.rubricAvg,
        mcqCorrect: mcq.correct,
      });

      renderResult(rubric, textGrade, mcq, total, { bonus, bonusNote });
      renderMcqReview(mcq);
      openQuizAnswersRef();

      document.getElementById("hw-mcq-review")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.MBBHomeworkGrader = {
    loadRubric,
    saveScore,
    SCORES_KEY,
    Core,
  };
})();
