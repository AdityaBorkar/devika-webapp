import type { PriorityOption, StatusOption } from './types';

// Status color utility
export const getStatusColor = (status: string): string => {
	switch (status) {
		case 'Todo':
			return 'bg-bg-secondary text-text-primary';
		case 'In Progress':
			return 'bg-blue-100 text-blue-800';
		case 'Done':
			return 'bg-green-100 text-green-800';
		default:
			return 'bg-bg-secondary text-text-primary';
	}
};

// Priority color utility
export const getPriorityColor = (priority: string): string => {
	switch (priority) {
		case 'High':
			return 'text-red-600';
		case 'Medium':
			return 'text-yellow-600';
		case 'Low':
			return 'text-green-600';
		default:
			return 'text-text-muted';
	}
};

// Filter options
export const STATUS_OPTIONS: StatusOption[] = [
	{ label: 'All Tasks', value: 'all' },
	{ label: 'Todo', value: 'Todo' },
	{ label: 'In Progress', value: 'In Progress' },
	{ label: 'Done', value: 'Done' },
];

export const PRIORITY_OPTIONS: PriorityOption[] = [
	{ label: 'All Priorities', value: 'all' },
	{ label: 'High', value: 'High' },
	{ label: 'Medium', value: 'Medium' },
	{ label: 'Low', value: 'Low' },
];
