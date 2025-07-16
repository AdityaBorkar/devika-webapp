import { Calendar, Check, Clock, Tag, User } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import type { TaskDetail } from '../../../../../../types/types';
import {
	getPriorityColor,
	getStatusColor,
} from '../../../../../components/tasks/utils';

interface TaskDetailContentProps {
	task: TaskDetail;
	onSubtaskToggle?: (subtaskId: string, completed: boolean) => void;
	onAddComment?: (comment: string) => void;
}

export const TaskDetailContent: React.FC<TaskDetailContentProps> = ({
	task,
	onSubtaskToggle = () => {},
	onAddComment = () => {},
}) => {
	const [newComment, setNewComment] = useState('');

	const handleCommentSubmit = () => {
		if (newComment.trim()) {
			onAddComment(newComment);
			setNewComment('');
		}
	};

	return (
		<div className="flex-grow overflow-y-auto border-zinc-200 border-r p-6 dark:border-zinc-800">
			{/* Status and metadata */}
			<div className="mb-6 flex flex-wrap gap-4">
				<div className="flex items-center gap-2">
					<div
						className={`rounded-full px-3 py-1 text-sm ${getStatusColor(task.status)}`}
					>
						{task.status}
					</div>
				</div>
				<div className="flex items-center gap-2 text-text-muted">
					<Calendar size={14} />
					<span className="text-sm">Created on {task.createdAt}</span>
				</div>
				<div className="flex items-center gap-2 text-text-muted">
					<Clock size={14} />
					<span className="text-sm">Due {task.due}</span>
				</div>
				<div className="flex items-center gap-2 text-text-muted">
					<User size={14} />
					<span className="text-sm">{task.assignee}</span>
				</div>
				<div className="flex items-center gap-2">
					<Tag className={getPriorityColor(task.priority)} size={14} />
					<span
						className={`font-medium text-sm ${getPriorityColor(task.priority)}`}
					>
						{task.priority}
					</span>
				</div>
			</div>

			{/* Description */}
			<div className="mb-8">
				<h2 className="mb-2 font-medium text-sm text-text-muted">
					Description
				</h2>
				<div className="rounded-md bg-bg-primary p-4 dark:bg-bg-secondary">
					<p className="whitespace-pre-line text-sm text-text-primary dark:text-text-secondary">
						{task.description}
					</p>
				</div>
			</div>

			{/* Subtasks */}
			<div className="mb-8">
				<h2 className="mb-2 font-medium text-sm text-text-muted">Subtasks</h2>
				<div className="space-y-2">
					{task.subtasks.map((subtask) => (
						<div
							className="flex items-start gap-2 rounded-md p-2 hover:bg-bg-primary dark:hover:bg-bg-secondary"
							key={subtask.id}
						>
							<div className="relative mt-0.5 flex items-center">
								<input
									checked={subtask.completed}
									className={`h-4 w-4 appearance-none rounded-sm border ${
										subtask.completed
											? 'border-indigo-600 bg-indigo-600'
											: 'border-zinc-300 dark:border-zinc-700'
									}`}
									id={`subtask-${subtask.id}`}
									onChange={() =>
										onSubtaskToggle(subtask.id, !subtask.completed)
									}
									type="checkbox"
								/>
								{subtask.completed && (
									<Check
										className="pointer-events-none absolute ml-0.5 text-foreground"
										size={12}
									/>
								)}
							</div>
							<label
								className={`text-sm ${
									subtask.completed
										? 'text-text-tertiary line-through'
										: 'text-text-primary dark:text-text-secondary'
								}`}
								htmlFor={`subtask-${subtask.id}`}
							>
								{subtask.title}
							</label>
						</div>
					))}

					<div className="flex cursor-pointer items-center gap-2 p-2 text-text-tertiary hover:text-text-muted">
						<div className="h-4 w-4 rounded-sm border border-zinc-300 border-dashed dark:border-zinc-700" />
						<span className="text-sm">Add subtask...</span>
					</div>
				</div>
			</div>

			{/* Comments */}
			<div>
				<h2 className="mb-2 font-medium text-sm text-text-muted">Comments</h2>
				<div className="mb-4 space-y-4">
					{task.comments.map((comment) => (
						<div
							className="rounded-md bg-bg-primary p-3 dark:bg-bg-secondary"
							key={comment.id}
						>
							<div className="mb-1 flex justify-between">
								<span className="font-medium text-sm">{comment.author}</span>
								<span className="text-text-muted text-xs">
									{comment.timestamp}
								</span>
							</div>
							<p className="text-sm text-text-primary dark:text-text-secondary">
								{comment.content}
							</p>
						</div>
					))}
				</div>

				{/* New comment form */}
				<div className="mt-4">
					<textarea
						className="w-full rounded-md border border-zinc-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700"
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Add a comment..."
						rows={2}
						value={newComment}
					/>
					<div className="mt-2 flex justify-end">
						<button
							className="rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-foreground text-sm hover:bg-indigo-700"
							disabled={!newComment.trim()}
							onClick={handleCommentSubmit}
							type="button"
						>
							Comment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
