#!/usr/bin/env bun

import { spawn } from 'bun';

async function runCmd(args: string[]): Promise<string> {
	const proc = spawn(args, {
		stdout: 'pipe',
		stderr: 'pipe',
	});

	const result = await proc.exited;
	if (result !== 0) {
		const errorText = await new Response(proc.stderr).text();
		throw new Error(`Command failed: ${args.join(' ')}\n${errorText}`);
	}

	return await new Response(proc.stdout).text();
}

async function main() {
	try {
		console.log('🔍 Checking git status...');
		
		// Get current git status
		const status = await runCmd(['git', 'status', '--porcelain']);
		
		if (!status.trim()) {
			console.log('ℹ️  No changes to commit');
			return;
		}

		console.log('📦 Staging all changes...');
		await runCmd(['git', 'add', '.']);

		// Get staged diff for context
		const diff = await runCmd(['git', 'diff', '--cached']);
		
		console.log('🤖 Generating commit message with Claude...');
		
		// Use claude CLI to generate commit message
		const prompt = `Generate a concise conventional commit message for these git changes. Return ONLY the commit message, nothing else.

Git Status:
${status}

Staged Changes:
${diff.slice(0, 2000)}${diff.length > 2000 ? '...' : ''}

Requirements:
- Use conventional commit format (type: description)
- Be concise and descriptive
- Common types: feat, fix, chore, docs, style, refactor, test, ci
- Focus on what changed and why`;

		const message = await runCmd(['claude', '--print', prompt]);
		const cleanMessage = message.trim().replace(/^["']|["']$/g, '');
		
		console.log(`📝 Generated message: "${cleanMessage}"`);
		
		console.log('💾 Creating commit...');
		await runCmd(['git', 'commit', '-m', `${cleanMessage}\n\n🤖 Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>`]);
		
		console.log('🚀 Pushing to remote...');
		await runCmd(['git', 'push']);
		
		console.log('✅ Successfully committed and pushed!');
		
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (errorMessage.includes('gpg failed to sign') || errorMessage.includes('signing failed')) {
			console.error('❌ GPG signing failed. Try: git config --global commit.gpgsign false');
			console.error('   Or configure your GPG key properly for signing commits.');
		} else {
			console.error('❌ Error:', errorMessage);
		}
		process.exit(1);
	}
}

await main();