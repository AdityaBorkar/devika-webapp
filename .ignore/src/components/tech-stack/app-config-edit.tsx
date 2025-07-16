'use client';

import { Edit, Save } from 'lucide-react';
import { useState } from 'react';
import type { AppConfig } from 'types/tech-stack';

interface AppConfigEditProps {
	config: AppConfig;
	onSave: (id: string, name: string, filePath: string) => void;
}

export function AppConfigEdit({ config, onSave }: AppConfigEditProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(config.name);
	const [filePath, setFilePath] = useState(config.filePath || '');

	const handleSave = () => {
		if (name.trim()) {
			onSave(config.id, name, filePath);
			setIsEditing(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			setIsEditing(false);
			setName(config.name);
			setFilePath(config.filePath || '');
		}
	};

	if (isEditing) {
		return (
			<div className="flex flex-col gap-2 rounded-md border p-2">
				<div className="flex flex-col gap-1">
					<label
						className="text-muted-foreground text-xs"
						htmlFor={`config-name-${config.id}`}
					>
						Name
					</label>
					<input
						className="rounded-sm border bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
						id={`config-name-${config.id}`}
						onChange={(e) => setName(e.target.value)}
						onKeyDown={handleKeyDown}
						type="text"
						value={name}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label
						className="text-muted-foreground text-xs"
						htmlFor={`config-path-${config.id}`}
					>
						File Path
					</label>
					<input
						className="rounded-sm border bg-transparent px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
						id={`config-path-${config.id}`}
						onChange={(e) => setFilePath(e.target.value)}
						onKeyDown={handleKeyDown}
						type="text"
						value={filePath}
					/>
				</div>
				<div className="mt-1 flex justify-end gap-2">
					<button
						className="px-2 py-1 text-muted-foreground text-xs hover:text-foreground"
						onClick={() => {
							setIsEditing(false);
							setName(config.name);
							setFilePath(config.filePath || '');
						}}
						type="button"
					>
						Cancel
					</button>
					<button
						className="flex items-center gap-1 rounded-md bg-bg-primary px-2 py-1 text-primary-foreground text-xs"
						onClick={handleSave}
						type="button"
					>
						<Save className="h-3 w-3" />
						Save
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="flex items-center gap-2 font-medium text-base">
						{config.name}
						{config.isCommon && (
							<span className="ml-2 rounded-full bg-bg-secondary px-2 py-0.5 text-xs">
								Common
							</span>
						)}
						{config.isLocal && (
							<span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-800 text-xs dark:bg-indigo-900 dark:text-indigo-300">
								Local
							</span>
						)}
					</h3>
				</div>
				<button
					className="rounded-md p-1 text-muted-foreground hover:bg-bg-primary hover:text-primary dark:hover:bg-bg-secondary"
					onClick={() => setIsEditing(true)}
					title="Edit config"
					type="button"
				>
					<Edit className="h-4 w-4" />
				</button>
			</div>
			{config.filePath && (
				<span className="mt-1 text-muted-foreground text-xs">
					{config.filePath}
				</span>
			)}
			<p className="mt-1 text-muted-foreground text-sm">{config.description}</p>
		</div>
	);
}
