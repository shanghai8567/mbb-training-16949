# 实验数据说明

| 文件 | 用途 | 关键列 | 对应模块 |
|------|------|--------|----------|
| `automotive-spi-msa.csv` | SPI 交叉型 GRR | 零件、操作员、体积% | 04 |
| `automotive-fct-yield.csv` | FCT 通过率分层 | 批次、SOC_FW、合格 | 05 |
| `automotive-offline-program.csv` | 离线烧录错版 | Program_ID、Checksum | 03–05 |
| `automotive-bga-aoi.csv` | BGA 空洞 | U12、空洞%、Profile# | 04–06 |
| `automotive-xray-log.csv` | X-Ray SL/MP | 阶段、日期 | 05、10 |
| `capability-diameter.csv` | 能力分析练习 | C1 计量 | 03–04 |
| `gage-rr-stacked.csv` | 堆叠 GRR | 操作员、零件 | 04 |
| `hypothesis-yield.csv` | 两样本 t | 前/后 | 05 |
| `doe-2k3-run.csv` | 2³ DOE | A,B,C,Y | 06、09 |
| `control-imr.csv` | I-MR | 单值序列 | 10 |

导入 Minitab 前请阅读各模块 **C2 Lab** 中的列定义与菜单路径。
