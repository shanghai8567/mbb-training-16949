/**
 * H 节能力自评 — 生成可入库表单 HTML
 */
function renderSelfAssessmentSection(dayN) {
  return `<div class="self-assessment-panel" id="self-assessment-panel" data-day="${dayN}">
    <p class="hw-hint">自评写入本机浏览器（占结业规划 <strong>5%</strong>），可在 <a href="../reference/homework-scores.html#dashboard">学习仪表盘</a> 汇总。</p>
    <div class="sa-grid">
      <label>概念 — 能正确教授 BB
        <select id="sa-concept" class="sa-select" data-dim="concept">
          <option value="">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option>
        </select>
      </label>
      <label>应用 — 能操作软件并判读
        <select id="sa-apply" class="sa-select" data-dim="apply">
          <option value="">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option>
        </select>
      </label>
      <label>分析 — 能链接商业决策
        <select id="sa-teach" class="sa-select" data-dim="teach">
          <option value="">—</option>
          <option value="1">1</option><option value="2">2</option><option value="3">3</option>
          <option value="4">4</option><option value="5">5</option>
        </select>
      </label>
    </div>
    <label class="hw-label" for="sa-evidence">证据/备注（工站号、截图、困惑点）</label>
    <textarea id="sa-evidence" class="hw-textarea sa-evidence" rows="3" placeholder="例：已完成 C2 SPI GRR 截图；尚不熟 Eth 分层…"></textarea>
    <div class="form-actions hw-actions">
      <button type="button" class="btn btn-primary" id="sa-save-btn">保存 H 节自评</button>
      <span id="sa-status" class="sa-status" aria-live="polite"></span>
    </div>
    <p id="sa-warn" class="sa-warn" style="display:none;color:var(--coral)">任一项 &lt; 3：建议重修本模块 · <code>/day ${dayN}</code></p>
  </div>`;
}

module.exports = { renderSelfAssessmentSection };
