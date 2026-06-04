/**
 * 工厂场景数据完整性
 * 运行: node test/factory-scenarios.test.js
 */
const { FACTORY_SCENARIOS } = require("./factory-scenarios");
const { renderFactoryScenarioHtml } = require("./render-factory-scenario");

let pass = 0;
let fail = 0;

function ok(c, m) {
  if (c) {
    pass++;
    console.log("PASS:", m);
  } else {
    fail++;
    console.log("FAIL:", m);
  }
}

for (let d = 1; d <= 14; d++) {
  const s = FACTORY_SCENARIOS[d];
  ok(!!s, `day ${d} scenario exists`);
  ok(s && s.title && s.scene && s.sigmaStory && s.applyNow, `day ${d} required fields`);
  ok(s && s.dialogue && s.dialogue.length >= 1, `day ${d} has dialogue`);
  const html = renderFactoryScenarioHtml(d, (x) => x);
  ok(html.includes("sec-factory") && html.includes("fs-tab"), `day ${d} renders html`);
  ok(!/离线(?!烧录)/.test(html + (s.scene || "") + (s.sigmaStory || "")), `day ${d} no abbreviated 离线`);
}

console.log("---");
console.log(fail ? `FAIL ${fail}` : `ALL PASS (${pass})`);
process.exit(fail ? 1 : 0);
