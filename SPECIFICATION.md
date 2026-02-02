# Trusted AI Agent Governance Engine - 技术详细说明文档 (Specification)

## 1. 核心概述

Trusted AI Agent Governance Engine 是一个基于 **“主权先于智能” (Sovereignty over Intelligence)** 原则构建的 AI 行为准则执行系统。它不依赖于 AI 的自觉性，而是通过一个物理脱钩的、基于规则与权重的本地引擎，对 AI 提出的任何代码变更（Diff）进行事实性的准入审计。

## 2. 架构设计 (Architecture)

系统采用分层治理架构，每一层都为最终决策贡献权重或执行硬性阻断：

### A. 静态治理层 (Static Governance)

- **Scope Enforcement**: 定义 AI 可触碰的目录边界（Glob Patterns）。
- **Risk Gate**: 识别高危特征（如 `.env`, `auth/*`, `docker-compose`），触发 `require_human` 或 `block`。

### B. 动态感知层 (Dynamic Perception)

- **Anomaly Detection**: 采用多维评分（规模、分散度、熵分析）识别“语义走私”或代码混淆。
- **Diff Parser**: 自研的高可靠性统一 Diff 解析器，确保审计基于事实变更而非 AI 描述。

### C. 价值与责任层 (Value & Accountability)

- **Value Manifesto**: 根据项目愿景设置价值权重（如安全性 > 效率），计算 **Value Score**。
- **Mercy Hooks**: 定义紧急情况下的降级逻辑（如 `emergency_fix`）。
- **Credit Staking**: AI 拥有初始信用分，违规将导致信用坍缩，影响后续提案的通过率。

### D. 主权安全层 (Sovereign Layer)

- **Ed25519 Signing**: 治理政策必须经过主权者私钥签名。任何未签名或签名不匹配的政策更改将被系统物理拒绝。

---

## 3. 核心算法说明

### 3.1 异常评分算法 (Anomaly Scoring)

`Score = (LargeDiff ? 0.4 : 0) + (Obfuscation ? 0.6 : 0) + (SpreadFiles ? 0.3 : 0)`

- 当 `Score >= 0.7` 时，系统自动判定为异常并执行 `Block`。

### 3.2 治理自审算法 (Self-Audit)

- **Policy Drift**: 计算 $RecentSuccessRate - HistoricalSuccessRate$。
- **Permission Creep**: 监控 AI 触碰的 Top-level Directory 增长速率。

### 3.3 共识算法 (Consensus)

- 对于多模型审计，采用 **“多数赞成 + 一票否决”** 机制。权重 $\ge 0.5$ 的投票者拥有针对安全红线的 Veto 权。

---

## 4. 数据结构模型 (Data Assets)

- **Proposal**: 包含 ID, Author, Reasoning, Files, Diff。
- **Decision**: 包含 Allowed, RiskLevel, Violations, Accountability, ValueScore。
- **Governance Asset**: 从历史中挖掘的“提拔”或“硬化”建议。
