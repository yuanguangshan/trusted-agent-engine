# Trusted AI Agent - 用户使用手册 (User Guide)

欢迎使用 Trusted AI Agent 治理系统。本手册将引导你如何建立主权、配置政策并运行 AI 审计工具。

## 1. 快速开始 (Setup)

### 安装依赖

```bash
npm install
```

### 初始化主权 (Sovereignty Init)

在开始任何治理之前，你需要生成属于你的主权密钥对：

```bash
npx ts-node src/sign.ts init
```

这会在 `.ai/` 目录下生成 `sovereign.key` (私钥) 和 `sovereign.pub` (公钥)。**请妥善保管私钥。**

---

## 2. 策略配置 (Policy Configuration)

### 核心政策：`agent.policy.yaml`

在根目录定义 AI 的行为边界：

```yaml
scopes:
  - id: "source-code"
    allow: ["src/**", "lib/**"]
risks:
  - id: "infra"
    level: "high"
    match: ["**/.env*", "docker-compose.yml"]
rules:
  - id: "scope-enforcement"
    check: "engine.isScoped(payload.files)"
    action: "block"
    valueId: "security"
```

### 签名政策

每次修改 `agent.policy.yaml` 后，必须进行签名，否则引擎将拒绝加载：

```bash
npx ts-node src/sign.ts sign
```

---

## 3. 运行审计 (Running Audit)

在 AI 提出代码变更后，在提交前运行命令行工具：

```bash
npx ts-node src/cli.ts
```

### 报告解读

- **Result**: `✅ ALLOWED` 或 `❌ BLOCKED`。
- **Value Score**: 提案与项目价值观的对齐度（1.00 为完美）。
- **Responsibility**: 指明该决策的归因（通常为 `AI-AGENT`）。
- **Governance Insights**: 系统根据历史数据给出的建议（如“建议将某路径加入白名单”）。
- **System Self-Audit**: 系统健康度自检结果。

---

## 4. 故障排除与紧急豁免

### 仁慈钩子 (Mercy Hooks)

如果由于系统过于严苛导致紧急修复无法提交，可以在 `value_manifesto.yaml` 中配置 `mercy_hooks`。
例如，在提案说明中加入 `EMERGENCY` 标签，触发自动降级：

```yaml
mercy_hooks:
  - id: "emergency-fix"
    condition: "payload.reasoning.includes('EMERGENCY')"
    action: "downgrade_to_warn"
```

### 信用分恢复

如果你认为系统对 AI 的拦截过于频繁，可以通过修改 `.ai/credits.json` 手动重置信用。
