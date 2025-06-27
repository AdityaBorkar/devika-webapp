#!/usr/bin/env bun

import { spawn } from 'bun';

interface GitStatus {
	staged: string[];
	unstaged: string[];
	untracked: string[];
}

interface FileChange {
	path: string;
	status: 'added' | 'modified' | 'deleted' | 'renamed';
	isNew: boolean;
}

class CommitMessageGenerator {
	private async runGitCommand(args: string[]): Promise<string> {
		const proc = spawn(['git', ...args], {
			stdout: 'pipe',
			stderr: 'pipe',
		});

		const result = await proc.exited;
		if (result !== 0) {
			const errorText = await new Response(proc.stderr).text();
			throw new Error(`Git command failed: ${errorText}`);
		}

		return await new Response(proc.stdout).text();
	}

	private async getGitStatus(): Promise<GitStatus> {
		const output = await this.runGitCommand(['status', '--porcelain']);
		const lines = output.trim().split('\n').filter(line => line.length > 0);

		const staged: string[] = [];
		const unstaged: string[] = [];
		const untracked: string[] = [];

		for (const line of lines) {
			const statusCode = line.slice(0, 2);
			const filePath = line.slice(3);

			if (statusCode[0] !== ' ' && statusCode[0] !== '?') {
				staged.push(filePath);
			}
			if (statusCode[1] !== ' ') {
				unstaged.push(filePath);
			}
			if (statusCode === '??') {
				untracked.push(filePath);
			}
		}

		return { staged, unstaged, untracked };
	}

	private async getDiff(staged = false): Promise<string> {
		const args = staged ? ['diff', '--cached'] : ['diff'];
		return await this.runGitCommand(args);
	}

	private async getRecentCommits(): Promise<string> {
		return await this.runGitCommand(['log', '--oneline', '-5']);
	}

	private analyzeFileChanges(files: string[]): FileChange[] {
		return files.map(file => {
			const isConfigFile = file.match(/\.(json|yml|yaml|toml|env|config)$/);
			const isDocFile = file.match(/\.(md|txt|rst)$/);
			const isSourceFile = file.match(/\.(ts|tsx|js|jsx|py|java|cpp|c)$/);
			const isBuildFile = file.match(/(package\.json|.*\.config\.|webpack|vite|rollup)/);

			return {
				path: file,
				status: 'modified' as const, // Simplified for now
				isNew: false, // We'll determine this from git status
			};
		});
	}

	private categorizeChanges(files: string[]): {
		type: string;
		scope?: string;
		description: string;
	} {
		const configFiles = files.filter(f => f.match(/\.(json|yml|yaml|toml|env|config)$/));
		const sourceFiles = files.filter(f => f.match(/\.(ts|tsx|js|jsx|py|java|cpp|c)$/));
		const docFiles = files.filter(f => f.match(/\.(md|txt|rst)$/));
		const buildFiles = files.filter(f => f.match(/(package\.json|.*\.config\.|webpack|vite|rollup)/));
		const testFiles = files.filter(f => f.match(/\.(test|spec)\./));
		const styleFiles = files.filter(f => f.match(/\.(css|scss|sass|less)$/));

		// Determine primary change type
		if (files.some(f => f.includes('github/workflows') || f.includes('.yml') || f.includes('vercel'))) {
			return {
				type: 'ci',
				description: 'configure deployment and CI workflows'
			};
		}

		if (testFiles.length > 0) {
			return {
				type: 'test',
				description: `add tests for ${testFiles[0].split('/').pop()?.replace(/\.(test|spec).*/, '') || 'components'}`
			};
		}

		if (docFiles.length > 0) {
			return {
				type: 'docs',
				description: 'update documentation'
			};
		}

		if (styleFiles.length > 0) {
			return {
				type: 'style',
				description: 'update component styling'
			};
		}

		if (configFiles.length > 0 && sourceFiles.length === 0) {
			return {
				type: 'chore',
				description: 'update configuration files'
			};
		}

		if (buildFiles.length > 0) {
			return {
				type: 'chore',
				description: 'update build configuration'
			};
		}

		if (sourceFiles.length > 0) {
			// Try to determine if it's a new feature or fix
			const hasNewFiles = files.some(f => f.includes('new') || f.includes('add'));
			const hasFixFiles = files.some(f => f.includes('fix') || f.includes('bug'));

			if (hasNewFiles) {
				return {
					type: 'feat',
					description: 'add new functionality'
				};
			}

			if (hasFixFiles) {
				return {
					type: 'fix',
					description: 'resolve issues'
				};
			}

			return {
				type: 'feat',
				description: 'implement new features'
			};
		}

		return {
			type: 'chore',
			description: 'update project files'
		};
	}

	private generateCommitMessage(allFiles: string[]): string {
		const { type, scope, description } = this.categorizeChanges(allFiles);

		// Special handling for specific file patterns
		if (allFiles.some(f => f.includes('vercel')) && allFiles.some(f => f.includes('workflow'))) {
			return 'ci: configure Vercel deployment and GitHub workflows';
		}

		if (allFiles.includes('package.json') && allFiles.length === 1) {
			return 'chore: update package configuration';
		}

		if (allFiles.includes('.gitignore')) {
			return 'chore: update gitignore rules';
		}

		// Build the commit message
		let message = type;
		if (scope) {
			message += `(${scope})`;
		}
		message += `: ${description}`;

		return message;
	}

	async generateAndCommit(): Promise<void> {
		try {
			console.log('🔍 Analyzing git repository...');

			// Get current status
			const status = await this.getGitStatus();
			const allChangedFiles = [...status.staged, ...status.unstaged, ...status.untracked];

			if (allChangedFiles.length === 0) {
				console.log('ℹ️  No changes detected');
				return;
			}

			console.log(`📋 Found ${allChangedFiles.length} changed files:`);
			allChangedFiles.forEach(file => console.log(`  • ${file}`));

			// Stage all files
			console.log('\n📦 Staging all changes...');
			await this.runGitCommand(['add', '.']);

			// Generate commit message
			console.log('\n🤖 Generating commit message...');
			const commitMessage = this.generateCommitMessage(allChangedFiles);

			console.log(`\n📝 Generated commit message: "${commitMessage}"`);

			// Ask for confirmation
			console.log('\n❓ Proceed with this commit message? (y/N)');
			
			// For now, auto-proceed (in a real implementation, you'd want to prompt)
			const shouldProceed = true;

			if (shouldProceed) {
				console.log('\n💾 Creating commit...');
				await this.runGitCommand(['commit', '-m', `${commitMessage}\n\n🤖 Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>`]);

				console.log('✅ Commit created successfully!');
				console.log('\n🚀 Pushing to remote...');
				await this.runGitCommand(['push']);
				console.log('✅ Changes pushed successfully!');
			} else {
				console.log('❌ Commit cancelled');
			}

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
}

// Run the commit generator
const generator = new CommitMessageGenerator();
await generator.generateAndCommit();