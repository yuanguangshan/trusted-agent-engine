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
  
  const proposal: Proposal = {
    id: `cli-${Date.now()}`,
    timestamp: Date.now(),
    author: 'ai-agent',
    reasoning: 'Changes from local environment.', // In a real scenario, this might be passed as an argument
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
