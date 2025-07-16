'use client';

import { motion } from 'motion/react';

import { CycleCardItem } from '@/components/cycles/CycleCardItem';
import { CycleListItem } from '@/components/cycles/CycleListItem';
import { ViewLayout, type ViewTab } from '@/components/layouts/ViewLayout';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
export default function CyclesViewPage() {
	// TODO: Properties

	const viewTabs = [
		{ display: 'kanban', label: 'All Cycles', value: 'all' },
		{ display: 'kanban', label: 'Current', value: 'current' },
		{ display: 'kanban', label: 'Upcoming', value: 'upcoming' },
	] as ViewTab[];

	const saveViewTab = (_tab: ViewTab) => {
		// ...
	};

	const cycle = {
		agents: 5,
		deployment: {
			deployWhenCycleEnds: true,
			deployWhenCycleStarts: true,
		},
		finished: false,
		name: 'Cycle 1',
		running: true,
		tasks: 10,
	};

	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="h-full "
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<div className="hidden">
				<div className="border-border border-b px-4 py-2 font-semibold text-base">
					Cycle Name
				</div>
				<div className="grid grid-cols-[1fr_1.5fr] gap-y-2 px-4 py-4">
					<Label>Git Branch</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select a branch" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Branch 1</SelectItem>
							<SelectItem value="2">Branch 2</SelectItem>
							<SelectItem value="3">Branch 3</SelectItem>
						</SelectContent>
					</Select>
					<Label>Agents</Label>
					<div className="flex items-center divide-x divide-border rounded-lg border border-border bg-bg-secondary/50">
						<div className="rounded-l-md px-3 py-1 hover:bg-bg-tertiary">+</div>
						<div className="grow px-2 py-1 text-center">5</div>
						<div className="rounded-r-md px-3 py-1 hover:bg-bg-tertiary">-</div>
					</div>
					<Label>Auto-Deploy</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Off" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Off</SelectItem>
							<SelectItem value="2">When Cycle Ends</SelectItem>
							{/* This prevents you from ending a cycle until deployment succeeds */}
							<SelectItem value="3">When Cycle Starts</SelectItem>
							{/* Errors when pausing the deployment are added as tasks, which are
				prioritized before next task */}
						</SelectContent>
					</Select>
					<div className="col-span-2 mt-4 flex justify-between">
						<Button className="">End Cycle</Button>
						{cycle.running ? (
							<Button className="">Pause Cycle</Button>
						) : (
							<Button className="">Start Cycle</Button>
						)}
					</div>
				</div>
				{/* <div>Tasks marked for Manual Review</div> */}

				<div className="divide-y divide-zinc-800 border-border border-y">
					<div className="px-4 py-3 hover:bg-bg-secondary/50">
						<div className="font-semibold text-text-tertiary">
							Resource Monitor
						</div>
					</div>
					<div className="px-4 py-3 hover:bg-bg-secondary/50">
						<div className="font-semibold text-text-tertiary">Activity</div>
					</div>
				</div>
			</div>
			{/* Git Branch */}
			{/* 2 Agents */}
			{/* Activity */}
			<ViewLayout
				components={{
					card: CycleCardItem,
					list: CycleListItem,
				}}
				defaultViewTab="current"
				saveViewTab={saveViewTab}
				viewTabs={viewTabs}
				wrapperClass="*:px-16"
			/>
		</motion.div>
	);
}

function Button({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<button
			className={cn('rounded-md border px-4 py-1.5 text-foreground', className)}
			type="button"
		>
			{children}
		</button>
	);
}
