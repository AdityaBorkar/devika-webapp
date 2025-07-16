import { Extension } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import type { Editor } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';

// Define the command item interface
export interface CommandItem {
	id: string;
	label: string;
	description?: string;
	action: (props: { editor: Editor; range: any }) => void;
}

// Define document reference interface
export interface DocumentReference {
	id: string;
	title: string;
}

// Create default commands for editor
export const createDefaultCommands = (): CommandItem[] => [
	{
		action: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 1 })
				.run();
		},
		description: 'Big section heading',
		id: 'h1',
		label: 'Heading 1',
	},
	{
		action: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 2 })
				.run();
		},
		description: 'Medium section heading',
		id: 'h2',
		label: 'Heading 2',
	},
	{
		action: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 3 })
				.run();
		},
		description: 'Small section heading',
		id: 'h3',
		label: 'Heading 3',
	},
	{
		action: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run();
		},
		description: 'Create a bulleted list',
		id: 'bullet',
		label: 'Bullet List',
	},
	{
		action: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run();
		},
		description: 'Create a numbered list',
		id: 'number',
		label: 'Numbered List',
	},
	{
		action: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
		},
		description: 'Insert a code block',
		id: 'code',
		label: 'Code Block',
	},
];

// Create default document references when none provided
export const defaultDocumentReferences: DocumentReference[] = [
	{ id: 'doc1', title: 'Getting Started' },
	{ id: 'doc2', title: 'API Reference' },
	{ id: 'doc3', title: 'Deployment Guide' },
];

// Helper to create a dropdown popup
const createDropdownPopup = (
	props: any,
	items: any[],
	onSelect: (item: any) => void,
) => {
	const element = document.createElement('div');
	element.className =
		'bg-white shadow-lg rounded-md p-1 border border-zinc-200 absolute z-50';

	items.forEach((item) => {
		const button = document.createElement('button');
		button.className =
			'block w-full text-left px-3 py-2 rounded hover:bg-bg-primary';
		button.innerHTML = item.description
			? `<div>${item.label || item.title}</div><div class="text-xs text-text-muted">${item.description}</div>`
			: item.label || item.title;

		button.addEventListener('click', () => {
			onSelect(item);
		});

		element.appendChild(button);
	});

	// Position the element
	const rect = props.clientRect?.();
	if (rect) {
		element.style.top = `${rect.top + window.scrollY + rect.height}px`;
		element.style.left = `${rect.left + window.scrollX}px`;
	}

	document.body.appendChild(element);

	return {
		destroy: () => {
			if (document.body.contains(element)) {
				document.body.removeChild(element);
			}
		},
		element,
	};
};

// Create slash commands extension
export function createSlashCommandsExtension(commands: CommandItem[]) {
	return Extension.create({
		addOptions() {
			return {
				suggestion: {
					char: '/',
					command: ({
						editor,
						range,
						props,
					}: {
						editor: Editor;
						range: any;
						props: any;
					}) => {
						props.action({ editor, range });
					},
				},
			};
		},
		addProseMirrorPlugins() {
			return [
				Suggestion({
					editor: this.editor,
					...this.options.suggestion,
					items: ({ query }: { query: string }) => {
						return commands
							.filter((item) =>
								item.label.toLowerCase().includes(query.toLowerCase()),
							)
							.slice(0, 5);
					},
					render: () => {
						let popup: { destroy: () => void } | null = null;

						return {
							onExit: () => {
								popup?.destroy();
							},
							onKeyDown: (props: any) => {
								if (props.event.key === 'Escape') {
									popup?.destroy();
									return true;
								}
								return false;
							},
							onStart: (props: any) => {
								popup = createDropdownPopup(props, props.items, (item) => {
									props.command(item);
									popup?.destroy();
								});
							},
							onUpdate: (props: any) => {
								if (popup) {
									popup.destroy();
									popup = createDropdownPopup(props, props.items, (item) => {
										props.command(item);
										popup?.destroy();
									});
								}
							},
						};
					},
				}),
			];
		},
		name: 'slashCommands',
	});
}

// Create document reference extension
export function createDocumentReferenceExtension(
	documentReferences: DocumentReference[],
) {
	return Mention.configure({
		HTMLAttributes: {
			class: 'bg-blue-100 px-1 py-0.5 rounded text-blue-800 font-medium',
		},
		suggestion: {
			char: '@',
			items: ({ query }: { query: string }) => {
				return documentReferences
					.filter((item) =>
						item.title.toLowerCase().includes(query.toLowerCase()),
					)
					.slice(0, 5);
			},
			render: () => {
				let popup: { destroy: () => void } | null = null;

				return {
					onExit: () => {
						popup?.destroy();
					},
					onKeyDown: (props: any) => {
						if (props.event.key === 'Escape') {
							popup?.destroy();
							return true;
						}
						return false;
					},
					onStart: (props: any) => {
						popup = createDropdownPopup(props, props.items, (item) => {
							props.command({ id: item.id, label: item.title });
							popup?.destroy();
						});
					},
					onUpdate: (props: any) => {
						if (popup) {
							popup.destroy();
							popup = createDropdownPopup(props, props.items, (item) => {
								props.command({ id: item.id, label: item.title });
								popup?.destroy();
							});
						}
					},
				};
			},
		},
	});
}
