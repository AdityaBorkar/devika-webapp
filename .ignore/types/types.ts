namespace Tasks {
	export type Task = {
		id: string;
		title: string;
		status: 'Todo' | 'In Progress' | 'Done';
		priority: 'High' | 'Medium' | 'Low';
		assignee: string;
		due: string;
	};

	export type Comment = {
		id: number;
		author: string;
		content: string;
		timestamp: string;
	};

	export type Subtask = {
		id: string;
		title: string;
		completed: boolean;
	};

	export type TaskDetail = Task & {
		createdAt: string;
		description: string;
		comments: Comment[];
		subtasks: Subtask[];
	};

	export type SortingState = {
		id: string;
		desc: boolean;
	}[];

	export type ColumnFiltersState = {
		id: string;
		value: unknown;
	}[];

	export type StatusOption = {
		value: 'Todo' | 'In Progress' | 'Done' | 'all';
		label: string;
	};

	export type PriorityOption = {
		value: 'High' | 'Medium' | 'Low' | 'all';
		label: string;
	};
}
