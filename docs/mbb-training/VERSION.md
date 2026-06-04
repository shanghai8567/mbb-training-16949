# MBB 培训包版本清单

| 组件 | 版本 | 说明 |
|------|------|------|
| **教材 HTML** | `3.0.0` | 14 模块 A–H + B+ + H/C2 入库 |
| **工厂实景** | `1.2.0` | 14 主线 + 7 专题 · P0/P1/P2 加深 |
| **考题库** | `2.2.0` | G 节 84 题（70 单选/纠错 + 14 情景多选 Q6） |
| **解析库** | `2.1.0-author` | 精编 Q1–Q3/Q5 + 规则 Q4 · `gq-explain-source` |
| **Rubric / 评分** | `2.1.0` | 55/45 · 按天权重 · 字数封顶 |
| **PROMPT 助教** | `3.0.0` | 三级评价 · C2 Lab · 工厂实景指引 |
| **升级计划** | `UPGRADE-TODO.md` | 七维度 + 工厂 + v3.3 完美收尾 |

## 结业评价 v3（L1 仪表盘可算）

| 维度 | 权重 | 数据来源 |
|------|------|----------|
| G 客观题 | 25% | F 节提交 → `mbb-hw-scores` |
| F 作业 Rubric | 35% | 同上 `textPercent` |
| C2 截图交付 | 15% | 成绩页录入模块数 0–14 |
| H 能力自评 | 5% | 各模块 H 节 → `mbb-self-assessment-v1` |
| Capstone / L3 | 20% | 成绩页录入 / 企业评审 |

| 级别 | 名称 | 说明 |
|------|------|------|
| **L1** | 自动摸底 | [homework-scores.html#dashboard](reference/homework-scores.html#dashboard) |
| **L2** | AI 深度批改 | `/review 作业` |
| **L3** | MBB 抽审 | 阶段门 + Capstone |

**重要**：完成 14 模块 L1 ≠ 企业 MBB 资质。见 [reference/mbb-certification-boundary.html](reference/mbb-certification-boundary.html)。

## 工厂实景实验室

| 层级 | 内容 |
|------|------|
| **P0** | 标准锚点 · 效应量/前提 · 8D↔DMAIC · ROI · 属性/计量 MSA |
| **P1** | ICT·手插·ECN·ASIL·AOI Kappa 等 7 专题卡 |
| **P2** | 非正态能力 · 检验功效 · 噪声 DOE · 复制率 KPI（进阶） |

入口：[reference/factory-floor-lab.html](reference/factory-floor-lab.html) · 各模块 `#sec-factory`

## 构建命令

```bash
node test/build-mbb-days.js
node test/patch-brand-pages.js
node test/verify-mbb-training.js
node test/upgrade-status.js
node test/red-team-verify.js
node test/factory-scenarios.test.js
node test/learning-dashboard.test.js
node test/self-assessment.test.js
node test/c2-checklist.test.js
node test/run-mbb-suite.js
```
