import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import type React from 'react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { Cycle } from './types';
import { formatDate } from './utils';

interface CycleStatusCardProps {
	cycle: Cycle;
	onClick?: () => void;
}

export const CycleStatusCard: React.FC<CycleStatusCardProps> = ({
	cycle,
	onClick,
}) => {
	// Define status badge styles
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Not Started':
				return 'bg-bg-primary border-zinc-200 text-text-primary';
			case 'In Progress':
				return 'bg-blue-50 border-blue-200 text-blue-700';
			case 'Completed':
				return 'bg-green-50 border-green-200 text-green-700';
			case 'Cancelled':
				return 'bg-red-50 border-red-200 text-red-700';
			default:
				return 'bg-bg-primary border-zinc-200 text-text-primary';
		}
	};

	// Get status icon
	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Not Started':
				return <Clock className="h-4 w-4 text-text-muted" />;
			case 'In Progress':
				return <Clock className="h-4 w-4 text-blue-600" />;
			case 'Completed':
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case 'Cancelled':
				return <XCircle className="h-4 w-4 text-red-600" />;
			default:
				return <Clock className="h-4 w-4 text-text-muted" />;
		}
	};

	return (
		<Card
			className="cursor-pointer overflow-hidden border-zinc-200/80 transition-all duration-200 hover:shadow-md dark:border-zinc-800/80"
			onClick={onClick}
		>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<Badge
						className={`border ${getStatusColor(cycle.status)} px-2 py-0.5 font-medium text-xs`}
					>
						<span className="flex items-center gap-1">
							{getStatusIcon(cycle.status)}
							{cycle.status}
						</span>
					</Badge>
					<span className="text-muted-foreground text-xs">ID: {cycle.id}</span>
				</div>
				<CardTitle className="mt-2 text-lg">{cycle.name}</CardTitle>
				<CardDescription className="line-clamp-2">
					{cycle.description}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="space-y-3">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-1 text-muted-foreground">
							<Calendar className="h-3.5 w-3.5" />
							<span>Start:</span>
						</div>
						<span className="font-medium">{formatDate(cycle.startDate)}</span>
					</div>

					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-1 text-muted-foreground">
							<Calendar className="h-3.5 w-3.5" />
							<span>End:</span>
						</div>
						<span className="font-medium">{formatDate(cycle.endDate)}</span>
					</div>

					<div className="space-y-1.5">
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Progress:</span>
							<span className="font-medium">
								{cycle.progress.percentComplete}%
							</span>
						</div>
						<div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-primary">
							<div
								className="h-1.5 rounded-full bg-bg-primary transition-all duration-300"
								style={{ width: `${cycle.progress.percentComplete}%` }}
							/>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="border-zinc-100 border-t pt-2 pb-3 text-xs dark:border-zinc-800">
				<div className="flex w-full items-center justify-between">
					<span className="text-muted-foreground">
						{cycle.tasks.length} tasks
					</span>
					<div className="flex gap-1">
						<Badge
							className="border-zinc-200 bg-bg-primary px-2 py-0.5 text-xs dark:border-zinc-800 dark:bg-bg-primary"
							variant="outline"
						>
							{cycle.progress.tasksStatus.done} Done
						</Badge>
						<Badge
							className="border-zinc-200 bg-bg-primary px-2 py-0.5 text-xs dark:border-zinc-800 dark:bg-bg-primary"
							variant="outline"
						>
							{cycle.progress.tasksStatus.inProgress} In Progress
						</Badge>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};
