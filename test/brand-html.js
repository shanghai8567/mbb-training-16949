/**
 * 企业 Logo 顶栏 + 打印页眉 HTML 片段
 * 修改 org 名称请同步 css/brand.css 变量
 */
const BRAND = {
  orgName: "六西格玛黑带学院",
  orgSub: "汽车电子 EMS · MBB 培训",
  logoPath: "assets/enterprise-logo.svg",
};

function logoSrc(prefix) {
  return `${prefix}${BRAND.logoPath}`;
}

function renderTopbarBrand(homeHref, prefix) {
  const src = logoSrc(prefix);
  return `<a class="brand" href="${homeHref}">
      <span class="brand-logo-wrap" title="企业 Logo — 可替换 ${BRAND.logoPath}">
        <img class="brand-logo" src="${src}" alt="企业 Logo" width="160" height="40"
          onerror="this.style.display='none';this.parentElement.classList.add('logo-missing')" />
      </span>
      <span class="belt-mark fallback-mark">σ</span>
      <span class="brand-text-wrap">
        <span class="brand-org-name">${BRAND.orgName}</span>
        <span class="brand-org-sub">${BRAND.orgSub}</span>
      </span>
    </a>`;
}

function renderPrintHeader(prefix, docTitle) {
  const src = logoSrc(prefix);
  const title = docTitle || "MBB 培训课程";
  return `<header class="print-only print-header" aria-hidden="true">
      <div class="print-header-logo">
        <img src="${src}" alt="" onerror="this.parentElement.innerHTML='<span style=font-size:10pt;color:#1e3a5f;font-weight:700">${BRAND.orgName}</span>'" />
      </div>
      <div class="print-header-meta">
        <strong>${BRAND.orgName}</strong>
        <span class="print-doc-title">${title}</span>
        <span>打印日期：<span class="print-date"></span></span>
      </div>
    </header>`;
}

function renderHeroBrandRow(prefix) {
  const src = logoSrc(prefix);
  return `<div class="hero-brand-row">
      <div class="hero-logo-slot" title="替换 ${BRAND.logoPath} 为贵司 Logo">
        <img src="${src}" alt="企业 Logo" />
      </div>
      <span class="hero-brand-divider" aria-hidden="true"></span>
      <div style="text-align:left">
        <p class="eyebrow" style="margin:0">Six Sigma Black Belt · Automotive Edition</p>
      </div>
    </div>`;
}

function renderThemeSwitcher() {
  return `<div class="theme-switcher" role="group" aria-label="主题切换">
      <button type="button" data-theme-pick="dark" title="深色主题"><span class="ico">🌙</span></button>
      <button type="button" data-theme-pick="light" title="浅色主题"><span class="ico">☀</span></button>
      <button type="button" data-theme-pick="system" title="跟随系统"><span class="ico">◐</span></button>
    </div>`;
}

module.exports = {
  BRAND,
  renderTopbarBrand,
  renderPrintHeader,
  renderHeroBrandRow,
  renderThemeSwitcher,
  logoSrc,
};
