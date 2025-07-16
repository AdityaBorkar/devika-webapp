import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import type { Editor } from '@tiptap/core';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PiCaretDown, PiChecks, PiEye, PiPencilLine } from 'react-icons/pi';

import { NoteContentAtom } from '@/app/(workspace)/prd/[pageId]/store';
import { MDXEditor } from '@/components/editors/PrdEditor';
import { DocumentOutline } from '@/components/editors/PrdEditor/DocumentOutline';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function EditorUI() {
	// Support for undo-redo
	// Highlight - rose/orange for AI questions
	// AI shall ask questions for specific sections. You must answer the questions.
	// Gemini-2.5-Flash-Preview & Gemini-2.0-Flash via OpenRouter

	const _fileName = 'List of Docs';
	const tokenCount = 5000;
	// const editorRef = useRef<HTMLDivElement>(null);
	// const [content, setContent] = useState('');
	// const [viewMode, setViewMode] = useState<ViewMode>('Edit');

	const [content, setContent] = useAtom(NoteContentAtom);

	const editorRef = useRef<HTMLDivElement>(null);
	const [viewMode, setViewMode] = useState<ViewMode>('Edit');

	// Function to cycle through view modes
	const cycleViewMode = useCallback(() => {
		const modes: ViewMode[] = ['Edit', 'Review', 'Read'];
		const currentIndex = modes.indexOf(viewMode);
		const nextIndex = (currentIndex + 1) % modes.length;
		setViewMode(modes[nextIndex]);
	}, [viewMode]);

	// Set up keyboard shortcut (Ctrl+/)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === '/') {
				e.preventDefault();
				cycleViewMode();
				// animation of "active" state
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [cycleViewMode]);

	// Function to scroll to a heading when clicked in the outline
	const scrollToHeading = (id: string) => {
		if (!editorRef.current) return;

		// Find the editor's iframe (TipTap uses an iframe)
		const editorIframe = editorRef.current.querySelector('iframe');
		if (!editorIframe) return;

		// Access the document within the iframe
		const iframeDoc =
			editorIframe.contentDocument || editorIframe.contentWindow?.document;
		if (!iframeDoc) return;

		// Find the heading element by ID
		const headingElement = iframeDoc.getElementById(id);
		if (!headingElement) return;

		// Scroll the heading into view
		headingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	// Use a ref to track the timeout ID for debouncing
	const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Clear timeout on unmount to prevent memory leaks
	useEffect(() => {
		return () => {
			if (autoSaveTimeoutRef.current) {
				clearTimeout(autoSaveTimeoutRef.current);
			}
		};
	}, []);

	function onUpdate({ editor }: { editor: Editor }) {
		const _newContent = editor.getHTML();

		// // If auto-save is enabled, debounce the onChange call
		// if (autoSave) {
		// 	if (autoSaveTimeoutRef.current) {
		// 		clearTimeout(autoSaveTimeoutRef.current);
		// 	}

		// 	autoSaveTimeoutRef.current = setTimeout(() => {
		// 		onChange(newContent);
		// 	}, AUTO_SAVE_DELAY);
		// } else {
		// 	// If auto-save is disabled, call onChange immediately
		// 	onChange(newContent);
		// }
	}

	type ViewMode = 'Edit' | 'Review' | 'Read';

	return (
		<div className="relative w-full">
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						'absolute top-0 right-0',
						'flex w-fit flex-row items-center justify-between gap-2 rounded-md border bg-bg-tertiary200 px-3 py-1 font-medium',
						viewMode === 'Edit' &&
							'border-amber-400 bg-amber-200 text-amber-800',
						viewMode === 'Review' &&
							'border-purple-400 bg-purple-200 text-purple-800',
						viewMode === 'Read' &&
							'border-zinc-400 bg-bg-tertiary200 text-text-primary',
					)}
				>
					{/* TODO: Animate SVG Morph + Number Counter Effect */}
					<span>
						<PiPencilLine className="-mt-0.5 mr-1.5 inline-block" />
						{viewMode}
					</span>
					<PiCaretDown />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-24">
					<DropdownMenuItem
						className="px-3"
						onClick={() => setViewMode('Edit')}
					>
						<PiPencilLine className="mr-1.5" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						className="px-3"
						onClick={() => setViewMode('Review')}
					>
						<PiChecks className="mr-1.5" />
						Review
					</DropdownMenuItem>
					<DropdownMenuItem
						className="px-3"
						onClick={() => setViewMode('Read')}
					>
						<PiEye className="mr-1.5" />
						Read
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<div className="w-72 border-border border-b p-4">
				<DocumentOutline content={content} onHeadingClick={scrollToHeading} />
				<div className="mt-6 text-muted-foreground text-xs">
					Token Count: {tokenCount}
				</div>
			</div>

			<div ref={editorRef}>
				<MDXEditor
					className="mx-auto min-h-[300px] max-w-[44rem] border-border border-b pb-8"
					content={content}
					onChange={setContent}
					onUpdate={onUpdate}
					placeholder={
						<div className="border-t bg-text-primary px-3 py-2 text-text-muted text-xs">
							{'Type '}
							<kbd className="rounded bg-text-secondary px-1 py-0.5 text-text-primary">
								/
							</kbd>
							{' for commands or '}
							<kbd className="rounded bg-text-secondary px-1 py-0.5 text-text-primary">
								@
							</kbd>
							{' to reference documents • Use '}
							<kbd className="rounded bg-text-secondary px-1 py-0.5 text-text-primary">
								Ctrl+Alt+1-3
							</kbd>
							{' for headings'}
						</div>
					}
				/>
			</div>
		</div>
	);
}
