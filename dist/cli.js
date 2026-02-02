#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/cli.ts
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const evaluator_1 = require("./engine/evaluator");
const diffParser_1 = require("./engine/diffParser");
const policyLoader_1 = require("./engine/policyLoader");
const contextBank_1 = require("./engine/contextBank");
const assetManager_1 = require("./engine/assetManager");
const selfAudit_1 = require("./engine/selfAudit");
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
async function main() {
    const policyPath = path_1.default.join(process.cwd(), 'agent.policy.yaml');
    const pubKeyPath = path_1.default.join(process.cwd(), '.ai', 'sovereign.pub');
    let config;
    try {
        const options = {};
        if (fs_1.default.existsSync(pubKeyPath)) {
            options.publicKey = fs_1.default.readFileSync(pubKeyPath, 'utf8');
        }
        config = (0, policyLoader_1.loadPolicy)(policyPath, options);
    }
    catch (e) {
        console.error(`Error loading policy:`, e instanceof Error ? e.message : e);
        process.exit(1);
    }
    const manifestoPath = path_1.default.join(process.cwd(), 'value_manifesto.yaml');
    let manifesto;
    if (fs_1.default.existsSync(manifestoPath)) {
        try {
            manifesto = yaml_1.default.parse(fs_1.default.readFileSync(manifestoPath, 'utf8'));
        }
        catch (e) {
            console.warn('Warning: Failed to load value_manifesto.yaml, proceeding without it.');
        }
    }
    const engine = new evaluator_1.PolicyEngine(config, manifesto, process.cwd());
    const bank = new contextBank_1.ContextBank(process.cwd());
    // Get diff from git (staged changes)
    let diff = '';
    try {
        diff = (0, child_process_1.execSync)('git diff --cached', { maxBuffer: 10 * 1024 * 1024 }).toString();
        if (!diff) {
            // Fallback to unstaged changes if no staged changes
            diff = (0, child_process_1.execSync)('git diff', { maxBuffer: 10 * 1024 * 1024 }).toString();
        }
    }
    catch (e) {
        console.error('Error running git diff. Is this a git repository?', e instanceof Error ? e.message : e);
        process.exit(1);
    }
    if (!diff) {
        console.log('No changes detected.');
        process.exit(0);
    }
    const analysis = (0, diffParser_1.parseUnifiedDiff)(diff);
    const proposal = {
        id: `cli-${Date.now()}`,
        timestamp: Date.now(),
        author: 'ai-agent',
        reasoning: 'Changes from local environment.', // In a real scenario, this might be passed as an argument
        files: analysis.filesTouched,
        diff: diff
    };
    const decision = engine.evaluate(proposal);
    // Record to ContextBank
    const trace = {
        ...decision,
        proposal,
        outcome: decision.allowed ? 'applied' : 'rejected' // Simple logic for CLI
    };
    // Await recording and audit (Sprint 3)
    try {
        await bank.record(trace);
        // 资产化记忆挖掘 (Sprint 2 - Day 20)
        const history = await bank.getHistory();
        const assetManager = new assetManager_1.AssetManager();
        const assets = assetManager.mine(history);
        if (assets.length > 0) {
            console.log('\n--- Governance Insights (Evolved) ---');
            assets.slice(0, 3).forEach(a => {
                console.log(`💡 [${a.type.toUpperCase()}] ${a.description}`);
                console.log(`   Suggestion: ${a.suggestedAction} on "${a.pattern}"`);
            });
            fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '.ai', 'governance_assets.json'), JSON.stringify(assets, null, 2));
        }
        // 治理自审 (Sprint 3 - Day 23)
        const selfAuditor = new selfAudit_1.SelfAuditor();
        const report = selfAuditor.audit(history);
        if (report.findings.length > 0) {
            console.log(`\n--- System Self-Audit (Health: ${report.healthScore}/100) ---`);
            report.findings.forEach(f => {
                console.log(`⚠️ [${f.severity.toUpperCase()}] ${f.type.toUpperCase()}: ${f.message}`);
            });
            fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '.ai', 'audit_report.json'), JSON.stringify(report, null, 2));
        }
    }
    catch (err) {
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
        decision.violations.forEach((v) => {
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
