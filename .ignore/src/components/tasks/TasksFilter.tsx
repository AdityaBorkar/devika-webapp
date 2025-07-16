import { Filter } from 'lucide-react';
import type React from 'react';

import type { ColumnFiltersState } from '../../../types/types';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from './utils';

interface TasksFilterProps {
	columnFilters: ColumnFiltersState;
	setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

export const TasksFilter: React.FC<TasksFilterProps> = ({
	columnFilters,
	setColumnFilters,
}) => {
	const statusFilter =
		(columnFilters.find((f) => f.id === 'status')?.value as string) || 'all';
	const priorityFilter =
		(columnFilters.find((f) => f.id === 'priority')?.value as string) || 'all';

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setColumnFilters((prev) => {
			// Remove the existing status filter if it exists
			const filtered = prev.filter((f) => f.id !== 'status');

			// Only add the filter if it's not "all"
			if (value !== 'all') {
				return [...filtered, { id: 'status', value }];
			}

			return filtered;
		});
	};

	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setColumnFilters((prev) => {
			// Remove the existing priority filter if it exists
			const filtered = prev.filter((f) => f.id !== 'priority');

			// Only add the filter if it's not "all"
			if (value !== 'all') {
				return [...filtered, { id: 'priority', value }];
			}

			return filtered;
		});
	};

	return (
		<div className="flex items-center gap-4 border-zinc-200 border-b px-4 py-2 dark:border-zinc-800">
			<div className="flex items-center gap-1">
				<Filter className="text-text-muted" size={16} />
				<span className="font-medium text-sm text-text-muted dark:text-text-tertiary">
					Filters:
				</span>
			</div>

			<div className="flex items-center gap-2">
				<select
					aria-label="Filter by status"
					className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-bg-primary"
					onChange={handleStatusChange}
					value={statusFilter}
				>
					{STATUS_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				<select
					aria-label="Filter by priority"
					className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-bg-primary"
					onChange={handlePriorityChange}
					value={priorityFilter}
				>
					{PRIORITY_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
