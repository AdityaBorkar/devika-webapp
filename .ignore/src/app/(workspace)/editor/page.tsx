import type { IconType } from 'react-icons';
import { PiCloud, PiMonitor, PiToolbox } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EditorPage() {
	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex flex-row items-center justify-between border-border border-b bg-bg-secondary px-1">
				<div className="grid grid-cols-3">
					<NavItem icon={PiMonitor} isActive={true} label="Frontend" />
					<NavItem icon={PiCloud} isActive={false} label="Backend" />
					<NavItem icon={PiToolbox} isActive={false} label="Utilities" />
					{/* Pages / Layers / Assets */}
					{/* Components / Hooks / Utils */}
					{/* <div>Server Fns</div>
					<div>Database</div>
					<div>ENV & Secrets</div> */}
				</div>
				<div className="px-8 py-2.5 text-center">
					{/* Task Management  */}
					Cycle - Task
				</div>
				<div className="flex flex-row gap-2 text-xs">
					<Button>Dev. Tunnel</Button>
					<Button>Publish</Button>
				</div>
			</div>
			<div className="grid h-full grid-cols-[1.1fr_5fr_1fr] divide-x divide-border">
				<div className="bg-bg-secondary">{/* Sidebar */}</div>
				<div className="relative h-full w-full">
					<div className="pointer-events-none absolute bottom-6 w-full">
						<div className="pointer-events-auto mx-auto flex w-fit flex-row rounded-xl border border-border px-2 py-2 text-center shadow-md *:px-3 *:py-2">
							<div>Arrow</div>
							<div>Hand</div>
							<div>Text</div>
							<div>Layout</div>
							<div>Comments</div>
							<div>110%</div>
							<div>Preview</div>
						</div>
					</div>
				</div>
				<div className="bg-bg-secondary">{/* SIDEBAR */}</div>
			</div>
		</div>
	);
}

function NavItem({
	icon: Icon,
	label,
	isActive,
}: {
	icon: IconType;
	label: string;
	isActive: boolean;
}) {
	return (
		<div
			className={cn(
				'rounded-md px-3 py-2 text-center text-xs',
				isActive && 'bg-bg-tertiary',
			)}
		>
			<Icon className="-mt-0.5 mr-1 inline-block size-4" />
			{label}
		</div>
	);
}
