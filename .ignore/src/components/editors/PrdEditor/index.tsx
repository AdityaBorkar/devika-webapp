'use client';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';

import { cn } from '@/lib/utils';
import {
	createDefaultCommands,
	createDocumentReferenceExtension,
	createSlashCommandsExtension,
	type DocumentReference,
	defaultDocumentReferences,
} from './MDXCommands';

// Auto-save debounce delay in milliseconds
const _AUTO_SAVE_DELAY = 1000;

interface MDXEditorProps {
	content: string;
	onChange: (content: string) => void;
	onUpdate: (editor: any) => void;
	className?: string;
	placeholder?: React.ReactNode;
	autoSave?: boolean;
	documentReferences?: DocumentReference[];
}

// Function to generate unique IDs for headings based on content
function generateHeadingId(text: string): string {
	// Convert to lowercase, remove special chars, replace spaces with dashes
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

// Custom extension to add IDs to headings
const HeadingWithID = Heading.extend({
	renderHTML({ node, HTMLAttributes }) {
		const level = node.attrs.level;
		const headingText = node.textContent;
		const id = generateHeadingId(headingText);

		return [`h${level}`, { ...HTMLAttributes, id }, 0];
	},
});

export function MDXEditor({
	content,
	onChange,
	onUpdate,
	className,
	placeholder,
	autoSave = true,
	documentReferences = defaultDocumentReferences,
}: MDXEditorProps) {
	const editor = useEditor({
		content,
		editorProps: {
			attributes: {
				class:
					'dark:prose-invert focus:outline-none max-w-none prose prose-sm prose-zinc',
			},
			handleKeyDown: (view, event) => {
				// Google Docs style shortcuts

				// Cmd/Ctrl + Alt + 0 - Normal text
				if (
					(event.metaKey || event.ctrlKey) &&
					event.altKey &&
					event.key === '0'
				) {
					view.state.tr.setSelection(view.state.selection);
					editor?.chain().focus().setParagraph().run();
					return true;
				}

				// Cmd/Ctrl + Alt + [1-3] - Heading levels
				if (
					(event.metaKey || event.ctrlKey) &&
					event.altKey &&
					['1', '2', '3'].includes(event.key)
				) {
					const level = Number.parseInt(event.key, 10) as 1 | 2 | 3;
					editor?.chain().focus().toggleHeading({ level }).run();
					return true;
				}

				// Cmd/Ctrl + Shift + 7 - Ordered list (Google Docs uses Cmd/Ctrl + Shift + 7)
				if (
					(event.metaKey || event.ctrlKey) &&
					event.shiftKey &&
					event.key === '7'
				) {
					editor?.chain().focus().toggleOrderedList().run();
					return true;
				}

				// Cmd/Ctrl + Shift + 8 - Bullet list (Google Docs uses Cmd/Ctrl + Shift + 8)
				if (
					(event.metaKey || event.ctrlKey) &&
					event.shiftKey &&
					event.key === '8'
				) {
					editor?.chain().focus().toggleBulletList().run();
					return true;
				}

				// Alt + Shift + 5 - Strikethrough (Google Docs shortcut)
				if (event.altKey && event.shiftKey && event.key === '5') {
					editor?.chain().focus().toggleStrike().run();
					return true;
				}

				// Cmd/Ctrl + Shift + X - Code block
				if (
					(event.metaKey || event.ctrlKey) &&
					event.shiftKey &&
					event.key === 'x'
				) {
					editor?.chain().focus().toggleCodeBlock().run();
					return true;
				}

				return false;
			},
		},
		extensions: [
			Document,
			Paragraph,
			Text,
			HeadingWithID.configure({
				levels: [1, 2, 3],
			}),
			Bold.configure({
				HTMLAttributes: {
					class: 'font-bold',
				},
				// Google Docs shortcut: Cmd+B or Ctrl+B
				// Already default in TipTap
			}),
			Italic.configure({
				HTMLAttributes: {
					class: 'italic',
				},
				// Google Docs shortcut: Cmd+I or Ctrl+I
				// Already default in TipTap
			}),
			Underline.configure({
				HTMLAttributes: {
					class: 'underline',
				},
				// Google Docs shortcut: Cmd+U or Ctrl+U
				// Already default in TipTap
			}),
			Strike.configure({
				HTMLAttributes: {
					class: 'line-through',
				},
				// Google Docs shortcut: Alt+Shift+5
			}),
			Code.configure({
				HTMLAttributes: {
					class: 'bg-bg-primary font-mono px-1 py-0.5 rounded text-sm',
				},
			}),
			CodeBlock.configure({
				HTMLAttributes: {
					class: 'bg-bg-primary font-mono p-4 rounded-md text-sm',
				},
			}),
			BulletList.configure({
				HTMLAttributes: {
					class: 'list-disc pl-6',
				},
				// Google Docs shortcut: Shift+Cmd+8 or Shift+Ctrl+8
				// Will add via keymap
			}),
			OrderedList.configure({
				HTMLAttributes: {
					class: 'list-decimal pl-6',
				},
				// Google Docs shortcut: Shift+Cmd+7 or Shift+Ctrl+7
				// Will add via keymap
			}),
			ListItem,
			History.configure({
				// Google Docs shortcuts for undo/redo: Cmd+Z, Cmd+Shift+Z
				// Default in TipTap already
			}),
			// Add slash commands
			createSlashCommandsExtension(createDefaultCommands()),
			// Add document references
			createDocumentReferenceExtension(documentReferences),
		],
		onUpdate,
	});

	if (!editor) {
		return null;
	}

	return (
		<div className={cn('', className)}>
			<EditorContent
				className="min-h-[300px] prose-ol:list-decimal prose-ul:list-disc prose-code:rounded prose-pre:rounded-md prose-code:bg-bg-primary prose-pre:bg-bg-primary p-6 prose-pre:p-4 prose-code:px-1 prose-code:py-0.5 prose-headings:font-semibold prose-p:text-text-primary prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-bg-secondary dark:prose-pre:bg-bg-secondary dark:prose-p:text-text-secondary"
				editor={editor}
			/>
		</div>
	);
}
