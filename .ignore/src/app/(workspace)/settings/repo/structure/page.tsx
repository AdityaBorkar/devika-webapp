'use client';

import {
	ChevronDownIcon,
	ChevronRightIcon,
	EditIcon,
	FileIcon,
	FolderIcon,
	FolderOpenIcon,
	MinusSquareIcon,
	PlusSquareIcon,
} from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

// Define TypeScript interfaces for our file structure
interface FileItem {
	id: string;
	name: string;
	type: 'file';
	charCount: number;
	color: string;
}

interface DirectoryItem {
	id: string;
	name: string;
	type: 'directory';
	charCount: number;
	color: string;
	children?: (FileItem | DirectoryItem)[];
}

type FileSystemItem = FileItem | DirectoryItem;

// Mock file structure - in a real app, this would come from an API or file system
const initialFileStructure: DirectoryItem = {
	charCount: 0,
	children: [
		{
			charCount: 0,
			children: [
				{
					charCount: 0,
					children: [
						{
							charCount: 150,
							color: 'bg-emerald-50',
							id: 'page',
							name: 'page.tsx',
							type: 'file',
						},
						{
							charCount: 320,
							color: 'bg-emerald-50',
							id: 'layout',
							name: 'layout.tsx',
							type: 'file',
						},
					],
					color: 'bg-emerald-100',
					id: 'app',
					name: 'app',
					type: 'directory',
				},
				{
					charCount: 0,
					children: [
						{
							charCount: 0,
							children: [
								{
									charCount: 450,
									color: 'bg-amber-50',
									id: 'button',
									name: 'button.tsx',
									type: 'file',
								},
							],
							color: 'bg-amber-50',
							id: 'ui',
							name: 'ui',
							type: 'directory',
						},
					],
					color: 'bg-amber-100',
					id: 'components',
					name: 'components',
					type: 'directory',
				},
			],
			color: 'bg-violet-100',
			id: 'src',
			name: 'src',
			type: 'directory',
		},
		{
			charCount: 0,
			children: [
				{
					charCount: 1024,
					color: 'bg-red-50',
					id: 'favicon',
					name: 'favicon.ico',
					type: 'file',
				},
			],
			color: 'bg-red-100',
			id: 'public',
			name: 'public',
			type: 'directory',
		},
	],
	color: 'bg-blue-100',
	id: 'root',
	name: 'project-root',
	type: 'directory',
};

// Calculate character counts for directories based on their children
const calculateCharCounts = (item: FileSystemItem): number => {
	if (item.type === 'file') {
		return item.charCount;
	}

	let totalCount = 0;
	if (item.children) {
		for (const child of item.children) {
			child.charCount = calculateCharCounts(child);
			totalCount += child.charCount;
		}
	}

	return totalCount;
};

// Format character count with appropriate units
const formatCharCount = (count: number): string => {
	if (count < 1000) {
		return `${count} c`;
	}

	return count < 1000000
		? `${(count / 1000).toFixed(1)} kc`
		: `${(count / 1000000).toFixed(1)} Mc`;
};

