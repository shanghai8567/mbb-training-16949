# MBB 培训包红队验收清单（目标 ≥23/25）

| # | 检查项 | 通过标准 |
|---|--------|----------|
| 1 | 三级评价公示 | index + homework-scores + 边界页 |
| 2 | 14 模块 C2 菜单路径 | 每日 `c2-lab-card` |
| 3 | G 节含 v2 多选 | Q6 情景多选 + 全对计分 |
| 4 | 解析来源标签 | `gq-explain-source` author/auto |
| 5 | 五产品考题覆盖 | `node test/mcq-coverage-matrix.js` PASS |
| 6 | 选项打乱 | 非全 A |
| 7 | F 证据字段提示 | 工站/Profile/Program_ID |
| 8 | 14 天 E 节标杆答 | verify exercise preset |
| 9 | 不宣称 L1=MBB | Day14 纠错 + 边界页 |
| 10 | site-config 联动 | Day1 问卷加成 |
| 11 | Bloom 映射存在 | `mcq-bloom-map.json` |
| 12 | 阶段门模板可下载 | gate-review HTML |
| 13 | Capstone 检查单 | defense-checklist HTML |
| 14 | PROMPT v3 三级评价 | PROMPT-MBB-TUTOR § |
| 15 | 升级可追踪 | UPGRADE-TODO + upgrade-status |
| 16 | 主题深/浅 | 14 天 + 参考页 |
| 17 | 无硬编码密钥 | 代码扫描 |
| 18 | 测试全绿 | verify + grader + coverage |
| 19 | 纠错题情境去重 | 14 道纠错题干互异 |
| 20 | DCU-C/HU/IC 垂直 | 覆盖矩阵 ≥3 |
| 21 | CSV 文档 | data/README.md |
| 22 | 版本 meta 一致 | VERSION + HTML meta |
| 23 | L2 `/review` 指引 | F 节结果区 |
| 24 | 打印讲义 | print-light.css |
| 25 | 追溯矩阵 | CONTENT-TRACEABILITY.md |

**执行**：逐项勾选后记录日期与负责人。
