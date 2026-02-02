# Trusted AI Agent Governance Engine (TAAGE) 🛡️

TAAGE 是一个专为 AI 代理设计的、具备**主权意识**与**自我演进**能力的治理引擎。它不依赖于 LLM 的自觉性，而是通过物理脱钩的规则热加载、Ed25519 签名校验、以及信用分博弈机制，为 AI 行为提供坚实的防御边界。

## 🌟 核心理念

1. **主权先于智能 (Sovereignty Over Intelligence)**: 只有拥有私钥的人类才是项目的最高统帅，AI 的规则修改必须经过主权者签名。
2. **信任但不放任 (Trust, but Verify)**: 每一行 Diff 都会经过多层感知引擎（异常检测、熵值分析、风险匹配）的剥离审查。
3. **自我感知 (Self-Audit)**: 系统会自动监控治理健康度，识别性能漂移与权限蔓延。

---

## 🚀 快速开始

### 1. 安装 (Installation)

```bash
npm install trusted-agent-engine
```

### 2. 初始化主权密钥 (Init Sovereignty)

在你的项目根目录运行，生成属于你的治理身份：

```bash
npx trusted-sign init
```

- `.ai/sovereign.key`: 你的主权私钥（**绝不要提交到 Git**）。
- `.ai/sovereign.pub`: 你的主权公钥。

### 3. 配置并签署政策 (Sign Policy)

创建 `agent.policy.yaml`，并使用私钥签署它，确保规则不被 AI 篡改：

```bash
# 1. 编写规则
cat > agent.policy.yaml <<EOF
scopes:
  - id: "src"
    allow: ["src/**"]
rules:
  - id: "scope-enforcement"
    check: "engine.isScoped(payload.files)"
    action: "block"
EOF

# 2. 物理签署
npx trusted-sign sign agent.policy.yaml
```

---

## 🛠 本地集成 (Integration Guide)

你可以像使用瑞士军刀一样将引擎插入到任何 Node.js 驱动的 AI 代理中。

### 姿势 A：一键式封装集成

```typescript
import { TrustedGuard } from 'trusted-agent-engine';

const proposal = {
  id: 'p-001',
  timestamp: Date.now(),
  author: 'ai-agent',
  reasoning: 'Update user login logic',
  files: ['src/auth.ts'],
  diff: '... standard git diff ...'
};

// 一键评估：自动加载政策、校验签名、执行审计并记录日志
const decision = await TrustedGuard.evaluate(process.cwd(), proposal);

if (!decision.allowed) {
  console.error("🚫 拦截原因:", decision.auditLog);
  throw new Error("Governance Blocked");
}

console.log("✅ 准入通过，价值得分:", decision.valueScore);
```

### 姿势 B：底层微内核集成

如果你需要更精细的控制：

```typescript
import { PolicyEngine, loadPolicy, parseUnifiedDiff } from 'trusted-agent-engine';

// 加载政策 (会自动寻找 .sig 文件进行签名核验)
const config = loadPolicy('agent.policy.yaml', { 
  publicKey: fs.readFileSync('.ai/sovereign.pub', 'utf8') 
});

const engine = new PolicyEngine(config);
const decision = engine.evaluate(myProposal);
```

---

## 📊 治理洞察 (Insights)

引擎运行一段时间后，会自动发现：

- **Trusted Patterns**: AI 经常成功修改的路径，会建议你提拔为信任域。
- **Frequent Violations**: 频繁被拦下的规则，会建议你加强硬化。

所有洞察均存储在 `.ai/governance_assets.json`。

---

## ⚖️ 许可证

基于 MIT 协议分发。开发者拥有对 AI 的最高指挥权。
# trusted-agent-engine
