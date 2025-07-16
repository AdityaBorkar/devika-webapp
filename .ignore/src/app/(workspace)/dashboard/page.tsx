import { motion } from 'motion/react';

import logo from '@/../public/logo.svg';
import { CycleCard } from '@/app/(workspace)/dashboard/components/CycleCard';
import { DeploymentCard } from '@/app/(workspace)/dashboard/components/DeploymentCard';
import { PrdCard } from '@/app/(workspace)/dashboard/components/PrdSummaryCard';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
	const userName = 'Aditya';
	const ongoingCycle = {
		name: 'Implement Notifications',
		prd: {
			name: 'PRD Name',
			ongoing: false,
		},
		running: false,
		status: 'live',
	};
	const nextCycle = {
		name: 'Implement Light Theme',
		prd: {
			name: 'PRD Name',
			ongoing: false,
		},
		running: false,
		status: 'draft',
	};
	const prdVersion = {
		name: 'Improve Developer Experience',
		status: 'live',
		version: '3.x.x',
	};
	const ProductionVersion = {
		status: 'live',
		version: '3.10.2',
	};

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div className="-mt-[5%] grid w-[44rem] grid-cols-2 gap-x-16">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="col-span-2 mb-12"
					initial={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					<img
						alt="logo"
						className="w-32 rounded-md bg-bg-secondary p-2"
						src={logo}
					/>
					<div className="mt-4 text-left font-bold text-2xl text-text-secondary">
						Hey {userName}, welcome back!
					</div>
				</motion.div>

				<div className="space-y-6">
					<Card title="Production Deployment">
						<DeploymentCard version={ProductionVersion} />
					</Card>

					<Card title="Ongoing PRD">
						<PrdCard version={prdVersion} />
					</Card>

					<Card title="Ongoing Cycle">
						<CycleCard cycle={ongoingCycle} />
					</Card>

					<Card title="Next Cycle">
						<CycleCard cycle={nextCycle} />
					</Card>
				</div>
				<Card title="Notifications">
					<div
						className={cn(
							'rounded-md border border-border bg-bg-secondary/50',
							'flex min-h-16 items-center justify-center',
						)}
					>
						<div className="text-text-tertiary">
							Everything's calm (before `git push`)
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

function Card({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.2 }}
		>
			<div className="px-2 py-1 font-semibold text-text-muted text-xs">
				{title}
			</div>
			{children}
		</motion.div>
	);
}
