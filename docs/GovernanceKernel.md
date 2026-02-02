
# Governance Kernel  
## A Deterministic, Accountable Decision Governance Core for Autonomous Agents  
**Version:** 1.1  
**Status:** Hardened  
**Date:** 2026‑02‑03

---

## 摘要（Abstract）

随着自主系统逐步获得执行权，**“谁为决策负责”**成为比“决策是否聪明”更关键的问题。  
Governance Kernel 是一个**与模型能力解耦**的决策治理内核，用于在 AI / 自动化系统中提供：

- 可验证的决策边界  
- 明确的人‑机责任划分  
- 不可篡改的审计轨迹  
- 对失败与异常的制度化处理方式  

本系统不试图让 AI 更聪明，而是**防止系统在错误时推卸责任**。

---

## 1. 设计目标（Design Goals）

Governance Kernel 的核心目标不是性能，而是**治理确定性（Governance Determinism）**。

### 1.1 明确的责任归因（Accountability First）

- 每一个决策结果都**必须**能回答：
  - 是谁提出的？
  - 为什么被允许 / 拒绝？
  - 如果出错，谁负责？

### 1.2 治理诚实性（Governance Honesty）

- 不允许“看起来被允许”的决策
- 不允许“假共识”“隐式权限”“软失败”

> 系统宁可失败，也不伪装成功。

### 1.3 人‑机边界清晰（Human‑in‑the‑Loop by Design）

- 人类不是兜底异常处理器  
- 人类介入是**显式治理状态**

---

## 2. 系统定位（What Governance Kernel Is / Is Not）

### Governance Kernel 是：

- ✅ 决策治理内核（decision governance core）
- ✅ 责任与审计框架
- ✅ 模型无关（LLM / rule‑based / hybrid）

### Governance Kernel 不是：

- ❌ 决策模型
- ❌ 推荐系统
- ❌ 自动执行引擎
- ❌ 风险评分器

---

## 3. 核心概念（Core Concepts）

### 3.1 Proposal（提案）

```ts
author: 'ai-agent' | 'human'
```

- **所有决策必须有作者**
- 作者类型直接进入责任系统
- 类型层即治理边界（type‑level governance）

---

### 3.2 Policy（政策）

Policy 是**唯一允许影响决策的规则来源**。

特性：

- YAML 定义
- 可签名（Sovereign Signature）
- 支持显式权限声明（privileges）

> 未在 policy 中声明的能力，在系统中视为不存在。

---

### 3.3 Decision（三态决策模型）

Governance Kernel 使用**三态决策模型**，而非简单 allow / deny。

```ts
allowed: boolean        // 是否允许自动执行
requiresHuman: boolean // 是否进入人工审批
```

| 状态 | 说明 |
|----|----|
| allowed ✅ | 系统可直接执行 |
| requiresHuman ✅ | 必须由人类批准 |
| block ❌ | 系统与人类均不可执行 |

---

## 4. 治理不变量（Governance Invariants）

以下不变量在 v1.1 中被**代码级强制执行**。

### 4.1 anomaly ≠ guilt

异常检测结果 **不会自动触发责任归咎**。

- anomaly = 信号解释失败
- 不等价于 agent 失职

> 异常是系统问题，除非另有违规证据。

---

### 4.2 require_human ≠ block

- `require_human`：治理升级
- `block`：治理拒绝

二者在：
- 决策状态
- 执行路径
- 责任归因

上完全不同。

---

### 4.3 Privilege 必须显式声明

- 高风险行为需要 `high-risk-decision` 权限
- 未声明权限 → **硬失败**
- 不存在隐式继承或默认升级

---

## 5. 执行与评估流程（Decision Lifecycle）

1. **Proposal 提交**
2. **Context 注入**
3. **Policy 加载与验证**
4. **SafeEvaluator 评估**
   - 禁止 string / eval
   - 仅结构化表达式
5. **Anomaly Detection**
6. **Decision 合成（三态）**
7. **Liability Attribution**
8. **Append‑only 审计记录**

---

## 6. 安全与防护（Security Posture）

### 6.1 执行安全

- ❌ 无 `eval`
- ❌ 无 `new Function`
- ❌ 无字符串条件回退

### 6.2 权限安全

- 高风险 action → 必须显式 privilege
- 缺失权限 → 直接 block

### 6.3 共识安全

- 声明需要共识但未实现 → **fail‑fast**
- 不允许假共识路径

---

## 7. 责任归因模型（Liability Model）

责任并非总是 AI。

| 场景 | 责任主体 |
|----|----|
| 自动放行执行 | ai-agent |
| require_human 执行 | human-approver |
| policy 冲突 / anomaly | policy-author |
| 系统故障 | system-fault |

> Governance Kernel 的目标不是“保护 AI”，  
> 而是**防止责任漂移**。

---

## 8. 审计与可追溯性（Auditability）

- ContextBank 使用 append‑only JSONL
- 每条决策拥有完整 trace
- 为未来 hash‑chain / Merkle 审计预留接口

---

## 9. 版本状态（Version Status）

### v1.1（当前）

✅ 类型级治理闭环  
✅ 三态决策模型  
✅ 明确责任归因  
✅ 无已知隐式升级路径  

### v1.2（规划）

- rule‑level privileges
- 共识引擎真实接入
- 审计日志 hash chaining

---

## 10. 一句话定位（Canonical Statement）

> **Governance Kernel 是一个不替 AI 擦屁股的治理内核。**

如果系统出错，它会明确告诉你：  
**是谁的问题，而不是假装一切正常。**

---

## 结语

Governance Kernel 并不假设 AI 会永远正确。  
它假设的是：**错误一定会发生，而责任不能消失。**

这不是一个让系统更“聪明”的内核，  
这是一个让系统**在现实世界中可被信任**的内核。
