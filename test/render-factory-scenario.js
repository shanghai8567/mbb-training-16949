/**
 * 渲染工厂实景学习卡片 HTML
 */
const { FACTORY_SCENARIOS } = require("./factory-scenarios");

/**
 * @param {number} dayN
 * @param {(s:string)=>string} esc
 */
function renderFactoryScenarioHtml(dayN, esc) {
  const s = FACTORY_SCENARIOS[dayN];
  if (!s) return "";

  const dlg = (s.dialogue || [])
    .map(
      (d) =>
        `<div class="fs-dialogue-line"><span class="fs-who">${esc(d.who)}</span><span class="fs-line">${esc(d.line)}</span></div>`
    )
    .join("");

  const tools = (s.tools || []).map((t) => `<span class="fs-tool-tag">${esc(t)}</span>`).join("");
  const products = (s.products || []).map((p) => `<span class="fs-product-tag">${esc(p)}</span>`).join("");

  return `<article class="card pro factory-scenario" id="sec-factory" data-factory-day="${dayN}">
    <h2><span class="section-num">🏭</span>工厂实景 · 六西格玛致用课堂</h2>
    <p class="fs-meta">
      <span class="tag auto">${esc(s.dmaicTag || "DMAIC")}</span>
      <span class="tag gold">${esc(s.station || "")}</span>
    </p>
    <div class="fs-product-row">${products}</div>

    <div class="fs-tabs" role="tablist" aria-label="场景学习模式">
      <button type="button" class="fs-tab is-active" data-fs-panel="scene" role="tab" aria-selected="true">① 现场故事</button>
      <button type="button" class="fs-tab" data-fs-panel="sigma" role="tab">② 黑带解析</button>
      <button type="button" class="fs-tab" data-fs-panel="apply" role="tab">③ 30 秒致用</button>
    </div>

    <div class="fs-panel is-active" id="fs-panel-scene" role="tabpanel">
      <h3 class="fs-story-title">${esc(s.title)}</h3>
      <p class="fs-scene">${esc(s.scene)}</p>
      <div class="fs-dialogue">${dlg}</div>
    </div>

    <div class="fs-panel" id="fs-panel-sigma" role="tabpanel" hidden>
      <p class="fs-sigma">${esc(s.sigmaStory)}</p>
      <div class="fs-tools">${tools}</div>
      <div class="fs-pitfall"><strong>典型踩坑</strong> — ${esc(s.pitfall || "")}</div>
    </div>

    <div class="fs-panel" id="fs-panel-apply" role="tabpanel" hidden>
      <div class="fs-apply-box">
        <strong>现在就做</strong>
        <p>${esc(s.applyNow || "")}</p>
      </div>
      <p class="fs-fun"><span class="fs-fun-ico">💡</span> ${esc(s.funFact || "")}</p>
      <p style="margin-top:0.75rem;font-size:0.88rem;color:var(--muted)">完成致用行动后，前往 <a href="#sec-e">E 课堂练习</a> 或 <a href="#sec-f">F 作业提交</a> 巩固。</p>
    </div>
  </article>`;
}

function renderFactoryHubCards(esc) {
  return Object.entries(FACTORY_SCENARIOS)
    .map(([n, s]) => {
      const day = String(n).padStart(2, "0");
      return `<a class="fs-hub-card" href="../days/day${day}.html#sec-factory">
        <span class="fs-hub-day">模块 ${n}</span>
        <strong>${esc(s.title)}</strong>
        <span class="fs-hub-station">${esc(s.station || "")}</span>
      </a>`;
    })
    .join("");
}

module.exports = {
  FACTORY_SCENARIOS,
  renderFactoryScenarioHtml,
  renderFactoryHubCards,
};