export default function RepositoryStructure() {
	const [fileStructure, setFileStructure] = useState<DirectoryItem>(() => {
		const structure = JSON.parse(JSON.stringify(initialFileStructure));
		structure.charCount = calculateCharCounts(structure);
		return structure;
	});

	const [expandedItems, setExpandedItems] = useState<Set<string>>(
		new Set(['root', 'src', 'app', 'components']),
	);
	const [isPrototypingMode, setIsPrototypingMode] = useState<boolean>(false);
	const [notes, setNotes] = useState<Record<string, string>>({});
	const [showFiles, _setShowFiles] = useState<boolean>(true);

	// Function to collect all directory IDs
	const getAllDirectoryIds = (item: FileSystemItem): string[] => {
		if (item.type === 'file') {
			return [];
		}

		let ids = [item.id];
		if (item.children) {
			for (const child of item.children) {
				if (child.type === 'directory') {
					ids = [...ids, ...getAllDirectoryIds(child)];
				}
			}
		}
		return ids;
	};

	// Expand or collapse all folders
	const expandCollapseAll = (expand: boolean) => {
		if (expand) {
			// Get all directory IDs
			const allDirIds = getAllDirectoryIds(fileStructure);
			setExpandedItems(new Set(allDirIds));
		} else {
			// Only keep the root expanded
			setExpandedItems(new Set(['root']));
		}
	};

	const toggleExpand = (id: string): void => {
		const newExpandedItems = new Set(expandedItems);
		if (newExpandedItems.has(id)) {
			newExpandedItems.delete(id);
		} else {
			newExpandedItems.add(id);
		}
		setExpandedItems(newExpandedItems);
	};

	const _togglePrototypingMode = (): void => {
		setIsPrototypingMode(!isPrototypingMode);
	};

	const addNote = (id: string, note: string): void => {
		setNotes({
			...notes,
			[id]: note,
		});
	};

	const addNewItem = (parentId: string, isFile: boolean): void => {
		const newStructure = JSON.parse(JSON.stringify(fileStructure));

		const findParent = (item: FileSystemItem): DirectoryItem | null => {
			if (item.id === parentId) {
				return item.type === 'directory' ? item : null;
			}
			if (item.type === 'directory' && item.children) {
				for (const child of item.children) {
					const found = findParent(child);
					if (found) return found;
				}
			}
			return null;
		};

		const parent = findParent(newStructure);
		if (!parent) return;

		if (!parent.children) {
			parent.children = [];
		}

		const newId = `new-${Date.now()}`;
		const newItem: FileSystemItem = isFile
			? {
					charCount: 0,
					color: parent.color,
					id: newId,
					name: 'newfile.tsx',
					type: 'file',
				}
			: {
					charCount: 0,
					children: [],
					color: parent.color,
					id: newId,
					name: 'newfolder',
					type: 'directory',
				};

		parent.children.push(newItem);
		if (!isFile) {
			setExpandedItems(new Set([...expandedItems, newId]));
		}

		newStructure.charCount = calculateCharCounts(newStructure);
		setFileStructure(newStructure);
	};

	const renderFileStructure = (item: FileSystemItem, level = 0) => {
		const isExpanded = expandedItems.has(item.id);
		const isDirectory = item.type === 'directory';
		const indent = level * 16;

		// Skip files in prototyping mode if showFiles is false
		if (isPrototypingMode && !showFiles && !isDirectory) {
			return null;
		}

		return (
			<div key={item.id}>
				<button
					className={cn(
						'group flex w-full cursor-pointer items-center rounded px-2 py-1 text-left hover:bg-bg-primary',
						item.color,
					)}
					disabled={!isDirectory}
					onClick={() => isDirectory && toggleExpand(item.id)}
					onKeyDown={() => isDirectory && toggleExpand(item.id)}
					style={{ paddingLeft: `${indent}px` }}
					type="button"
				>
					<div className="mr-1 flex-shrink-0">
						{isDirectory ? (
							isExpanded ? (
								<ChevronDownIcon className="h-4 w-4" />
							) : (
								<ChevronRightIcon className="h-4 w-4" />
							)
						) : null}
					</div>

					<div className="mr-1 flex-shrink-0">
						{isDirectory ? (
							isExpanded ? (
								<FolderOpenIcon className="h-4 w-4 text-blue-500" />
							) : (
								<FolderIcon className="h-4 w-4 text-blue-500" />
							)
						) : (
							<FileIcon className="h-4 w-4 text-text-muted" />
						)}
					</div>

					<div className="flex-grow font-mono text-sm">{item.name}</div>

					<div className="ml-2 text-text-muted text-xs">
						{formatCharCount(item.charCount)}
					</div>

					{isPrototypingMode && (
						<div className="ml-2 hidden space-x-1 group-hover:flex">
							{isDirectory && (
								<>
									<button
										className="rounded p-1 hover:bg-bg-secondary"
										onClick={(e) => {
											e.stopPropagation();
											addNewItem(item.id, false);
										}}
										title="Add folder"
										type="button"
									>
										<FolderIcon className="h-3 w-3" />
									</button>
									<button
										className="rounded p-1 hover:bg-bg-secondary"
										onClick={(e) => {
											e.stopPropagation();
											addNewItem(item.id, true);
										}}
										title="Add file"
										type="button"
									>
										<FileIcon className="h-3 w-3" />
									</button>
								</>
							)}
							<button
								className="rounded p-1 hover:bg-bg-secondary"
								onClick={(e) => {
									e.stopPropagation();
									const note = prompt(
										'Enter note for this item:',
										notes[item.id] || '',
									);
									if (note !== null) {
										addNote(item.id, note);
									}
								}}
								title="Add note"
								type="button"
							>
								<EditIcon className="h-3 w-3" />
							</button>
						</div>
					)}
				</button>

				{isPrototypingMode && notes[item.id] && (
					<div
						className="ml-6 border-zinc-300 border-l-2 py-1 pr-2 pl-2 text-text-muted text-xs italic"
						style={{ marginLeft: `${indent + 24}px` }}
					>
						{notes[item.id]}
					</div>
				)}

				{isDirectory && isExpanded && item.children && (
					<div>
						{item.children.map((child: FileSystemItem) =>
							renderFileStructure(child, level + 1),
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="">
			<div className="rounded border bg-white shadow-sm">
				<header className="flex items-center justify-between border-b bg-bg-primary px-4 py-2">
					<div className="font-medium text-sm">EXPLORER</div>
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<span className="text-xs">Show Files:</span>
							{/* TODO: Replace with ShadCN Toggle Component */}
							<button
								className="rounded p-1 hover:bg-bg-secondary"
								onClick={() => expandCollapseAll(true)}
								title="Expand all"
								type="button"
							>
								<PlusSquareIcon className="h-5 w-5" />
							</button>
							<button
								className="rounded p-1 hover:bg-bg-secondary"
								onClick={() => expandCollapseAll(false)}
								title="Collapse all"
								type="button"
							>
								<MinusSquareIcon className="h-5 w-5" />
							</button>
						</div>
						<div className="text-text-muted text-xs">
							Total: {formatCharCount(fileStructure.charCount)}
						</div>
					</div>
				</header>
				<div className="max-h-[600px] overflow-auto">
					{renderFileStructure(fileStructure)}
				</div>
			</div>
		</div>
	);
}
