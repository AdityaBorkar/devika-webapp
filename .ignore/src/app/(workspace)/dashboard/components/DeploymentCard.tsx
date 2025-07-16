import { Link } from 'react-router';

import { cn } from '@/lib/utils';

export function DeploymentCard({ version }: { version: any }) {
	return (
		<Link
			className="grid grid-cols-[1.5rem_auto] rounded-md border border-border bg-bg-secondary/50 px-2 py-2.5 text-sm"
			to="/prd"
		>
			<div
				className={cn(
					'relative mx-auto mt-1 inline-block size-3 rounded-full bg-green-600',
					version.status === 'live' && 'bg-green-600',
					version.status === 'review' && 'bg-yellow-600',
					version.status === 'draft' && 'bg-zinc-600',
				)}
			/>
			<div>
				<div className="font-medium text-sm">v{version.version}</div>
				<div className="inline-block text-text-tertiary text-xs">Visit URL</div>
			</div>
		</Link>
	);
}
