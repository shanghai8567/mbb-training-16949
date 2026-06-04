# MBB 培训包 — 七维度满分升级待办跟踪



> **目标**：7 个审核维度均达到 **5.0 / 5.0**  

> **定位**：MBB 预备营（L1 门槛 + L2 AI 批改 + L3 抽审 + Capstone）  

> **版本主线**：见 [VERSION.md](./VERSION.md)



**图例**：`⬜` 未开始 · `🔄` 进行中 · `✅` 完成



**验收脚本**：`node test/verify-mbb-training.js` · `node test/homework-grader.test.js` · `node test/upgrade-status.js` · `node test/red-team-verify.js`



---



## 总进度看板



| 维度 | 目标分 | 当前 | 阶段 | 状态 |

|------|--------|------|------|------|

| D1 架构与标准对齐 | 5.0 | 5.0 | 0–1 | ✅ |

| D2 汽车电子垂直化 | 5.0 | 5.0 | 2–3 | ✅ |

| D3 统计与工具实操 | 5.0 | 5.0 | 1–3 | ✅ |

| D4 考题效度 | 5.0 | 5.0 | 2 | ✅ |

| D5 解析与反馈 | 5.0 | 5.0 | 2 | ✅ |

| D6 作业与认证闭环 | 5.0 | 5.0 | 2–3 | ✅ |

| D7 MBB 专属能力 | 5.0 | 5.0 | 3 | ✅ |



---



## 阶段 0 — 基线（W1）



| ID | 任务 | 交付物 | 验收 | 状态 |

|----|------|--------|------|------|

| S0-01 | 版本_manifest | `VERSION.md` | 四版本号一致 | ✅ |

| S0-02 | 升级待办清单 | 本文件 | 7 维度任务可勾选 | ✅ |

| S0-03 | 三级评价公示 | `index.html` · `homework-scores.html` · `PROMPT` 摘要 | L1/L2/L3 文案 | ✅ |

| S0-04 | 认证边界页 | `reference/mbb-certification-boundary.html` | 与 Day14 一致 | ✅ |

| S0-05 | 追溯矩阵 | `CONTENT-TRACEABILITY.md` | 14 模块 A–H 映射 | ✅ |

| S0-06 | 升级状态脚本 | `test/upgrade-status.js` | 输出完成率 | ✅ |



---



## 维度 1 — 架构与标准对齐 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D1-01 | 版本写入生成器 | `build-mbb-days.js` meta 注释 + verify | ✅ |

| D1-02 | PROMPT v3 同步三级评价 | `PROMPT-MBB-TUTOR.md` | ✅ |

| D1-03 | verify 版本与追溯项 | `verify-mbb-training.js` | ✅ |

| D1-04 | 红队检查单 | `MBB-RED-TEAM-CHECKLIST.md` + `red-team-verify.js` | ✅ |



---



## 维度 2 — 汽车电子垂直化 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D2-01 | 五产品×四工艺 B+ 全矩阵 | `product-matrix-full.js` · Day01 B+ | ✅ |

| D2-02 | 考题覆盖矩阵脚本 | `test/mcq-coverage-matrix.js` | ✅ |

| D2-03 | DCU-C / HU / IC 各 ≥3 题 | `mcq-v2` + enrichment | ✅ |

| D2-04 | IATF 手册五产品专节 | `reference/automotive-iatf.html` | ✅ |



---



## 维度 3 — 统计与工具实操 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D3-01 | C2 Lab 规范模块 | `test/c2-lab-specs.js` | ✅ |

| D3-02 | 生成器嵌入 C2 Lab | `build-mbb-days.js` | ✅ |

| D3-03 | C2 样式 | `css/homework-grader.css` `.c2-lab-*` | ✅ |

| D3-04 | 14 模块 C2 详版（菜单路径级） | `c2-lab-specs` 全覆盖 | ✅ |

| D3-05 | F 节截图交付清单 | `c2-lab-specs` deliverables → F | ✅ |

| D3-06 | CSV README | `data/README.md` | ✅ |

| D3-07 | 样板 .mpx（D4/D6/D10） | `data/minitab/*.mpx` | ✅ |



---



## 维度 4 — 考题效度 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D4-01 | 考题 v2 结构（多选+情景） | `test/mcq-v2/` | ✅ |

| D4-02 | Bloom + B+ 映射 JSON | `test/mcq-bloom-map.json` | ✅ |

| D4-03 | 纠错题情境去重 | enrichment 审稿 | ✅ |

| D4-04 | 试点难度校准 | `ops/mcq-pilot-calibration.csv` | ✅ |



---



## 维度 5 — 解析与反馈 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D5-01 | 人工解析库 | `test/mcq-author-notes.js` | ✅ |

| D5-02 | 解析优先生成 | `mcq-explain.js` | ✅ |

| D5-03 | 精编/自动标签 | UI `gq-explain-source` | ✅ |

