import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { CycleStatus } from './types';

interface CyclesToolbarProps {
	onShowFilterPanel: () => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onSaveView: () => void;
	currentStatus: CycleStatus | 'All';
	onStatusChange: (status: CycleStatus | 'All') => void;
}

export const CyclesToolbar: React.FC<CyclesToolbarProps> = ({
	onShowFilterPanel,
	searchQuery,
	setSearchQuery,
	onSaveView,
	currentStatus,
	onStatusChange,
}) => {
	return (
		<div className="flex items-center justify-between border-zinc-200 border-b bg-bg-primary/50 px-4 py-3 dark:border-zinc-800 dark:bg-bg-primary/20">
			<div className="flex items-center gap-3">
				<Button
					className="flex items-center gap-1 border border-zinc-200 bg-white text-text-primary text-xs shadow-sm hover:bg-bg-primary dark:border-zinc-700 dark:bg-bg-secondary dark:text-text-secondary dark:hover:bg-bg-secondary/80"
					onClick={onShowFilterPanel}
					size="sm"
					variant="outline"
				>
					<Filter
						className="text-text-muted dark:text-text-tertiary"
						size={14}
					/>
					<span>Filter</span>
				</Button>

				<div className="relative max-w-xs">
					<Search
						className="-tranzinc-y-1/2 pointer-events-none absolute top-1/2 left-3 transform text-text-tertiary"
						size={14}
					/>
					<Input
						className="h-8 border-zinc-200 bg-white pl-9 text-sm focus-visible:ring-primary/20 dark:border-zinc-700 dark:bg-bg-secondary"
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search cycles..."
						type="text"
						value={searchQuery}
					/>
				</div>

				<Select
					defaultValue={currentStatus}
					onValueChange={(value) =>
						onStatusChange(value as CycleStatus | 'All')
					}
					value={currentStatus}
				>
					<SelectTrigger className="h-8 w-[160px] border-zinc-200 bg-white text-sm focus:ring-primary/20 dark:border-zinc-700 dark:bg-bg-secondary">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Statuses</SelectItem>
						<SelectItem value="Not Started">Not Started</SelectItem>
						<SelectItem value="In Progress">In Progress</SelectItem>
						<SelectItem value="Completed">Completed</SelectItem>
						<SelectItem value="Cancelled">Cancelled</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="border border-zinc-200 bg-white text-text-primary text-xs shadow-sm hover:bg-bg-primary dark:border-zinc-700 dark:bg-bg-secondary dark:text-text-secondary dark:hover:bg-bg-secondary/80"
					onClick={onSaveView}
					size="sm"
					variant="outline"
				>
					Save View
				</Button>

				<Button
					className="flex items-center gap-1 border border-zinc-200 bg-white text-text-primary text-xs shadow-sm hover:bg-bg-primary dark:border-zinc-700 dark:bg-bg-secondary dark:text-text-secondary dark:hover:bg-bg-secondary/80"
					size="sm"
					variant="outline"
				>
					<SlidersHorizontal
						className="text-text-muted dark:text-text-tertiary"
						size={14}
					/>
					<span>Display</span>
				</Button>
			</div>
		</div>
	);
};
