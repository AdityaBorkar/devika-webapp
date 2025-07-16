# MDX Editor

A minimalist rich text editor for MDX files with auto-save functionality, slash commands, document references, and Google Docs-style keyboard shortcuts built with TipTap.

## Features

- Rich text editing with markdown formatting
- Support for headings, lists, code blocks, and inline formatting
- Auto-save functionality with configurable debouncing
- Slash commands (/) for quick formatting
- Document references with @ mentions
- Google Docs-style keyboard shortcuts
- Clean HTML output that can be used with MDX
- No toolbar UI for a distraction-free writing experience

## Installation

The editor uses the following dependencies which are already included in the project:

- `@tiptap/react` and core extensions
- `@tiptap/extension-mention` for slash commands and document references
- `@tiptap/extension-strike` and `@tiptap/extension-underline` for additional formatting
- TailwindCSS typography plugin for styling

## Usage

```tsx
import { MDXEditor } from '@/components/editors/PrdEditor';
import { useState } from 'react';

function MyMDXEditorComponent() {
  const [content, setContent] = useState('<p>Initial content</p>');
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Content is automatically saved via auto-save functionality
    console.log('Content updated:', newContent);
  };
  
  // Example document references
  const documentReferences = [
    { id: 'doc1', title: 'Getting Started' },
    { id: 'doc2', title: 'API Reference' },
    { id: 'doc3', title: 'Troubleshooting' },
  ];
  
  return (
    <MDXEditor
      content={content}
      onChange={handleContentChange}
      className="my-custom-class" // Optional
      placeholder="Start writing..." // Optional
      autoSave={true} // Optional, defaults to true
      documentReferences={documentReferences} // Optional
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `content` | string | The initial HTML content |
| `onChange` | (content: string) => void | Callback function when content changes |
| `className` | string? | Optional CSS class to add to the editor container |
| `placeholder` | string? | Optional placeholder text when editor is empty |
| `autoSave` | boolean? | Enable/disable auto-save functionality (defaults to true) |
| `documentReferences` | Array<{ id: string; title: string }>? | List of documents that can be referenced with @ mentions |

## Commands

### Slash Commands (/)

Type `/` to access the following commands:

- Heading 1
- Heading 2
- Heading 3
- Bullet List
- Numbered List
- Code Block

### Document References (@)

Type `@` to reference other documents. The editor will display a dropdown menu with matching documents based on what you type.

## Keyboard Shortcuts

The editor supports Google Docs-style keyboard shortcuts:

| Feature | Shortcut (Windows/Linux) | Shortcut (Mac) |
|---------|--------------------------|----------------|
| Bold | Ctrl+B | Cmd+B |
| Italic | Ctrl+I | Cmd+I |
| Underline | Ctrl+U | Cmd+U |
| Strikethrough | Alt+Shift+5 | Alt+Shift+5 |
| Heading 1 | Ctrl+Alt+1 | Cmd+Alt+1 |
| Heading 2 | Ctrl+Alt+2 | Cmd+Alt+2 |
| Heading 3 | Ctrl+Alt+3 | Cmd+Alt+3 |
| Normal Text | Ctrl+Alt+0 | Cmd+Alt+0 |
| Bullet List | Ctrl+Shift+8 | Cmd+Shift+8 |
| Numbered List | Ctrl+Shift+7 | Cmd+Shift+7 |
| Code Block | Ctrl+Shift+X | Cmd+Shift+X |
| Undo | Ctrl+Z | Cmd+Z |
| Redo | Ctrl+Shift+Z | Cmd+Shift+Z |

## Extending

To add more functionality to the editor:

1. Import additional TipTap extensions
2. Add them to the extensions array in the editor configuration
3. Add new slash commands in the command list
4. Add new keyboard shortcuts using the handleKeyDown property

## Working with MDX

This editor produces HTML output that can be used as the content for MDX files. 
When storing content, you may want to:

1. Convert the HTML to pure markdown for storage
2. Process the HTML before rendering with MDX

## Example

See the `example.mdx` file for a demonstration of the editor's capabilities. 