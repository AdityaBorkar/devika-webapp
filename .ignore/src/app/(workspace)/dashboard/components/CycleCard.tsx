import { Link } from 'react-router';

import { cn } from '@/lib/utils';

export function CycleCard({ cycle }: { cycle: any }) {
	return (
		<Link
			className="grid grid-cols-[1.5rem_auto] rounded-md border border-border bg-bg-secondary/50 px-2 py-2.5 text-sm"
			to="/cycles"
		>
			<div
				className={cn(
					'relative mx-auto mt-1 inline-block size-3 rounded-full bg-green-600',
					cycle.running && 'animate-pulse',
					cycle.status === 'live' && 'bg-green-600',
					cycle.status === 'review' && 'bg-yellow-600',
					cycle.status === 'draft' && 'bg-zinc-600',
				)}
			/>
			<div>
				<div className="font-medium text-sm">{cycle.name}</div>
				<div className="mt-2 text-xs">
					<div className="relative h-2 w-full rounded-full bg-bg-tertiary">
						<div className="absolute top-0 left-0 h-2 w-1/3 rounded-full bg-green-600" />
						<div className="absolute top-0 left-1/3 h-2 w-1/3 rounded-full bg-yellow-600" />
					</div>
					<div className="mt-1 flex justify-between text-text-tertiary text-xs">
						<div>1 in progress • 8 done</div>
						<div>10 total</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
