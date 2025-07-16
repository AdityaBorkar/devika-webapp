'use client';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import {
	Bold as BoldIcon,
	Code as CodeIcon,
	Heading1,
	Heading2,
	Heading3,
	Italic as ItalicIcon,
	List,
	ListOrdered,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';

interface TipTapEditorProps {
	content: string;
	onChange: (content: string) => void;
	className?: string;
}

export function TipTapEditor({
	content,
	onChange,
	className,
}: TipTapEditorProps) {
	const editor = useEditor({
		content,
		extensions: [
			Document,
			Paragraph,
			Text,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			Bold,
			Italic,
			Code,
			CodeBlock,
			BulletList,
			OrderedList,
			ListItem,
		],
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className={cn('overflow-hidden rounded-md border', className)}>
			<div className="flex items-center gap-1 border-b bg-bg-primary p-2">
				<Button
					className={editor.isActive('bold') ? 'bg-bg-secondary' : ''}
					onClick={() => editor.chain().focus().toggleBold().run()}
					size="icon"
					variant="ghost"
				>
					<BoldIcon className="h-4 w-4" />
				</Button>
				<Button
					className={editor.isActive('italic') ? 'bg-bg-secondary' : ''}
					onClick={() => editor.chain().focus().toggleItalic().run()}
					size="icon"
					variant="ghost"
				>
					<ItalicIcon className="h-4 w-4" />
				</Button>
				<Button
					className={
						editor.isActive('heading', { level: 1 }) ? 'bg-bg-secondary' : ''
					}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					size="icon"
					variant="ghost"
				>
					<Heading1 className="h-4 w-4" />
				</Button>
				<Button
					className={
						editor.isActive('heading', { level: 2 }) ? 'bg-bg-secondary' : ''
					}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					size="icon"
					variant="ghost"
				>
					<Heading2 className="h-4 w-4" />
				</Button>
				<Button
					className={
						editor.isActive('heading', { level: 3 }) ? 'bg-bg-secondary' : ''
					}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					size="icon"
					variant="ghost"
				>
					<Heading3 className="h-4 w-4" />
				</Button>
				<Button
					className={editor.isActive('bulletList') ? 'bg-bg-secondary' : ''}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					size="icon"
					variant="ghost"
				>
					<List className="h-4 w-4" />
				</Button>
				<Button
					className={editor.isActive('orderedList') ? 'bg-bg-secondary' : ''}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					size="icon"
					variant="ghost"
				>
					<ListOrdered className="h-4 w-4" />
				</Button>
				<Button
					className={editor.isActive('code') ? 'bg-bg-secondary' : ''}
					onClick={() => editor.chain().focus().toggleCode().run()}
					size="icon"
					variant="ghost"
				>
					<CodeIcon className="h-4 w-4" />
				</Button>
			</div>
			<EditorContent
				className="prose prose-sm min-h-[200px] max-w-none p-4 focus-visible:outline-none"
				editor={editor}
			/>
		</div>
	);
}
