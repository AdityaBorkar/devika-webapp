import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { atom } from 'jotai';
import type { Task } from 'types/types';

import { MOCK_TASKS } from '@/components/tasks/mock-data';
import type { TabType } from '@/components/tasks/TasksHeader';
import type { ViewMode } from '@/components/tasks/ViewToggle';

// Base atoms - primitive state
export const activeTabAtom = atom<TabType>('all');
export const viewModeAtom = atom<ViewMode>('board');
export const searchQueryAtom = atom('');
export const sortingAtom = atom<SortingState>([]);
export const columnFiltersAtom = atom<ColumnFiltersState>([]);
export const showFilterPanelAtom = atom(false);
export const tasksAtom = atom<Task[]>(MOCK_TASKS);

// Cache key to force reevaluation when dependencies change
export const taskFilterCacheKeyAtom = atom((get) => {
	const tab = get(activeTabAtom);
	const search = get(searchQueryAtom);
	const tasks = get(tasksAtom);

	// Return a composite key that will change when any dependency changes
	return `${tab}-${search}-${tasks.length}`;
});

// Derived atoms - computed state for improved performance
export const filteredTasksAtom = atom((get) => {
	// Get the cache key to ensure proper dependency tracking
	get(taskFilterCacheKeyAtom);

	const tasks = get(tasksAtom);
	const activeTab = get(activeTabAtom);
	const searchQuery = get(searchQueryAtom);

	return tasks
		.filter((task) => {
			// Tab filtering
			if (activeTab === 'active') {
				return task.status === 'Todo' || task.status === 'In Progress';
			}
			if (activeTab === 'backlog') {
				return task.status === 'Todo';
			}
			return true; // 'all' tab
		})
		.filter((task) => {
			// Search filtering
			if (!searchQuery) return true;
			const query = searchQuery.toLowerCase();
			return (
				task.title.toLowerCase().includes(query) ||
				task.id.toLowerCase().includes(query) ||
				task.assignee.toLowerCase().includes(query)
			);
		});
});

// Status-specific cached atoms to prevent unnecessary recalculations
export const todoTasksAtom = atom((get) => {
	// This will only recompute when filteredTasksAtom changes
	return get(filteredTasksAtom).filter((task) => task.status === 'Todo');
});

export const inProgressTasksAtom = atom((get) => {
	return get(filteredTasksAtom).filter((task) => task.status === 'In Progress');
});

export const doneTasksAtom = atom((get) => {
	return get(filteredTasksAtom).filter((task) => task.status === 'Done');
});

// Task manipulation functions
export const addTaskAtom = atom(
	null, // read function returns null
	(get, set, newTask: Task) => {
		const currentTasks = get(tasksAtom);
		set(tasksAtom, [...currentTasks, newTask]);
	},
);

export const updateTaskAtom = atom(null, (get, set, updatedTask: Task) => {
	const currentTasks = get(tasksAtom);
	set(
		tasksAtom,
		currentTasks.map((task) =>
			task.id === updatedTask.id ? updatedTask : task,
		),
	);
});

export const deleteTaskAtom = atom(null, (get, set, taskId: string) => {
	const currentTasks = get(tasksAtom);
	set(
		tasksAtom,
		currentTasks.filter((task) => task.id !== taskId),
	);
});
