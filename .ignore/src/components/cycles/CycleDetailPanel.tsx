'use client';

import { OverviewCard } from '@/components/cycles/OverviewCard';
import { RoadblocksList } from '@/components/cycles/RoadblocksList';
import { TasksTable } from '@/components/cycles/TasksTable';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from './Progress';
import type { Cycle } from './types';
import {
	formatDate,
	formatTokens,
	getDaysRemaining,
	getStatusColorClass,
} from './utils';

interface CycleDetailPanelProps {
	cycle: Cycle;
	onClose: () => void;
}

export function CycleDetailPanel({ cycle, onClose }: CycleDetailPanelProps) {
	const { days, isOverdue } = getDaysRemaining(cycle.endDate);
	const statusClass = getStatusColorClass(cycle.status);

	return (
		<div className="flex h-full flex-col overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between border-b p-4">
				<div className="flex items-center space-x-3">
					<button
						className="text-text-muted hover:text-text-primary"
						onClick={onClose}
						type="button"
					>
						<svg
							fill="none"
							height="20"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							width="20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Close</title>
							<polyline points="15 18 9 12 15 6" />
						</svg>
					</button>
					<h2 className="font-semibold text-xl">{cycle.name}</h2>
					<span className={`rounded-full px-2 py-1 text-xs ${statusClass}`}>
						{cycle.status}
					</span>
				</div>

				<div className="text-sm text-text-muted">
					{formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
					{cycle.status === 'In Progress' && (
						<span
							className={`ml-2 ${isOverdue ? 'text-red-600' : 'text-green-600'}`}
						>
							({isOverdue ? 'Overdue by' : 'Days left:'} {days})
						</span>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 overflow-auto p-4">
				<Tabs className="w-full" defaultValue="overview">
					<TabsList className="mb-4">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="tasks">Tasks</TabsTrigger>
						<TabsTrigger value="details">Details</TabsTrigger>
						<TabsTrigger value="roadblocks">
							Roadblocks
							{cycle.roadblocks.some((rb) => rb.status === 'Active') && (
								<span className="ml-1 inline-block h-2 w-2 rounded-full bg-red-500" />
							)}
						</TabsTrigger>
					</TabsList>

					<TabsContent className="space-y-4" value="overview">
						<div className="mb-4">
							<h3 className="mb-2 font-medium text-lg">Progress</h3>
							<Progress
								percent={cycle.progress.percentComplete}
								tasksStatus={cycle.progress.tasksStatus}
							/>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<OverviewCard
								description="Tasks completed"
								icon="tasks"
								title="Tasks"
								value={`${cycle.progress.completedTasks}/${cycle.progress.totalTasks}`}
							/>

							<OverviewCard
								description="Tokens consumed"
								icon="tokens"
								title="Tokens"
								value={formatTokens(cycle.tokensConsumed)}
							/>

							<OverviewCard
								description={
									cycle.status === 'In Progress'
										? isOverdue
											? 'Overdue'
											: 'Remaining'
										: 'Total'
								}
								icon="calendar"
								status={isOverdue ? 'negative' : 'positive'}
								title="Duration"
								value={`${Math.ceil((new Date(cycle.endDate).getTime() - new Date(cycle.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`}
							/>
						</div>

						<div>
							<h3 className="mb-2 font-medium text-lg">Description</h3>
							<p className="text-text-primary">{cycle.description}</p>
						</div>

						{cycle.roadblocks.some((rb) => rb.status === 'Active') && (
							<div>
								<h3 className="mb-2 font-medium text-lg text-red-600">
									Active Roadblocks
								</h3>
								<RoadblocksList
									roadblocks={cycle.roadblocks.filter(
										(rb) => rb.status === 'Active',
									)}
								/>
							</div>
						)}
					</TabsContent>

					<TabsContent value="tasks">
						<TasksTable tasks={cycle.tasks} />
					</TabsContent>

					<TabsContent className="space-y-4" value="details">
						<div>
							<h3 className="mb-2 font-medium text-lg">
								Additional Instructions
							</h3>
							<p className="text-text-primary">
								{cycle.additionalInstructions ||
									'No additional instructions provided.'}
							</p>
						</div>

						{cycle.integrationTests && cycle.integrationTests.length > 0 && (
							<div>
								<h3 className="mb-2 font-medium text-lg">Integration Tests</h3>
								<ul className="list-disc space-y-1 pl-5">
									{cycle.integrationTests.map((test) => (
										<li className="text-text-primary" key={test}>
											{test}
										</li>
									))}
								</ul>
							</div>
						)}

						<div className="flex gap-2">
							<Badge variant={cycle.writeTests ? 'default' : 'outline'}>
								{cycle.writeTests ? '✓ Write Tests' : '× Write Tests'}
							</Badge>
							<Badge variant={cycle.writeDocumentation ? 'default' : 'outline'}>
								{cycle.writeDocumentation
									? '✓ Write Documentation'
									: '× Write Documentation'}
							</Badge>
						</div>

						{cycle.changelog && (
							<div>
								<h3 className="mb-2 font-medium text-lg">Changelog</h3>
								<p className="text-text-primary">{cycle.changelog}</p>
							</div>
						)}
					</TabsContent>

					<TabsContent value="roadblocks">
						<RoadblocksList roadblocks={cycle.roadblocks} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
