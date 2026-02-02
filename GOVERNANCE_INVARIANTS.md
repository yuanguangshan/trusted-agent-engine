# Governance Invariants & Principles (v1.1)

本文档定义了 Trusted Agent Engine 的核心治理不变性（Invariants）。任何未来的修改或扩展都必须遵守以下原则。

---

## 1. 🛡️ 信号解释不变量 (Signal vs. Guilt)
- **Invariant**: 异常检测（Anomaly Detection）产生的仅是“信号”，而非“罪证”。
- **Enforcement**: 除非 Policy 规则显式引用并定义了处理逻辑，否则系统不能直接仅因异常信号而惩罚 Agent。
- **Liability**: 若异常信号导致拦截但无规则违反，责任归属于 `policy-author`（策略定义不全）。

## 2. 🏛️ 主权显式化不变量 (Explicit Sovereignty)
- **Invariant**: 所有影响 Agent 执行能力的决策动作（action）必须有明确的授权来源。
- **Enforcement**: 凡是执行 `block` 或 `require_human` 的规则，其所在的 Policy 必须在 `meta.privileges` 中显式声明 `high-risk-decision`。
- **Security**: 严禁“隐式超权”，无特权声明的阻断规则会被系统判定为非法。

## 3. 🕊️ 三态决策不变量 (Three-State Decision)
- **Invariant**: 治理判定分为三种清晰状态：`Allowed`（可直接执行）, `Blocked`（禁止执行）, `Requires Human`（需人介入）。
- **Independence**: `Requires Human` 不应被简单等同于 `Blocked`。它代表了一种治理权的移交，而非执行能力的剥夺。
- **Liability**: 归因系统必须区分这三者，以确保信用评估的准确性。

## 4. ⚔️ 安全执行不变量 (Execution Safety)
- **Invariant**: 治理引擎本身必须是不可被逃逸的，且不引入新的攻击面。
- **Enforcement**: 严禁使用 `eval` 或 `new Function` 评估 Policy 条件。所有逻辑必须使用像 `JSON Logic` 这样的声明式、可审计的格式。

---

## 📜 治理底线
> **治理系统的失败应当是“冷静且可解释的”（Fail-closed but Explainable）。**
> 一旦发生逻辑冲突或主权声明缺失，系统应选择安全侧（拦截），并明确记录责任主体。
