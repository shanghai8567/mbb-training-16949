/**
 * H 节自评逻辑（Node 模拟）
 */
const { GRADUATION_WEIGHTS_V2 } = require("./graduation-weights");
const { countAuthorCoverage } = require("./mcq-author-notes");
const { PRODUCT_MATRIX_FULL } = require("./product-matrix-full");

let pass = 0;
let fail = 0;

function ok(name, cond) {
  if (cond) {
    pass++;
    console.log("PASS:", name);
  } else {
    fail++;
    console.log("FAIL:", name);
  }
}

ok("product matrix 5 rows", PRODUCT_MATRIX_FULL.rows.length === 5);
ok("product matrix 5 cols header", PRODUCT_MATRIX_FULL.headers.length === 5);

const cov = countAuthorCoverage();
ok("author coverage >= 56", cov.total >= 56);

ok("graduation v2 version", GRADUATION_WEIGHTS_V2.version.startsWith("3"));

const fs = require("fs");
const path = require("path");
const saJs = fs.readFileSync(
  path.join(__dirname, "../docs/mbb-training/js/self-assessment.js"),
  "utf8"
);
ok("self-assessment storage key", saJs.includes("mbb-self-assessment-v1"));

console.log("\n---");
console.log(`RESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail > 0 ? 1 : 0);
