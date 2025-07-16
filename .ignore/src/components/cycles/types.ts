export type CycleStatus =
	| 'Not Started'
	| 'In Progress'
	| 'Completed'
	| 'Cancelled';

export type CycleTask = {
	id: string;
	title: string;
	status: 'Todo' | 'In Progress' | 'Done' | 'Blocked';
	assignee?: string;
	estimatedHours?: number;
	actualHours?: number;
};

export type CycleRoadblock = {
	id: string;
	description: string;
	status: 'Active' | 'Resolved';
	createdAt: string;
	resolvedAt?: string;
};

export type CycleProgress = {
	totalTasks: number;
	completedTasks: number;
	percentComplete: number;
	tasksStatus: {
		todo: number;
		inProgress: number;
		done: number;
		blocked: number;
	};
};

export type Cycle = {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	status: CycleStatus;
	description: string;
	tasks: CycleTask[];
	tokensConsumed: number;
	additionalInstructions?: string;
	integrationTests?: string[];
	writeTests: boolean;
	writeDocumentation: boolean;
	changelog?: string;
	progress: CycleProgress;
	roadblocks: CycleRoadblock[];
};

export type CycleTableColumn = {
	id: string;
	label: string;
	sortable?: boolean;
};

export type SortDirection = 'asc' | 'desc';

export type SortState = {
	column: string;
	direction: SortDirection;
};

export type FilterState = {
	status: CycleStatus | 'All';
};
