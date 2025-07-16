import type React from 'react';

import type { TaskDetail } from '@/types/types';

interface TaskDetailSidebarProps {
	task: TaskDetail;
	onTaskUpdate?: (
		field: keyof TaskDetail,
		value: string | boolean | Date,
	) => void;
}

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
	task,
	onTaskUpdate = () => {},
}) => {
	return (
		<div className="w-64 overflow-y-auto bg-bg-primary p-4 dark:bg-bg-primary">
			<h2 className="mb-3 font-medium text-sm text-text-muted">Properties</h2>

			<div className="space-y-4">
				<div>
					<label
						className="mb-1 block text-text-muted text-xs"
						htmlFor="status"
					>
						Status
					</label>
					<select
						className="w-full rounded border border-zinc-300 bg-white p-1.5 text-sm dark:border-zinc-700 dark:bg-bg-secondary"
						id="status"
						onChange={(e) => onTaskUpdate('status', e.target.value)}
						value={task.status}
					>
						<option value="Todo">Todo</option>
						<option value="In Progress">In Progress</option>
						<option value="Done">Done</option>
					</select>
				</div>

				<div>
					<label
						className="mb-1 block text-text-muted text-xs"
						htmlFor="assignee"
					>
						Assignee
					</label>
					<select
						className="w-full rounded border border-zinc-300 bg-white p-1.5 text-sm dark:border-zinc-700 dark:bg-bg-secondary"
						id="assignee"
						onChange={(e) => onTaskUpdate('assignee', e.target.value)}
						value={task.assignee}
					>
						<option>John Doe</option>
						<option>Jane Smith</option>
						<option>Alex Johnson</option>
						<option>Sarah Williams</option>
						<option>Mike Brown</option>
					</select>
				</div>

				<div>
					<label
						className="mb-1 block text-text-muted text-xs"
						htmlFor="priority"
					>
						Priority
					</label>
					<select
						className="w-full rounded border border-zinc-300 bg-white p-1.5 text-sm dark:border-zinc-700 dark:bg-bg-secondary"
						id="priority"
						onChange={(e) => onTaskUpdate('priority', e.target.value)}
						value={task.priority}
					>
						<option value="High">High</option>
						<option value="Medium">Medium</option>
						<option value="Low">Low</option>
					</select>
				</div>

				<div>
					<label
						className="mb-1 block text-text-muted text-xs"
						htmlFor="dueDate"
					>
						Due Date
					</label>
					<input
						className="w-full rounded border border-zinc-300 bg-white p-1.5 text-sm dark:border-zinc-700 dark:bg-bg-secondary"
						id="dueDate"
						onChange={(e) => onTaskUpdate('due', e.target.value)}
						type="date"
						value={task.due}
					/>
				</div>

				<div>
					<label
						className="mb-1 block text-text-muted text-xs"
						htmlFor="labels"
					>
						Labels
					</label>
					<div className="mt-1 flex flex-wrap gap-1" id="labels">
						<div className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-800 text-xs">
							Frontend
						</div>
						<div className="rounded-full bg-purple-100 px-2 py-1 text-purple-800 text-xs">
							Authentication
						</div>
						<div className="cursor-pointer rounded-full bg-bg-primary px-2 py-1 text-text-primary text-xs hover:bg-bg-secondary">
							+ Add
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 border-zinc-200 border-t pt-6 dark:border-zinc-800">
				<h2 className="mb-3 font-medium text-sm text-text-muted">Activity</h2>
				<div className="space-y-2 text-text-muted text-xs">
					<div>
						<span className="font-medium text-text-primary">John Doe</span>{' '}
						created this task
						<div className="mt-0.5 text-text-tertiary">{task.createdAt}</div>
					</div>
					<div>
						<span className="font-medium text-text-primary">Jane Smith</span>{' '}
						changed status to &quot;{task.status}&quot;
						<div className="mt-0.5 text-text-tertiary">Yesterday</div>
					</div>
				</div>
			</div>
		</div>
	);
};
