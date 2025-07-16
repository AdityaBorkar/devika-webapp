'use client';

import { Plus } from 'lucide-react';
import type React from 'react';

import { Button } from '@/components/ui/button';

export type TabType = 'all' | 'current' | 'upcoming' | 'completed';

interface CyclesHeaderProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
	onCreateCycle: () => void;
}

export const CyclesHeader: React.FC<CyclesHeaderProps> = ({
	activeTab,
	onTabChange,
	onCreateCycle,
}) => {
	return (
		<div className="border-zinc-200 border-b dark:border-zinc-800">
			<div className="flex items-center justify-between px-4 py-3">
				<div className="flex space-x-1">
					<button
						className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
							activeTab === 'all'
								? 'bg-bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-bg-primary dark:hover:bg-bg-secondary/60'
						}`}
						onClick={() => onTabChange('all')}
						type="button"
					>
						All Cycles
					</button>
					<button
						className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
							activeTab === 'current'
								? 'bg-bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-bg-primary dark:hover:bg-bg-secondary/60'
						}`}
						onClick={() => onTabChange('current')}
						type="button"
					>
						Current
					</button>
					<button
						className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
							activeTab === 'upcoming'
								? 'bg-bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-bg-primary dark:hover:bg-bg-secondary/60'
						}`}
						onClick={() => onTabChange('upcoming')}
						type="button"
					>
						Upcoming
					</button>
					<button
						className={`rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
							activeTab === 'completed'
								? 'bg-bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-bg-primary dark:hover:bg-bg-secondary/60'
						}`}
						onClick={() => onTabChange('completed')}
						type="button"
					>
						Completed
					</button>
				</div>

				<div className="flex items-center space-x-2">
					<Button
						className="font-medium text-sm transition-all hover:shadow-md"
						onClick={onCreateCycle}
						size="sm"
					>
						<Plus className="mr-1 h-4 w-4" />
						New Cycle
					</Button>
				</div>
			</div>
		</div>
	);
};
{
	/* <Select
onValueChange={(value) =>
	onFilterChange(value as CycleStatus | 'All')
}
value={filterState.status}
>
<SelectTrigger className="w-[150px]">
	<SelectValue placeholder="Status" />
</SelectTrigger>
<SelectContent>
	{statusOptions.map((option) => (
		<SelectItem key={option.value} value={option.value}>
			{option.label}
		</SelectItem>
	))}
</SelectContent>
</Select>

<Select
onValueChange={(value) => onSortChange(value)}
value={sortState.column}
>
<SelectTrigger className="w-[150px]">
	<SelectValue placeholder="Sort by" />
</SelectTrigger>
<SelectContent>
	{sortOptions.map((option) => (
		<SelectItem key={option.value} value={option.value}>
			{option.label}
		</SelectItem>
	))}
</SelectContent>
</Select> */
}
