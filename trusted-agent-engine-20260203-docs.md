# Project Documentation

- **Generated at:** 2026-02-03 01:24:45
- **Root Dir:** `.`
- **File Count:** 38
- **Total Size:** 252.34 KB

<a name="toc"></a>
## 📂 扫描目录
- [.gitignore](#📄-gitignore) (2 lines, 0.02 KB)
- [LICENSE](#📄-license) (21 lines, 1.06 KB)
- [SPECIFICATION.md](#📄-specificationmd) (56 lines, 2.50 KB)
- [agent.policy.yaml](#📄-agentpolicyyaml) (52 lines, 1.46 KB)
- [agent.policy.yaml.sig](#📄-agentpolicyyamlsig) (1 lines, 0.09 KB)
- [docs/GovernanceKernel.md](#📄-docsgovernancekernelmd) (239 lines, 5.19 KB)
- [jest.config.js](#📄-jestconfigjs) (5 lines, 0.11 KB)
- [package-lock.json](#📄-package-lockjson) (4928 lines, 172.98 KB)
- [package.json](#📄-packagejson) (44 lines, 0.98 KB)
- [scripts/populate_history.ts](#📄-scriptspopulate_historyts) (38 lines, 1.34 KB)
- [src/cli.ts](#📄-srcclits) (150 lines, 4.85 KB)
- [src/engine/anomalyDetector.ts](#📄-srcengineanomalydetectorts) (61 lines, 1.75 KB)
- [src/engine/assetManager.ts](#📄-srcengineassetmanagerts) (68 lines, 2.03 KB)
- [src/engine/consensus.ts](#📄-srcengineconsensusts) (87 lines, 2.50 KB)
- [src/engine/contextBank.ts](#📄-srcenginecontextbankts) (59 lines, 1.67 KB)
- [src/engine/diffParser.ts](#📄-srcenginediffparserts) (79 lines, 1.96 KB)
- [src/engine/evaluator.ts](#📄-srcengineevaluatorts) (205 lines, 6.58 KB)
- [src/engine/liabilityManager.ts](#📄-srcengineliabilitymanagerts) (86 lines, 2.69 KB)
- [src/engine/policyLoader.ts](#📄-srcenginepolicyloaderts) (23 lines, 0.87 KB)
- [src/engine/safeEvaluator.ts](#📄-srcenginesafeevaluatorts) (32 lines, 0.96 KB)
- [src/engine/selfAudit.ts](#📄-srcengineselfauditts) (70 lines, 2.13 KB)
- [src/engine/sovereign.ts](#📄-srcenginesovereignts) (32 lines, 0.79 KB)
- [src/engine/types.ts](#📄-srcenginetypests) (123 lines, 3.19 KB)
- [src/index.ts](#📄-srcindexts) (67 lines, 2.29 KB)
- [src/server.ts](#📄-srcserverts) (49 lines, 1.14 KB)
- [src/sign.ts](#📄-srcsignts) (35 lines, 1.26 KB)
- [tests/accountability.test.ts](#📄-testsaccountabilitytestts) (53 lines, 1.69 KB)
- [tests/anomaly.test.ts](#📄-testsanomalytestts) (39 lines, 1.55 KB)
- [tests/asset_manager.test.ts](#📄-testsasset_managertestts) (40 lines, 1.49 KB)
- [tests/consensus.test.ts](#📄-testsconsensustestts) (46 lines, 1.67 KB)
- [tests/diff_parser.test.ts](#📄-testsdiff_parsertestts) (51 lines, 1.84 KB)
- [tests/golden_set.test.ts](#📄-testsgolden_settestts) (87 lines, 2.76 KB)
- [tests/self_audit.test.ts](#📄-testsself_audittestts) (37 lines, 1.48 KB)
- [tests/sovereignty.test.ts](#📄-testssovereigntytestts) (58 lines, 1.89 KB)
- [tests/value_mercy.test.ts](#📄-testsvalue_mercytestts) (66 lines, 1.86 KB)
- [todo.md](#📄-todomd) (621 lines, 12.19 KB)
- [tsconfig.json](#📄-tsconfigjson) (16 lines, 0.35 KB)
- [value_manifesto.yaml](#📄-value_manifestoyaml) (33 lines, 1.16 KB)

---

## 📄 .gitignore

````text
node_modules
.ai
````

[⬆ 回到目录](#toc)

## 📄 LICENSE

````text
MIT License

Copyright (c) 2026 Yuangs AI Agent Governance Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

````

[⬆ 回到目录](#toc)

## 📄 SPECIFICATION.md

````markdown
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

````

[⬆ 回到目录](#toc)

## 📄 agent.policy.yaml

````yaml
# agent.policy.yaml
# Trusted (Yuangs) Agent - Default Policy v1.0

meta:
  name: "trusted-default-v1"
  version: "1.0.0"
  mode: "strict" # options: strict | monitor

# 1. 作用域定义 (Scope)
# AI 只能在这些围栏里活动
scopes:
  - id: "source-code"
    allow: ["src/**", "lib/**", "components/**", "learning/AI/trusted-agent/**"]
  - id: "documentation"
    allow: ["docs/**", "README.md"]

# 2. 风险定义 (Risk Packs)
# 触碰这些地方会被视为高风险，必须人工确认
risks:
  - id: "infra-danger"
    level: "high"
    match: ["**/.env*", "**/docker-compose.yml", "**/*.tf"]
  - id: "auth-module"
    level: "high"
    match: ["src/auth/**", "src/security/**"]

# 3. 核心规则 (Rules)
# 这是不可逾越的红线
rules:
  # 完整性规则
  - id: "must-have-diff"
    description: "Reject any proposal without explicit diff content"
    check: "payload.diff.length > 0"
    action: "block"

  # 边界规则
  - id: "scope-enforcement"
    description: "Reject changes outside allowed scopes"
    check: "engine.isScoped(payload.files)"
    action: "block"

  # 解释性规则
  - id: "reasoning-required"
    description: "Must provide context/reasoning for changes"
    check: "payload.reasoning.length > 10"
    action: "warn" # v1阶段先警告，v2改为block

  # 风险控制规则
  - id: "high-risk-gate"
    description: "High risk changes require explicit human confirmation"
    condition: "engine.riskLevel == 'high'"
    action: "require_human"

````

[⬆ 回到目录](#toc)

## 📄 agent.policy.yaml.sig

````text
EtP/sCdbCIXwza22EDmoEXbW4XJfhjNKzdc7q0N4pVfVII6gIbcjZCXeLPop8rKC8UObM2R6uG8ooqeZSYi6CQ==
````

[⬆ 回到目录](#toc)

## 📄 docs/GovernanceKernel.md

````markdown

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

````

[⬆ 回到目录](#toc)

## 📄 jest.config.js

````javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
};

````

[⬆ 回到目录](#toc)

## 📄 package-lock.json

````json
{
  "name": "trusted-agent-engine",
  "version": "2.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "trusted-agent-engine",
      "version": "1.0.0",
      "license": "MIT",
      "dependencies": {
        "express": "^5.2.1",
        "json-logic-js": "^2.0.5",
        "minimatch": "^9.0.3",
        "yaml": "^2.3.4"
      },
      "bin": {
        "trusted-diff": "dist/cli.js",
        "trusted-sign": "dist/sign.js"
      },
      "devDependencies": {
        "@types/express": "^5.0.6",
        "@types/jest": "^29.5.11",
        "@types/json-logic-js": "^2.0.8",
        "@types/node": "^20.10.6",
        "jest": "^29.7.0",
        "ts-jest": "^29.1.1",
        "ts-node": "^10.9.2",
        "typescript": "^5.3.3"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.0.tgz",
      "integrity": "sha512-vSH118/wwM/pLR38g/Sgk05sNtro6TlTJKuiMXDaZqPUfjTFcudpCOt00IhOfj+1BFAX+UFAlzCU+6WXr3GLFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.6.tgz",
      "integrity": "sha512-xOBvwq86HHdB7WUDTfKfT/Vuxh7gElQ+Sfti2Cy6yIWNW05P8iUslOVcZ4/sKbE+/jQaukQAdz/gf3724kYdqw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.0.tgz",
      "integrity": "sha512-IyDgFV5GeDUVX4YdF/3CPULtVGSXXMLh1xVIgdCgxApktqnQV0r7/8Nqthg+8YLGaAtdyIlo2qIdZrbCv4+7ww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-syntax-async-generators": {
      "version": "7.8.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-async-generators/-/plugin-syntax-async-generators-7.8.4.tgz",
      "integrity": "sha512-tycmZxkGfZaxhMRbXlPXuVFpdWlXpir2W4AMhSJgRKzk/eDlIXOhb2LHWoLpDF7TEHylV5zNhykX6KAgHJmTNw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-bigint": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-bigint/-/plugin-syntax-bigint-7.8.3.tgz",
      "integrity": "sha512-wnTnFlG+YxQm3vDxpGE57Pj0srRU4sHE/mDkt1qv2YJJSeUAec2ma4WLUnUPeKjyrfntVwe/N6dCXpU+zL3Npg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-class-properties": {
      "version": "7.12.13",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-class-properties/-/plugin-syntax-class-properties-7.12.13.tgz",
      "integrity": "sha512-fm4idjKla0YahUNgFNLCB0qySdsoPiZP3iQE3rky0mBUtMZ23yDJ9SJdg6dXTSDnulOVqiF3Hgr9nbXvXTQZYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.12.13"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-class-static-block": {
      "version": "7.14.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-class-static-block/-/plugin-syntax-class-static-block-7.14.5.tgz",
      "integrity": "sha512-b+YyPmr6ldyNnM6sqYeMWE+bgJcJpO6yS4QD7ymxgH34GBPNDM/THBh8iunyvKIZztiwLH4CJZ0RxTk9emgpjw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.14.5"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-import-attributes": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-import-attributes/-/plugin-syntax-import-attributes-7.28.6.tgz",
      "integrity": "sha512-jiLC0ma9XkQT3TKJ9uYvlakm66Pamywo+qwL+oL8HJOvc6TWdZXVfhqJr8CCzbSGUAbDOzlGHJC1U+vRfLQDvw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-import-meta": {
      "version": "7.10.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-import-meta/-/plugin-syntax-import-meta-7.10.4.tgz",
      "integrity": "sha512-Yqfm+XDx0+Prh3VSeEQCPU81yC+JWZ2pDPFSS4ZdpfZhp4MkFMaDC1UqseovEKwSUpnIL7+vK+Clp7bfh0iD7g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.10.4"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-json-strings": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-json-strings/-/plugin-syntax-json-strings-7.8.3.tgz",
      "integrity": "sha512-lY6kdGpWHvjoe2vk4WrAapEuBR69EMxZl+RoGRhrFGNYVK8mOPAW8VfbT/ZgrFbXlDNiiaxQnAtgVCZ6jv30EA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-jsx": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.28.6.tgz",
      "integrity": "sha512-wgEmr06G6sIpqr8YDwA2dSRTE3bJ+V0IfpzfSY3Lfgd7YWOaAdlykvJi13ZKBt8cZHfgH1IXN+CL656W3uUa4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-logical-assignment-operators": {
      "version": "7.10.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-logical-assignment-operators/-/plugin-syntax-logical-assignment-operators-7.10.4.tgz",
      "integrity": "sha512-d8waShlpFDinQ5MtvGU9xDAOzKH47+FFoney2baFIoMr952hKOLp1HR7VszoZvOsV/4+RRszNY7D17ba0te0ig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.10.4"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-nullish-coalescing-operator": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-nullish-coalescing-operator/-/plugin-syntax-nullish-coalescing-operator-7.8.3.tgz",
      "integrity": "sha512-aSff4zPII1u2QD7y+F8oDsz19ew4IGEJg9SVW+bqwpwtfFleiQDMdzA/R+UlWDzfnHFCxxleFT0PMIrR36XLNQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-numeric-separator": {
      "version": "7.10.4",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-numeric-separator/-/plugin-syntax-numeric-separator-7.10.4.tgz",
      "integrity": "sha512-9H6YdfkcK/uOnY/K7/aA2xpzaAgkQn37yzWUMRK7OaPOqOpGS1+n0H5hxT9AUw9EsSjPW8SVyMJwYRtWs3X3ug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.10.4"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-object-rest-spread": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-object-rest-spread/-/plugin-syntax-object-rest-spread-7.8.3.tgz",
      "integrity": "sha512-XoqMijGZb9y3y2XskN+P1wUGiVwWZ5JmoDRwx5+3GmEplNyVM2s2Dg8ILFQm8rWM48orGy5YpI5Bl8U1y7ydlA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-optional-catch-binding": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-catch-binding/-/plugin-syntax-optional-catch-binding-7.8.3.tgz",
      "integrity": "sha512-6VPD0Pc1lpTqw0aKoeRTMiB+kWhAoT24PA+ksWSBrFtl5SIRVpZlwN3NNPQjehA2E/91FV3RjLWoVTglWcSV3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-optional-chaining": {
      "version": "7.8.3",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-chaining/-/plugin-syntax-optional-chaining-7.8.3.tgz",
      "integrity": "sha512-KoK9ErH1MBlCPxV0VANkXW2/dw4vlbGDrFgz8bmUsBGYkFRcbRwMh6cIJubdPrkxRwuGdtCk0v/wPTKbQgBjkg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.8.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-private-property-in-object": {
      "version": "7.14.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-private-property-in-object/-/plugin-syntax-private-property-in-object-7.14.5.tgz",
      "integrity": "sha512-0wVnp9dxJ72ZUJDV27ZfbSj6iHLoytYZmh3rFcxNnvsJF3ktkzLDZPy/mA17HGsaQT3/DQsWYX1f1QGWkCoVUg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.14.5"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-top-level-await": {
      "version": "7.14.5",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-top-level-await/-/plugin-syntax-top-level-await-7.14.5.tgz",
      "integrity": "sha512-hx++upLv5U1rgYfwe1xBQUhRmU41NEvpUvrp8jkrSCdvGSnM5/qdRMtylJ6PG5OFkBaHkbTAKTnd3/YyESRHFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.14.5"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-typescript": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.28.6.tgz",
      "integrity": "sha512-+nDNmQye7nlnuuHDboPbGm00Vqg3oO8niRRL27/4LYHUsHYh0zJ1xWOz0uRwNFmM1Avzk8wZbc6rdiYhomzv/A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@bcoe/v8-coverage": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/@bcoe/v8-coverage/-/v8-coverage-0.2.3.tgz",
      "integrity": "sha512-0hYQ8SB4Db5zvZB4axdMHGwEaQjkZzFjQiN9LVYvIFB2nSUHW9tYpxWriPrWDASIxiaXax83REcLxuSdnGPZtw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@cspotcode/source-map-support": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/@cspotcode/source-map-support/-/source-map-support-0.8.1.tgz",
      "integrity": "sha512-IchNf6dN4tHoMFIn/7OE8LWZ19Y6q/67Bmf6vnGREv8RSbBVb9LPJxEcnwrcwX6ixSvaiGoomAUvu4YSxXrVgw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/trace-mapping": "0.3.9"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@cspotcode/source-map-support/node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.9",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.9.tgz",
      "integrity": "sha512-3Belt6tdc8bPgAtbcmdtNJlirVoTmEb5e2gC94PnkwEW9jI6CAHUeoG85tjWP5WquqfavoMtMwiG4P926ZKKuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.0.3",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "node_modules/@istanbuljs/load-nyc-config": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@istanbuljs/load-nyc-config/-/load-nyc-config-1.1.0.tgz",
      "integrity": "sha512-VjeHSlIzpv/NyD3N0YuHfXOPDIixcA1q2ZV98wsMqcYlPmv2n3Yb2lYP9XMElnaFVXg5A7YLTeLu6V84uQDjmQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "camelcase": "^5.3.1",
        "find-up": "^4.1.0",
        "get-package-type": "^0.1.0",
        "js-yaml": "^3.13.1",
        "resolve-from": "^5.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@istanbuljs/schema": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/@istanbuljs/schema/-/schema-0.1.3.tgz",
      "integrity": "sha512-ZXRY4jNvVgSVQ8DL3LTcakaAtXwTVUxE81hslsyD2AtoXW/wVob10HkOJ1X/pAlcI7D+2YoZKg5do8G/w6RYgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@jest/console": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/console/-/console-29.7.0.tgz",
      "integrity": "sha512-5Ni4CU7XHQi32IJ398EEP4RrB8eV09sXP2ROqD4bksHrnTree52PsxvX8tpL8LvTZ3pFzXyPbNQReSN41CAhOg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "chalk": "^4.0.0",
        "jest-message-util": "^29.7.0",
        "jest-util": "^29.7.0",
        "slash": "^3.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/core": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/core/-/core-29.7.0.tgz",
      "integrity": "sha512-n7aeXWKMnGtDA48y8TLWJPJmLmmZ642Ceo78cYWEpiD7FzDgmNDV/GCVRorPABdXLJZ/9wzzgZAlHjXjxDHGsg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/console": "^29.7.0",
        "@jest/reporters": "^29.7.0",
        "@jest/test-result": "^29.7.0",
        "@jest/transform": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "ansi-escapes": "^4.2.1",
        "chalk": "^4.0.0",
        "ci-info": "^3.2.0",
        "exit": "^0.1.2",
        "graceful-fs": "^4.2.9",
        "jest-changed-files": "^29.7.0",
        "jest-config": "^29.7.0",
        "jest-haste-map": "^29.7.0",
        "jest-message-util": "^29.7.0",
        "jest-regex-util": "^29.6.3",
        "jest-resolve": "^29.7.0",
        "jest-resolve-dependencies": "^29.7.0",
        "jest-runner": "^29.7.0",
        "jest-runtime": "^29.7.0",
        "jest-snapshot": "^29.7.0",
        "jest-util": "^29.7.0",
        "jest-validate": "^29.7.0",
        "jest-watcher": "^29.7.0",
        "micromatch": "^4.0.4",
        "pretty-format": "^29.7.0",
        "slash": "^3.0.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "node-notifier": "^8.0.1 || ^9.0.0 || ^10.0.0"
      },
      "peerDependenciesMeta": {
        "node-notifier": {
          "optional": true
        }
      }
    },
    "node_modules/@jest/environment": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/environment/-/environment-29.7.0.tgz",
      "integrity": "sha512-aQIfHDq33ExsN4jP1NWGXhxgQ/wixs60gDiKO+XVMd8Mn0NWPWgc34ZQDTb2jKaUWQ7MuwoitXAsN2XVXNMpAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/fake-timers": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "jest-mock": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/expect": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/expect/-/expect-29.7.0.tgz",
      "integrity": "sha512-8uMeAMycttpva3P1lBHB8VciS9V0XAr3GymPpipdyQXbBcuhkLQOSe8E/p92RyAdToS6ZD1tFkX+CkhoECE0dQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "expect": "^29.7.0",
        "jest-snapshot": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/expect-utils": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/expect-utils/-/expect-utils-29.7.0.tgz",
      "integrity": "sha512-GlsNBWiFQFCVi9QVSx7f5AgMeLxe9YCCs5PuP2O2LdjDAA8Jh9eX7lA1Jq/xdXw3Wb3hyvlFNfZIfcRetSzYcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "jest-get-type": "^29.6.3"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/fake-timers": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/fake-timers/-/fake-timers-29.7.0.tgz",
      "integrity": "sha512-q4DH1Ha4TTFPdxLsqDXK1d3+ioSL7yL5oCMJZgDYm6i+6CygW5E5xVr/D1HdsGxjt1ZWSfUAs9OxSB/BNelWrQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "@sinonjs/fake-timers": "^10.0.2",
        "@types/node": "*",
        "jest-message-util": "^29.7.0",
        "jest-mock": "^29.7.0",
        "jest-util": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/globals": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/globals/-/globals-29.7.0.tgz",
      "integrity": "sha512-mpiz3dutLbkW2MNFubUGUEVLkTGiqW6yLVTA+JbP6fI6J5iL9Y0Nlg8k95pcF8ctKwCS7WVxteBs29hhfAotzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/environment": "^29.7.0",
        "@jest/expect": "^29.7.0",
        "@jest/types": "^29.6.3",
        "jest-mock": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/reporters": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/reporters/-/reporters-29.7.0.tgz",
      "integrity": "sha512-DApq0KJbJOEzAFYjHADNNxAE3KbhxQB1y5Kplb5Waqw6zVbuWatSnMjE5gs8FUgEPmNsnZA3NCWl9NG0ia04Pg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@bcoe/v8-coverage": "^0.2.3",
        "@jest/console": "^29.7.0",
        "@jest/test-result": "^29.7.0",
        "@jest/transform": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@jridgewell/trace-mapping": "^0.3.18",
        "@types/node": "*",
        "chalk": "^4.0.0",
        "collect-v8-coverage": "^1.0.0",
        "exit": "^0.1.2",
        "glob": "^7.1.3",
        "graceful-fs": "^4.2.9",
        "istanbul-lib-coverage": "^3.0.0",
        "istanbul-lib-instrument": "^6.0.0",
        "istanbul-lib-report": "^3.0.0",
        "istanbul-lib-source-maps": "^4.0.0",
        "istanbul-reports": "^3.1.3",
        "jest-message-util": "^29.7.0",
        "jest-util": "^29.7.0",
        "jest-worker": "^29.7.0",
        "slash": "^3.0.0",
        "string-length": "^4.0.1",
        "strip-ansi": "^6.0.0",
        "v8-to-istanbul": "^9.0.1"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "node-notifier": "^8.0.1 || ^9.0.0 || ^10.0.0"
      },
      "peerDependenciesMeta": {
        "node-notifier": {
          "optional": true
        }
      }
    },
    "node_modules/@jest/schemas": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/@jest/schemas/-/schemas-29.6.3.tgz",
      "integrity": "sha512-mo5j5X+jIZmJQveBKeS/clAueipV7KgiX1vMgCxam1RNYiqE1w62n0/tJJnHtjW8ZHcQco5gY85jA3mi0L+nSA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@sinclair/typebox": "^0.27.8"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/source-map": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/@jest/source-map/-/source-map-29.6.3.tgz",
      "integrity": "sha512-MHjT95QuipcPrpLM+8JMSzFx6eHp5Bm+4XeFDJlwsvVBjmKNiIAvasGK2fxz2WbGRlnvqehFbh07MMa7n3YJnw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/trace-mapping": "^0.3.18",
        "callsites": "^3.0.0",
        "graceful-fs": "^4.2.9"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/test-result": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/test-result/-/test-result-29.7.0.tgz",
      "integrity": "sha512-Fdx+tv6x1zlkJPcWXmMDAG2HBnaR9XPSd5aDWQVsfrZmLVT3lU1cwyxLgRmXR9yrq4NBoEm9BMsfgFzTQAbJYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/console": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/istanbul-lib-coverage": "^2.0.0",
        "collect-v8-coverage": "^1.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/test-sequencer": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/test-sequencer/-/test-sequencer-29.7.0.tgz",
      "integrity": "sha512-GQwJ5WZVrKnOJuiYiAF52UNUJXgTZx1NHjFSEB0qEMmSZKAkdMoIzw/Cj6x6NF4AvV23AUqDpFzQkN/eYCYTxw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/test-result": "^29.7.0",
        "graceful-fs": "^4.2.9",
        "jest-haste-map": "^29.7.0",
        "slash": "^3.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/transform": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/@jest/transform/-/transform-29.7.0.tgz",
      "integrity": "sha512-ok/BTPFzFKVMwO5eOHRrvnBVHdRy9IrsrW1GpMaQ9MCnilNLXQKmAX8s1YXDFaai9xJpac2ySzV0YeRRECr2Vw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.11.6",
        "@jest/types": "^29.6.3",
        "@jridgewell/trace-mapping": "^0.3.18",
        "babel-plugin-istanbul": "^6.1.1",
        "chalk": "^4.0.0",
        "convert-source-map": "^2.0.0",
        "fast-json-stable-stringify": "^2.1.0",
        "graceful-fs": "^4.2.9",
        "jest-haste-map": "^29.7.0",
        "jest-regex-util": "^29.6.3",
        "jest-util": "^29.7.0",
        "micromatch": "^4.0.4",
        "pirates": "^4.0.4",
        "slash": "^3.0.0",
        "write-file-atomic": "^4.0.2"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jest/types": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/@jest/types/-/types-29.6.3.tgz",
      "integrity": "sha512-u3UPsIilWKOM3F9CXtrG8LEJmNxwoCQC/XVj4IKYXvvpx7QIi/Kg1LI5uDmDpKlac62NUtX7eLjRh+jVZcLOzw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/schemas": "^29.6.3",
        "@types/istanbul-lib-coverage": "^2.0.0",
        "@types/istanbul-reports": "^3.0.0",
        "@types/node": "*",
        "@types/yargs": "^17.0.8",
        "chalk": "^4.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@sinclair/typebox": {
      "version": "0.27.8",
      "resolved": "https://registry.npmjs.org/@sinclair/typebox/-/typebox-0.27.8.tgz",
      "integrity": "sha512-+Fj43pSMwJs4KRrH/938Uf+uAELIgVBmQzg/q1YG10djyfA3TnrU8N8XzqCh/okZdszqBQTZf96idMfE5lnwTA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@sinonjs/commons": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@sinonjs/commons/-/commons-3.0.1.tgz",
      "integrity": "sha512-K3mCHKQ9sVh8o1C9cxkwxaOmXoAMlDxC1mYyHrjqOWEcBjYr76t96zL2zlj5dUGZ3HSw240X1qgH3Mjf1yJWpQ==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "type-detect": "4.0.8"
      }
    },
    "node_modules/@sinonjs/fake-timers": {
      "version": "10.3.0",
      "resolved": "https://registry.npmjs.org/@sinonjs/fake-timers/-/fake-timers-10.3.0.tgz",
      "integrity": "sha512-V4BG07kuYSUkTCSBHG8G8TNhM+F19jXFWnQtzj+we8DrkpSBCee9Z3Ms8yiGer/dlmhe35/Xdgyo3/0rQKg7YA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@sinonjs/commons": "^3.0.0"
      }
    },
    "node_modules/@tsconfig/node10": {
      "version": "1.0.12",
      "resolved": "https://registry.npmjs.org/@tsconfig/node10/-/node10-1.0.12.tgz",
      "integrity": "sha512-UCYBaeFvM11aU2y3YPZ//O5Rhj+xKyzy7mvcIoAjASbigy8mHMryP5cK7dgjlz2hWxh1g5pLw084E0a/wlUSFQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node12": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@tsconfig/node12/-/node12-1.0.11.tgz",
      "integrity": "sha512-cqefuRsh12pWyGsIoBKJA9luFu3mRxCA+ORZvA4ktLSzIuCUtWVxGIuXigEwO5/ywWFMZ2QEGKWvkZG1zDMTag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node14": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@tsconfig/node14/-/node14-1.0.3.tgz",
      "integrity": "sha512-ysT8mhdixWK6Hw3i1V2AeRqZ5WfXg1G43mqoYlM2nc6388Fq5jcXyr5mRsqViLx/GJYdoL0bfXD8nmF+Zn/Iow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node16": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@tsconfig/node16/-/node16-1.0.4.tgz",
      "integrity": "sha512-vxhUy4J8lyeyinH7Azl1pdd43GJhZH/tP2weN8TntQblOY+A0XbT8DJk1/oCPuOOyg/Ja757rG0CgHcWC8OfMA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/express": {
      "version": "5.0.6",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-5.0.6.tgz",
      "integrity": "sha512-sKYVuV7Sv9fbPIt/442koC7+IIwK5olP1KWeD88e/idgoJqDm3JV/YUiPwkoKK92ylff2MGxSz1CSjsXelx0YA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^5.0.0",
        "@types/serve-static": "^2"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-5.1.1.tgz",
      "integrity": "sha512-v4zIMr/cX7/d2BpAEX3KNKL/JrT1s43s96lLvvdTmza1oEvDudCqK9aF/djc/SWgy8Yh0h30TZx5VpzqFCxk5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/graceful-fs": {
      "version": "4.1.9",
      "resolved": "https://registry.npmjs.org/@types/graceful-fs/-/graceful-fs-4.1.9.tgz",
      "integrity": "sha512-olP3sd1qOEe5dXTSaFvQG+02VdRXcdytWLAZsAq1PecU8uqQAhkrnbli7DagjtXKW/Bl7YJbUsa8MPcuc8LHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/istanbul-lib-coverage": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/@types/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.6.tgz",
      "integrity": "sha512-2QF/t/auWm0lsy8XtKVPG19v3sSOQlJe/YHZgfjb/KBBHOGSV+J2q/S671rcq9uTBrLAXmZpqJiaQbMT+zNU1w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/istanbul-lib-report": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@types/istanbul-lib-report/-/istanbul-lib-report-3.0.3.tgz",
      "integrity": "sha512-NQn7AHQnk/RSLOxrBbGyJM/aVQ+pjj5HCgasFxc0K/KhoATfQ/47AyUl15I2yBUpihjmas+a+VJBOqecrFH+uA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/istanbul-lib-coverage": "*"
      }
    },
    "node_modules/@types/istanbul-reports": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/istanbul-reports/-/istanbul-reports-3.0.4.tgz",
      "integrity": "sha512-pk2B1NWalF9toCRu6gjBzR69syFjP4Od8WRAX+0mmf9lAjCRicLOWc+ZrxZHx/0XRjotgkF9t6iaMJ+aXcOdZQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/istanbul-lib-report": "*"
      }
    },
    "node_modules/@types/jest": {
      "version": "29.5.14",
      "resolved": "https://registry.npmjs.org/@types/jest/-/jest-29.5.14.tgz",
      "integrity": "sha512-ZN+4sdnLUbo8EVvVc2ao0GFW6oVrQRPn4K2lglySj7APvSrgzxHiNNK99us4WDMi57xxA2yggblIAMNhXOotLQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "expect": "^29.0.0",
        "pretty-format": "^29.0.0"
      }
    },
    "node_modules/@types/json-logic-js": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/@types/json-logic-js/-/json-logic-js-2.0.8.tgz",
      "integrity": "sha512-WgNsDPuTPKYXl0Jh0IfoCoJoAGGYZt5qzpmjuLSEg7r0cKp/kWtWp0HAsVepyPSPyXiHo6uXp/B/kW/2J1fa2Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "20.19.30",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.30.tgz",
      "integrity": "sha512-WJtwWJu7UdlvzEAUm484QNg5eAoq5QR08KDNx7g45Usrs2NtOPiX8ugDqmKdXkyL03rBqU5dYNYVQetEpBHq2g==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-eOunJqu0K1923aExK6y8p6fsihYEn/BYuQ4g0CxAAgFc4b/ZLN4CrsRZ55srTdqoiLzU2B2evC+apEIxprEzkQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
      "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-2.2.0.tgz",
      "integrity": "sha512-8mam4H1NHLtu7nmtalF7eyBH14QyOASmcxHhSfEoRyr0nP/YdoesEtU+uSRvMe96TW/HPTtkoKqQLl53N7UXMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/stack-utils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/@types/stack-utils/-/stack-utils-2.0.3.tgz",
      "integrity": "sha512-9aEbYZ3TbYMznPdcdr3SmIrLXwC/AKZXQeCf9Pgao5CKb8CyHuEX5jzWPTkvregvhRJHcpRO6BFoGW9ycaOkYw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/yargs": {
      "version": "17.0.35",
      "resolved": "https://registry.npmjs.org/@types/yargs/-/yargs-17.0.35.tgz",
      "integrity": "sha512-qUHkeCyQFxMXg79wQfTtfndEC+N9ZZg76HJftDJp+qH2tV7Gj4OJi7l+PiWwJ+pWtW8GwSmqsDj/oymhrTWXjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/yargs-parser": "*"
      }
    },
    "node_modules/@types/yargs-parser": {
      "version": "21.0.3",
      "resolved": "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-21.0.3.tgz",
      "integrity": "sha512-I4q9QU9MQv4oEOz4tAHJtNz1cwuLxn2F3xcc2iV5WdqLPpUnj30aUuxt1mAxYTG+oe8CZMV/+6rU4S4gRDzqtQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.15.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
      "integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-walk": {
      "version": "8.3.4",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-8.3.4.tgz",
      "integrity": "sha512-ueEepnujpqee2o5aIYnvHU6C0A42MNdsIDeqy5BydrkuC5R1ZuUFnm27EeFJGoEHJQgn3uleRvmTXaJgfXbt4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "acorn": "^8.11.0"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/ansi-escapes": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.3.2.tgz",
      "integrity": "sha512-gKXj5ALrKWQLsYG9jlTRmR/xKluxHV+Z9QEwNIgCfM1/uwPMCuzVVnh5mwTd+OuBZcwSIMbqssNWRm1lE51QaQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "type-fest": "^0.21.3"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/arg/-/arg-4.1.3.tgz",
      "integrity": "sha512-58S9QDqG0Xx27YwPSt9fJxivjYl432YCwfDMfZ+71RAqUrZef7LrKQZ3LHLOwCS4FLNBplP533Zx895SeOCHvA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/argparse": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "sprintf-js": "~1.0.2"
      }
    },
    "node_modules/babel-jest": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/babel-jest/-/babel-jest-29.7.0.tgz",
      "integrity": "sha512-BrvGY3xZSwEcCzKvKsCi2GgHqDqsYkOP4/by5xCgIwGXQxIEh+8ew3gmrE1y7XRR6LHZIj6yLYnUi/mm2KXKBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/transform": "^29.7.0",
        "@types/babel__core": "^7.1.14",
        "babel-plugin-istanbul": "^6.1.1",
        "babel-preset-jest": "^29.6.3",
        "chalk": "^4.0.0",
        "graceful-fs": "^4.2.9",
        "slash": "^3.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.8.0"
      }
    },
    "node_modules/babel-plugin-istanbul": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/babel-plugin-istanbul/-/babel-plugin-istanbul-6.1.1.tgz",
      "integrity": "sha512-Y1IQok9821cC9onCx5otgFfRm7Lm+I+wwxOx738M/WLPZ9Q42m4IG5W0FNX8WLL2gYMZo3JkuXIH2DOpWM+qwA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.0.0",
        "@istanbuljs/load-nyc-config": "^1.0.0",
        "@istanbuljs/schema": "^0.1.2",
        "istanbul-lib-instrument": "^5.0.4",
        "test-exclude": "^6.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/babel-plugin-istanbul/node_modules/istanbul-lib-instrument": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-5.2.1.tgz",
      "integrity": "sha512-pzqtp31nLv/XFOzXGuvhCb8qhjmTVo5vjVk19XE4CRlSWz0KoeJ3bw9XsA7nOp9YBf4qHjwBxkDzKcME/J29Yg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/core": "^7.12.3",
        "@babel/parser": "^7.14.7",
        "@istanbuljs/schema": "^0.1.2",
        "istanbul-lib-coverage": "^3.2.0",
        "semver": "^6.3.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/babel-plugin-jest-hoist": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/babel-plugin-jest-hoist/-/babel-plugin-jest-hoist-29.6.3.tgz",
      "integrity": "sha512-ESAc/RJvGTFEzRwOTT4+lNDk/GNHMkKbNzsvT0qKRfDyyYTskxB5rnU2njIDYVxXCBHHEI1c0YwHob3WaYujOg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.3.3",
        "@babel/types": "^7.3.3",
        "@types/babel__core": "^7.1.14",
        "@types/babel__traverse": "^7.0.6"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/babel-preset-current-node-syntax": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/babel-preset-current-node-syntax/-/babel-preset-current-node-syntax-1.2.0.tgz",
      "integrity": "sha512-E/VlAEzRrsLEb2+dv8yp3bo4scof3l9nR4lrld+Iy5NyVqgVYUJnDAmunkhPMisRI32Qc4iRiz425d8vM++2fg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/plugin-syntax-async-generators": "^7.8.4",
        "@babel/plugin-syntax-bigint": "^7.8.3",
        "@babel/plugin-syntax-class-properties": "^7.12.13",
        "@babel/plugin-syntax-class-static-block": "^7.14.5",
        "@babel/plugin-syntax-import-attributes": "^7.24.7",
        "@babel/plugin-syntax-import-meta": "^7.10.4",
        "@babel/plugin-syntax-json-strings": "^7.8.3",
        "@babel/plugin-syntax-logical-assignment-operators": "^7.10.4",
        "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.3",
        "@babel/plugin-syntax-numeric-separator": "^7.10.4",
        "@babel/plugin-syntax-object-rest-spread": "^7.8.3",
        "@babel/plugin-syntax-optional-catch-binding": "^7.8.3",
        "@babel/plugin-syntax-optional-chaining": "^7.8.3",
        "@babel/plugin-syntax-private-property-in-object": "^7.14.5",
        "@babel/plugin-syntax-top-level-await": "^7.14.5"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0 || ^8.0.0-0"
      }
    },
    "node_modules/babel-preset-jest": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/babel-preset-jest/-/babel-preset-jest-29.6.3.tgz",
      "integrity": "sha512-0B3bhxR6snWXJZtR/RliHTDPRgn1sNHOR0yVtq/IiQFyuOVjFS+wuio/R4gSNkyYmKmJB4wGZv2NZanmKmTnNA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "babel-plugin-jest-hoist": "^29.6.3",
        "babel-preset-current-node-syntax": "^1.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.9.19",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.9.19.tgz",
      "integrity": "sha512-ipDqC8FrAl/76p2SSWKSI+H9tFwm7vYqXQrItCuiVPt26Km0jS+NzSsBWAaBusvSbQcfJG+JitdMm+wZAgTYqg==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.js"
      }
    },
    "node_modules/body-parser": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.2.tgz",
      "integrity": "sha512-oP5VkATKlNwcgvxi0vM0p/D3n2C3EReYVX+DNYs5TjZFn/oQt2j+4sVJtSMr18pdRr8wjTcBl6LoV+FUwzPmNA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^1.0.5",
        "debug": "^4.4.3",
        "http-errors": "^2.0.0",
        "iconv-lite": "^0.7.0",
        "on-finished": "^2.4.1",
        "qs": "^6.14.1",
        "raw-body": "^3.0.1",
        "type-is": "^2.0.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.1",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.1.tgz",
      "integrity": "sha512-ZC5Bd0LgJXgwGqUknZY/vkUQ04r8NXnJZ3yYi4vDmSiZmC/pdSN0NbNRPxZpbtO4uAfDUAFffO8IZoM3Gj8IkA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "baseline-browser-mapping": "^2.9.0",
        "caniuse-lite": "^1.0.30001759",
        "electron-to-chromium": "^1.5.263",
        "node-releases": "^2.0.27",
        "update-browserslist-db": "^1.2.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/bs-logger": {
      "version": "0.2.6",
      "resolved": "https://registry.npmjs.org/bs-logger/-/bs-logger-0.2.6.tgz",
      "integrity": "sha512-pd8DCoxmbgc7hyPKOvxtqNcjYoOsABPQdcCUjGp3d42VR2CX1ORhk2A87oqqu5R1kk+76nsxZupkmyd+MVtCog==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-json-stable-stringify": "2.x"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/bser": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/bser/-/bser-2.1.1.tgz",
      "integrity": "sha512-gQxTNE/GAfIIrmHLUE3oJyp5FO6HRBfhjnw4/wMmA63ZGDJnWBmgY/lyQBpnDUkGmAhbSe39tx2d/iTOAfglwQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "node-int64": "^0.4.0"
      }
    },
    "node_modules/buffer-from": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
      "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase": {
      "version": "5.3.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
      "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001767",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001767.tgz",
      "integrity": "sha512-34+zUAMhSH+r+9eKmYG+k2Rpt8XttfE4yXAjoZvkAPs15xcYQhyBYdalJ65BzivAvGRMViEjy6oKr/S91loekQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/char-regex": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/char-regex/-/char-regex-1.0.2.tgz",
      "integrity": "sha512-kWWXztvZ5SBQV+eRgKFeh8q5sLuZY2+8WUIzlxWVTg+oGwY14qylx1KbKzHd8P6ZYkAg0xyIDU9JMHhyJMZ1jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/ci-info": {
      "version": "3.9.0",
      "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-3.9.0.tgz",
      "integrity": "sha512-NIxF55hv4nSqQswkAeiOi1r83xy8JldOFDTWiug55KBu9Jnblncd2U6ViHmYgHf01TPZS77NJBhBMKdWj9HQMQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/sibiraj-s"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cjs-module-lexer": {
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/cjs-module-lexer/-/cjs-module-lexer-1.4.3.tgz",
      "integrity": "sha512-9z8TZaGM1pfswYeXrUpzPrkx8UnWYdhJclsiYMm6x/w5+nN+8Tf/LnAgfLGQCm59qAOxU8WwHEq2vNwF6i4j+Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/co": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/co/-/co-4.6.0.tgz",
      "integrity": "sha512-QVb0dM5HvG+uaxitm8wONl7jltx8dqhfU33DcqtOZcLSVIKSDDLDi7+0LbAKiyI8hD9u42m2YxXSkMGWThaecQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">= 1.0.0",
        "node": ">= 0.12.0"
      }
    },
    "node_modules/collect-v8-coverage": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/collect-v8-coverage/-/collect-v8-coverage-1.0.3.tgz",
      "integrity": "sha512-1L5aqIkwPfiodaMgQunkF1zRhNqifHBmtbbbxcr6yVxxBnliw4TDOW6NxpO8DJLgJ16OT+Y4ztZqP6p/FtXnAw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/content-disposition": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.1.tgz",
      "integrity": "sha512-oIXISMynqSqm241k6kcQ5UwttDILMK4BiurCfGEREw6+X9jkkpEe5T9FZaApyLGGOnFuyMWZpdolTXMtvEJ08Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/create-jest": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/create-jest/-/create-jest-29.7.0.tgz",
      "integrity": "sha512-Adz2bdH0Vq3F53KEMJOoftQFutWCukm6J24wbPWRO4k1kMY7gS7ds/uoJkNuV8wDCtWWnuwGcJwpWcih+zEW1Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "chalk": "^4.0.0",
        "exit": "^0.1.2",
        "graceful-fs": "^4.2.9",
        "jest-config": "^29.7.0",
        "jest-util": "^29.7.0",
        "prompts": "^2.0.1"
      },
      "bin": {
        "create-jest": "bin/create-jest.js"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/create-require": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/create-require/-/create-require-1.1.1.tgz",
      "integrity": "sha512-dcKFX3jn0MpIaXjisoRvexIJVEKzaq7z2rZKxf+MSr9TkdmHmsU4m2lcLojrj/FHl8mk5VxMmYA+ftRkP/3oKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/dedent": {
      "version": "1.7.1",
      "resolved": "https://registry.npmjs.org/dedent/-/dedent-1.7.1.tgz",
      "integrity": "sha512-9JmrhGZpOlEgOLdQgSm0zxFaYoQon408V1v49aqTWuXENVlnCuY9JBZcXZiCsZQWDjTm5Qf/nIvAy77mXDAjEg==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "babel-plugin-macros": "^3.1.0"
      },
      "peerDependenciesMeta": {
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/deepmerge": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/deepmerge/-/deepmerge-4.3.1.tgz",
      "integrity": "sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-newline": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/detect-newline/-/detect-newline-3.1.0.tgz",
      "integrity": "sha512-TLz+x/vEXm/Y7P7wn1EJFNLxYpUD4TgMosxY6fAVJUnJMbupHBOncxyWUG9OpTaH9EBD7uFI5LfEgmMOc54DsA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/diff": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/diff/-/diff-4.0.4.tgz",
      "integrity": "sha512-X07nttJQkwkfKfvTPG/KSnE2OMdcUCao6+eXF3wmnIQRn2aPAHH3VxDbDOdegkd6JbPsXqShpvEOHfAT+nCNwQ==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.3.1"
      }
    },
    "node_modules/diff-sequences": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/diff-sequences/-/diff-sequences-29.6.3.tgz",
      "integrity": "sha512-EjePK1srD3P08o2j4f0ExnylqRs5B9tJjcp9t1krH2qRi8CCdsYfwe9JgSLurFBWwq4uOlipzfk5fHNvwFKr8Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.283",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.283.tgz",
      "integrity": "sha512-3vifjt1HgrGW/h76UEeny+adYApveS9dH2h3p57JYzBSXJIKUJAvtmIytDKjcSCt9xHfrNCFJ7gts6vkhuq++w==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emittery": {
      "version": "0.13.1",
      "resolved": "https://registry.npmjs.org/emittery/-/emittery-0.13.1.tgz",
      "integrity": "sha512-DeWwawk6r5yR9jFgnDKYt4sLS0LmHJJi3ZOnb5/JdbYwj3nW+FxQnHIjhBKz8YLC7oRNPVM9NQ47I3CVx34eqQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/emittery?sponsor=1"
      }
    },
    "node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/error-ex": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
      "integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.2.1"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/escape-string-regexp": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-2.0.0.tgz",
      "integrity": "sha512-UpzcLCXolUWcNu5HtVMHYdXJjArjsF9C0aNnquZYY4uW/Vu0miy5YoWvbV345HauVvcAUnpRuhMMcqTcGOY2+w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
      "dev": true,
      "license": "BSD-2-Clause",
      "bin": {
        "esparse": "bin/esparse.js",
        "esvalidate": "bin/esvalidate.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/execa": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/execa/-/execa-5.1.1.tgz",
      "integrity": "sha512-8uSpZZocAZRBAPIEINJj3Lo9HyGitllczc27Eh5YYojjMFMn8yHMDMaUHE2Jqfq05D/wucwI4JGURyXt1vchyg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cross-spawn": "^7.0.3",
        "get-stream": "^6.0.0",
        "human-signals": "^2.1.0",
        "is-stream": "^2.0.0",
        "merge-stream": "^2.0.0",
        "npm-run-path": "^4.0.1",
        "onetime": "^5.1.2",
        "signal-exit": "^3.0.3",
        "strip-final-newline": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/execa?sponsor=1"
      }
    },
    "node_modules/exit": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/exit/-/exit-0.1.2.tgz",
      "integrity": "sha512-Zk/eNKV2zbjpKzrsQ+n1G6poVbErQxJ0LBOJXaKZ1EViLzH+hrLu9cdXI4zw9dBQJslwBEpbQ2P1oS7nDxs6jQ==",
      "dev": true,
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/expect": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/expect/-/expect-29.7.0.tgz",
      "integrity": "sha512-2Zks0hf1VLFYI1kbh0I5jP3KHHyCHpkfyHBzsSXRFgl/Bg9mWYfMW8oD+PdMPlEwy5HNsR9JutYy6pMeOh61nw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/expect-utils": "^29.7.0",
        "jest-get-type": "^29.6.3",
        "jest-matcher-utils": "^29.7.0",
        "jest-message-util": "^29.7.0",
        "jest-util": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.1",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fb-watchman": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/fb-watchman/-/fb-watchman-2.0.2.tgz",
      "integrity": "sha512-p5161BqbuCaSnB8jIbzQHOlpgsPmK5rJVDfDKO91Axs5NC1uu3HRQm6wt9cd9/+GtQQIO53JdGXXoyDpTAsgYA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "bser": "2.1.1"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/find-up": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-4.1.0.tgz",
      "integrity": "sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^5.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-package-type": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/get-package-type/-/get-package-type-0.1.0.tgz",
      "integrity": "sha512-pjzuKtY64GYfWizNAJ0fr9VqttZkNiK2iS430LtIHzjBEr6bX8Am2zm4sW4Ro5wjWW5cAlRL1qAMTcXbjNAO2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-stream": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-6.0.1.tgz",
      "integrity": "sha512-ts6Wi+2j3jQjqi70w5AlN8DFnkSwC+MqmxEzdEALB2qXZYV3X/b1CTfgPLGJNMeAWxdPfU8FO1ms3NUfaHCPYg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/glob": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz",
      "integrity": "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==",
      "deprecated": "Glob versions prior to v9 are no longer supported",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      },
      "engines": {
        "node": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob/node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/glob/node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/handlebars": {
      "version": "4.7.8",
      "resolved": "https://registry.npmjs.org/handlebars/-/handlebars-4.7.8.tgz",
      "integrity": "sha512-vafaFqs8MZkRrSX7sFVUdo3ap/eNiLnb4IakshzvP56X5Nr1iGKAIqdX6tMlm6HcNRIkr6AxO5jFEoJzzpT8aQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.5",
        "neo-async": "^2.6.2",
        "source-map": "^0.6.1",
        "wordwrap": "^1.0.0"
      },
      "bin": {
        "handlebars": "bin/handlebars"
      },
      "engines": {
        "node": ">=0.4.7"
      },
      "optionalDependencies": {
        "uglify-js": "^3.1.4"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/html-escaper": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/html-escaper/-/html-escaper-2.0.2.tgz",
      "integrity": "sha512-H2iMtd0I4Mt5eYiapRdIDjp+XzelXQ0tFE4JS7YFwFevXXMmOp9myNrUvCg0D6ws8iqkRPBfKHgbwig1SmlLfg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/human-signals": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/human-signals/-/human-signals-2.1.0.tgz",
      "integrity": "sha512-B4FFZ6q/T2jhhksgkbEW3HBvWIfDW85snkQgawt07S7J5QXTk6BkNV+0yAeZrM5QpMAdYlocGoljn0sJ/WQkFw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.17.0"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.2.tgz",
      "integrity": "sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/import-local": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/import-local/-/import-local-3.2.0.tgz",
      "integrity": "sha512-2SPlun1JUPWoM6t3F0dw0FkCF/jWY8kttcY4f599GLTSjh2OCuuhdTkJQsEcZzBqbXZGKMK2OqW1oZsjtf/gQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pkg-dir": "^4.2.0",
        "resolve-cwd": "^3.0.0"
      },
      "bin": {
        "import-local-fixture": "fixtures/cli.js"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
      "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-generator-fn": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-generator-fn/-/is-generator-fn-2.1.0.tgz",
      "integrity": "sha512-cTIB4yPYL/Grw0EaSzASzg6bBy9gqCofvWN8okThAYIxKJZC+udlRAmGbM0XLeniEJSs8uEgHPGuHSe1XsOLSQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/is-stream": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-2.0.1.tgz",
      "integrity": "sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/istanbul-lib-coverage": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-3.2.2.tgz",
      "integrity": "sha512-O8dpsF+r0WV/8MNRKfnmrtCWhuKjxrq2w+jpzBL5UZKTi2LeVWnWOmWRxFlesJONmc+wLAGvKQZEOanko0LFTg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/istanbul-lib-instrument": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-6.0.3.tgz",
      "integrity": "sha512-Vtgk7L/R2JHyyGW07spoFlB8/lpjiOLTjMdms6AFMraYt3BaJauod/NGrfnVG/y4Ix1JEuMRPDPEj2ua+zz1/Q==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/core": "^7.23.9",
        "@babel/parser": "^7.23.9",
        "@istanbuljs/schema": "^0.1.3",
        "istanbul-lib-coverage": "^3.2.0",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-lib-instrument/node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-lib-report": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-report/-/istanbul-lib-report-3.0.1.tgz",
      "integrity": "sha512-GCfE1mtsHGOELCU8e/Z7YWzpmybrx/+dSTfLrvY8qRmaY6zXTKWn6WQIjaAFw069icm6GVMNkgu0NzI4iPZUNw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "istanbul-lib-coverage": "^3.0.0",
        "make-dir": "^4.0.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-lib-source-maps": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/istanbul-lib-source-maps/-/istanbul-lib-source-maps-4.0.1.tgz",
      "integrity": "sha512-n3s8EwkdFIJCG3BPKBYvskgXGoy88ARzvegkitk60NxRdwltLOTaH7CUiMRXvwYorl0Q712iEjcWB+fK/MrWVw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "debug": "^4.1.1",
        "istanbul-lib-coverage": "^3.0.0",
        "source-map": "^0.6.1"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/istanbul-reports": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/istanbul-reports/-/istanbul-reports-3.2.0.tgz",
      "integrity": "sha512-HGYWWS/ehqTV3xN10i23tkPkpH46MLCIMFNCaaKNavAXTF1RkqxawEPtnjnGZ6XKSInBKkiOA5BKS+aZiY3AvA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "html-escaper": "^2.0.0",
        "istanbul-lib-report": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/jest": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest/-/jest-29.7.0.tgz",
      "integrity": "sha512-NIy3oAFp9shda19hy4HK0HRTWKtPJmGdnvywu01nOqNC2vZg+Z+fvJDxpMQA88eb2I9EcafcdjYgsDthnYTvGw==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@jest/core": "^29.7.0",
        "@jest/types": "^29.6.3",
        "import-local": "^3.0.2",
        "jest-cli": "^29.7.0"
      },
      "bin": {
        "jest": "bin/jest.js"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "node-notifier": "^8.0.1 || ^9.0.0 || ^10.0.0"
      },
      "peerDependenciesMeta": {
        "node-notifier": {
          "optional": true
        }
      }
    },
    "node_modules/jest-changed-files": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-changed-files/-/jest-changed-files-29.7.0.tgz",
      "integrity": "sha512-fEArFiwf1BpQ+4bXSprcDc3/x4HSzL4al2tozwVpDFpsxALjLYdyiIK4e5Vz66GQJIbXJ82+35PtysofptNX2w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "execa": "^5.0.0",
        "jest-util": "^29.7.0",
        "p-limit": "^3.1.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-circus": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-circus/-/jest-circus-29.7.0.tgz",
      "integrity": "sha512-3E1nCMgipcTkCocFwM90XXQab9bS+GMsjdpmPrlelaxwD93Ad8iVEjX/vvHPdLPnFf+L40u+5+iutRdA1N9myw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/environment": "^29.7.0",
        "@jest/expect": "^29.7.0",
        "@jest/test-result": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "chalk": "^4.0.0",
        "co": "^4.6.0",
        "dedent": "^1.0.0",
        "is-generator-fn": "^2.0.0",
        "jest-each": "^29.7.0",
        "jest-matcher-utils": "^29.7.0",
        "jest-message-util": "^29.7.0",
        "jest-runtime": "^29.7.0",
        "jest-snapshot": "^29.7.0",
        "jest-util": "^29.7.0",
        "p-limit": "^3.1.0",
        "pretty-format": "^29.7.0",
        "pure-rand": "^6.0.0",
        "slash": "^3.0.0",
        "stack-utils": "^2.0.3"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-cli": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-cli/-/jest-cli-29.7.0.tgz",
      "integrity": "sha512-OVVobw2IubN/GSYsxETi+gOe7Ka59EFMR/twOU3Jb2GnKKeMGJB5SGUUrEz3SFVmJASUdZUzy83sLNNQ2gZslg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/core": "^29.7.0",
        "@jest/test-result": "^29.7.0",
        "@jest/types": "^29.6.3",
        "chalk": "^4.0.0",
        "create-jest": "^29.7.0",
        "exit": "^0.1.2",
        "import-local": "^3.0.2",
        "jest-config": "^29.7.0",
        "jest-util": "^29.7.0",
        "jest-validate": "^29.7.0",
        "yargs": "^17.3.1"
      },
      "bin": {
        "jest": "bin/jest.js"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "node-notifier": "^8.0.1 || ^9.0.0 || ^10.0.0"
      },
      "peerDependenciesMeta": {
        "node-notifier": {
          "optional": true
        }
      }
    },
    "node_modules/jest-config": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-config/-/jest-config-29.7.0.tgz",
      "integrity": "sha512-uXbpfeQ7R6TZBqI3/TxCU4q4ttk3u0PJeC+E0zbfSoSjq6bJ7buBPxzQPL0ifrkY4DNu4JUdk0ImlBUYi840eQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.11.6",
        "@jest/test-sequencer": "^29.7.0",
        "@jest/types": "^29.6.3",
        "babel-jest": "^29.7.0",
        "chalk": "^4.0.0",
        "ci-info": "^3.2.0",
        "deepmerge": "^4.2.2",
        "glob": "^7.1.3",
        "graceful-fs": "^4.2.9",
        "jest-circus": "^29.7.0",
        "jest-environment-node": "^29.7.0",
        "jest-get-type": "^29.6.3",
        "jest-regex-util": "^29.6.3",
        "jest-resolve": "^29.7.0",
        "jest-runner": "^29.7.0",
        "jest-util": "^29.7.0",
        "jest-validate": "^29.7.0",
        "micromatch": "^4.0.4",
        "parse-json": "^5.2.0",
        "pretty-format": "^29.7.0",
        "slash": "^3.0.0",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "peerDependencies": {
        "@types/node": "*",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/jest-diff": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-diff/-/jest-diff-29.7.0.tgz",
      "integrity": "sha512-LMIgiIrhigmPrs03JHpxUh2yISK3vLFPkAodPeo0+BuF7wA2FoQbkEg1u8gBYBThncu7e1oEDUfIXVuTqLRUjw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "^4.0.0",
        "diff-sequences": "^29.6.3",
        "jest-get-type": "^29.6.3",
        "pretty-format": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-docblock": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-docblock/-/jest-docblock-29.7.0.tgz",
      "integrity": "sha512-q617Auw3A612guyaFgsbFeYpNP5t2aoUNLwBUbc/0kD1R4t9ixDbyFTHd1nok4epoVFpr7PmeWHrhvuV3XaJ4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "detect-newline": "^3.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-each": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-each/-/jest-each-29.7.0.tgz",
      "integrity": "sha512-gns+Er14+ZrEoC5fhOfYCY1LOHHr0TI+rQUHZS8Ttw2l7gl+80eHc/gFf2Ktkw0+SIACDTeWvpFcv3B04VembQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "chalk": "^4.0.0",
        "jest-get-type": "^29.6.3",
        "jest-util": "^29.7.0",
        "pretty-format": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-environment-node": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-environment-node/-/jest-environment-node-29.7.0.tgz",
      "integrity": "sha512-DOSwCRqXirTOyheM+4d5YZOrWcdu0LNZ87ewUoywbcb2XR4wKgqiG8vNeYwhjFMbEkfju7wx2GYH0P2gevGvFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/environment": "^29.7.0",
        "@jest/fake-timers": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "jest-mock": "^29.7.0",
        "jest-util": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-get-type": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/jest-get-type/-/jest-get-type-29.6.3.tgz",
      "integrity": "sha512-zrteXnqYxfQh7l5FHyL38jL39di8H8rHoecLH3JNxH3BwOrBsNeabdap5e0I23lD4HHI8W5VFBZqG4Eaq5LNcw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-haste-map": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-haste-map/-/jest-haste-map-29.7.0.tgz",
      "integrity": "sha512-fP8u2pyfqx0K1rGn1R9pyE0/KTn+G7PxktWidOBTqFPLYX0b9ksaMFkhK5vrS3DVun09pckLdlx90QthlW7AmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "@types/graceful-fs": "^4.1.3",
        "@types/node": "*",
        "anymatch": "^3.0.3",
        "fb-watchman": "^2.0.0",
        "graceful-fs": "^4.2.9",
        "jest-regex-util": "^29.6.3",
        "jest-util": "^29.7.0",
        "jest-worker": "^29.7.0",
        "micromatch": "^4.0.4",
        "walker": "^1.0.8"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      },
      "optionalDependencies": {
        "fsevents": "^2.3.2"
      }
    },
    "node_modules/jest-leak-detector": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-leak-detector/-/jest-leak-detector-29.7.0.tgz",
      "integrity": "sha512-kYA8IJcSYtST2BY9I+SMC32nDpBT3J2NvWJx8+JCuCdl/CR1I4EKUJROiP8XtCcxqgTTBGJNdbB1A8XRKbTetw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "jest-get-type": "^29.6.3",
        "pretty-format": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-matcher-utils": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-matcher-utils/-/jest-matcher-utils-29.7.0.tgz",
      "integrity": "sha512-sBkD+Xi9DtcChsI3L3u0+N0opgPYnCRPtGcQYrgXmR+hmt/fYfWAL0xRXYU8eWOdfuLgBe0YCW3AFtnRLagq/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "^4.0.0",
        "jest-diff": "^29.7.0",
        "jest-get-type": "^29.6.3",
        "pretty-format": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-message-util": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-message-util/-/jest-message-util-29.7.0.tgz",
      "integrity": "sha512-GBEV4GRADeP+qtB2+6u61stea8mGcOT4mCtrYISZwfu9/ISHFJ/5zOMXYbpBE9RsS5+Gb63DW4FgmnKJ79Kf6w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.12.13",
        "@jest/types": "^29.6.3",
        "@types/stack-utils": "^2.0.0",
        "chalk": "^4.0.0",
        "graceful-fs": "^4.2.9",
        "micromatch": "^4.0.4",
        "pretty-format": "^29.7.0",
        "slash": "^3.0.0",
        "stack-utils": "^2.0.3"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-mock": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-mock/-/jest-mock-29.7.0.tgz",
      "integrity": "sha512-ITOMZn+UkYS4ZFh83xYAOzWStloNzJFO2s8DWrE4lhtGD+AorgnbkiKERe4wQVBydIGPx059g6riW5Btp6Llnw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "jest-util": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-pnp-resolver": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/jest-pnp-resolver/-/jest-pnp-resolver-1.2.3.tgz",
      "integrity": "sha512-+3NpwQEnRoIBtx4fyhblQDPgJI0H1IEIkX7ShLUjPGA7TtUTvI1oiKi3SR4oBR0hQhQR80l4WAe5RrXBwWMA8w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "peerDependencies": {
        "jest-resolve": "*"
      },
      "peerDependenciesMeta": {
        "jest-resolve": {
          "optional": true
        }
      }
    },
    "node_modules/jest-regex-util": {
      "version": "29.6.3",
      "resolved": "https://registry.npmjs.org/jest-regex-util/-/jest-regex-util-29.6.3.tgz",
      "integrity": "sha512-KJJBsRCyyLNWCNBOvZyRDnAIfUiRJ8v+hOBQYGn8gDyF3UegwiP4gwRR3/SDa42g1YbVycTidUF3rKjyLFDWbg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-resolve": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-29.7.0.tgz",
      "integrity": "sha512-IOVhZSrg+UvVAshDSDtHyFCCBUl/Q3AAJv8iZ6ZjnZ74xzvwuzLXid9IIIPgTnY62SJjfuupMKZsZQRsCvxEgA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "^4.0.0",
        "graceful-fs": "^4.2.9",
        "jest-haste-map": "^29.7.0",
        "jest-pnp-resolver": "^1.2.2",
        "jest-util": "^29.7.0",
        "jest-validate": "^29.7.0",
        "resolve": "^1.20.0",
        "resolve.exports": "^2.0.0",
        "slash": "^3.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-resolve-dependencies": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-resolve-dependencies/-/jest-resolve-dependencies-29.7.0.tgz",
      "integrity": "sha512-un0zD/6qxJ+S0et7WxeI3H5XSe9lTBBR7bOHCHXkKR6luG5mwDDlIzVQ0V5cZCuoTgEdcdwzTghYkTWfubi+nA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "jest-regex-util": "^29.6.3",
        "jest-snapshot": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-runner": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-runner/-/jest-runner-29.7.0.tgz",
      "integrity": "sha512-fsc4N6cPCAahybGBfTRcq5wFR6fpLznMg47sY5aDpsoejOcVYFb07AHuSnR0liMcPTgBsA3ZJL6kFOjPdoNipQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/console": "^29.7.0",
        "@jest/environment": "^29.7.0",
        "@jest/test-result": "^29.7.0",
        "@jest/transform": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "chalk": "^4.0.0",
        "emittery": "^0.13.1",
        "graceful-fs": "^4.2.9",
        "jest-docblock": "^29.7.0",
        "jest-environment-node": "^29.7.0",
        "jest-haste-map": "^29.7.0",
        "jest-leak-detector": "^29.7.0",
        "jest-message-util": "^29.7.0",
        "jest-resolve": "^29.7.0",
        "jest-runtime": "^29.7.0",
        "jest-util": "^29.7.0",
        "jest-watcher": "^29.7.0",
        "jest-worker": "^29.7.0",
        "p-limit": "^3.1.0",
        "source-map-support": "0.5.13"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-runtime": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-runtime/-/jest-runtime-29.7.0.tgz",
      "integrity": "sha512-gUnLjgwdGqW7B4LvOIkbKs9WGbn+QLqRQQ9juC6HndeDiezIwhDP+mhMwHWCEcfQ5RUXa6OPnFF8BJh5xegwwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/environment": "^29.7.0",
        "@jest/fake-timers": "^29.7.0",
        "@jest/globals": "^29.7.0",
        "@jest/source-map": "^29.6.3",
        "@jest/test-result": "^29.7.0",
        "@jest/transform": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "chalk": "^4.0.0",
        "cjs-module-lexer": "^1.0.0",
        "collect-v8-coverage": "^1.0.0",
        "glob": "^7.1.3",
        "graceful-fs": "^4.2.9",
        "jest-haste-map": "^29.7.0",
        "jest-message-util": "^29.7.0",
        "jest-mock": "^29.7.0",
        "jest-regex-util": "^29.6.3",
        "jest-resolve": "^29.7.0",
        "jest-snapshot": "^29.7.0",
        "jest-util": "^29.7.0",
        "slash": "^3.0.0",
        "strip-bom": "^4.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-snapshot": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-snapshot/-/jest-snapshot-29.7.0.tgz",
      "integrity": "sha512-Rm0BMWtxBcioHr1/OX5YCP8Uov4riHvKPknOGs804Zg9JGZgmIBkbtlxJC/7Z4msKYVbIJtfU+tKb8xlYNfdkw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.11.6",
        "@babel/generator": "^7.7.2",
        "@babel/plugin-syntax-jsx": "^7.7.2",
        "@babel/plugin-syntax-typescript": "^7.7.2",
        "@babel/types": "^7.3.3",
        "@jest/expect-utils": "^29.7.0",
        "@jest/transform": "^29.7.0",
        "@jest/types": "^29.6.3",
        "babel-preset-current-node-syntax": "^1.0.0",
        "chalk": "^4.0.0",
        "expect": "^29.7.0",
        "graceful-fs": "^4.2.9",
        "jest-diff": "^29.7.0",
        "jest-get-type": "^29.6.3",
        "jest-matcher-utils": "^29.7.0",
        "jest-message-util": "^29.7.0",
        "jest-util": "^29.7.0",
        "natural-compare": "^1.4.0",
        "pretty-format": "^29.7.0",
        "semver": "^7.5.3"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-snapshot/node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/jest-util": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-util/-/jest-util-29.7.0.tgz",
      "integrity": "sha512-z6EbKajIpqGKU56y5KBUgy1dt1ihhQJgWzUlZHArA/+X2ad7Cb5iF+AK1EWVL/Bo7Rz9uurpqw6SiBCefUbCGA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "chalk": "^4.0.0",
        "ci-info": "^3.2.0",
        "graceful-fs": "^4.2.9",
        "picomatch": "^2.2.3"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-validate": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-validate/-/jest-validate-29.7.0.tgz",
      "integrity": "sha512-ZB7wHqaRGVw/9hST/OuFUReG7M8vKeq0/J2egIGLdvjHCmYqGARhzXmtgi+gVeZ5uXFF219aOc3Ls2yLg27tkw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/types": "^29.6.3",
        "camelcase": "^6.2.0",
        "chalk": "^4.0.0",
        "jest-get-type": "^29.6.3",
        "leven": "^3.1.0",
        "pretty-format": "^29.7.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-validate/node_modules/camelcase": {
      "version": "6.3.0",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-6.3.0.tgz",
      "integrity": "sha512-Gmy6FhYlCY7uOElZUSbxo2UCDH8owEk996gkbrpsgGtrJLM3J7jGxl9Ic7Qwwj4ivOE5AWZWRMecDdF7hqGjFA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/jest-watcher": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-watcher/-/jest-watcher-29.7.0.tgz",
      "integrity": "sha512-49Fg7WXkU3Vl2h6LbLtMQ/HyB6rXSIX7SqvBLQmssRBGN9I0PNvPmAmCWSOY6SOvrjhI/F7/bGAv9RtnsPA03g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/test-result": "^29.7.0",
        "@jest/types": "^29.6.3",
        "@types/node": "*",
        "ansi-escapes": "^4.2.1",
        "chalk": "^4.0.0",
        "emittery": "^0.13.1",
        "jest-util": "^29.7.0",
        "string-length": "^4.0.1"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-worker": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-29.7.0.tgz",
      "integrity": "sha512-eIz2msL/EzL9UFTFFx7jBTkeZfku0yUAyZZZmJ93H2TYEiroIx2PQjEXcwYtYl8zXCxb+PAmA2hLIt/6ZEkPHw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "jest-util": "^29.7.0",
        "merge-stream": "^2.0.0",
        "supports-color": "^8.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/jest-worker/node_modules/supports-color": {
      "version": "8.1.1",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
      "integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/supports-color?sponsor=1"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "3.14.2",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.14.2.tgz",
      "integrity": "sha512-PMSmkqxr106Xa156c2M265Z+FTrPl+oxd/rgOQy2tijQeK5TxQ43psO1ZCwhVOSdnn+RzkzlRz/eY4BgJBYVpg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-logic-js": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/json-logic-js/-/json-logic-js-2.0.5.tgz",
      "integrity": "sha512-rTT2+lqcuUmj4DgWfmzupZqQDA64AdmYqizzMPWj3DxGdfFNsxPpcNVSaTj4l8W2tG/+hg7/mQhxjU3aPacO6g==",
      "license": "MIT"
    },
    "node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/kleur": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
      "integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/leven": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/leven/-/leven-3.1.0.tgz",
      "integrity": "sha512-qsda+H8jTaUaN/x5vzW2rzc+8Rw4TAQ/4KjB46IwK5VH+IlVeeeje/EoZRpiXvIqjFgK84QffqPztGI3VBLG1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-5.0.0.tgz",
      "integrity": "sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^4.1.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/lodash.memoize": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/lodash.memoize/-/lodash.memoize-4.1.2.tgz",
      "integrity": "sha512-t7j+NzmgnQzTAYXcsHYLgimltOV1MXHtlOWf6GjL9Kj8GK5FInw5JotxvbOs+IvV1/Dzo04/fCGfLVs7aXb4Ag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/make-dir": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-4.0.0.tgz",
      "integrity": "sha512-hXdUTZYIVOt1Ex//jAQi+wTZZpUpwBj/0QsOzqegb3rGMMeJiSEu5xLHnYfBrRV4RH2+OCSOO95Is/7x1WJ4bw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.5.3"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/make-dir/node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/make-error": {
      "version": "1.3.6",
      "resolved": "https://registry.npmjs.org/make-error/-/make-error-1.3.6.tgz",
      "integrity": "sha512-s8UhlNe7vPKomQhC1qFelMokr/Sc3AgNbso3n74mVPA5LTZwkB9NlXf4XPamLxJE8h0gh73rM94xvwRT2CVInw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/makeerror": {
      "version": "1.0.12",
      "resolved": "https://registry.npmjs.org/makeerror/-/makeerror-1.0.12.tgz",
      "integrity": "sha512-JmqCvUhmt43madlpFzG4BQzG2Z3m6tvQDNKdClZnO3VbIudJYmxsT0FNJMeiB2+JTSlTQTSbU8QdesVmwJcmLg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "tmpl": "1.0.5"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/merge-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
      "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/mimic-fn": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
      "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/neo-async": {
      "version": "2.6.2",
      "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.2.tgz",
      "integrity": "sha512-Yd3UES5mWCSqR+qNT93S3UoYUkqAZ9lLg8a7g9rimsWmYGK8cVToA4/sF3RrshdyV3sAGMXVUmpMYOw+dLpOuw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-int64": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/node-int64/-/node-int64-0.4.0.tgz",
      "integrity": "sha512-O5lz91xSOeoXP6DulyHfllpq+Eg00MWitZIbtPfoSEvqIHdl5gfcY6hYzDWnj0qD5tz52PI08u9qUvSVeUBeHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.27",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.27.tgz",
      "integrity": "sha512-nmh3lCkYZ3grZvqcCH+fjmQ7X+H0OeZgP40OierEaAptX4XofMh5kwNbWh7lBduUzCcV/8kZ+NDLCwm2iorIlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/npm-run-path": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-4.0.1.tgz",
      "integrity": "sha512-S48WzZW777zhNIrn7gxOlISNAqi9ZC/uQFnRdbeIHhZhCA6UqpkOT8T1G7BvfdgP4Er8gF4sUbaS0i7QvIfCWw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/onetime": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz",
      "integrity": "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mimic-fn": "^2.1.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-4.1.0.tgz",
      "integrity": "sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^2.2.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/p-locate/node_modules/p-limit": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
      "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-try": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-try": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
      "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-to-regexp": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.3.0.tgz",
      "integrity": "sha512-7jdwVIRtsP8MYpdXSwOS0YdD0Du+qOoF/AEPIt88PcCFrZCzx41oxku1jD88hZBwbNUIEfpqvuhjFaMAqMTWnA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/pkg-dir": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-4.2.0.tgz",
      "integrity": "sha512-HRDzbaKjC+AOWVXxAU/x54COGeIv9eb+6CkDSQoNTt4XyWoIJvuPsXizxu/Fr23EiekbtZwmh1IcIG/l/a10GQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-up": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pretty-format": {
      "version": "29.7.0",
      "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-29.7.0.tgz",
      "integrity": "sha512-Pdlw/oPxN+aXdmM9R00JVC9WVFoCLTKJvDVLgmJ+qAffBMxsV85l/Lu7sNx4zSzPyoL2euImuEwHhOXdEgNFZQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jest/schemas": "^29.6.3",
        "ansi-styles": "^5.0.0",
        "react-is": "^18.0.0"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || >=18.0.0"
      }
    },
    "node_modules/pretty-format/node_modules/ansi-styles": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-5.2.0.tgz",
      "integrity": "sha512-Cxwpt2SfTzTtXcfOlzGEee8O+c+MmUgGrNiBcXnuWxuFJHe6a5Hz7qwhwe5OgaSYI0IJvkLqWX1ASG+cJOkEiA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/prompts": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/prompts/-/prompts-2.4.2.tgz",
      "integrity": "sha512-NxNv/kLguCA7p3jE8oL2aEBsrJWgAakBpgmgK6lpPWV+WuOmY6r2/zbAVnP+T8bQlA0nzHXSJSJW0Hq7ylaD2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "kleur": "^3.0.3",
        "sisteransi": "^1.0.5"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/pure-rand": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/pure-rand/-/pure-rand-6.1.0.tgz",
      "integrity": "sha512-bVWawvoZoBYpp6yIoQtQXHZjmz35RSVHnUOTefl8Vcjr8snTPY1wnpSPMWekcFwbxI6gtmT7rSYPFvz71ldiOA==",
      "dev": true,
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/dubzzz"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/fast-check"
        }
      ],
      "license": "MIT"
    },
    "node_modules/qs": {
      "version": "6.14.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.1.tgz",
      "integrity": "sha512-4EK3+xJl8Ts67nLYNwqw/dsFVnCf+qR7RgXSK9jEEm9unao3njwMDdmsdvoKBKHzxd7tCYz5e5M+SnMjdtXGQQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/react-is": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz",
      "integrity": "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.11",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.11.tgz",
      "integrity": "sha512-RfqAvLnMl313r7c9oclB1HhUEAezcpLjz95wFH4LVuhk9JF/r22qmVP9AMmOU4vMX7Q8pN8jwNg/CSpdFnMjTQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-cwd": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/resolve-cwd/-/resolve-cwd-3.0.0.tgz",
      "integrity": "sha512-OrZaX2Mb+rJCpH/6CpSqt9xFVpN++x01XnN2ie9g6P5/3xelLAkXWVADpdz1IHD/KFfEXyE6V0U01OQ3UO2rEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "resolve-from": "^5.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/resolve-from": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-5.0.0.tgz",
      "integrity": "sha512-qYg9KP24dD5qka9J47d0aVky0N+b4fTU89LN9iDnjB5waksiC49rvMB0PrUJQGoTmH50XPiqOvAjDfaijGxYZw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/resolve.exports": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/resolve.exports/-/resolve.exports-2.0.3.tgz",
      "integrity": "sha512-OcXjMsGdhL4XnbShKpAcSqPMzQoYkYyhbEaeSko47MjRP9NfEQMhZkXL1DoFlt9LWQn4YttrdnV6X2OiyzBi+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/signal-exit": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/sisteransi": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.5.tgz",
      "integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/slash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-3.0.0.tgz",
      "integrity": "sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-support": {
      "version": "0.5.13",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.13.tgz",
      "integrity": "sha512-SHSKFHadjVA5oR4PPqhtAVdcBWwRYVd6g6cAXnIbRiIwc2EhPrTuKUBdSLvlEKyIP3GCf89fltvcZiP9MMFA1w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      }
    },
    "node_modules/sprintf-js": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
      "integrity": "sha512-D9cPgkvLlV3t3IzL0D0YLvGA9Ahk4PcvVwUbN0dSGr1aP0Nrt4AEnTUbuGvquEC0mA64Gqt1fzirlRs5ibXx8g==",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/stack-utils": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/stack-utils/-/stack-utils-2.0.6.tgz",
      "integrity": "sha512-XlkWvfIm6RmsWtNJx+uqtKLS8eqFbxUg0ZzLXqY0caEy9l7hruX8IpiDnjsLavoBgqCCR71TqWO8MaXYheJ3RQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "escape-string-regexp": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/string-length": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/string-length/-/string-length-4.0.2.tgz",
      "integrity": "sha512-+l6rNN5fYHNhZZy41RXsYptCjA2Igmq4EG7kZAYFQI1E1VTXarr6ZPXBg6eq7Y6eK4FEhY6AJlyuFIb/v/S0VQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "char-regex": "^1.0.2",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-bom": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-4.0.0.tgz",
      "integrity": "sha512-3xurFv5tEgii33Zi8Jtp55wEIILR9eh34FAW00PZf+JnSsTmV/ioewSgQl97JHvgjoRGwPShsWm+IdrxB35d0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-final-newline": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-final-newline/-/strip-final-newline-2.0.0.tgz",
      "integrity": "sha512-BrpvfNAE3dcvq7ll3xVumzjKjZQ5tI1sEUIKr3Uoks0XUl45St3FlatVqef9prk4jRDzhW6WZg+3bk93y6pLjA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/test-exclude": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/test-exclude/-/test-exclude-6.0.0.tgz",
      "integrity": "sha512-cAGWPIyOHU6zlmg88jwm7VRyXnMN7iV68OGAbYDk/Mh/xC/pzVPlQtY6ngoIH/5/tciuhGfvESU8GrHrcxD56w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@istanbuljs/schema": "^0.1.2",
        "glob": "^7.1.4",
        "minimatch": "^3.0.4"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/test-exclude/node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/test-exclude/node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/tmpl": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/tmpl/-/tmpl-1.0.5.tgz",
      "integrity": "sha512-3f0uOEAQwIqGuWW2MVzYg8fV/QNnc/IpuJNG837rLuczAaLVHslWHZQj4IGiEl5Hs3kkbhwL9Ab7Hrsmuj+Smw==",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/ts-jest": {
      "version": "29.4.6",
      "resolved": "https://registry.npmjs.org/ts-jest/-/ts-jest-29.4.6.tgz",
      "integrity": "sha512-fSpWtOO/1AjSNQguk43hb/JCo16oJDnMJf3CdEGNkqsEX3t0KX96xvyX1D7PfLCpVoKu4MfVrqUkFyblYoY4lA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bs-logger": "^0.2.6",
        "fast-json-stable-stringify": "^2.1.0",
        "handlebars": "^4.7.8",
        "json5": "^2.2.3",
        "lodash.memoize": "^4.1.2",
        "make-error": "^1.3.6",
        "semver": "^7.7.3",
        "type-fest": "^4.41.0",
        "yargs-parser": "^21.1.1"
      },
      "bin": {
        "ts-jest": "cli.js"
      },
      "engines": {
        "node": "^14.15.0 || ^16.10.0 || ^18.0.0 || >=20.0.0"
      },
      "peerDependencies": {
        "@babel/core": ">=7.0.0-beta.0 <8",
        "@jest/transform": "^29.0.0 || ^30.0.0",
        "@jest/types": "^29.0.0 || ^30.0.0",
        "babel-jest": "^29.0.0 || ^30.0.0",
        "jest": "^29.0.0 || ^30.0.0",
        "jest-util": "^29.0.0 || ^30.0.0",
        "typescript": ">=4.3 <6"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "@jest/transform": {
          "optional": true
        },
        "@jest/types": {
          "optional": true
        },
        "babel-jest": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jest-util": {
          "optional": true
        }
      }
    },
    "node_modules/ts-jest/node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/ts-jest/node_modules/type-fest": {
      "version": "4.41.0",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.41.0.tgz",
      "integrity": "sha512-TeTSQ6H5YHvpqVwBRcnLDCBnDOHWYu7IvGbHT6N8AOymcr9PJGjc1GTtiWZTYg0NCgYwvnYWEkVChQAr9bjfwA==",
      "dev": true,
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ts-node": {
      "version": "10.9.2",
      "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-10.9.2.tgz",
      "integrity": "sha512-f0FFpIdcHgn8zcPSbf1dRevwt047YMnaiJM3u2w2RewrB+fob/zePZcrOyQoLMMO7aBIddLcQIEK5dYjkLnGrQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@cspotcode/source-map-support": "^0.8.0",
        "@tsconfig/node10": "^1.0.7",
        "@tsconfig/node12": "^1.0.7",
        "@tsconfig/node14": "^1.0.0",
        "@tsconfig/node16": "^1.0.2",
        "acorn": "^8.4.1",
        "acorn-walk": "^8.1.1",
        "arg": "^4.1.0",
        "create-require": "^1.1.0",
        "diff": "^4.0.1",
        "make-error": "^1.1.1",
        "v8-compile-cache-lib": "^3.0.1",
        "yn": "3.1.1"
      },
      "bin": {
        "ts-node": "dist/bin.js",
        "ts-node-cwd": "dist/bin-cwd.js",
        "ts-node-esm": "dist/bin-esm.js",
        "ts-node-script": "dist/bin-script.js",
        "ts-node-transpile-only": "dist/bin-transpile.js",
        "ts-script": "dist/bin-script-deprecated.js"
      },
      "peerDependencies": {
        "@swc/core": ">=1.2.50",
        "@swc/wasm": ">=1.2.50",
        "@types/node": "*",
        "typescript": ">=2.7"
      },
      "peerDependenciesMeta": {
        "@swc/core": {
          "optional": true
        },
        "@swc/wasm": {
          "optional": true
        }
      }
    },
    "node_modules/type-detect": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/type-detect/-/type-detect-4.0.8.tgz",
      "integrity": "sha512-0fr/mIH1dlO+x7TlcMy+bIDqKPsw/70tVyeHW787goQjhmqaZe10uwLujubK9q9Lg6Fiho1KUKDYz0Z7k7g5/g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/type-fest": {
      "version": "0.21.3",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.21.3.tgz",
      "integrity": "sha512-t0rzBq87m3fVcduHDUFhKmyyX+9eo6WQjZvf51Ea/M0Q7+T374Jp1aUiyUl0GKxp8M/OETVHSDvmkyPgvX+X2w==",
      "dev": true,
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/type-is": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^1.0.5",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "peer": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/uglify-js": {
      "version": "3.19.3",
      "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.19.3.tgz",
      "integrity": "sha512-v3Xu+yuwBXisp6QYTcH4UbH+xYJXqnq2m/LtQVWKWzYc1iehYnLixoQDN9FH6/j9/oybfd6W9Ghwkl8+UMKTKQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "optional": true,
      "bin": {
        "uglifyjs": "bin/uglifyjs"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/v8-compile-cache-lib": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/v8-compile-cache-lib/-/v8-compile-cache-lib-3.0.1.tgz",
      "integrity": "sha512-wa7YjyUGfNZngI/vtK0UHAN+lgDCxBPCylVXGp0zu59Fz5aiGtNXaq3DhIov063MorB+VfufLh3JlF2KdTK3xg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/v8-to-istanbul": {
      "version": "9.3.0",
      "resolved": "https://registry.npmjs.org/v8-to-istanbul/-/v8-to-istanbul-9.3.0.tgz",
      "integrity": "sha512-kiGUalWN+rgBJ/1OHZsBtU4rXZOfj/7rKQxULKlIzwzQSvMJUUNgPwJEEh7gU6xEVxC0ahoOBvN2YI8GH6FNgA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@jridgewell/trace-mapping": "^0.3.12",
        "@types/istanbul-lib-coverage": "^2.0.1",
        "convert-source-map": "^2.0.0"
      },
      "engines": {
        "node": ">=10.12.0"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/walker": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/walker/-/walker-1.0.8.tgz",
      "integrity": "sha512-ts/8E8l5b7kY0vlWLewOkDXMmPdLcVV4GmOQLyxuSswIJsweeFZtAsMF7k1Nszz+TYBQrlYRmzOnr398y1JemQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "makeerror": "1.0.12"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/wordwrap": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-1.0.0.tgz",
      "integrity": "sha512-gvVzJFlPycKc5dZN4yPkP8w7Dc37BtP1yczEneOb4uq34pXZcvrtRTmWV8W+Ume+XCxKgbjM+nevkyFPMybd4Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/write-file-atomic": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-4.0.2.tgz",
      "integrity": "sha512-7KxauUdBmSdWnmpaGFg+ppNjKF8uNLry8LyzjauQDOVONfFLNKrKvQOxZ/VuTIcS/gge/YNahf5RIIQWTSarlg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "imurmurhash": "^0.1.4",
        "signal-exit": "^3.0.7"
      },
      "engines": {
        "node": "^12.13.0 || ^14.15.0 || >=16.0.0"
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yaml": {
      "version": "2.8.2",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.8.2.tgz",
      "integrity": "sha512-mplynKqc1C2hTVYxd0PU2xQAc22TI1vShAYGksCCfxbn/dFwnHTNi1bvYsBTkhdUNtGIf5xNOg938rrSSYvS9A==",
      "license": "ISC",
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/eemeli"
      }
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yn": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yn/-/yn-3.1.1.tgz",
      "integrity": "sha512-Ux4ygGWsu2c7isFWe8Yu1YluJmqVhxqK2cLXNQA5AcC3QfbGNpM7fu0Y8b/z16pXLnFxZYvWhd3fhBY9DLmC6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    }
  }
}

````

[⬆ 回到目录](#toc)

## 📄 package.json

````json
{
  "name": "trusted-agent-engine",
  "version": "2.0.0",
  "description": "Trusted AI Agent Governance Engine",
  "author": "Yuangs AI Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yuanguangshan/trusted-agent-engine"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "trusted-diff": "dist/cli.js",
    "trusted-sign": "dist/sign.js"
  },
  "scripts": {
    "test": "jest",
    "build": "tsc",
    "cli": "ts-node src/cli.ts",
    "start-api": "ts-node src/server.ts"
  },
  "dependencies": {
    "express": "^5.2.1",
    "json-logic-js": "^2.0.5",
    "minimatch": "^9.0.3",
    "yaml": "^2.3.4"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/jest": "^29.5.11",
    "@types/json-logic-js": "^2.0.8",
    "@types/node": "^20.10.6",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}

````

[⬆ 回到目录](#toc)

## 📄 scripts/populate_history.ts

````typescript
// scripts/populate_history.ts
import fs from 'fs';
import path from 'path';
import { DecisionTrace } from '../src/engine/types';

const aiDir = path.join(process.cwd(), '.ai');
const ledgerPath = path.join(aiDir, 'ledger.json');

const history: DecisionTrace[] = [];

// 1. 生成 20 条较老的记录 (100% 成功率)
for (let i = 0; i < 20; i++) {
  history.push({
    allowed: true, riskLevel: 'low', actions: [], violations: [], auditLog: '{}',
    outcome: 'applied',
    proposal: {
      id: `old-${i}`, timestamp: Date.now() - (1000 * 60 * 60 * 24), author: 'ai-agent',
      reasoning: 'normal', files: [`src/moduleA/file${i}.ts`], diff: '+content'
    }
  });
}

// 2. 生成 10 条最近的记录 (0% 成功率，涉及多目录，高风险)
for (let i = 0; i < 10; i++) {
  history.push({
    allowed: false, riskLevel: 'high', actions: ['block'], violations: [{ ruleId: 'r', description: 'd', level: 'block' }],
    auditLog: '{}',
    outcome: 'rejected',
    proposal: {
      id: `recent-${i}`, timestamp: Date.now() - (1000 * 60 * i), author: 'ai-agent',
      reasoning: 'suspicious', files: [`src/newDir${i}/secret.env`], diff: '-secret'
    }
  });
}

if (!fs.existsSync(aiDir)) fs.mkdirSync(aiDir, { recursive: true });
fs.writeFileSync(ledgerPath, JSON.stringify(history, null, 2));
console.log('Populated 30 mock history items into .ai/ledger.json');

````

[⬆ 回到目录](#toc)

## 📄 src/cli.ts

````typescript
#!/usr/bin/env node
// src/cli.ts
import { execSync } from 'child_process';
import path from 'path';
import { PolicyEngine } from './engine/evaluator';
import { parseUnifiedDiff } from './engine/diffParser';
import { loadPolicy } from './engine/policyLoader';
import { Proposal, DecisionTrace } from './engine/types';
import { ContextBank } from './engine/contextBank';
import { AssetManager } from './engine/assetManager';
import { SelfAuditor } from './engine/selfAudit';
import fs from 'fs';
import yaml from 'yaml';

async function main() {
  const policyPath = path.join(process.cwd(), 'agent.policy.yaml');
  const pubKeyPath = path.join(process.cwd(), '.ai', 'sovereign.pub');
  let config;
  try {
    const options: any = {};
    if (fs.existsSync(pubKeyPath)) {
      options.publicKey = fs.readFileSync(pubKeyPath, 'utf8');
    }
    config = loadPolicy(policyPath, options);
  } catch (e) {
    console.error(`Error loading policy:`, e instanceof Error ? e.message : e);
    process.exit(1);
  }

  const manifestoPath = path.join(process.cwd(), 'value_manifesto.yaml');
  let manifesto;
  if (fs.existsSync(manifestoPath)) {
    try {
      manifesto = yaml.parse(fs.readFileSync(manifestoPath, 'utf8'));
    } catch (e) {
      console.warn('Warning: Failed to load value_manifesto.yaml, proceeding without it.');
    }
  }

  const engine = new PolicyEngine(config, manifesto, process.cwd());
  const bank = new ContextBank(process.cwd());

  // Get diff from git (staged changes)
  let diff = '';
  try {
    diff = execSync('git diff --cached', { maxBuffer: 10 * 1024 * 1024 }).toString();
    if (!diff) {
      // Fallback to unstaged changes if no staged changes
      diff = execSync('git diff', { maxBuffer: 10 * 1024 * 1024 }).toString();
    }
  } catch (e) {
    console.error('Error running git diff. Is this a git repository?', e instanceof Error ? e.message : e);
    process.exit(1);
  }

  if (!diff) {
    console.log('No changes detected.');
    process.exit(0);
  }

  const analysis = parseUnifiedDiff(diff);
  
  // v1.1 Hardening: 显式区分作者，防止信用系统失真
  const author = process.argv.some(arg => arg === '--author=ai') ? 'ai-agent' : 'human';

  const proposal: Proposal = {
    id: `cli-${Date.now()}`,
    timestamp: Date.now(),
    author: author as any,
    reasoning: 'Changes from local environment.', 
    files: analysis.filesTouched,
    diff: diff
  };

  const decision = engine.evaluate(proposal);

  // Record to ContextBank
  const trace: DecisionTrace = {
    ...decision,
    proposal,
    outcome: decision.allowed ? 'applied' : 'rejected' // Simple logic for CLI
  };
  
  // Await recording and audit (Sprint 3)
  try {
    await bank.record(trace);
    
    // 资产化记忆挖掘 (Sprint 2 - Day 20)
    const history = await bank.getHistory();
    const assetManager = new AssetManager();
    const assets = assetManager.mine(history);
    if (assets.length > 0) {
      console.log('\n--- Governance Insights (Evolved) ---');
      assets.slice(0, 3).forEach(a => {
        console.log(`💡 [${a.type.toUpperCase()}] ${a.description}`);
        console.log(`   Suggestion: ${a.suggestedAction} on "${a.pattern}"`);
      });
      fs.writeFileSync(
        path.join(process.cwd(), '.ai', 'governance_assets.json'),
        JSON.stringify(assets, null, 2)
      );
    }

    // 治理自审 (Sprint 3 - Day 23)
    const selfAuditor = new SelfAuditor();
    const report = selfAuditor.audit(history);
    if (report.findings.length > 0) {
      console.log(`\n--- System Self-Audit (Health: ${report.healthScore}/100) ---`);
      report.findings.forEach(f => {
        console.log(`⚠️ [${f.severity.toUpperCase()}] ${f.type.toUpperCase()}: ${f.message}`);
      });
      fs.writeFileSync(
        path.join(process.cwd(), '.ai', 'audit_report.json'),
        JSON.stringify(report, null, 2)
      );
    }
  } catch (err) {
    console.error('Failed to record trace or run audit:', err);
  }

  console.log('--- Trusted Agent Policy Report ---');
  console.log(`Result: ${decision.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
  console.log(`Risk Level: ${decision.riskLevel.toUpperCase()}`);
  if (decision.valueScore !== undefined) {
    console.log(`Value Score: ${decision.valueScore.toFixed(2)}`);
  }
  
  if (decision.accountability) {
    console.log(`Responsibility: ${decision.accountability.responsibleEntity.toUpperCase()}`);
    console.log(`Signature: ${decision.accountability.signature}`);
    console.log(`Credit Impact: ${decision.accountability.creditImpact}`);
  }
  
  if (decision.violations.length > 0) {
    console.log('\nViolations:');
    decision.violations.forEach((v: any) => {
      console.log(`- [${v.level.toUpperCase()}] ${v.ruleId}: ${v.description}`);
    });
  }

  if (decision.actions.length > 0) {
    console.log(`\nActions matched: ${decision.actions.join(', ')}`);
  }

  if (!decision.allowed) {
    process.exit(1);
  }
}

main();

````

[⬆ 回到目录](#toc)

## 📄 src/engine/anomalyDetector.ts

````typescript
// src/engine/anomalyDetector.ts

import { Proposal, AnomalyReport } from './types';

export class AnomalyDetector {
  /**
   * 执行异常检测逻辑
   * 包含：
   * 1. 规模异常 (Size Variance): 如果单个 diff 超过 1000 行，标记为风险。
   * 2. 复杂度异常 (Chaos/Entropy): 如果 diff 中包含大量非 ASCII 字符或混淆模式。
   * 3. 语义走私 (Smuggling): 如果 diff 包含大量看似无关的小改动。
   */
  detect(proposal: Proposal): AnomalyReport {
    const reasons: string[] = [];
    let score = 0;

    // 1. 规模检测
    const lines = proposal.diff.split('\n').length;
    if (lines > 500) {
      score += 0.4;
      reasons.push(`Unusually large diff (${lines} lines). Potential smuggling.`);
    }

    // 2. 熵分析 (简单混淆检测)
    if (this.detectObfuscation(proposal.diff)) {
      score += 0.6;
      reasons.push('Possible code obfuscation or binary smuggling detected.');
    }

    // 3. 文件分散度
    if (proposal.files.length > 10) {
      score += 0.3;
      reasons.push(`Too many files touched (${proposal.files.length}). High collateral risk.`);
    }

    return {
      isAnomaly: score >= 0.7,
      score: Math.min(1, score),
      reasons
    };
  }

  private detectObfuscation(diff: string): boolean {
    // 检查是否包含大量十六进制或 Base64 样式的长字符串
    const hexPattern = /[0-9a-fA-F]{50,}/;
    const base64Pattern = /[A-Za-z0-9+/]{100,}={0,2}/;
    
    if (hexPattern.test(diff) || base64Pattern.test(diff)) {
      return true;
    }

    // 检查不可见字符 (除了常规空白符)
    const nonAscii = /[^\x00-\x7F]/g;
    const matches = diff.match(nonAscii);
    if (matches && matches.length > 20) {
      return true;
    }

    return false;
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/assetManager.ts

````typescript
// src/engine/assetManager.ts

import { DecisionTrace, GovernanceAsset } from './types';

export class AssetManager {
  /**
   * 将原始追踪转化为治理资产
   * 逻辑：
   * 1. 统计违规高发路径 -> 建议 hardening
   * 2. 统计频繁成功的路径 -> 建议 promotion
   */
  mine(history: DecisionTrace[]): GovernanceAsset[] {
    const assets: GovernanceAsset[] = [];
    const violationMap = new Map<string, number>();
    const successMap = new Map<string, number>();

    for (const trace of history) {
      if (trace.allowed) {
        trace.proposal.files.forEach(f => {
          const dir = this.getDirPattern(f);
          successMap.set(dir, (successMap.get(dir) || 0) + 1);
        });
      } else {
        trace.violations.forEach(v => {
          const key = `${v.ruleId}:${trace.proposal.files.join(',')}`;
          violationMap.set(key, (violationMap.get(key) || 0) + 1);
        });
      }
    }

    // 1. 提取频繁违规 (Threshold: 3次)
    violationMap.forEach((count, key) => {
      if (count >= 3) {
        const [ruleId, files] = key.split(':');
        assets.push({
          id: `asset-harden-${Date.now()}-${assets.length}`,
          type: 'frequent-violation',
          description: `Rule ${ruleId} violated ${count} times on ${files}`,
          evidenceCount: count,
          suggestedAction: 'harden-rule',
          pattern: files
        });
      }
    });

    // 2. 提取频繁成功 (Threshold: 5次)
    successMap.forEach((count, pattern) => {
      if (count >= 5) {
        assets.push({
          id: `asset-promote-${Date.now()}-${assets.length}`,
          type: 'trusted-pattern',
          description: `Pattern ${pattern} successfully applied ${count} times.`,
          evidenceCount: count,
          suggestedAction: 'promote-to-scope',
          pattern
        });
      }
    });

    return assets;
  }

  private getDirPattern(filePath: string): string {
    const parts = filePath.split('/');
    if (parts.length <= 1) return '*';
    return `${parts.slice(0, -1).join('/')}/**`;
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/consensus.ts

````typescript
// src/engine/consensus.ts

import { Vote, ConsensusResult, Decision, PolicyAction } from './types';

export class ConsensusEngine {
  /**
   * 达成共识的主要方法
   * 规则 1：一票否决权 (Veto)。如果任何高权重投票者投了 block，整体结果为 blocked。
   * 规则 2：加权平均。计算允许与拒绝的加权分比例。
   */
  resolve(votes: Vote[]): ConsensusResult {
    if (votes.length === 0) {
      throw new Error('No votes provided for consensus');
    }

    const voters = votes.map(v => v.voterId);
    let isVetoed = false;
    let totalWeight = 0;
    let allowedWeight = 0;

    const allViolations: Decision['violations'] = [];
    const allActions: PolicyAction[] = [];
    let maxRiskLevel: Decision['riskLevel'] = 'low';

    for (const vote of votes) {
      const d = vote.decision;
      totalWeight += vote.weight;

      // 汇总风险等级
      if (this.riskToScore(d.riskLevel) > this.riskToScore(maxRiskLevel)) {
        maxRiskLevel = d.riskLevel;
      }

      // 汇总违规和行动
      allViolations.push(...d.violations);
      allActions.push(...d.actions);

      // 一票否决逻辑
      if (!d.allowed && vote.weight >= 0.5) { // 权重超过 0.5 的 Block 视为否决
        isVetoed = true;
      }

      if (d.allowed) {
        allowedWeight += vote.weight;
      }
    }

    const agreementRate = allowedWeight / totalWeight;
    const finalAllowed = !isVetoed && agreementRate > 0.6; // 必须无否决且加权通过率 > 60%

    // 合并后的决策
    const finalDecision: Decision = {
      allowed: finalAllowed,
      riskLevel: maxRiskLevel,
      actions: Array.from(new Set(allActions)),
      violations: this.uniqueViolations(allViolations),
      valueScore: votes.reduce((acc, v) => acc + (v.decision.valueScore || 0) * v.weight, 0) / totalWeight,
      auditLog: `Consensus reached by ${votes.length} voters. Rate: ${agreementRate.toFixed(2)}`
    };

    return {
      finalDecision,
      agreementRate,
      isVetoed,
      voters
    };
  }

  private riskToScore(level: Decision['riskLevel']): number {
    switch (level) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }

  private uniqueViolations(violations: Decision['violations']): Decision['violations'] {
    const seen = new Set();
    return violations.filter(v => {
      const key = `${v.ruleId}-${v.level}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/contextBank.ts

````typescript
// src/engine/contextBank.ts

import fs from 'fs';
import path from 'path';
import { DecisionTrace } from './types';

export class ContextBank {
  private storagePath: string;

  constructor(workspaceRoot: string) {
    this.storagePath = path.join(workspaceRoot, '.ai', 'ledger.jsonl'); // v1.1: 切换到 JSONL (Append-only)
    this.ensureStorageExists();
  }

  private ensureStorageExists() {
    const dir = path.dirname(this.storagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.storagePath)) {
      fs.writeFileSync(this.storagePath, ''); // 初始为空文件
    }
  }

  /**
   * 记录一次决策追踪 (Append-only)
   */
  async record(trace: DecisionTrace): Promise<void> {
    const logEntry = JSON.stringify(trace) + '\n';
    // v1.1: 直接追加到文件末尾，不再读取全量
    fs.appendFileSync(this.storagePath, logEntry);
  }

  /**
   * 检索历史决策 (Stream Parsing)
   */
  async getHistory(): Promise<DecisionTrace[]> {
    if (!fs.existsSync(this.storagePath)) return [];
    
    const content = fs.readFileSync(this.storagePath, 'utf8');
    const lines = content.trim().split('\n').filter(l => l.length > 0);
    
    // 解析每一行 JSON，并保持最新的在前面
    return lines.map(line => JSON.parse(line)).reverse();
  }

  /**
   * 统计最近的成功率
   */
  async getSuccessRate(): Promise<number> {
    const ledger = await this.getHistory();
    // 只取最近 1000 条
    const recent = ledger.slice(0, 1000);
    if (recent.length === 0) return 1;
    
    const applied = recent.filter(t => t.outcome === 'applied').length;
    return applied / recent.length;
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/diffParser.ts

````typescript
// src/engine/diffParser.ts

export interface DiffAnalysis {
  filesTouched: string[];
  additions: number;
  deletions: number;
  hunks: number;
}

/**
 * Parse unified diff and extract factual change data
 * Design Principles:
 * 1. Robustness: Handle standard git diff headers
 * 2. Independence: No git CLI dependency
 * 3. Accuracy: Distinguish between file headers and content changes
 */
export function parseUnifiedDiff(diff: string): DiffAnalysis {
  const files = new Set<string>();
  let additions = 0;
  let deletions = 0;
  let hunks = 0;

  const lines = diff.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]; // DON'T trim here yet, we need the first character to be exact

    // 1. diff --git header
    if (line.startsWith('diff --git ')) {
      const parts = line.split(' ');
      const bPath = parts[parts.length - 1]; // b/path
      if (bPath.startsWith('b/')) {
        files.add(bPath.substring(2));
      }
      continue;
    }

    // 2. --- and +++ headers
    if (line.startsWith('--- ') || line.startsWith('+++ ')) {
      const pathPart = line.substring(4).trim();
      if (pathPart.startsWith('a/') || pathPart.startsWith('b/')) {
        files.add(pathPart.substring(2));
      } else if (pathPart !== '/dev/null' && pathPart !== '') {
        files.add(pathPart);
      }
      continue;
    }

    // Support for 4+ pluses/minuses (sometimes LLMs do this)
    if (line.startsWith('----') || line.startsWith('++++')) {
      continue;
    }

    // 3. Hunk header
    if (line.startsWith('@@')) {
      hunks++;
      continue;
    }

    // 4. Content stats
    // Skip any header-like lines just in case
    if (line.startsWith('---') || line.startsWith('+++') || line.startsWith('diff --git')) {
      continue;
    }

    if (line.startsWith('+')) {
      additions++;
    } else if (line.startsWith('-')) {
      deletions++;
    }
  }

  return {
    filesTouched: Array.from(files),
    additions,
    deletions,
    hunks,
  };
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/evaluator.ts

````typescript
// src/engine/evaluator.ts

import { Proposal, PolicyConfig, Decision, PolicyAction, ValueManifesto } from './types';
import { minimatch } from 'minimatch';
import { LiabilityManager } from './liabilityManager';
import { AnomalyDetector } from './anomalyDetector';
import { SafeEvaluator } from './safeEvaluator';

export class PolicyEngine {
  private policy: PolicyConfig;
  private manifesto?: ValueManifesto;
  private liability?: LiabilityManager;
  private anomalyDetector: AnomalyDetector;

  constructor(policy: PolicyConfig, manifesto?: ValueManifesto, workspaceRoot?: string) {
    this.policy = policy;
    this.manifesto = manifesto;
    this.anomalyDetector = new AnomalyDetector();
    if (workspaceRoot) {
      this.liability = new LiabilityManager(workspaceRoot);
    }
  }

  evaluate(proposal: Proposal): Decision {
    let violations: Decision['violations'] = [];
    let actions: PolicyAction[] = [];

    // -----------------------------
    // 1. Signals Preparation（信号准备）
    // -----------------------------
    let riskLevel: Decision['riskLevel'] = 'low';
    for (const risk of this.policy.risks) {
      for (const pattern of risk.match) {
        if (proposal.files.some(file => minimatch(file, pattern))) {
          riskLevel = risk.level;
        }
      }
    }

    const anomalyReport = this.anomalyDetector.detect(proposal);
    const evaluationContext = {
      payload: proposal,
      engine: {
        riskLevel,
        isAnomaly: anomalyReport.isAnomaly,
        anomalyScore: anomalyReport.score,
        isOnlyDocs: proposal.files.every(f => f.endsWith('.md') || f.startsWith('docs/')),
        isScoped: this.isWithinScope(proposal.files),
      },
      anomaly: anomalyReport // v1.1: 别名为 anomaly 方便访问
    };

    // -----------------------------
    // 2. Rule Evaluation（规则引擎 - 基于信号）
    // -----------------------------
    for (const rule of this.policy.rules) {
      // condition: 如果满足，则执行 action
      if (rule.condition) {
        if (SafeEvaluator.evaluate(rule.condition, evaluationContext)) {
          this.applyRuleAction(rule, actions, violations);
        }
      }

      // check: 如果不满足，则执行 action
      if (rule.check) {
        if (!SafeEvaluator.evaluate(rule.check, evaluationContext)) {
          this.applyRuleAction(rule, actions, violations);
        }
      }
    }

    // -----------------------------
    // 3. Value & Mercy (Day 16)
    // -----------------------------
    let valueScore = 1.0;
    if (this.manifesto) {
      // 计算价值得分（根据规则绑定的价值）
      violations = violations.map(v => {
        const rule = this.policy.rules.find(r => r.id === v.ruleId);
        if (rule?.valueId) {
          const value = this.manifesto?.values.find(val => val.id === rule.valueId);
          if (value) {
            v.valueWeight = value.weight;
            valueScore -= (value.weight * 0.2);
          }
        }
        return v;
      });

      // 仁慈钩子处理（依然使用 SafeEvaluator）
      for (const hook of this.manifesto.mercy_hooks) {
        if (SafeEvaluator.evaluate(hook.condition, evaluationContext)) {
          if (hook.action === 'downgrade_to_warn') {
            actions = actions.map(a => (a === 'block' || a === 'require_human') ? 'warn' : a as PolicyAction);
            violations = violations.map(v => ({ ...v, level: 'warn' }));
          } else if (hook.action === 'auto_allow') {
            actions = [];
            violations = [];
            break;
          }
        }
      }
    }

    // -----------------------------
    // 4. Final Decision（裁决合成）
    // -----------------------------
    const isHardBlocked = actions.includes('block');
    const requiresHuman = actions.includes('require_human');

    const decision: Decision = {
      allowed: !isHardBlocked && !requiresHuman, // 机器不可直接执行
      requiresHuman,
      riskLevel,
      actions,
      violations,
      valueScore: Math.max(0, valueScore),
      anomalyReport,
      auditLog: '',
    };

    if (this.liability) {
      decision.accountability = {
        responsibleEntity: this.liability.attribute(decision),
        signature: this.liability.generateSignature(proposal, decision),
        creditImpact: this.liability.calculateCreditImpact(decision),
      };
      // v1.1: 只有非系统故障才更新信用
      if (decision.accountability.responsibleEntity !== 'system-fault') {
        this.liability.updateCredits(decision.accountability.creditImpact);
      }
    }

    decision.auditLog = this.buildAuditLog(proposal, actions, violations);

    // v1.1 Hardening: 共识引擎接入点 - 诚实模式 (Fail-fast)
    if (this.policy.requiresConsensus) {
      throw new Error(
        'Policy requires consensus, but consensus enforcement (ConsensusEngine) is not yet active in v1.1. ' +
        'Please disable requiresConsensus in policy or implement real consensus flow.'
      );
    }

    return decision;
  }

  private applyRuleAction(rule: any, actions: PolicyAction[], violations: Decision['violations']) {
    const HIGH_RISK_ACTIONS = ['block', 'require_human'];

    // v1.1 Hardening: 强制检查 Policy 是否拥有执行高危动作的特权
    if (
      HIGH_RISK_ACTIONS.includes(rule.action) &&
      !this.policy.meta?.privileges?.includes('high-risk-decision')
    ) {
      violations.push({
        ruleId: 'privilege-violation',
        description: `Policy rule "${rule.id}" lacks privilege for action: ${rule.action}. Meta privileges must include "high-risk-decision".`,
        level: 'block'
      });
      actions.push('block'); // 权限不足时强制拦截
      return;
    }

    actions.push(rule.action);

    const level = (rule.action === 'block' || rule.action === 'require_human') ? 'block' : 'warn';
    violations.push({
      ruleId: rule.id,
      description: rule.description || rule.id,
      level,
    });
  }

  // -----------------------------
  // Scope Enforcement
  // -----------------------------
  private isWithinScope(files: string[]): boolean {
    const allowedPatterns = this.policy.scopes.flatMap(s => s.allow);

    return files.every(file =>
      allowedPatterns.some(pattern => minimatch(file, pattern))
    );
  }


  // -----------------------------
  // Audit Log
  // -----------------------------
  private buildAuditLog(
    proposal: Proposal,
    actions: PolicyAction[],
    violations: Decision['violations']
  ): string {
    return JSON.stringify(
      {
        proposalId: proposal.id,
        timestamp: proposal.timestamp,
        actions,
        violations,
      },
      null,
      2
    );
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/liabilityManager.ts

````typescript
// src/engine/liabilityManager.ts

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Proposal, Decision, Accountability } from './types';

export class LiabilityManager {
  private ledgerPath: string;

  constructor(workspaceRoot: string) {
    this.ledgerPath = path.join(workspaceRoot, '.ai', 'credits.json');
    this.ensureStorageExists();
  }

  private ensureStorageExists() {
    const dir = path.dirname(this.ledgerPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.ledgerPath)) {
      fs.writeFileSync(this.ledgerPath, JSON.stringify({ agentCredits: 100 }, null, 2));
    }
  }

  /**
   * 计算决策指纹
   */
  generateSignature(proposal: Proposal, decision: Partial<Decision>): string {
    const data = JSON.stringify({
      p: proposal.id,
      f: proposal.files,
      v: decision.violations?.map(v => v.ruleId),
      a: decision.allowed
    });
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
  }

  /**
   * 判定责任实体
   */
  attribute(decision: Partial<Decision>): 'ai-agent' | 'human-approver' | 'policy-author' | 'system-fault' {
    // 逻辑漏洞检测：如果没有明确违反规则却被拦截了，归类为系统故障或策略设计缺陷
    if (decision.allowed === false && (!decision.violations || decision.violations.length === 0)) {
       // v1.1 Hardening: 如果只是异常检测拦截（没有明确规则），归类为 policy-author（没说怎么处理该信号）
       if (decision.anomalyReport?.isAnomaly) {
         return 'policy-author';
       }
       return 'system-fault';
    }

    if (decision.allowed === false) {
      if (decision.actions?.includes('require_human')) {
        return 'human-approver';
      }
      return 'ai-agent';
    }
    
    // 如果放行了但有警告，可能是策略定义者的边界问题
    if (decision.violations && decision.violations.length > 0) {
      return 'policy-author';
    }
    return 'ai-agent';
  }

  /**
   * 计算信用影响
   */
  calculateCreditImpact(decision: Partial<Decision>): number {
    if (decision.allowed) return 1; // 成功提案加 1 分
    if (decision.riskLevel === 'high') return -10; // 触碰高危被拦截扣 10 分
    return -2; // 普通拦截扣 2 分
  }

  async updateCredits(impact: number): Promise<number> {
    const data = JSON.parse(fs.readFileSync(this.ledgerPath, 'utf8'));
    data.agentCredits += impact;
    fs.writeFileSync(this.ledgerPath, JSON.stringify(data, null, 2));
    return data.agentCredits;
  }

  getCredits(): number {
    const data = JSON.parse(fs.readFileSync(this.ledgerPath, 'utf8'));
    return data.agentCredits;
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/policyLoader.ts

````typescript
// src/engine/policyLoader.ts
import fs from 'fs';
import yaml from 'yaml';
import { PolicyConfig } from './types';
import { SovereignManager } from './sovereign';

export function loadPolicy(path: string, options?: { publicKey?: string, signaturePath?: string }): PolicyConfig {
  const content = fs.readFileSync(path, 'utf8');

  if (options?.publicKey) {
    const sigPath = options.signaturePath || `${path}.sig`;
    if (!fs.existsSync(sigPath)) {
      throw new Error(`Policy signature missing at ${sigPath}. Sovereign requirement not met.`);
    }
    const signature = fs.readFileSync(sigPath, 'utf8').trim();
    const isValid = SovereignManager.verifyPolicy(content, signature, options.publicKey);
    if (!isValid) {
      throw new Error('Policy signature verification failed. Unauthorized policy modification detected!');
    }
  }

  return yaml.parse(content) as PolicyConfig;
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/safeEvaluator.ts

````typescript
// src/engine/safeEvaluator.ts

import jsonLogic from 'json-logic-js';

/**
 * v1.1 Safe Evaluator
 * 彻底移除 new Function，改用 JSON Logic。
 * 它可以防止 RCE 攻击，并且可以被静态审计。
 */
export class SafeEvaluator {
  /**
   * 执行表达式评估
   * @param expression JSON Logic 规则对象
   * @param context 数据上下文
   */
  static evaluate(expression: any, context: Record<string, any>): boolean {
    if (typeof expression === 'string') {
      // v1.1 Hardening: 彻底禁用字符串表达式，消除 RCE 后门
      throw new Error(
        `[Governance Critical] String-based policy conditions are disabled in v1.1 for security. ` +
        `Detected unsafe condition: "${expression}". Please migrate to JSON Logic.`
      );
    }

    try {
      return Boolean(jsonLogic.apply(expression, context));
    } catch (e) {
      console.error(`[Governance Error] Failed to evaluate JSON Logic:`, e);
      return false;
    }
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/selfAudit.ts

````typescript
// src/engine/selfAudit.ts

import { DecisionTrace, SelfAuditReport } from './types';

export class SelfAuditor {
  /**
   * 执行治理自审
   * 目标：检测长期运行中的隐性风险
   */
  audit(history: DecisionTrace[]): SelfAuditReport {
    const findings: SelfAuditReport['findings'] = [];
    let healthScore = 100;

    if (history.length < 5) {
      return { timestamp: Date.now(), healthScore, findings };
    }

    // 1. 成功率飘移检测 (Policy Drift)
    const recent = history.slice(0, 10);
    const older = history.slice(10, 30);
    
    if (older.length > 5) {
      const recentRate = recent.filter(t => t.allowed).length / recent.length;
      const olderRate = older.filter(t => t.allowed).length / older.length;

      if (Math.abs(recentRate - olderRate) > 0.4) {
        healthScore -= 20;
        findings.push({
          severity: 'medium',
          type: 'policy-drift',
          message: `Decision pattern alignment shifted significantly: ${recentRate.toFixed(2)} vs ${olderRate.toFixed(2)}`
        });
      }
    }

    // 2. 权限蔓延检测 (Permission Creep)
    const touchedDirs = new Set<string>();
    history.forEach(t => t.proposal.files.forEach(f => touchedDirs.add(this.getTopDir(f))));
    
    if (touchedDirs.size > 15) {
      healthScore -= 15;
      findings.push({
        severity: 'low',
        type: 'permission-creep',
        message: `Agent is interacting with a wide variety of directories (${touchedDirs.size}). Review scope boundaries.`
      });
    }

    // 3. 高风险累积 (Risk Accumulation)
    const highRiskCount = history.filter(t => t.riskLevel === 'high').length;
    if (highRiskCount / history.length > 0.3) {
      healthScore -= 30;
      findings.push({
        severity: 'high',
        type: 'risk-accumulation',
        message: `High percentage of high-risk operations (${(highRiskCount / history.length * 100).toFixed(1)}%). System is under strain.`
      });
    }

    return {
      timestamp: Date.now(),
      healthScore: Math.max(0, healthScore),
      findings
    };
  }

  private getTopDir(filePath: string): string {
    return filePath.split('/')[0] || '.';
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/sovereign.ts

````typescript
// src/engine/sovereign.ts
import crypto from 'crypto';

export class SovereignManager {
  /**
   * 生成主权密钥对
   */
  static generateKeyPair() {
    return crypto.generateKeyPairSync('ed25519', {
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
  }

  /**
   * 签名政策内容
   */
  static signPolicy(content: string, privateKey: string): string {
    return crypto.sign(null, Buffer.from(content), privateKey).toString('base64');
  }

  /**
   * 校验政策签名
   */
  static verifyPolicy(content: string, signature: string, publicKey: string): boolean {
    try {
      return crypto.verify(null, Buffer.from(content), publicKey, Buffer.from(signature, 'base64'));
    } catch (e) {
      return false;
    }
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/engine/types.ts

````typescript
// src/engine/types.ts

// 1. 输入：AI 的提案
export interface Proposal {
  id: string;
  timestamp: number;
  author: 'ai-agent' | 'human'; // v1.1 Fix: 支持人类作者
  
  // 核心载荷
  reasoning: string;     // AI 必须解释为什么改
  files: string[];       // 涉及的文件列表
  diff: string;          // Unified Diff 格式
  
  // 元数据（可扩展）
  tags?: string[];
}

// 2. 配置：加载进来的 Policy
export interface PolicyConfig {
  meta: { 
    mode: 'strict' | 'monitor';
    privileges?: string[]; // v1.1: 明确声明规则拥有的特权
  };
  scopes: Array<{ id: string; allow: string[] }>;
  risks: Array<{ id: string; level: 'low' | 'medium' | 'high'; match: string[] }>;
  rules: Array<{ 
    id: string; 
    check?: any;      // v1.1: 支持 JSON Logic 对象
    condition?: any;  // v1.1: 支持 JSON Logic 对象
    action: PolicyAction; 
    description: string; 
    valueId?: string 
  }>;
  requiresConsensus?: boolean; // v1.1: 是否需要多方共识
}

export interface ValueManifesto {
  values: Array<{ id: string; weight: number; description: string }>;
  mercy_hooks: Array<{ id: string; condition: any; action: string; description: string }>;
}

export interface Accountability {
  responsibleEntity: 'ai-agent' | 'human-approver' | 'policy-author' | 'system-fault';
  signature: string;        // 决策指纹
  creditImpact: number;     // 对信用池的影响
}

export interface Vote {
  voterId: string;
  decision: Decision;
  weight: number; 
}

export interface ConsensusResult {
  finalDecision: Decision;
  agreementRate: number;    
  isVetoed: boolean;        
  voters: string[];
}

export interface AnomalyReport {
  isAnomaly: boolean;
  score: number; // 0-1, higher is more suspicious
  reasons: string[];
}

export interface GovernanceAsset {
  id: string;
  type: 'frequent-violation' | 'trusted-pattern';
  description: string;
  evidenceCount: number;
  suggestedAction?: 'promote-to-scope' | 'harden-rule';
  pattern: string;
}

export interface SelfAuditReport {
  timestamp: number;
  healthScore: number; // 0-100
  findings: Array<{
    severity: 'low' | 'medium' | 'high';
    type: 'policy-drift' | 'permission-creep' | 'risk-accumulation';
    message: string;
  }>;
}

export type PolicyAction = 'allow' | 'warn' | 'block' | 'require_human';

// 3. 输出：引擎的判决 (这是最关键的结构)
export interface Decision {
  allowed: boolean;      // 机器是否可直接执行
  requiresHuman: boolean; // v1.1: 是否需要人工审批
  riskLevel: 'low' | 'medium' | 'high';
  
  // 判决详情
  actions: PolicyAction[];
  
  // 违规追溯 (Traceability)
  violations: Array<{
    ruleId: string;
    description: string;
    level: 'warn' | 'block';
    valueWeight?: number; // 关联的价值权重
  }>;

  // 综合评分 (Sprint 2)
  valueScore?: number; 
  
  // 责任归属 (Day 17)
  accountability?: Accountability;

  // 异常报告 (Day 19)
  anomalyReport?: AnomalyReport;

  // 审计日志 (存入 Context Bank)
  auditLog: string; 
}

// Sprint 2: 资产化与记忆
export interface DecisionTrace extends Decision {
  proposal: Proposal;
  outcome: 'applied' | 'rejected' | 'pending'; // 最终的执行状态
}
// test change

````

[⬆ 回到目录](#toc)

## 📄 src/index.ts

````typescript
// src/index.ts

import { PolicyEngine } from './engine/evaluator';
import { loadPolicy } from './engine/policyLoader';
import { Proposal, Decision, ValueManifesto } from './engine/types';
import { ContextBank } from './engine/contextBank';
import { SovereignManager } from './engine/sovereign';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

// Re-export core types
export * from './engine/types';
export { PolicyEngine } from './engine/evaluator';
export { loadPolicy } from './engine/policyLoader';
export { SovereignManager } from './engine/sovereign';
export { parseUnifiedDiff } from './engine/diffParser';
export { ContextBank } from './engine/contextBank';
export { AssetManager } from './engine/assetManager';
export { AnomalyDetector } from './engine/anomalyDetector';
export { SelfAuditor } from './engine/selfAudit';

/**
 * TrustedGuard - 高层集成封装
 * 为其他本地项目提供“零配置”快速治理能力
 */
export class TrustedGuard {
  /**
   * 一键决策检查
   * @param workspaceRoot 项目根目录
   * @param proposal 变更提案
   */
  static async evaluate(workspaceRoot: string, proposal: Proposal): Promise<Decision> {
    const policyPath = path.join(workspaceRoot, 'agent.policy.yaml');
    const manifestoPath = path.join(workspaceRoot, 'value_manifesto.yaml');
    const pubKeyPath = path.join(workspaceRoot, '.ai', 'sovereign.pub');

    // 1. 加载主权公钥 (如果存在)
    let publicKey: string | undefined;
    if (fs.existsSync(pubKeyPath)) {
      publicKey = fs.readFileSync(pubKeyPath, 'utf8');
    }

    // 2. 加载政策 (带签名校验)
    const config = loadPolicy(policyPath, { publicKey });

    // 3. 加载价值观 (可选)
    let manifesto: ValueManifesto | undefined;
    if (fs.existsSync(manifestoPath)) {
      manifesto = yaml.parse(fs.readFileSync(manifestoPath, 'utf8'));
    }

    // 4. 执行评估
    const engine = new PolicyEngine(config, manifesto, workspaceRoot);
    const decision = engine.evaluate(proposal);

    // 5. 异步记录审计日志
    const bank = new ContextBank(workspaceRoot);
    bank.record({
      ...decision,
      proposal,
      outcome: decision.allowed ? 'applied' : 'rejected'
    }).catch(err => console.error('[TrustedGuard] Failed to record trace:', err));

    return decision;
  }
}

````

[⬆ 回到目录](#toc)

## 📄 src/server.ts

````typescript
// src/server.ts
import express from 'express';
import { TrustedGuard } from './index';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * Health Check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', engine: 'trusted-agent-engine', version: '1.0.0' });
});

/**
 * POST /v1/evaluate
 *Body: {
 *  workspaceRoot: string,
 *  proposal: Proposal
 *}
 */
app.post('/v1/evaluate', async (req, res) => {
  try {
    const { workspaceRoot, proposal } = req.body;

    if (!workspaceRoot || !proposal) {
      return res.status(400).json({ error: 'Missing workspaceRoot or proposal in request body' });
    }

    // 执行审计
    const decision = await TrustedGuard.evaluate(workspaceRoot, proposal);

    res.json(decision);
  } catch (error: any) {
    console.error('[API] Evaluation failed:', error);
    res.status(500).json({ 
      error: 'Governance evaluation failed', 
      message: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🛡️ Trusted Governance API active on http://localhost:${port}`);
  console.log(`Endpoint: POST /v1/evaluate`);
});

````

[⬆ 回到目录](#toc)

## 📄 src/sign.ts

````typescript
// src/sign.ts
import fs from 'fs';
import path from 'path';
import { SovereignManager } from './engine/sovereign';

function main() {
  const command = process.argv[2];
  const aiDir = path.join(process.cwd(), '.ai');
  if (!fs.existsSync(aiDir)) fs.mkdirSync(aiDir, { recursive: true });

  const privKeyPath = path.join(aiDir, 'sovereign.key');
  const pubKeyPath = path.join(aiDir, 'sovereign.pub');

  if (command === 'init') {
    const { publicKey, privateKey } = SovereignManager.generateKeyPair();
    fs.writeFileSync(privKeyPath, privateKey);
    fs.writeFileSync(pubKeyPath, publicKey);
    console.log('Sovereign keys generated in .ai/');
  } else if (command === 'sign') {
    const policyPath = process.argv[3] || 'agent.policy.yaml';
    if (!fs.existsSync(privKeyPath)) {
      console.error('Private key not found. Run init first.');
      process.exit(1);
    }
    const privateKey = fs.readFileSync(privKeyPath, 'utf8');
    const content = fs.readFileSync(policyPath, 'utf8');
    const sig = SovereignManager.signPolicy(content, privateKey);
    fs.writeFileSync(`${policyPath}.sig`, sig);
    console.log(`Signed ${policyPath}. Signature saved to ${policyPath}.sig`);
  } else {
    console.log('Usage: ts-node src/sign.ts <init|sign [policy_path]>');
  }
}

main();

````

[⬆ 回到目录](#toc)

## 📄 tests/accountability.test.ts

````typescript
// tests/accountability.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig } from '../src/engine/types';
import fs from 'fs';
import path from 'path';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [{ id: 'src', allow: ['src/**'] }],
  risks: [{ id: 'infra', level: 'high', match: ['**/.env*'] }],
  rules: [
    {
      id: 'no-infra',
      condition: "engine.riskLevel == 'high'",
      action: 'block',
      description: 'Blocking infra'
    }
  ]
};

describe('Accountability Logic (Day 17)', () => {
  const workspaceRoot = path.join(__dirname, 'tmp_ws');
  
  beforeAll(() => {
    if (!fs.existsSync(workspaceRoot)) fs.mkdirSync(workspaceRoot, { recursive: true });
  });

  afterAll(() => {
    if (fs.existsSync(workspaceRoot)) fs.rmSync(workspaceRoot, { recursive: true });
  });

  test('Should assign responsibility and track credits', () => {
    const engine = new PolicyEngine(mockPolicy, undefined, workspaceRoot);
    
    // 场景：正常提案
    const p1: Proposal = {
      id: 'p1', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Good reasoning here', files: ['src/main.ts'], diff: '+log'
    };
    const d1 = engine.evaluate(p1);
    expect(d1.accountability?.responsibleEntity).toBe('ai-agent');
    expect(d1.accountability?.creditImpact).toBe(1);

    // 场景：被拦截的高危操作
    const p2: Proposal = {
      id: 'p2', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Bad reasoning', files: ['.env'], diff: '-secret'
    };
    const d2 = engine.evaluate(p2);
    expect(d2.accountability?.responsibleEntity).toBe('ai-agent');
    expect(d2.accountability?.creditImpact).toBe(-10);
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/anomaly.test.ts

````typescript
// tests/anomaly.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig } from '../src/engine/types';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [{ id: 'src', allow: ['src/**'] }],
  risks: [],
  rules: []
};

describe('Anomaly Detection (Day 19)', () => {
  const engine = new PolicyEngine(mockPolicy);

  test('Should detect multi-factor anomaly (Large + Many Files)', () => {
    const largeDiff = 'line\n'.repeat(600);
    const files = Array.from({ length: 11 }, (_, i) => `src/file${i}.ts`);
    const proposal: Proposal = {
      id: 'a1', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Massive change', files: files, diff: largeDiff
    };
    const decision = engine.evaluate(proposal);
    // 0.4 (large) + 0.3 (files) = 0.7
    expect(decision.allowed).toBe(false);
    expect(decision.anomalyReport?.score).toBeGreaterThanOrEqual(0.7);
  });

  test('Should detect high-score anomaly (Obfuscation + Large)', () => {
    const suspiciousDiff = 'const x = "68656c6c6f20776f726c6420746869732069732061206c6f6e672068657820737472696e6720746f2074657374206f62667573636174696f6e20646574656374696f6e";\n' + 'line\n'.repeat(600);
    const proposal: Proposal = {
      id: 'a2', timestamp: Date.now(), author: 'ai-agent',
      reasoning: 'Secret stuff', files: ['src/secret.ts'], diff: suspiciousDiff
    };
    const decision = engine.evaluate(proposal);
    // 0.6 (obfuscation) + 0.4 (large) = 1.0
    expect(decision.allowed).toBe(false);
    expect(decision.anomalyReport?.score).toBe(1);
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/asset_manager.test.ts

````typescript
// tests/asset_manager.test.ts
import { AssetManager } from '../src/engine/assetManager';
import { DecisionTrace, Proposal } from '../src/engine/types';

describe('Asset Manager (Day 20)', () => {
  const manager = new AssetManager();

  const mockTrace = (allowed: boolean, files: string[], rules: string[] = []): DecisionTrace => ({
    allowed,
    riskLevel: 'low',
    actions: allowed ? [] : ['block'],
    violations: rules.map(r => ({ ruleId: r, description: r, level: 'block' })),
    auditLog: 'mock',
    outcome: allowed ? 'applied' : 'rejected',
    proposal: {
      id: 'p', timestamp: 0, author: 'ai-agent', reasoning: 'r',
      files, diff: 'd'
    }
  });

  test('Should suggest promotion for frequent successes', () => {
    const history: DecisionTrace[] = Array(5).fill(null).map(() => 
      mockTrace(true, ['src/components/button.tsx'])
    );
    const assets = manager.mine(history);
    const promotion = assets.find(a => a.type === 'trusted-pattern');
    expect(promotion).toBeDefined();
    expect(promotion?.pattern).toBe('src/components/**');
  });

  test('Should suggest hardening for frequent violations', () => {
    const history: DecisionTrace[] = Array(3).fill(null).map(() => 
      mockTrace(false, ['src/auth/secret.ts'], ['scope-enforcement'])
    );
    const assets = manager.mine(history);
    const hardening = assets.find(a => a.type === 'frequent-violation');
    expect(hardening).toBeDefined();
    expect(hardening?.description).toContain('violated 3 times');
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/consensus.test.ts

````typescript
// tests/consensus.test.ts
import { ConsensusEngine } from '../src/engine/consensus';
import { Vote, Decision } from '../src/engine/types';

describe('Consensus Engine (Day 18)', () => {
  const engine = new ConsensusEngine();

  const mockDecision = (allowed: boolean, risk: Decision['riskLevel'] = 'low'): Decision => ({
    allowed,
    riskLevel: risk,
    actions: allowed ? [] : ['block'],
    violations: [],
    auditLog: 'mock'
  });

  test('Should reach agreement when all voters allow', () => {
    const votes: Vote[] = [
      { voterId: 'agent-1', weight: 1, decision: mockDecision(true) },
      { voterId: 'agent-2', weight: 1, decision: mockDecision(true) }
    ];
    const result = engine.resolve(votes);
    expect(result.finalDecision.allowed).toBe(true);
    expect(result.agreementRate).toBe(1.0);
  });

  test('Should VETO when a high-weight voter blocks', () => {
    const votes: Vote[] = [
      { voterId: 'main-governor', weight: 1.0, decision: mockDecision(false) },
      { voterId: 'sub-agent', weight: 0.5, decision: mockDecision(true) }
    ];
    const result = engine.resolve(votes);
    expect(result.finalDecision.allowed).toBe(false);
    expect(result.isVetoed).toBe(true);
  });

  test('Should FAIL if agreement rate is too low even without veto', () => {
    const votes: Vote[] = [
      { voterId: 'a1', weight: 0.4, decision: mockDecision(false) }, // low weight, no veto
      { voterId: 'a2', weight: 0.6, decision: mockDecision(true) }
    ];
    // agreement rate = 0.6 / 1.0 = 0.6. threshold is > 0.6 (60%)
    const result = engine.resolve(votes);
    expect(result.finalDecision.allowed).toBe(false);
    expect(result.agreementRate).toBe(0.6);
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/diff_parser.test.ts

````typescript
// tests/diff_parser.test.ts
import { parseUnifiedDiff } from '../src/engine/diffParser';

describe('Unified Diff Parser - Day 2', () => {
  
  test('Standard Git Diff: Extracts modified files correctly', () => {
    const diff = 'diff --git a/src/app.ts b/src/app.ts\n' +
                 'index 83db48f..f735c20 100644\n' +
                 '--- a/src/app.ts\n' +
                 '+++ b/src/app.ts\n' +
                 '@@ -1,3 +1,4 @@\n' +
                 ' console.log("hello");\n' +
                 '+console.log("world");';
    const result = parseUnifiedDiff(diff);
    expect(result.filesTouched).toEqual(['src/app.ts']);
    expect(result.additions).toBe(1);
    expect(result.deletions).toBe(0);
    expect(result.hunks).toBe(1);
  });

  test('File Deletion: Detects deleted file correctly', () => {
    const diff = 'diff --git a/src/old.ts b/src/old.ts\n' +
                 'deleted file mode 100644\n' +
                 '--- a/src/old.ts\n' +
                 '+++ /dev/null\n' +
                 '@@ -1,2 +0,0 @@\n' +
                 '-console.log("bye");';
    const result = parseUnifiedDiff(diff);
    expect(result.filesTouched).toEqual(['src/old.ts']);
    expect(result.deletions).toBe(1);
  });

  test('Multiple Files: Handles mixed changes', () => {
    const diff = 'diff --git a/A.ts b/A.ts\n' +
                 '--- a/A.ts\n' +
                 '+++ b/A.ts\n' +
                 '@@ -1 +1 @@\n' +
                 '-old\n' +
                 '+new\n' +
                 'diff --git a/B.ts b/B.ts\n' +
                 '--- a/B.ts\n' +
                 '+++ b/B.ts\n' +
                 '@@ -5 +5 @@\n' +
                 '+added';
    const result = parseUnifiedDiff(diff);
    expect(result.filesTouched).toEqual(['A.ts', 'B.ts']);
    expect(result.additions).toBe(2);
    expect(result.deletions).toBe(1);
    expect(result.hunks).toBe(2);
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/golden_set.test.ts

````typescript
// tests/golden_set.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig } from '../src/engine/types';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [
    { id: 'source-code', allow: ['src/**', 'lib/**', 'components/**'] },
    { id: 'documentation', allow: ['docs/**', 'README.md'] }
  ],
  risks: [
    { id: 'infra-danger', level: 'high', match: ['**/.env*', '**/docker-compose.yml', '**/*.tf'] },
    { id: 'auth-module', level: 'high', match: ['src/auth/**', 'src/security/**'] }
  ],
  rules: [
    {
      id: 'must-have-diff',
      description: 'Reject any proposal without explicit diff content',
      check: 'payload.diff.length > 0',
      action: 'block'
    },
    {
      id: 'scope-enforcement',
      description: 'Reject changes outside allowed scopes',
      check: 'engine.isScoped(payload.files)',
      action: 'block'
    },
    {
      id: 'reasoning-required',
      description: 'Must provide context/reasoning for changes',
      check: 'payload.reasoning.length > 10',
      action: 'warn'
    },
    {
      id: 'high-risk-gate',
      description: 'High risk changes require explicit human confirmation',
      condition: "engine.riskLevel == 'high'",
      action: 'require_human'
    }
  ]
};

const mockProposal = (overrides: Partial<Proposal>): Proposal => ({
  id: 'test-1',
  timestamp: Date.now(),
  author: 'ai-agent',
  reasoning: 'Normal changes for testing purposes.',
  files: ['src/app.ts'],
  diff: 'diff --git a/src/app.ts b/src/app.ts\n+console.log("test");',
  ...overrides
});

describe('Trusted Policy Engine - Sprint 1', () => {
  const engine = new PolicyEngine(mockPolicy);

  // 场景 1：越权访问
  test('Should BLOCK changes outside scope', () => {
    const proposal = mockProposal({ files: ['private/keys.txt'] });
    const decision = engine.evaluate(proposal);
    
    expect(decision.allowed).toBe(false);
    expect(decision.violations).toContainEqual(
      expect.objectContaining({ ruleId: 'scope-enforcement' })
    );
  });

  // 场景 2：触碰高危文件
  test('Should REQUIRE HUMAN for infra changes', () => {
    const proposal = mockProposal({ files: ['src/auth/login.ts'] });
    const decision = engine.evaluate(proposal);
    
    expect(decision.allowed).toBe(false); 
    expect(decision.actions).toContain('require_human');
    expect(decision.riskLevel).toBe('high');
  });

  // 场景 3：无理由修改
  test('Should WARN if reasoning is missing', () => {
    const proposal = mockProposal({ reasoning: '' }); // 空理由
    const decision = engine.evaluate(proposal);
    
    expect(decision.allowed).toBe(true);
    expect(decision.violations).toContainEqual(
      expect.objectContaining({ ruleId: 'reasoning-required', level: 'warn' })
    );
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/self_audit.test.ts

````typescript
// tests/self_audit.test.ts
import { SelfAuditor } from '../src/engine/selfAudit';
import { DecisionTrace } from '../src/engine/types';

describe('Self Audit Algorithm (Day 23)', () => {
  const auditor = new SelfAuditor();

  const mockTrace = (allowed: boolean, risk: 'low' | 'high', files: string[]): DecisionTrace => ({
    allowed, riskLevel: risk, actions: [], violations: [], auditLog: 'mock',
    outcome: allowed ? 'applied' : 'rejected',
    proposal: {
      id: 'p', timestamp: Date.now(), author: 'ai-agent', reasoning: 'r',
      files, diff: 'd'
    }
  });

  test('Should detect Policy Drift when success rate shifts', () => {
    // 之前 20 条全是允许的 (100%)
    const older = Array(20).fill(null).map(() => mockTrace(true, 'low', ['src/a.ts']));
    // 最近 10 条全是阻断的 (0%)
    const recent = Array(10).fill(null).map(() => mockTrace(false, 'low', ['src/b.ts']));
    
    const report = auditor.audit([...recent, ...older]);
    expect(report.healthScore).toBeLessThan(100);
    expect(report.findings.some(f => f.type === 'policy-drift')).toBe(true);
  });

  test('Should detect Risk Accumulation', () => {
    // 40% 的操作是高风险的
    const history = [
      ...Array(4).fill(null).map(() => mockTrace(true, 'high', ['src/env.ts'])),
      ...Array(6).fill(null).map(() => mockTrace(true, 'low', ['src/main.ts']))
    ];
    const report = auditor.audit(history);
    expect(report.findings.some(f => f.type === 'risk-accumulation')).toBe(true);
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/sovereignty.test.ts

````typescript
// tests/sovereignty.test.ts
import { SovereignManager } from '../src/engine/sovereign';
import { loadPolicy } from '../src/engine/policyLoader';
import fs from 'fs';
import path from 'path';

describe('Sovereign Policy Signing (Day 22)', () => {
  const tmpDir = path.join(__dirname, 'tmp_sov');
  const policyPath = path.join(tmpDir, 'test.policy.yaml');
  const sigPath = `${policyPath}.sig`;

  let publicKey: string;
  let privateKey: string;

  beforeAll(() => {
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const keys = SovereignManager.generateKeyPair();
    publicKey = keys.publicKey;
    privateKey = keys.privateKey;
    
    fs.writeFileSync(policyPath, 'meta:\n  mode: strict\nscopes: []\nrisks: []\nrules: []');
  });

  afterAll(() => {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  });

  test('Should load signed policy correctly', () => {
    const content = fs.readFileSync(policyPath, 'utf8');
    const sig = SovereignManager.signPolicy(content, privateKey);
    fs.writeFileSync(sigPath, sig);

    const config = loadPolicy(policyPath, { publicKey });
    expect(config.meta.mode).toBe('strict');
  });

  test('Should REJECT tampered policy', () => {
    // 1. Sign
    const content = fs.readFileSync(policyPath, 'utf8');
    const sig = SovereignManager.signPolicy(content, privateKey);
    fs.writeFileSync(sigPath, sig);

    // 2. Tamper
    fs.writeFileSync(policyPath, 'meta:\n  mode: monitor\nscopes: []\nrisks: []\nrules: []');

    // 3. Load (should throw)
    expect(() => {
      loadPolicy(policyPath, { publicKey });
    }).toThrow('Policy signature verification failed');
  });

  test('Should REJECT policy without signature when pubkey provided', () => {
    if (fs.existsSync(sigPath)) fs.unlinkSync(sigPath);
    expect(() => {
      loadPolicy(policyPath, { publicKey });
    }).toThrow('Policy signature missing');
  });
});

````

[⬆ 回到目录](#toc)

## 📄 tests/value_mercy.test.ts

````typescript
// tests/value_mercy.test.ts
import { PolicyEngine } from '../src/engine/evaluator';
import { Proposal, PolicyConfig, ValueManifesto } from '../src/engine/types';

const mockPolicy: PolicyConfig = {
  meta: { mode: 'strict' },
  scopes: [{ id: 'src', allow: ['src/**'] }],
  risks: [{ id: 'secret', level: 'high', match: ['src/secret/**'] }],
  rules: [
    {
      id: 'no-secret',
      condition: "engine.riskLevel == 'high'",
      action: 'block',
      description: 'No touching secrets',
      valueId: 'security'
    }
  ]
};

const mockManifesto: ValueManifesto = {
  values: [
    { id: 'security', weight: 1.0, description: 'Safety first' }
  ],
  mercy_hooks: [
    {
      id: 'emergency-mercy',
      condition: "payload.tags && payload.tags.includes('emergency')",
      action: 'downgrade_to_warn',
      description: 'Emergency downgrade'
    }
  ]
};

describe('Value & Mercy Logic (Day 16)', () => {
  const engine = new PolicyEngine(mockPolicy, mockManifesto);

  test('Should block normal secret access', () => {
    const proposal: Proposal = {
      id: 'v1',
      timestamp: Date.now(),
      author: 'ai-agent',
      reasoning: 'Just testing',
      files: ['src/secret/key.txt'],
      diff: '+key'
    };
    const decision = engine.evaluate(proposal);
    expect(decision.allowed).toBe(false);
    expect(decision.valueScore).toBeLessThan(1.0);
  });

  test('Should Mercy (warn) for emergency secret access', () => {
    const proposal: Proposal = {
      id: 'v2',
      timestamp: Date.now(),
      author: 'ai-agent',
      reasoning: 'EMERGENCY FIX',
      files: ['src/secret/key.txt'],
      diff: '+key',
      tags: ['emergency']
    };
    const decision = engine.evaluate(proposal);
    expect(decision.allowed).toBe(true); // Downgraded to warn
    expect(decision.actions).toContain('warn');
    expect(decision.violations[0].level).toBe('warn');
  });
});

````

[⬆ 回到目录](#toc)

## 📄 todo.md

````markdown
很好，这一版**已经不是“修正稿”，而是实打实的 v1.1 候选**了。  
我会按你现在给出的完整代码，**只做三件事**：

1. ✅ 明确告诉你：**哪些地方已经达到“生产级治理内核”标准**
2. ⚠️ 指出 **仍然存在但“你现在可能低估”的 5 个关键问题**
3. 🧭 给你一个 **v1.1 → v1.2 的最小、安全演进清单（不返工）**

我不会重复你已经做对的事，重点放在**价值密度最高的判断**。

---

# ✅ 一、你已经“真正跨线”的地方（非常重要）

先说结论：

> **你已经完成了从「策略执行器」到「治理内核」的跃迁。**

以下是“不可逆”的成熟信号：

---

## ✅ 1. SafeEvaluator 接入是“结构性胜利”

你现在的结构是：

- ✅ 默认 JSON Logic
- ⚠️ legacy string 明确标注 deprecated
- ✅ evaluator 中 **不再出现 new Function**
- ✅ 所有规则 / mercy hook / anomaly 都走同一安全通道

这意味着：

- **RCE 不再是系统性风险**
- policy 成为 **可签名、可审计、可演进的治理对象**

👉 这是 v1.1 最重要的一步，你已经完成。

---

## ✅ 2. Anomaly 被彻底“降级为信号”（这是对的）

在 `PolicyEngine.evaluate()` 中：

```ts
const anomalyReport = this.anomalyDetector.detect(proposal);

const evaluationContext = {
  engine: { ... },
  anomaly: anomalyReport
};
```

✅ anomaly **不再直接触发 block**
✅ 只能通过 policy 触发 action

这点极其重要，因为它避免了：

- “统计模型拥有隐式主权”
- “无规则裁决”

---

## ✅ 3. ContextBank：JSONL + append-only 是正确路线

```ts
fs.appendFileSync(this.storagePath, logEntry);
```

这已经具备：

- 可审计性
- 时间序列完整性
- 未来加 hash-chain 的天然落点

**这是合格的治理记忆层 v1.1。**

---

## ✅ 4. Liability 体系“开始像真的了”

尤其是这段：

```ts
if (decision.allowed === false && violations.length === 0) {
  return 'system-fault';
}
```

你已经在**显式承认“系统也可能犯错”**，  
这是 90% 系统永远做不到的事情。

---

# ⚠️ 二、现在这 5 个问题，是“安静但致命”的

我会非常直接。

---

## 🔴 问题 1：`unsafeLegacyEval` **仍然是后门**

你现在写的是：

```ts
if (typeof expression === 'string') {
  console.warn(...)
  return this.unsafeLegacyEval(expression, context);
}
```

⚠️ **这在治理系统里不是“兼容性”，而是“延迟引爆装置”。**

### 攻击现实路径
- policy author 被钓鱼
- 合法签名 policy
- 写入：
  ```yaml
  condition: "process.exit(1) || true"
  ```
- ✅ 通过签名
- ✅ 通过 evaluator
- ❌ CI / agent 直接被 kill

### ✅ v1.1 正确做法（强烈建议）

**立刻改成：**

```ts
if (typeof expression === 'string') {
  throw new Error(
    'String-based policy conditions are disabled in v1.1. Please migrate to JSON Logic.'
  );
}
```

👉 **迁移痛一次，总比被炸一次好。**

---

## 🔴 问题 2：Policy `meta.privileges` 目前是“装饰品”

你在 `types.ts` 里声明了：

```ts
meta: {
  privileges?: string[];
}
```

但在整个 engine 中：

- ❌ 没有任何 enforcement
- ❌ 没有 privilege → action 映射

### 结果是什么？
> **任何 policy rule 都可以 block / require_human**

这是**隐式超权**。

### ✅ v1.1 最小修复（不改结构）

在 `applyRuleAction` 之前加：

```ts
if (
  (rule.action === 'block' || rule.action === 'require_human') &&
  !this.policy.meta.privileges?.includes('high-risk-decision')
) {
  violations.push({
    ruleId: 'privilege-violation',
    description: 'Policy lacks privilege for high-risk action',
    level: 'block'
  });
  return;
}
```

---

## 🔴 问题 3：ConsensusEngine 只是“公告牌”，不是保险丝

你现在的逻辑是：

```ts
if (this.policy.requiresConsensus) {
  decision.auditLog += '[NOTICE] ...';
}
```

⚠️ 这意味着：

- policy 写了 requiresConsensus
- **但系统照样单点裁决**
- 这是典型的 **“虚假安全感”**

### ✅ v1.1 诚实做法（二选一）

**要么：**

```ts
if (this.policy.requiresConsensus) {
  throw new Error('Consensus required but not enforced');
}
```

**要么：**
在 README / auditLog 中明确：

> consensus.ts is experimental and NOT enforced in this version

👉 **治理系统里，半连接比未连接更危险。**

---

## 🔴 问题 4：Liability attribution 有一个逻辑偏差

这一段：

```ts
if (decision.anomalyReport?.isAnomaly) {
  return 'ai-agent';
}
```

问题是：

- anomaly 是统计信号
- **不是意图**
- 也不是 agent 的“违规行为”

### 结果
你会在以下情况下**错误惩罚 agent**：

- 大 diff
- 高熵但合法 refactor
- 结构性迁移

### ✅ v1.1 更合理的归因

```ts
if (decision.anomalyReport?.isAnomaly && decision.violations.length === 0) {
  return 'policy-author';
}
```

因为：
> 是 policy 决定了“如何解释 anomaly”

---

## 🔴 问题 5：CLI 默认 author = 'ai-agent' 是危险假设

```ts
author: 'ai-agent'
```

⚠️ 在 CLI 场景中：
- 实际作者往往是 **human**
- 但你所有 credit / blame 都给了 AI

### ✅ 最小修复

CLI 参数支持：

```bash
trusted-guard --author human
```

否则你的信用系统**长期会失真**。

---

# 🧭 三、v1.1 → v1.2 的最小演进清单（不返工）

按优先级：

---

## ✅ P0（立刻）
- ❌ 移除 `unsafeLegacyEval`
- ✅ privilege enforcement
- ✅ consensus 要么 fail-fast，要么明确禁用

---

## ✅ P1（安全增强）
- ContextBank 加 hash chain：
  ```ts
  prevHash + currentEntry → sha256
  ```
- policy.rules 加 `severity`（block / warn 不再隐式）

---

## ✅ P2（治理成熟）
- Asset → 自动生成 policy patch（proposal）
- SelfAudit 结果 → governance asset
- Credit system 引入 decay（时间衰减）

---

# 🏁 最终评价（非常直接）

> **这是一个“已经不适合再随便改结构”的系统。**

你现在应该做的是：
- ✅ 封住后门
- ✅ 明确权力边界
- ✅ 让所有“看起来像安全的东西”要么真的安全，要么直接报错

---

## 我可以下一步直接帮你做的事（任选）

1️⃣ **给你一份 v1.1 hardening patch（只改 3 个文件）**  
2️⃣ **写一套“policy author 指南”（防止人祸）**  
3️⃣ **按真实攻击路径，跑一遍“policy 被劫持”的演练**

你说一句：**“来，先封后门。”** 或直接点编号。好，这一步我会**非常工程化、可直接落地**地给你两样东西：

1️⃣ **v1.1 Hardening Patch（只改 3 个文件）**  
2️⃣ **Policy Author 指南（专门防“人祸”，不是写给工程师看的）**

我会严格遵守你的现有结构，不引入新模块、不重构架构。

---

# ✅ 一、v1.1 Hardening Patch（✅ 只改 3 个文件）

## 🎯 Hardening 目标（明确）

- ❌ **彻底移除 string-based policy condition**
- ✅ **强制 policy privilege 边界**
- ✅ **Consensus 要么真用，要么 fail-fast**
- ✅ **修正 liability 的关键误判**

---

## 🔧 Patch 1：`engine/evaluator.ts`

### ✅ 1.1 禁用 legacy string expression（最重要）

#### ❌ 原逻辑（危险）
```ts
if (typeof condition === 'string') {
  console.warn('Using legacy string expression');
  return this.unsafeLegacyEval(condition, context);
}
```

#### ✅ v1.1 修正
```ts
if (typeof condition === 'string') {
  throw new Error(
    'String-based policy conditions are disabled in v1.1. ' +
    'Please migrate this rule to JSON Logic.'
  );
}
```

✅ **RCE 面直接归零**

---

### ✅ 1.2 强制 policy privilege 校验（高风险动作）

在 `applyRuleAction(...)` 或等价位置加入：

```ts
const HIGH_RISK_ACTIONS = ['block', 'require_human'];

if (
  HIGH_RISK_ACTIONS.includes(rule.action) &&
  !this.policy.meta?.privileges?.includes('high-risk-decision')
) {
  violations.push({
    ruleId: rule.id,
    description: `Policy lacks privilege for action: ${rule.action}`,
    level: 'block'
  });
  return;
}
```

✅ 结果：
- policy **必须声明主权**
- 没有“隐式超权”

---

### ✅ 1.3 Consensus：要么执行，要么直接失败

找到类似：

```ts
if (this.policy.requiresConsensus) {
  decision.auditLog += '[NOTICE] Consensus required\n';
}
```

#### ✅ v1.1 诚实模式（推荐）
```ts
if (this.policy.requiresConsensus) {
  throw new Error(
    'Policy requires consensus, but consensus enforcement is not active in v1.1'
  );
}
```

✅ **消灭“虚假安全感”**

---

## 🔧 Patch 2：`engine/liabilityManager.ts`

### ✅ 修正 anomaly 责任误归因（非常关键）

#### ❌ 原逻辑（你现在的）
```ts
if (decision.anomalyReport?.isAnomaly) {
  return 'ai-agent';
}
```

#### ✅ v1.1 修正
```ts
if (
  decision.anomalyReport?.isAnomaly &&
  decision.violations.length === 0
) {
  return 'policy-author';
}
```

### ✅ 语义解释（非常重要）
> anomaly 是“信号”，不是“罪证”  
> **解释信号的，是 policy，而不是 agent**

---

## 🔧 Patch 3：`cli.ts`

### ✅ 修正默认 author（防止信用系统长期失真）

#### ❌ 原来
```ts
author: 'ai-agent'
```

#### ✅ v1.1 修正
```ts
const author =
  process.argv.includes('--author=ai')
    ? 'ai-agent'
    : 'human';
```

并在 proposal 中：

```ts
author
```

✅ 默认假设：**人类才是责任主体**

---

## ✅ Hardening Patch 效果总结

| 风险 | v1.0 | v1.1 |
|----|----|----|
| RCE | 🔴 高 | ✅ 0 |
| 隐式超权 | 🔴 高 | ✅ 封死 |
| 虚假 consensus | 🟡 | ✅ fail-fast |
| 误惩 AI | 🔴 | ✅ 修正 |
| 信用失真 | 🟡 | ✅ 修正 |

---

# ✅ 二、Policy Author 指南（防“人祸”版）

> **这不是写给工程师的，是写给“有签名权的人”的。**

你可以直接放进 `POLICY_AUTHORING.md`

---

## 🛡️ Policy Author 守则 v1.1

### 🎯 你在系统中的角色
> **你不是“写规则的人”，你是“赋权的人”。**

你的 policy **定义了系统能不能伤人**。

---

## ✅ 1️⃣ 所有 condition 必须是 JSON Logic

✅ 正确：
```yaml
condition:
  ">":
    - { var: "diff.totalLines" }
    - 500
```

❌ 禁止：
```yaml
condition: "diff.totalLines > 500"
```

📌 原因：  
string expression **等同于远程代码执行**，已被永久禁用。

---

## ✅ 2️⃣ 高风险动作必须声明主权

如果你的 policy 包含以下 action：

- `block`
- `require_human`

你 **必须** 在 policy 顶部声明：

```yaml
meta:
  privileges:
    - high-risk-decision
```

📌 没有这个声明：
- policy **不会生效**
- 责任会被记录为 `policy-author`

---

## ✅ 3️⃣ Anomaly ≠ 错误 ≠ 恶意

❌ 错误做法：
```yaml
when:
  var: anomaly.isAnomaly
decision: block
```

✅ 推荐做法：
```yaml
when:
  and:
    - { var: anomaly.isAnomaly }
    - ">":
        - { var: anomaly.score }
        - 0.8
decision: require_human
```

📌 原则：
> anomaly **只能提升审查级别，不能直接定罪**

---

## ✅ 4️⃣ 永远不要写“绝对规则”

❌ 高风险：
```yaml
when: true
decision: block
```

✅ 替代：
```yaml
when:
  ">":
    - { var: engine.riskScore }
    - 0.9
decision: require_human
```

📌 绝对规则 = **单点治理失败**

---

## ✅ 5️⃣ 每条 block 规则都要问自己一句话

> **“如果这条规则错了，谁该负责？”**

- 如果答案是“我” ✅
- 如果答案是“不知道 / 系统吧” ❌

📌 你签的不是 YAML，是责任。

---

## ✅ 6️⃣ Policy 变更前的自检清单

在提交 policy 前，请确认：

- [ ] 没有 string condition
- [ ] 高风险 action 已声明 privilege
- [ ] anomaly 规则不会直接 block
- [ ] 没有 `when: true`
- [ ] 你愿意为这次变更署名

---

# 🏁 最终一句话评价

> **你现在已经把“AI 失控风险”，成功转化成了“人类治理责任”。**

这不是退步，这是**成熟系统的唯一出路**。

---

## 下一步我可以继续帮你做的（你已经到这个阶段了）

- ✅ 写一个 **policy linter（pre-commit）**
- ✅ 帮你设计 **policy review / approve 流程**
- ✅ 给你一份 **“事故发生后的治理回滚手册”**

你直接说：**“继续，做 policy linter。”** 或点一个。
````

[⬆ 回到目录](#toc)

## 📄 tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "lib": ["ESNext"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "tests"]
}

````

[⬆ 回到目录](#toc)

## 📄 value_manifesto.yaml

````yaml
# value_manifesto.yaml
# Trusted (Yuangs) Agent - Value Manifesto v1.0

meta:
  version: "1.0.0"

# 核心价值序位 (Value Hierarchy)
# 权重越高，在规则冲突时影响力越大
values:
  - id: "security"
    weight: 1.0
    description: "安全性：任何可能导致权限泄露或基础设施破坏的行为必须拦截"
  - id: "transparency"
    weight: 0.8
    description: "透明度：决策过程必须可审计，AI 必须清晰解释其动机"
  - id: "rigor"
    weight: 0.6
    description: "严谨性：代码变更必须符合项目约定的范围和质量"
  - id: "efficiency"
    weight: 0.3
    description: "效率：在不违背以上原则的前提下，追求交付速度"

# 仁慈准则 (Mercy Guidelines)
# 定义什么样的特例可以被豁免或降级处理
mercy_hooks:
  - id: "emergency_fix"
    condition: "payload.tags.includes('emergency')"
    action: "downgrade_to_warn"
    description: "紧急修复：标注为 emergency 的修复允许触发警告而非阻断"
  - id: "doc_only_mercy"
    condition: "engine.isOnlyDocs(payload.files)"
    action: "auto_allow"
    description: "文档豁免：纯文档修改不触发高危校验"

````

[⬆ 回到目录](#toc)

---
### 📊 最终统计汇总
- **文件总数:** 38
- **代码总行数:** 7759
- **物理总大小:** 252.34 KB
