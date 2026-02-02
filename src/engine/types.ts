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
