export function exportToMarkdown(content: string) {
	// Simple HTML to Markdown conversion (in a real app, use a proper converter library)
	const markdown = content
		.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
		.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
		.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
		.replace(/<p>(.*?)<\/p>/g, '$1\n\n')
		.replace(/<ul>(.*?)<\/ul>/g, '$1\n')
		.replace(/<li>(.*?)<\/li>/g, '- $1\n')
		.replace(/<pre><code>(.*?)<\/code><\/pre>/g, '```\n$1\n```\n\n')
		.replace(/<code>(.*?)<\/code>/g, '`$1`')
		.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
		.replace(/<em>(.*?)<\/em>/g, '*$1*');
	return markdown;
}
