/**
 * 现场配置问卷 — 单选 / 多选 / 其他补充
 * 本地保存 + 生成 Charter / 路由表对齐摘要
 */
(function () {
  const STORAGE_KEY = "mbb-site-config-v1";

  const DEFAULTS = {
    q1: "before-smt",
    q2: ["all-products"],
    q3: "checksum-100",
    q5: "sl-100",
    q6: "csr",
    q7: ["adas-bga", "body-bga", "all-key-bga"],
    q9: ["dcu-b", "dcu-a"],
    q10: "dedicated",
    q12: ["ic", "hu", "dcu-c", "dcu-b", "dcu-a"],
    q13: ["offline", "smt", "xray", "tht", "ict", "fct", "assy"],
  };

  const form = document.getElementById("site-config-form");
  if (!form) return;

  function $(sel, root) {
    return (root || form).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.from((root || form).querySelectorAll(sel));
  }

  function bindOtherToggles() {
    $$(".q-block").forEach((block) => {
      const otherOpt = block.querySelector('[data-triggers-other="1"]');
      const wrap = block.querySelector(".other-wrap");
      if (!otherOpt || !wrap) return;

      const sync = () => {
        const on =
          otherOpt.checked ||
          (otherOpt.type === "radio" &&
            block.querySelector(`input[name="${otherOpt.name}"]:checked`) === otherOpt);
        wrap.classList.toggle("is-open", on);
        const ta = wrap.querySelector("textarea, input");
        if (ta) ta.required = on;
      };

      block.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((el) => {
        el.addEventListener("change", sync);
      });
      sync();
    });
  }

  function bindConditional() {
    const q6 = form.querySelector('[name="q6"]');
    const pctWrap = $("#q6-pct-wrap");
    if (q6 && pctWrap) {
      const sync = () => {
        const sel = form.querySelector('[name="q6"]:checked');
        pctWrap.classList.toggle("is-open", sel && sel.value === "fixed-pct");
      };
      q6.forEach((el) => el.addEventListener("change", sync));
      sync();
    }
  }

  function setRadio(name, value) {
    const el = form.querySelector(`input[name="${name}"][value="${value}"]`);
    if (el) el.checked = true;
  }

  function setChecks(name, values) {
    form.querySelectorAll(`input[name="${name}"]`).forEach((el) => {
      el.checked = values.includes(el.value);
    });
  }

  function applyDefaults() {
    setRadio("q1", DEFAULTS.q1);
    setChecks("q2", DEFAULTS.q2);
    setRadio("q3", DEFAULTS.q3);
    setRadio("q5", DEFAULTS.q5);
    setRadio("q6", DEFAULTS.q6);
    setChecks("q7", DEFAULTS.q7);
    setChecks("q9", DEFAULTS.q9);
    setRadio("q10", DEFAULTS.q10);
    setChecks("q12", DEFAULTS.q12);
    setChecks("q13", DEFAULTS.q13);
    bindOtherToggles();
    bindConditional();
    updateProgress();
  }

  function readRadio(name) {
    const el = form.querySelector(`input[name="${name}"]:checked`);
    return el ? { value: el.value, label: el.dataset.label || el.value } : null;
  }

  function readChecks(name) {
    return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => ({
      value: el.value,
      label: el.dataset.label || el.value,
    }));
  }

  function readText(id) {
    const el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : "";
  }

  function collect() {
    return {
      meta: {
        savedAt: new Date().toISOString(),
        respondent: readText("meta-respondent"),
        plantLine: readText("meta-plant"),
      },
      q1_offlineTiming: readRadio("q1"),
      q2_offlineProducts: readChecks("q2"),
      q3_versionCheck: readRadio("q3"),
      q3_versionOther: readText("q3-other"),
      q4_offlineOther: readText("q4-other"),
      q5_xraySafeLaunch: readRadio("q5"),
      q6_xrayMassProd: readRadio("q6"),
      q6_massProdPct: readText("q6-pct"),
      q7_xrayScope: readChecks("q7"),
      q8_xrayOther: readText("q8-other"),
      q9_fctIndependent: readChecks("q9"),
      q10_bodyFctMode: readRadio("q10"),
      q10_fctModeOther: readText("q10-other"),
      q11_fctOther: readText("q11-other"),
      q12_products: readChecks("q12"),
      q13_processSegments: readChecks("q13"),
      q14_generalOther: readText("q14-other"),
    };
  }

  function validate(data) {
    const errors = [];
    if (!data.q1_offlineTiming) errors.push({ id: "q1", msg: "请选择离线烧录时点（单选）" });
    if (!data.q2_offlineProducts.length) errors.push({ id: "q2", msg: "请至少选择一种产品（多选）" });
    if (!data.q3_versionCheck) errors.push({ id: "q3", msg: "请选择版本校验方式（单选）" });
    if (!data.q5_xraySafeLaunch) errors.push({ id: "q5", msg: "请选择 Safe Launch X-Ray 策略（单选）" });
    if (!data.q6_xrayMassProd) errors.push({ id: "q6", msg: "请选择量产 X-Ray 抽样策略（单选）" });
    if (data.q6_xrayMassProd?.value === "fixed-pct" && !data.q6_massProdPct) {
      errors.push({ id: "q6", msg: "请填写量产抽检比例（%）" });
    }
    if (!data.q7_xrayScope.length) errors.push({ id: "q7", msg: "请选择 X-Ray 适用范围（多选）" });
    if (!data.q9_fctIndependent.length) errors.push({ id: "q9", msg: "请选择 FCT 工站布局（多选）" });
    if (!data.q10_bodyFctMode) errors.push({ id: "q10", msg: "请选择车身域控 FCT 组织方式（单选）" });
    if (!data.q12_products.length) errors.push({ id: "q12", msg: "请选择培训/在产产品（多选）" });
    if (!data.q13_processSegments.length) errors.push({ id: "q13", msg: "请选择已上线工艺段（多选）" });

    $$(".q-block").forEach((block) => {
      const other = block.querySelector('[data-triggers-other="1"]:checked');
      if (!other) return;
      const ta = block.querySelector(".other-wrap textarea");
      if (ta && !ta.value.trim()) {
        const id = block.id || "q1";
        errors.push({ id, msg: "已选「其他」，请填写补充说明" });
      }
    });

    return errors;
  }

  function showErrors(errors) {
    $$(".q-block").forEach((b) => b.classList.remove("has-error"));
    errors.forEach((e) => {
      const block = document.getElementById(e.id);
      if (!block) return;
      block.classList.add("has-error");
      const fe = block.querySelector(".field-error");
      if (fe) fe.textContent = e.msg;
    });
  }

  function formatSummary(data) {
    const line = (k, v) => (v ? `${k}：${v}` : "");
    const labels = (arr) => (arr || []).map((x) => x.label).join("、");

    return [
      "【MBB 现场配置问卷 — 摘要】",
      line("填写人", data.meta.respondent),
      line("工厂/产线", data.meta.plantLine),
      line("生成时间", data.meta.savedAt),
      "",
      "■ 离线烧录",
      line("时点", data.q1_offlineTiming?.label),
      line("涉及产品", labels(data.q2_offlineProducts)),
      line("版本校验", data.q3_versionCheck?.label),
      line("版本校验-其他", data.q3_versionOther),
      line("离线-其他", data.q4_offlineOther),
      "",
      "■ BGA X-Ray",
      line("Safe Launch", data.q5_xraySafeLaunch?.label),
      line(
        "量产后",
        data.q6_xrayMassProd?.value === "fixed-pct"
          ? `${data.q6_xrayMassProd.label} ${data.q6_massProdPct}%`
          : data.q6_xrayMassProd?.label
      ),
      line("适用范围", labels(data.q7_xrayScope)),
      line("其他补充", data.q8_xrayOther),
      "",
      "■ FCT",
      line("独立工站产品", labels(data.q9_fctIndependent)),
      line("车身域控", data.q10_bodyFctMode?.label),
      line("车身FCT-其他", data.q10_fctModeOther),
      line("FCT补充", data.q11_fctOther),
      "",
      "■ 范围",
      line("在产产品", labels(data.q12_products)),
      line("工艺段", labels(data.q13_processSegments)),
      line("总体其他", data.q14_generalOther),
      "",
      "→ 请将本摘要粘贴至项目 Charter「过程范围」或同步 process-routing-electronics.csv",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function updateProgress() {
    const required = ["q1", "q2", "q3", "q5", "q6", "q7", "q9", "q10", "q12", "q13"];
    let done = 0;
    required.forEach((name) => {
      const radios = form.querySelectorAll(`input[name="${name}"]`);
      if (radios.length && radios[0].type === "radio") {
        if (form.querySelector(`input[name="${name}"]:checked`)) done++;
      } else if (form.querySelectorAll(`input[name="${name}"]:checked`).length) done++;
    });
    const pct = Math.round((done / required.length) * 100);
    const bar = $("#progress-fill");
    const txt = $("#progress-text");
    if (bar) bar.style.width = `${pct}%`;
    if (txt) txt.textContent = `必填进度 ${done}/${required.length}（${pct}%）`;
  }

  function saveLocal(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.q1_offlineTiming?.value) setRadio("q1", data.q1_offlineTiming.value);
      if (data.q2_offlineProducts) setChecks("q2", data.q2_offlineProducts.map((x) => x.value));
      if (data.q3_versionCheck?.value) setRadio("q3", data.q3_versionCheck.value);
      if (data.q5_xraySafeLaunch?.value) setRadio("q5", data.q5_xraySafeLaunch.value);
      if (data.q6_xrayMassProd?.value) setRadio("q6", data.q6_xrayMassProd.value);
      if (data.q7_xrayScope) setChecks("q7", data.q7_xrayScope.map((x) => x.value));
      if (data.q9_fctIndependent) setChecks("q9", data.q9_fctIndependent.map((x) => x.value));
      if (data.q10_bodyFctMode?.value) setRadio("q10", data.q10_bodyFctMode.value);
      if (data.q12_products) setChecks("q12", data.q12_products.map((x) => x.value));
      if (data.q13_processSegments) setChecks("q13", data.q13_processSegments.map((x) => x.value));
      const texts = [
        ["meta-respondent", data.meta?.respondent],
        ["meta-plant", data.meta?.plantLine],
        ["q3-other", data.q3_versionOther],
        ["q4-other", data.q4_offlineOther],
        ["q10-other", data.q10_fctModeOther],
        ["q6-pct", data.q6_massProdPct],
        ["q8-other", data.q8_xrayOther],
        ["q11-other", data.q11_fctOther],
        ["q14-other", data.q14_generalOther],
      ];
      texts.forEach(([id, v]) => {
        const el = document.getElementById(id);
        if (el && v) el.value = v;
      });
      bindOtherToggles();
      bindConditional();
      updateProgress();
      return true;
    } catch {
      return false;
    }
  }

  function showSummary(text) {
    const panel = $("#site-summary");
    const pre = $("#summary-text");
    if (panel && pre) {
      pre.textContent = text;
      panel.classList.add("is-visible");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  form.addEventListener("change", updateProgress);
  form.addEventListener("input", updateProgress);

  $("#btn-defaults")?.addEventListener("click", (e) => {
    e.preventDefault();
    applyDefaults();
    $("#toast")?.classList.add("show");
    setTimeout(() => $("#toast")?.classList.remove("show"), 2200);
  });

  $("#btn-save")?.addEventListener("click", (e) => {
    e.preventDefault();
    const data = collect();
    if (saveLocal(data)) showSummary("已保存到本浏览器（localStorage）。\n\n" + formatSummary(data));
  });

  $("#btn-validate")?.addEventListener("click", (e) => {
    e.preventDefault();
    const data = collect();
    const errors = validate(data);
    if (errors.length) {
      showErrors(errors);
      showSummary("校验未通过，请修正标红题目。\n\n" + errors.map((x) => `• ${x.msg}`).join("\n"));
      return;
    }
    showErrors([]);
    saveLocal(data);
    try {
      localStorage.setItem("mbb-site-config-validated", "1");
    } catch {
      /* ignore */
    }
    showSummary(formatSummary(data));
  });

  $("#btn-copy")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const text = $("#summary-text")?.textContent || "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      $("#toast")?.classList.add("show");
      setTimeout(() => $("#toast")?.classList.remove("show"), 2200);
    } catch {
      /* fallback */
    }
  });

  $("#btn-json")?.addEventListener("click", (e) => {
    e.preventDefault();
    const data = collect();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `site-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  bindOtherToggles();
  bindConditional();
  if (!loadLocal()) applyDefaults();
  else updateProgress();
})();
