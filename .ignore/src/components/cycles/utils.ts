import type { Cycle, CycleStatus, SortState } from './types';

/**
 * Format a date string to a more readable format
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

/**
 * Format tokens consumed to a readable format with K/M suffix
 */
export function formatTokens(tokens: number): string {
	if (tokens >= 1000000) {
		return `${(tokens / 1000000).toFixed(1)}M`;
	}
	if (tokens >= 1000) {
		return `${(tokens / 1000).toFixed(1)}K`;
	}
	return tokens.toString();
}

/**
 * Calculate days remaining or overdue for a cycle
 */
export function getDaysRemaining(endDate: string): {
	days: number;
	isOverdue: boolean;
} {
	const end = new Date(endDate);
	const today = new Date();

	// Reset hours to compare just dates
	today.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);

	const diffTime = end.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return {
		days: Math.abs(diffDays),
		isOverdue: diffDays < 0,
	};
}

/**
 * Sort cycles by the given sort state
 */
export function sortCycles(cycles: Cycle[], sortState: SortState): Cycle[] {
	return [...cycles].sort((a, b) => {
		let result = 0;

		switch (sortState.column) {
			case 'name':
				result = a.name.localeCompare(b.name);
				break;
			case 'startDate':
				result =
					new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
				break;
			case 'endDate':
				result = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
				break;
			case 'status':
				result = a.status.localeCompare(b.status);
				break;
			case 'progress':
				result = a.progress.percentComplete - b.progress.percentComplete;
				break;
			case 'tasks':
				result = a.tasks.length - b.tasks.length;
				break;
			case 'tokens':
				result = a.tokensConsumed - b.tokensConsumed;
				break;
			default:
				break;
		}

		return sortState.direction === 'asc' ? result : -result;
	});
}

/**
 * Filter cycles by status
 */
export function filterCyclesByStatus(
	cycles: Cycle[],
	status: CycleStatus | 'All',
): Cycle[] {
	if (status === 'All') {
		return cycles;
	}

	return cycles.filter((cycle) => cycle.status === status);
}

/**
 * Get the status color class for a cycle status
 */
export function getStatusColorClass(status: CycleStatus): string {
	switch (status) {
		case 'Not Started':
			return 'bg-bg-secondary text-text-primary';
		case 'In Progress':
			return 'bg-blue-100 text-blue-800';
		case 'Completed':
			return 'bg-green-100 text-green-800';
		case 'Cancelled':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-bg-secondary text-text-primary';
	}
}
