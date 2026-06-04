# MBB 培训包版本清单

| 组件 | 版本 | 说明 |
|------|------|------|
| **教材 HTML** | `3.0.0-beta.1` | 14 模块 A–H + B+ + H/C2 入库 |
| **考题库** | `2.2.0` | G 节 84 题（70 单选/纠错 + 14 情景多选 Q6） |
| **解析库** | `2.1.0-author` | 精编 Q1–Q3/Q5 + 规则 Q4 · `gq-explain-source` |
| **Rubric / 评分** | `2.1.0` | 55/45 · 按天权重 · 字数封顶 |
| **PROMPT 助教** | `2.1` → **3.0 规划** | 对齐三级评价与 C2 Lab |
| **升级计划** | `UPGRADE-TODO.md` | 七维度满分路径 |

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

## 构建命令

```bash
node test/build-mbb-days.js
node test/patch-brand-pages.js
node test/verify-mbb-training.js
node test/upgrade-status.js
node test/red-team-verify.js
node test/learning-dashboard.test.js
node test/self-assessment.test.js
node test/c2-checklist.test.js
node test/run-mbb-suite.js
```
