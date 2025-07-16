'use client';

import { Progress } from '@/components/cycles/Progress';
import { Card } from '@/components/ui/card';
import type { Cycle, CycleStatus } from './types';
import { formatDate } from './utils';

interface CycleCardProps {
	cycle: Cycle;
	onSelect: (id: string) => void;
}

export function CycleCard({ cycle, onSelect }: CycleCardProps) {
	const getStatusColor = (status: CycleStatus) => {
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
	};

	const statusColorClass = getStatusColor(cycle.status);

	return (
		<Card
			className="cursor-pointer border-l-4 border-l-blue-500 p-4 transition-all hover:border-l-6 hover:shadow-md"
			onClick={() => onSelect(cycle.id)}
		>
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-lg">{cycle.name}</h3>
					<span
						className={`rounded-full px-2 py-1 text-xs ${statusColorClass}`}
					>
						{cycle.status}
					</span>
				</div>

				<p className="line-clamp-2 text-sm text-text-muted">
					{cycle.description}
				</p>

				<div className="flex justify-between text-text-muted text-xs">
					<span>
						{formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
					</span>
					<span>{cycle.tasks.length} tasks</span>
				</div>

				<div className="pt-2">
					<Progress
						percent={cycle.progress.percentComplete}
						tasksStatus={cycle.progress.tasksStatus}
					/>
				</div>

				{cycle.roadblocks.some((rb) => rb.status === 'Active') && (
					<div className="mt-2 flex items-center">
						<div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
						<span className="text-red-600 text-xs">
							{cycle.roadblocks.filter((rb) => rb.status === 'Active').length}{' '}
							active roadblock(s)
						</span>
					</div>
				)}
			</div>
		</Card>
	);
}
