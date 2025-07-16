'use client';

import { LayoutGrid, Table } from 'lucide-react';
import type { ViewMode } from 'types/tech-stack';

import { cn } from '@/lib/utils';

interface ViewToggleProps {
	viewMode: ViewMode;
	onToggle: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
	return (
		<div className="flex overflow-hidden rounded-md border">
			<button
				className={cn(
					'flex items-center gap-2 px-3 py-2 transition-colors',
					viewMode === 'card'
						? 'bg-bg-primary text-primary-foreground'
						: 'hover:bg-accent',
				)}
				onClick={() => onToggle('card')}
				type="button"
			>
				<LayoutGrid className="h-4 w-4" />
				<span className="text-sm">Cards</span>
			</button>
			<button
				className={cn(
					'flex items-center gap-2 px-3 py-2 transition-colors',
					viewMode === 'table'
						? 'bg-bg-primary text-primary-foreground'
						: 'hover:bg-accent',
				)}
				onClick={() => onToggle('table')}
				type="button"
			>
				<Table className="h-4 w-4" />
				<span className="text-sm">Table</span>
			</button>
		</div>
	);
}
