'use client';

import type { CycleRoadblock } from './types';
import { formatDate } from './utils';

interface RoadblocksListProps {
	roadblocks: CycleRoadblock[];
}

export function RoadblocksList({ roadblocks }: RoadblocksListProps) {
	if (roadblocks.length === 0) {
		return (
			<div className="py-8 text-center text-text-muted">
				No roadblocks found
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{roadblocks.map((roadblock) => (
				<div
					className={`rounded-md border p-4 ${
						roadblock.status === 'Active'
							? 'border-red-200 bg-red-50'
							: 'border-zinc-200'
					}`}
					key={roadblock.id}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div
								className={`mr-2 h-2 w-2 rounded-full ${
									roadblock.status === 'Active' ? 'bg-red-500' : 'bg-green-500'
								}`}
							/>
							<span
								className={`rounded-full px-2 py-1 text-xs ${
									roadblock.status === 'Active'
										? 'bg-red-100 text-red-800'
										: 'bg-green-100 text-green-800'
								}`}
							>
								{roadblock.status}
							</span>
						</div>
						<div className="text-text-muted text-xs">
							Created: {formatDate(roadblock.createdAt)}
							{roadblock.resolvedAt && (
								<span className="ml-3">
									Resolved: {formatDate(roadblock.resolvedAt)}
								</span>
							)}
						</div>
					</div>

					<p className="mt-2 text-text-primary">{roadblock.description}</p>
				</div>
			))}
		</div>
	);
}