| D5-04 | 教研盲评 ≥90% | `ops/mcq-blind-review-record.md` | ✅ |



---



## 维度 6 — 作业与认证闭环 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D6-01 | 证据型 Rubric 字段 | `homework-grader-core.js` | ✅ |

| D6-02 | 模块权重 v2（Capstone 20%+） | `VERSION.md` + 成绩页仪表盘 | ✅ |

| D6-03 | Capstone 包 | `templates/capstone-adasis-scar/` | ✅ |

| D6-04 | HR 边界一页纸 | `mbb-certification-boundary.html` | ✅ |

| D6-05 | 学习仪表盘 | `js/learning-dashboard.js` | ✅ |



---



## 维度 7 — MBB 专属能力 → 5.0



| ID | 任务 | 交付物 | 状态 |

|----|------|--------|------|

| D7-01 | 阶段门模板 | `templates/gate-review-adasis-scar.html` | ✅ |

| D7-02 | GROW/Rubric 实操页 | `templates/coaching-grow-rubric.html` | ✅ |

| D7-03 | D14 答辩检查单 | `templates/capstone-defense-checklist.html` | ✅ |

| D7-04 | H 节自评入库 | `js/self-assessment.js` | ✅ |

| D7-05 | 模拟评审演练记录 | `ops/mock-gate-review-drill.md` | ✅ |



---



## 阶段里程碑



| 里程碑 | 内容 | 目标日期 | 状态 |

|--------|------|----------|------|

| M0 | 基线文档 + 三级评价 + 边界页 | W1 | ✅ |

| M1 | C2 全 14 模块 + E 答 14 模块 | W2–W7 | ✅ |

| M2 | 考题 v2 + 解析库 50% | W8–W14 | ✅ |

| M3 | Capstone + 阶段门 + 仪表盘 | W15–W22 | ✅ |

| M4 | 红队满分验收 ≥23/25 | W25–W26 | ✅ |



---



## 测试记录



| 日期 | 命令 | 结果 |

|------|------|------|

| 2026-06-04 | `node test/homework-grader.test.js` | 23 PASS |

| 2026-06-04 | `node test/verify-mbb-training.js` | 256+ PASS |

| 2026-06-04 | `node test/mcq-coverage-matrix.js` | 五产品 PASS |

| 2026-06-04 | `node test/learning-dashboard.test.js` | 3 PASS |

| 2026-06-04 | `node test/self-assessment.test.js` | 5 PASS |

| 2026-06-04 | `node test/red-team-verify.js` | ≥23/25 PASS |

| 2026-06-04 | `node test/upgrade-status.js` | 100% |
| 2026-06-04 | `node test/run-mbb-suite.js` | 全套件 PASS |
| 2026-06-04 | `node test/build-mbb-days.js` | 14 天 beta.1 |
| 2026-06-04 | `factory-scenarios.test.js` | 101 PASS · P0/P1/P2 |
| 2026-06-04 | `node test/upgrade-status.js` | 58/58 · 100% |



---



## 阶段 v3.1 — 集成收尾（beta）

| ID | 任务 | 交付物 | 状态 |
|----|------|--------|------|
| P3-01 | C2 按模块勾选 | `js/c2-module-checklist.js` + F 节 checkbox | ✅ |
| P3-02 | 成绩页 H/C2 列 | `homework-scores.html` | ✅ |
| P3-03 | L1 结业报告 | `reference/graduation-report.html` | ✅ |
| P3-04 | 追溯矩阵 H 列 | `CONTENT-TRACEABILITY.md` | ✅ |
| P3-05 | 一键测试套件 | `test/run-mbb-suite.js` | ✅ |
| P3-06 | Capstone Charter 提纲 | `capstone-adasis-scar/charter-outline.md` | ✅ |

---

## 阶段 v3.2 — 工厂实景（MBB 审厂加深）

| ID | 任务 | 交付物 | 状态 |
|----|------|--------|------|
| F1-01 | P0 标准锚点 + sigmaDeep | `test/factory-scenarios.js` 14 模块 | ✅ |
| F1-02 | P1 六专题实验室 | `FACTORY_TOPICS` + `factory-floor-lab.html` | ✅ |
| F1-03 | 渲染加深块 + G 节联动 | `render-factory-scenario.js` · `quizLink` | ✅ |
| F1-04 | 工厂场景测试 | `factory-scenarios.test.js` · verify | ✅ |
| F2-01 | P2 非正态/功效/噪声 | 模块 03/05/06/09/12 sigmaDeep | ✅ |
| F2-02 | P2 专题「空洞偏态」 | `nonnormal-void` 专题卡 | ✅ |
| F2-03 | 版本与 README | `VERSION.md` · 根 `README.md` | ✅ |
| F2-04 | PROMPT + 追溯 + 红队 #27 | `PROMPT` · `CONTENT-TRACEABILITY` · `red-team-verify` | ✅ |

---

*全部待办已完成 · 包版本 `3.0.0-beta.2`*

