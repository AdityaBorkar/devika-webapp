import { useEffect, useState } from 'react';

interface HeadingItem {
	id: string;
	text: string;
	level: number;
	position: number;
}

interface DocumentOutlineProps {
	content: string;
	onHeadingClick: (id: string) => void;
	className?: string;
}

export function DocumentOutline({
	content,
	onHeadingClick,
	className = '',
}: DocumentOutlineProps) {
	const [headings, setHeadings] = useState<HeadingItem[]>([]);

	// Parse headings from content whenever content changes
	useEffect(() => {
		if (!content) {
			setHeadings([]);
			return;
		}

		// Create a temporary DOM element to parse the HTML content
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;

		// Find all heading elements (h1, h2, h3)
		const headingElements = tempDiv.querySelectorAll('h1, h2, h3');

		const extractedHeadings: HeadingItem[] = [];

		headingElements.forEach((el, index) => {
			// Generate a unique ID if one doesn't exist
			const id = el.id || `heading-${index}`;

			// Set the ID on the element for future reference
			if (!el.id) {
				el.id = id;
			}

			// Get the level from the tag name (h1 = 1, h2 = 2, h3 = 3)
			const level = Number.parseInt(el.tagName.substring(1), 10);

			extractedHeadings.push({
				id,
				level,
				position: index,
				text: el.textContent || '',
			});
		});

		setHeadings(extractedHeadings);
	}, [content]);

	// Generate indentation based on heading level
	const getIndentation = (level: number) => {
		return `ml-${(level - 1) * 4}`;
	};

	// Don't render if there are no headings
	if (headings.length === 0) {
		return (
			<div className={`text-sm text-text-muted italic ${className}`}>
				No headings found. Add headings to generate an outline.
			</div>
		);
	}

	return (
		<div className={`space-y-2 ${className}`}>
			<h3 className="mb-2 font-medium text-text-primary">Document Outline</h3>
			<ul className="space-y-1">
				{headings.map((heading) => (
					<li className={getIndentation(heading.level)} key={heading.id}>
						<button
							className="w-full truncate text-left hover:text-blue-600 hover:underline"
							onClick={() => onHeadingClick(heading.id)}
							title={heading.text}
							type="button"
						>
							<span className="mr-1 text-text-tertiary text-xs">
								{heading.level === 1 ? '§' : heading.level === 2 ? '§§' : '§§§'}
							</span>
							{heading.text}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
