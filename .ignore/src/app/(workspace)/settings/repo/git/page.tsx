'use client';

import { useState } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TipTapEditor } from '@/components/ui/tiptap-editor';

const defaultContent = {
	branchingStrategy: `<h1>Git Branching Strategy</h1>
<p>Guidelines for branch organization and management.</p>`,

	commitFormat: `<h1>Commit Message Format</h1>
<p>Define the structure and guidelines for commit messages.</p>`,

	commitStrategy: `<h1>Commit Strategy</h1>
<p>Define whether your team uses Conventional Commits or another strategy.</p>`,

	preCommitChecks: `<h1>Pre-Commit Checks</h1>
<p>Automated and manual checks to perform before committing code.</p>`,

	whenToCommit: `<h1>When to Commit</h1>
<p>Guidelines on when and how often to make commits.</p>`,
};

export default function GitConfigPage() {
	const [activeTab, setActiveTab] = useState('commitStrategy');
	const [content, setContent] = useState(defaultContent);

	const handleContentChange = (section: string, newContent: string) => {
		setContent((prevContent) => ({
			...prevContent,
			[section]: newContent,
		}));
	};

	return (
		<div className="container max-w-6xl py-6">
			<Card className="border-none shadow-sm">
				<CardHeader className="pb-4">
					<CardTitle className="font-bold text-2xl">
						Git Configuration
					</CardTitle>
					<CardDescription>
						Define your team's Git workflow and standards using the editor below
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						className="w-full"
						onValueChange={setActiveTab}
						value={activeTab}
					>
						<TabsList className="mb-4 grid grid-cols-5">
							<TabsTrigger value="commitStrategy">Commit Strategy</TabsTrigger>
							<TabsTrigger value="commitFormat">Message Format</TabsTrigger>
							<TabsTrigger value="whenToCommit">When to Commit</TabsTrigger>
							<TabsTrigger value="preCommitChecks">
								Pre-Commit Checks
							</TabsTrigger>
							<TabsTrigger value="branchingStrategy">
								Branching Strategy
							</TabsTrigger>
						</TabsList>

						<TabsContent className="mt-0" value="commitStrategy">
							<div className="mb-2 px-1 text-sm text-text-muted">
								Define whether your team uses Conventional Commits or another
								approach
							</div>
							<TipTapEditor
								className="min-h-[60vh]"
								content={content.commitStrategy}
								onChange={(newContent) =>
									handleContentChange('commitStrategy', newContent)
								}
							/>
						</TabsContent>

						<TabsContent className="mt-0" value="commitFormat">
							<div className="mb-2 px-1 text-sm text-text-muted">
								Define the structure and guidelines for commit messages
							</div>
							<TipTapEditor
								className="min-h-[60vh]"
								content={content.commitFormat}
								onChange={(newContent) =>
									handleContentChange('commitFormat', newContent)
								}
							/>
						</TabsContent>

						<TabsContent className="mt-0" value="whenToCommit">
							<div className="mb-2 px-1 text-sm text-text-muted">
								Guidelines on when and how often to make commits
							</div>
							<TipTapEditor
								className="min-h-[60vh]"
								content={content.whenToCommit}
								onChange={(newContent) =>
									handleContentChange('whenToCommit', newContent)
								}
							/>
						</TabsContent>

						<TabsContent className="mt-0" value="preCommitChecks">
							<div className="mb-2 px-1 text-sm text-text-muted">
								Automated and manual checks to perform before committing code
							</div>
							<TipTapEditor
								className="min-h-[60vh]"
								content={content.preCommitChecks}
								onChange={(newContent) =>
									handleContentChange('preCommitChecks', newContent)
								}
							/>
						</TabsContent>

						<TabsContent className="mt-0" value="branchingStrategy">
							<div className="mb-2 px-1 text-sm text-text-muted">
								Guidelines for branch organization and management
							</div>
							<TipTapEditor
								className="min-h-[60vh]"
								content={content.branchingStrategy}
								onChange={(newContent) =>
									handleContentChange('branchingStrategy', newContent)
								}
							/>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
