/**
 * 工厂场景数据完整性（含 P0/P1 加深字段）
 * 运行: node test/factory-scenarios.test.js
 */
const { FACTORY_SCENARIOS, FACTORY_TOPICS } = require("./factory-scenarios");
const {
  renderFactoryScenarioHtml,
  renderFactoryTopicCards,
} = require("./render-factory-scenario");

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
  ok(s && s.standardAnchor, `day ${d} standardAnchor`);
  ok(s && s.sigmaDeep && s.sigmaDeep.length >= 2, `day ${d} sigmaDeep P0/P1`);
  ok(s && s.prepCheck && s.prepCheck.length >= 1, `day ${d} prepCheck`);
  ok(s && s.quizLink, `day ${d} quizLink`);
  const html = renderFactoryScenarioHtml(d, (x) => x);
  ok(html.includes("fs-deep") && html.includes("fs-anchor"), `day ${d} renders P0/P1 UI`);
  const joined = [s.scene, s.sigmaStory, ...(s.sigmaDeep || [])].join("");
  ok(!joined.match(/离线(?!烧录)/), `day ${d} no abbreviated 离线`);
}

ok(FACTORY_TOPICS.length === 6, "6 topic cards");
ok(renderFactoryTopicCards((x) => x).includes("ict-fct"), "topic hub html");

console.log("---");
console.log(fail ? `FAIL ${fail}` : `ALL PASS (${pass})`);
process.exit(fail ? 1 : 0);
