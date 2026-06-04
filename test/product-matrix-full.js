/**
 * 五产品 × 四工艺段 全矩阵（B+ / IATF 共用）
 */
const PRODUCT_MATRIX_FULL = {
  headers: ["产品", "离线烧录@SMT前", "SMT·BGA", "手插/波峰", "FCT 工站"],
  rows: [
    ["组合仪表 IC", "MCU 预烧", "少量 BGA · SPI", "接插件扭矩", "FCT-IC-01"],
    ["中控 HU", "eMMC+主控镜像", "DDR BGA · SPI", "显示贴合", "FCT-HU-02"],
    ["座舱域控 DCU-C", "MCU+Switch+eMMC", "关键 BGA U12", "域控盒体", "FCT-DCU-C-03"],
    ["车身域控 DCU-B", "MCU+CAN Boot", "功率+BGA", "继电器浮高", "FCT-DCU-B-04 独立"],
    ["ADAS 域控 DCU-A", "SOC+eMMC Checksum", "大 BGA U12 · Profile#", "—", "FCT-DCU-A-05 Eth/CAN"],
  ],
  xrayNote: "全产品共用：SL 100% 全检 → MP 抽检（Analyze 须标切换日）",
};

function renderMatrixTableHtml(esc) {
  const e = esc || ((s) => String(s));
  const [head, ...rows] = [
    PRODUCT_MATRIX_FULL.headers,
    ...PRODUCT_MATRIX_FULL.rows,
  ];
  const body = rows
    .map((r) => `<tr>${r.map((c) => `<td>${e(c)}</td>`).join("")}</tr>`)
    .join("");
  return `<div class="table-wrap product-matrix-full" style="margin-top:1rem">
    <table><thead><tr>${head.map((c) => `<th>${e(c)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table>
    <p style="font-size:0.85rem;color:var(--muted);margin-top:0.5rem">${e(PRODUCT_MATRIX_FULL.xrayNote)}</p>
  </div>`;
}

module.exports = { PRODUCT_MATRIX_FULL, renderMatrixTableHtml };
