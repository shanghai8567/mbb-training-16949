# 模拟阶段门评审演练记录

## 场次模板

| 字段 | 内容 |
|------|------|
| 日期 | |
| 项目 | ADAS SCAR · Eth FCT |
| 角色 | MBB 主审 / BB 汇报 / Champion 观察 |
| 阶段门 | Measure / Analyze / Control |
| 结果 | Go / 条件 Go / No-Go |

## 检查项（须逐项打勾）

- [ ] 分段 MSA 合格（SPI / 烧录 / BGA / FCT 探针）
- [ ] 缺陷-过程矩阵 + SOC_FW 分层
- [ ] X-Ray SL→MP 切换日标注
- [ ] DCU-B 无回归（FCT-04 批对比）
- [ ] 控制计划含反应计划与 Profile#

## 演练记录（示例）

| 日期 | BB | 打回理由（可执行） | 复训模块 |
|------|-----|-------------------|----------|
| 2026-06-04 | 学员A | 合并 ADAS+车身 FCT | 03、05 |
| 2026-06-04 | 学员B | %RR>30% 仍报 Cpk | 04 |

模板文件：`templates/gate-review-adasis-scar.html`
