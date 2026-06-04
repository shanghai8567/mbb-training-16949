/**
 * 作业评分核心逻辑（浏览器 + Node 测试共用）
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.MBBHomeworkGraderCore = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this, function () {
  "use strict";

  function norm(s) {
    return String(s || "").toLowerCase();
  }

  function scoreDimension(text, dim) {
    const t = norm(text);
    if (t.length < 30) return { score: 1, hits: 0, note: "篇幅过短" };
    let hits = 0;
    (dim.keys || []).forEach((k) => {
      if (t.includes(norm(k))) hits++;
    });
    let capped = 5;
    (dim.forbids || []).forEach((f) => {
      if (t.includes(norm(f))) capped = Math.min(capped, 2);
    });
    let score = 1;
    if (hits >= 6) score = 5;
    else if (hits >= 4) score = 4;
    else if (hits >= 2) score = 3;
    else if (hits >= 1) score = 2;
    return { score: Math.min(score, capped), hits, note: `命中 ${hits} 项关键词` };
  }

  function gradeText(text, rubric) {
    const dimResults = {};
    let weighted = 0;
    let totalW = 0;
    const feedback = [];

    Object.entries(rubric.dimensions || {}).forEach(([key, dim]) => {
      const r = scoreDimension(text, dim);
      dimResults[key] = { ...r, label: dim.label, weight: dim.weight };
      weighted += r.score * dim.weight;
      totalW += dim.weight;
      if (r.score < 3)
        feedback.push(
          `${dim.label}偏弱（${r.note}），建议补充：${(dim.keys || []).slice(0, 4).join("、")}`
        );
    });

    let dayHits = 0;
    (rubric.dayKeywords || []).forEach((k) => {
      if (norm(text).includes(norm(k))) dayHits++;
    });
    if (dayHits < 2 && rubric.dayKeywords && rubric.dayKeywords.length) {
      feedback.push(`模块专题词不足，建议包含：${rubric.dayKeywords.slice(0, 5).join("、")}`);
    }

    const len = text.length;
    const minChars = rubric.minChars || 150;
    if (len < minChars) {
      feedback.unshift(`作业字数建议 ≥ ${minChars} 字（当前 ${len} 字），文本分已按字数比例封顶`);
    }

    let evidenceHits = 0;
    (rubric.evidenceFields || []).forEach((f) => {
      if (norm(text).includes(norm(f))) evidenceHits++;
    });
    if (rubric.evidenceFields && evidenceHits < 2) {
      feedback.push(
        `证据链字段不足（${evidenceHits}/${rubric.evidenceFields.length}），建议写明工站号、Profile#、Program_ID、工艺段或 C2 截图引用`
      );
    }

    const rubricAvg = totalW ? weighted / totalW : 1;
    let textPercent = Math.round((rubricAvg / 5) * (rubric.textWeight || 55));
    if (len < minChars) {
      const cap = Math.round((len / minChars) * (rubric.textWeight || 55));
      textPercent = Math.min(textPercent, cap);
    }

    return { dimResults, textPercent, rubricAvg, feedback, charCount: len };
  }

  /**
   * @param {object} rubric
   * @param {Record<string,string>|null} picks - radio name -> value; null = read DOM
   * @param {Document|null} doc
   */
  function gradeMcq(rubric, picks, doc) {
    const mcqList = rubric.mcq || [];
    const total = mcqList.length || 5;
    let correct = 0;
    let unanswered = 0;
    const details = [];

    mcqList.forEach((item, i) => {
      const qIndex = i + 1;
      const name = `mcq-d${rubric.day}-q${qIndex}`;
      const isMulti = item.type === "multi";
      const wantArr = isMulti
        ? (item.correctValues || item.options.filter((o) => o.correct).map((o) => o.v)).sort()
        : null;
      const want = isMulti
        ? wantArr.join(",")
        : item.correctValue || (item.options.find((o) => o.correct) || {}).v || "a";
      let pickedVal = picks ? picks[name] : null;
      let pickedArr = null;
      if (isMulti && picks && Array.isArray(picks[name])) {
        pickedArr = [...picks[name]].sort();
        pickedVal = pickedArr;
      }

      if (picks == null && doc) {
        const block = doc.querySelector(`#gradable-quiz .gq-block[data-qindex="${qIndex}"]`);
        if (isMulti) {
          const checked = doc.querySelectorAll(`input[name="${name}[]"]:checked`);
          pickedArr = [...checked].map((el) => el.value).sort();
          pickedVal = pickedArr;
          if (block) {
            block.querySelectorAll(".gq-opts .opt").forEach((o) => o.classList.remove("correct-pick", "wrong-pick"));
            const wantSet = new Set(wantArr);
            block.querySelectorAll(`input[name="${name}[]"]`).forEach((inp) => {
              const optEl = inp.closest(".opt");
              if (!optEl) return;
              if (wantSet.has(inp.value) && inp.checked) optEl.classList.add("correct-pick");
              else if (inp.checked) optEl.classList.add("wrong-pick");
              else if (wantSet.has(inp.value)) optEl.classList.add("correct-pick");
            });
          }
        } else {
          const picked = doc.querySelector(`input[name="${name}"]:checked`);
          pickedVal = picked ? picked.value : null;
          if (block) {
            block.querySelectorAll(".gq-opts .opt").forEach((o) => o.classList.remove("correct-pick", "wrong-pick"));
            if (picked) {
              const optEl = picked.closest(".opt");
              const ok = picked.value === want;
              if (optEl) optEl.classList.add(ok ? "correct-pick" : "wrong-pick");
              if (!ok) {
                const right = block.querySelector(`input[value="${want}"]`);
                if (right) right.closest(".opt")?.classList.add("correct-pick");
              }
            }
          }
        }
      }

      if (isMulti) {
        const arr = Array.isArray(pickedVal) ? [...pickedVal].sort() : [];
        if (!arr.length) {
          unanswered++;
          details.push({ q: qIndex, ok: false, picked: [], want: wantArr, msg: "未作答", item });
          return;
        }
        const ok =
          arr.length === wantArr.length && arr.every((v, idx) => v === wantArr[idx]);
        if (ok) correct++;
        details.push({
          q: qIndex,
          ok,
          picked: arr,
          want: wantArr,
          msg: ok ? "正确" : "错误",
          item,
        });
        return;
      }

      if (!pickedVal) {
        unanswered++;
        details.push({
          q: qIndex,
          ok: false,
          picked: null,
          want,
          msg: "未作答",
          item,
        });
        return;
      }
      const ok = pickedVal === want;
      if (ok) correct++;
      details.push({
        q: qIndex,
        ok,
        picked: pickedVal,
        want,
        msg: ok ? "正确" : "错误",
        item,
      });
    });

    const mcqPercent = Math.round((correct / total) * (rubric.mcqWeight || 45));
    return { correct, total, unanswered, mcqPercent, details };
  }

  function siteConfigBonus(storageGet) {
    const get = storageGet || (() => null);
    try {
      const raw = get("mbb-site-config-v1");
      if (!raw) return { bonus: 0, note: "" };
      const d = JSON.parse(raw);
      let bonus = 0;
      if (d.q1_offlineTiming?.value === "before-smt") bonus += 2;
      if (d.q5_xraySafeLaunch?.value === "sl-100") bonus += 1;
      if (d.q9_fctIndependent?.some((x) => x.value === "dcu-b")) bonus += 2;
      return {
        bonus: Math.min(bonus, 5),
        note: bonus ? `现场配置问卷已校验，+${bonus} 分加成` : "",
      };
    } catch {
      return { bonus: 0, note: "" };
    }
  }

  function computeTotal(textGrade, mcqGrade, bonus, rubric) {
    let total = textGrade.textPercent + mcqGrade.mcqPercent + (bonus || 0);
    return Math.min(100, Math.max(0, total));
  }

  function sortMcqDetails(details) {
    return [...details].sort((a, b) => {
      if (a.ok !== b.ok) return a.ok ? 1 : -1;
      return a.q - b.q;
    });
  }

  return {
    norm,
    scoreDimension,
    gradeText,
    gradeMcq,
    siteConfigBonus,
    computeTotal,
    sortMcqDetails,
  };
});
