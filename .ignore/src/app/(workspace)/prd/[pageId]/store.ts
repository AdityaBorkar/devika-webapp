import { atom } from 'jotai';

const data = `<h1>Product Requirements Document</h1>
<p>This is an example of how to use the MDX editor component.</p>
<h2>Key Features</h2>
<ul>
  <li>Format text using the toolbar</li>
  <li>Create lists and headings</li>
  <li>Add code blocks for technical documentation</li>
</ul>
<p>Try editing this content to see how it works!</p>
<pre><code>// Example code block
function helloWorld() {
  console.log("Hello from the MDX editor!");
}</code></pre>
`;

export const NoteContentAtom = atom<string>(data);
