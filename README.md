# mbb-training-16949

汽车电子 EMS 场景下的 **六西格玛黑带（MBB）14 模块培训包**：HTML 课件、课后作业自动评分、C2 Lab 跟做清单、三级评价（L1/L2/L3）与结业报告导出。

**当前版本**：`3.0.0-beta.1`（教材） · 考题库 `2.2.0` · 七维度升级 **50/50 完成**

> 完成 14 模块 L1 自动评价 **≠** 企业 MBB 资质认证。边界说明见课件内 [认证边界页](docs/mbb-training/reference/mbb-certification-boundary.html)。

---

## 快速开始

1. 用浏览器打开主入口（本地文件或静态托管均可）：

   ```
   docs/mbb-training/index.html
   ```

2. 首次建议填写现场配置问卷：`docs/mbb-training/reference/site-config.html`

3. 按模块学习：`docs/mbb-training/days/day01.html` → … → `day14.html`

4. 查看成绩与 L1 仪表盘：`docs/mbb-training/reference/homework-scores.html`

5. AI 助教：将 `docs/mbb-training/PROMPT-MBB-TUTOR.md` 中的 System Prompt 复制到对话中使用。

---

## 仓库结构

| 路径 | 说明 |
|------|------|
| `docs/mbb-training/` | 培训包主体（HTML / CSS / JS / 模板 / 数据） |
| `docs/mbb-training/days/` | 14 个模块日课 HTML（由构建脚本生成/更新） |
| `docs/mbb-training/reference/` | 成绩页、结业报告、IATF 专节、配置问卷等 |
| `docs/mbb-training/templates/` | 阶段门、Capstone、SCAR 等模板 |
| `test/` | 构建脚本、评分核心、验收与红队测试 |
| `docs/mbb-training/VERSION.md` | 版本与构建命令清单 |
| `docs/mbb-training/UPGRADE-TODO.md` | 七维度满分升级跟踪（已完成） |

---

## 构建与验收

需安装 [Node.js](https://nodejs.org/)（仅用于构建与测试，浏览器学习无需 Node）。

```bash
# 重建 14 模块 HTML（嵌入 C2 Lab、考题等）
node test/build-mbb-days.js

# 品牌页补丁（如需要）
node test/patch-brand-pages.js

# 全套验收（推荐）
node test/run-mbb-suite.js

# 升级项完成度
node test/upgrade-status.js
```

---

## 核心能力一览

- **14 模块 A–H**：学习目标、工具、迷你案例、作业 Rubric、GQ 客观题（含情景多选 Q6）
- **C2 Lab**：按模块 Minitab/JMP 菜单路径级跟做卡片
- **作业评分**：Rubric 关键词（55%）+ MCQ（45%），本地 `localStorage` 持久化
- **三级评价**：L1 仪表盘 / L2 AI 深度批改 / L3 阶段门 + Capstone
- **汽车电子**：DCU-A/B/C、HU、IC 五产品矩阵与 IATF 16949 相关专节
- **结业报告**：`reference/graduation-report.html` 可打印导出

---

## 分支说明

| 分支 | 说明 |
|------|------|
| `master` | 完整培训包源码（推荐克隆与开发） |
| `main` | GitHub 默认分支；若仅见 README，请切换到 `master` 或合并 `master` → `main` |

合并示例：

```bash
git fetch origin
git push origin master:main
```

---

## 许可与使用

企业内部培训资料。分发、改版或对外发布前请遵守贵司知识产权与 ASQ/标准引用规范；勿将课件中的练习答案直接作为认证考题泄露。

---

## 链接

- **GitHub**：[shanghai8567/mbb-training-16949](https://github.com/shanghai8567/mbb-training-16949)
- **详细版本**：[`docs/mbb-training/VERSION.md`](docs/mbb-training/VERSION.md)
