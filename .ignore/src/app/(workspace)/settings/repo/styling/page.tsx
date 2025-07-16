'use client';

import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Shadcn UI components are now installed
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// TODO: Fetch actual style configs from backend
const initialAppConfigs = [
	{ id: '1', name: 'Default App' },
	{ id: '2', name: 'Marketing Site' },
];

// TODO: Implement actual TipTap editor component
function TipTapEditorPlaceholder({ configName }: { configName: string }) {
	const sections = [
		'Colors',
		'Typography',
		'Iconography',
		'Component Library / Design System',
		'Transitions and Animation Library and Animation Definitions',
		'CSS Strategy',
	];

	return (
		<div className="prose prose-sm min-h-[200px] max-w-none rounded-md border bg-background p-4">
			{/* This is a placeholder for the TipTap editor */}
			<p className="text-muted-foreground">
				TipTap editor for {configName}. Add content for the following sections:
			</p>
			<ul className="list-disc pl-5 text-muted-foreground">
				{sections.map((section) => (
					<li key={section}>{section}</li>
				))}
			</ul>
			{/* Actual editor content would go here */}
		</div>
	);
}

export default function RepositoryStyling() {
	// TODO: Replace with actual state management/fetching logic
	const [appConfigs, setAppConfigs] = useState(initialAppConfigs);
	const [newConfigName, setNewConfigName] = useState('');

	const handleAddConfig = () => {
		if (newConfigName.trim()) {
			const newConfig = {
				id: Date.now().toString(), // Temporary ID generation
				name: newConfigName.trim(),
			};
			setAppConfigs([...appConfigs, newConfig]);
			setNewConfigName('');
			// TODO: Persist new config to backend
		}
	};

	const handleDeleteConfig = (id: string) => {
		setAppConfigs(appConfigs.filter((config) => config.id !== id));
		// TODO: Delete config from backend
	};

	return (
		<div className="space-y-8">
			<h1 className="font-bold text-3xl">Repository Styling</h1>

			{/* Common Style Config */}
			<Card>
				<CardHeader>
					<CardTitle>Common Style Configuration</CardTitle>
				</CardHeader>
				<CardContent>
					{/* TODO: Add editor/controls for Common Style Config */}
					<p className="text-muted-foreground">
						Define base styles, tokens, or settings shared across all app
						configurations. (Editor Placeholder)
					</p>
					<div className="prose prose-sm mt-4 min-h-[150px] max-w-none rounded-md border bg-background p-4">
						Common Style Editor Placeholder
					</div>
				</CardContent>
			</Card>

			{/* App Style Configs */}
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-2xl">App Style Configurations</h2>
					<div className="flex items-center gap-2">
						<Input
							onChange={(e) => setNewConfigName(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleAddConfig()}
							placeholder="New app config name"
							type="text"
							value={newConfigName}
						/>
						<Button disabled={!newConfigName.trim()} onClick={handleAddConfig}>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Config
						</Button>
					</div>
				</div>

				{appConfigs.length === 0 ? (
					<p className="py-4 text-center text-muted-foreground">
						No app style configurations defined yet. Add one above.
					</p>
				) : (
					appConfigs.map((config) => (
						<Card className="group relative" key={config.id}>
							<Button
								className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
								onClick={() => handleDeleteConfig(config.id)}
								size="icon"
								variant="outline"
							>
								<Trash2 className="h-4 w-4" />
								<span className="sr-only">Delete {config.name}</span>
							</Button>
							<CardHeader>
								<CardTitle>{config.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<TipTapEditorPlaceholder configName={config.name} />
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
