#!/usr/bin/env node

/**
 * 主页内容同步工具
 * 用法: node scripts/sync-content.mjs [导出的JSON文件路径]
 *
 * 将从 AdminPanel 导出的 JSON 文件写回 public/content.json，
 * 并自动执行 git add → commit → push
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const TARGET_FILE = resolve(PROJECT_ROOT, 'public', 'content.json');

// ── 1. 读取输入文件 ──
const inputPath = process.argv[2];
if (!inputPath) {
  console.error('❌ 请指定导出的 JSON 文件路径');
  console.error('   用法: npm run sync -- <文件路径>');
  console.error('   示例: npm run sync -- portfolio_content.json');
  process.exit(1);
}

const inputFile = resolve(inputPath);
if (!existsSync(inputFile)) {
  console.error(`❌ 文件不存在: ${inputFile}`);
  process.exit(1);
}

let content;
try {
  content = JSON.parse(readFileSync(inputFile, 'utf-8'));
  console.log(`✅ 读取文件: ${inputFile}`);
} catch (e) {
  console.error(`❌ JSON 解析失败: ${e.message}`);
  process.exit(1);
}

// ── 2. 验证必要的顶层字段 ──
const requiredKeys = ['translations', 'experiences', 'projects', 'skillsData', 'vibeTools'];
const missingKeys = requiredKeys.filter(k => !(k in content));
if (missingKeys.length > 0) {
  console.error(`❌ JSON 缺少必要字段: ${missingKeys.join(', ')}`);
  console.error('   请确保从 AdminPanel 导出的 JSON 完整');
  process.exit(1);
}
console.log(`✅ JSON 结构验证通过 — ${content.experiences?.length || 0} 条经历, ${content.projects?.length || 0} 个项目, ${content.vibeTools?.length || 0} 个工具`);

// ── 3. 写入 content.json ──
try {
  writeFileSync(TARGET_FILE, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`✅ 写入: ${TARGET_FILE}`);
} catch (e) {
  console.error(`❌ 写入失败: ${e.message}`);
  process.exit(1);
}

// ── 4. Git 操作 ──
function git(cmd) {
  try {
    return execSync(cmd, { cwd: PROJECT_ROOT, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    console.error(`❌ Git 操作失败: ${e.message}`);
    if (e.stderr) console.error(`   ${e.stderr.trim()}`);
    process.exit(1);
  }
}

// 检查是否有变更
const status = git('git status --porcelain public/content.json');
if (!status) {
  console.log('⚠️  content.json 无变更，跳过提交');
  process.exit(0);
}

console.log('📝 检测到变更，准备提交...');
git('git add public/content.json');
console.log('✅ git add');

const commitMsg = 'sync: 更新主页内容';
git(`git commit -m "${commitMsg}"`);
console.log(`✅ git commit: "${commitMsg}"`);

console.log('🚀 推送到远程...');
git('git push');
console.log('✅ git push 完成');
console.log('\n🎉 主页内容已同步并推送！GitHub Actions 将自动部署。');