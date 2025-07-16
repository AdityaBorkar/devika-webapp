import { MoreHorizontal } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Task } from '../../../types/types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface CycleCardProps {
	data: Task;
	onClick?: (id: string) => void;
}

// id: Unique identifier for the task (Example: 1)
// title: Brief, descriptive title of the task (Example: "Initialize Repo")
// description: Concise description of what the task involves (Example: "Create a new repository, set up initial structure.")
// status: Current state of the task (Example: "pending", "done", "deferred")
// dependencies: IDs of tasks that must be completed before this task (Example: [1, 2])
// Dependencies are displayed with status indicators (✅ for completed, ⏱️ for pending)
// This helps quickly identify which prerequisite tasks are blocking work
// priority: Importance level of the task (Example: "high", "medium", "low")
// details: In-depth implementation instructions (Example: "Use GitHub client ID/secret, handle callback, set session token.")
// testStrategy: Verification approach (Example: "Deploy and call endpoint to confirm 'Hello World' response.")
// subtasks: List of smaller, more specific tasks that make up the main task (Example: [{"id": 1, "title": "Configure OAuth", ...}])

export const CycleCardItem: React.FC<CycleCardProps> = ({
	data: task,
	onClick,
}) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (onClick) {
			onClick(task.id);
		} else {
			navigate(`/tasks/${task.id}`);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClick();
		}
	};

	// Calculate days remaining for due date
	const dueDate = new Date(task.due);
	const today = new Date();
	const daysRemaining = Math.ceil(
		(dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	);
	const isOverdue = daysRemaining < 0;

	return (
		<Card
			aria-label={`Open task ${task.id}: ${task.title}`}
			className="hover:tranzinc-y-[-2px] w-full cursor-pointer border-l-4 transition-all hover:shadow-md"
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={{
				borderLeftColor:
					task.status === 'Done'
						? 'hsl(var(--success))'
						: task.status === 'In Progress'
							? 'hsl(var(--info))'
							: 'hsl(var(--muted))',
			}}
			tabIndex={0}
		>
			<CardHeader className="px-3 py-2">
				<div className="flex items-start justify-between">
					<Badge className="font-mono text-xs" variant="outline">
						{task.id}
					</Badge>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="h-6 w-6"
									onClick={(e) => {
										e.stopPropagation();
										// Handle options menu
									}}
									size="icon"
									type="button"
									variant="ghost"
								>
									<MoreHorizontal size={14} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Task options</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardHeader>

			<CardContent className="px-3 py-1">
				<h3 className="font-medium text-sm">{task.title}</h3>
			</CardContent>

			<CardFooter className="flex items-center justify-between px-3 py-2">
				<div className="flex items-center gap-2">
					{isOverdue && (
						<Badge className="text-[10px]" variant="destructive">
							Overdue
						</Badge>
					)}
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center text-muted-foreground text-xs">
								<div className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-bg-secondary text-xs">
									{task.assignee.charAt(0)}
								</div>
								<span>
									{isOverdue
										? `${Math.abs(daysRemaining)}d late`
										: daysRemaining === 0
											? 'Today'
											: `${daysRemaining}d left`}
								</span>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								Assigned to: {task.assignee}
								<br />
								Due: {task.due}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
		</Card>
	);
};
