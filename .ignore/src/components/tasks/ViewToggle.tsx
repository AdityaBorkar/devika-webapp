import { Grid, List } from 'lucide-react';
import type React from 'react';

export type ViewMode = 'list' | 'board';

interface ViewToggleProps {
	viewMode: ViewMode;
	onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
	viewMode,
	onChange,
}) => {
	return (
		<div className="flex items-center overflow-hidden rounded-md bg-bg-primary dark:bg-bg-secondary">
			<button
				aria-label="List view"
				aria-pressed={viewMode === 'list'}
				className={`flex items-center justify-center p-2 ${
					viewMode === 'list'
						? 'bg-white shadow-sm dark:bg-bg-tertiary'
						: 'text-text-muted hover:text-text-primary dark:hover:text-text-secondary'
				}`}
				onClick={() => onChange('list')}
				type="button"
			>
				<List size={16} />
			</button>
			<button
				aria-label="Board view"
				aria-pressed={viewMode === 'board'}
				className={`flex items-center justify-center p-2 ${
					viewMode === 'board'
						? 'bg-white shadow-sm dark:bg-bg-tertiary'
						: 'text-text-muted hover:text-text-primary dark:hover:text-text-secondary'
				}`}
				onClick={() => onChange('board')}
				type="button"
			>
				<Grid size={16} />
			</button>
		</div>
	);
};
