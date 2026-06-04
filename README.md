# MBB Training Package — 汽车电子六西格玛黑带培训体系

[![version](https://img.shields.io/badge/release-3.0.0--beta.1-0078d4?style=flat-square)](docs/mbb-training/VERSION.md)
[![modules](https://img.shields.io/badge/curriculum-14_modules-2ea043?style=flat-square)](docs/mbb-training/index.html)
[![quality](https://img.shields.io/badge/quality_gate-50%2F50-1f883d?style=flat-square)](docs/mbb-training/UPGRADE-TODO.md)
[![item_bank](https://img.shields.io/badge/item_bank-v2.2.0-8250df?style=flat-square)](docs/mbb-training/VERSION.md)
[![delivery](https://img.shields.io/badge/delivery-static_HTML-e34c26?style=flat-square)](#技术架构)
[![runtime](https://img.shields.io/badge/build-Node.js_≥18-339933?style=flat-square&logo=node.js&logoColor=white)](#开发与质量门禁)
[![domain](https://img.shields.io/badge/domain-automotive_EMS_·_IATF_16949-c0392b?style=flat-square)](docs/mbb-training/reference/automotive-iatf.html)
[![qa](https://img.shields.io/badge/QA-run--mbb--suite-success?style=flat-square)](#开发与质量门禁)
[![repository](https://img.shields.io/badge/repository-public-181717?style=flat-square&logo=github)](https://github.com/shanghai8567/mbb-training-16949)
[![license](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)](LICENSE)

**企业级离线烧录培训资产包**：面向汽车电子 EMS 的 Master Black Belt（MBB）预备营，覆盖 14 个教学模块、可审计的三级评价路径、统计软件跟做 Lab，以及可本地部署的 HTML 课件与自动评分引擎。

| 属性 | 说明 |
|------|------|
| **产品代号** | `mbb-training-16949` |
| **教材版本** | `3.0.0-beta.1` |
| **考题库** | `2.2.0`（84 题：70 单选/纠错 + 14 情景多选） |
| **质量门禁** | 七维度审核 50/50 项已完成（见 [UPGRADE-TODO.md](docs/mbb-training/UPGRADE-TODO.md)） |
| **部署形态** | 静态 HTML + 浏览器 `localStorage`（无需应用服务器） |

> **合规声明**：完成本体系 L1 自动评价 **不构成** 任何第三方或企业内部的 MBB 资质认证。标准边界见 [mbb-certification-boundary.html](docs/mbb-training/reference/mbb-certification-boundary.html)。

---

## 目录

- [项目概述](#项目概述)
- [能力域与课程标准](#能力域与课程标准)
- [功能规格](#功能规格)
- [结业评价模型 v3](#结业评价模型-v3)
- [技术架构](#技术架构)
- [部署与使用](#部署与使用)
- [开发与质量门禁](#开发与质量门禁)
- [版本矩阵](#版本矩阵)
- [文档索引](#文档索引)
- [许可证](#许可证)
- [使用说明与合规](#使用说明与合规)

---

## 项目概述

本仓库交付一套 **可复现、可验收、可离线烧录运行** 的六西格玛黑带（MBB）培训解决方案，服务于汽车电子 EMS 场景下的：

- **学员**：按模块完成 DMAIC/DFSS 知识建构、课后作业、Minitab/JMP 跟做及客观题测评；
- **讲师 / MBB**：使用阶段门模板、Capstone 评审清单与红队验收脚本保障交付质量；
- **培训运营**：通过现场配置问卷、成绩仪表盘与可打印结业报告支撑班级管理。

体系对齐 **ISO 13053** 量化方法脉络与 **ASQ CSSBB** 能力结构，并在垂直领域扩展 **IATF 16949** 测量系统与汽车电子五产品（DCU-A/B/C、HU、IC）情境化内容。

---

## 能力域与课程标准

14 个模块采用统一日课结构（A 学习目标 → B 概念 → C 工具 → D 案例 → E 练习 → F 作业 → G 测评 → H 能力自评），并叠加：

| 扩展层 | 内容 |
|--------|------|
| **B+** | 汽车电子 / IATF 情境化补充 |
| **C2 Lab** | 按模块的 Minitab/JMP 菜单路径级实验卡片 |
| **GQ** | 模块级客观题（含 Q6 情景多选题） |

| 入口 | 路径 |
|------|------|
| 课程总览 | [`docs/mbb-training/index.html`](docs/mbb-training/index.html) |
| 模块 01–14 | [`docs/mbb-training/days/day01.html`](docs/mbb-training/days/day01.html) … `day14.html` |
| IATF 专节 | [`docs/mbb-training/reference/automotive-iatf.html`](docs/mbb-training/reference/automotive-iatf.html) |
| AI 助教 Prompt | [`docs/mbb-training/PROMPT-MBB-TUTOR.md`](docs/mbb-training/PROMPT-MBB-TUTOR.md) |

---

## 功能规格

| 能力模块 | 规格摘要 |
|----------|----------|
| **作业自动评分** | Rubric 关键词 55% + MCQ 45%；按模块权重；篇幅封顶策略 |
| **精编解析** | `gq-explain-source` 区分 author / auto；考题 v2 支持多选判分 |
| **C2 交付跟踪** | 模块勾选 → `mbb-c2-by-day-v1` |
| **H 能力自评** | 各模块 H 节 → `mbb-self-assessment-v1` |
| **L1 学习仪表盘** | G25% + F35% + C215% + H5% + Cap20% 综合权重 |
| **三级评价** | L1 自动摸底 · L2 AI `/review 作业` · L3 阶段门 + Capstone |
| **结业报告** | 可打印 HTML 导出 |
| **交互式体验** | 章节进度环 · G 节即时反馈 · **工厂实景三页签**（14 条产线故事） |
| **运维模板** | 试做记录、盲评、模拟门评审（`ops/`） |

---

## 结业评价模型 v3

| 维度 | 权重 | 数据键 / 来源 |
|------|------|----------------|
| G 客观题 | 25% | `mbb-hw-scores`（F 节提交） |
| F 作业 Rubric | 35% | `textPercent` |
| C2 截图交付 | 15% | 成绩页录入 0–14 模块 |
| H 能力自评 | 5% | `mbb-self-assessment-v1` |
| Capstone / L3 | 20% | 成绩页 / 企业评审 |

| 级别 | 名称 | 入口 |
|------|------|------|
| **L1** | 自动摸底 | [`homework-scores.html#dashboard`](docs/mbb-training/reference/homework-scores.html#dashboard) |
| **L2** | AI 深度批改 | PROMPT 指令 `/review 作业` |
| **L3** | MBB 抽审 | 阶段门 + Capstone 模板 |

---

## 技术架构

```
┌─────────────────────────────────────────────────────────┐
│  Browser（学员 / 讲师）                                    │
│  index.html · days/*.html · reference/*.html            │
│  homework-grader · learning-dashboard · self-assessment   │
└───────────────────────────┬─────────────────────────────┘
                            │ localStorage
┌───────────────────────────▼─────────────────────────────┐
│  Node.js 构建与 QA（维护人员）                             │
│  build-mbb-days.js → 嵌入 C2 / MCQ / Rubric             │
│  run-mbb-suite.js  → verify + grader + red-team         │
└─────────────────────────────────────────────────────────┘
```

| 层级 | 技术选型 |
|------|----------|
| 呈现层 | HTML5、CSS（主题/打印）、Vanilla JS |
| 持久化 | 浏览器 `localStorage`（无后端依赖） |
| 构建链 | `test/build-mbb-days.js`、`test/patch-brand-pages.js` |
| 质量链 | `verify-mbb-training` · `homework-grader.test` · `red-team-verify` |

---

## 部署与使用

### 学员路径（推荐顺序）

1. **现场配置** — [`reference/site-config.html`](docs/mbb-training/reference/site-config.html)  
2. **按模块学习** — `days/day01.html` → `day14.html`  
3. **提交作业与测评** — 各模块 F/G 节  
4. **查看 L1 仪表盘** — [`reference/homework-scores.html`](docs/mbb-training/reference/homework-scores.html)  
5. **导出结业报告** — [`reference/graduation-report.html`](docs/mbb-training/reference/graduation-report.html)  

### 部署方式

| 方式 | 说明 |
|------|------|
| **本地文件** | 直接打开 `docs/mbb-training/index.html`（`file://` 或内网静态目录） |
| **静态托管** | 将 `docs/mbb-training/` 发布至 Nginx / IIS / GitHub Pages 子路径 |
| **AI 辅导** | 加载 `PROMPT-MBB-TUTOR.md` System Prompt，使用 `/day N`、`/review 作业` |

> 学习路径 **不依赖** Node.js；Node 仅用于维护人员重建课件与跑验收。

---

## 开发与质量门禁

**环境要求**：Node.js ≥ 18

```bash
# 1. 重建 14 模块 HTML（C2 Lab、考题、Rubric 等嵌入）
node test/build-mbb-days.js

# 2. 品牌与主题补丁（按需）
node test/patch-brand-pages.js

# 3. 全套质量门禁（推荐发布前执行）
node test/run-mbb-suite.js
```

| 脚本 | 用途 |
|------|------|
| `test/verify-mbb-training.js` | 课件结构、链接、嵌入数据完整性 |
| `test/homework-grader.test.js` | 评分引擎（含多选 v2） |
| `test/red-team-verify.js` | 红队清单 ≥23/25 |
| `test/upgrade-status.js` | 升级项 50/50 完成度 |
| `test/learning-dashboard.test.js` | L1 权重计算 |
| `test/self-assessment.test.js` | H 自评入库 |
| `test/c2-checklist.test.js` | C2 按模块勾选 |

---

## 版本矩阵

| 组件 | 版本 | 说明 |
|------|------|------|
| 教材 HTML | `3.0.0-beta.1` | 14 模块 A–H + B+ |
| 考题库 | `2.2.0` | G 节 84 题 |
| 解析库 | `2.1.0-author` | 精编 + `gq-explain-source` |
| Rubric / 评分 | `2.1.0` | 55/45 模型 |
| PROMPT 助教 | `2.1`（3.0 规划对齐中） | 三级评价与 C2 Lab |

完整清单见 [`docs/mbb-training/VERSION.md`](docs/mbb-training/VERSION.md)。

---

## 文档索引

| 文档 | 说明 |
|------|------|
| [VERSION.md](docs/mbb-training/VERSION.md) | 版本与构建命令 |
| [UPGRADE-TODO.md](docs/mbb-training/UPGRADE-TODO.md) | 七维度质量升级记录 |
| [PROMPT-MBB-TUTOR.md](docs/mbb-training/PROMPT-MBB-TUTOR.md) | 企业级 AI 助教 System Prompt |
| [MBB-RED-TEAM-CHECKLIST.md](docs/mbb-training/MBB-RED-TEAM-CHECKLIST.md) | 发布前红队检查 |
| [CONTENT-TRACEABILITY.md](docs/mbb-training/CONTENT-TRACEABILITY.md) | 内容可追溯矩阵 |

### 仓库目录

```
16949/
├── LICENSE                   # MIT
├── README.md                 # 本文件
├── docs/mbb-training/        # 培训包交付物
│   ├── index.html            # 课程门户
│   ├── days/                 # 14 模块日课
│   ├── reference/            # 成绩、报告、IATF、配置
│   ├── templates/            # 阶段门、Capstone、SCAR
│   ├── js/                   # 评分、仪表盘、自评
│   └── data/                 # Minitab 样板等
└── test/                     # 构建与 QA 脚本
```

---

## 许可证

本项目采用 **[MIT License](LICENSE)** 发布。

```
Copyright (c) 2026 shanghai8567
```

您可以自由使用、修改与再分发本仓库代码与文档，但须在衍生作品中保留版权声明与 MIT 许可全文。详见根目录 [`LICENSE`](LICENSE) 文件。

## 使用说明与合规

以下内容 **不限制** MIT 许可下的代码使用权，但属于教学内容合规建议：

- 引用 ASQ Body of Knowledge、IATF/ISO 条文时须保持可追溯，**禁止虚构标准原文**。  
- 完成 L1 自动评价 **不等于** MBB 资质认证（见 [认证边界](docs/mbb-training/reference/mbb-certification-boundary.html)）。  
- 练习答案与考题解析仅供教学参考，**请勿**冒充官方认证题库对外发布。  

---

## 维护信息

| 项 | 值 |
|----|-----|
| **许可证** | MIT — [`LICENSE`](LICENSE) |
| **远程仓库** | https://github.com/shanghai8567/mbb-training-16949 |
| **默认分支** | `main` / `master`（内容已同步） |
| **备份标签示例** | `backup/2026-06-04-1530` |

```bash
git clone https://github.com/shanghai8567/mbb-training-16949.git
cd mbb-training-16949
# 打开 docs/mbb-training/index.html 开始学习
```

---

*MBB Training Package · Automotive Electronics EMS · Six Sigma Black Belt Curriculum*
