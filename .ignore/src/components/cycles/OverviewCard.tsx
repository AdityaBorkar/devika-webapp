'use client';

import { Card } from '@/components/ui/card';

interface OverviewCardProps {
	title: string;
	value: string;
	description: string;
	icon: 'tasks' | 'tokens' | 'calendar' | 'roadblocks';
	status?: 'positive' | 'negative' | 'zinc';
}

export function OverviewCard({
	title,
	value,
	description,
	icon,
	status = 'zinc',
}: OverviewCardProps) {
	const getStatusClass = () => {
		switch (status) {
			case 'positive':
				return 'text-green-600';
			case 'negative':
				return 'text-red-600';
			default:
				return 'text-text-muted';
		}
	};

	const renderIcon = () => {
		switch (icon) {
			case 'tasks':
				return (
					<svg
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Tasks</title>
						<path d="M9 11l3 3L22 4" />
						<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
					</svg>
				);
			case 'tokens':
				return (
					<svg
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Tokens</title>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" x2="12" y1="8" y2="12" />
						<line x1="12" x2="12.01" y1="16" y2="16" />
					</svg>
				);
			case 'calendar':
				return (
					<svg
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Calendar</title>
						<rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
						<line x1="16" x2="16" y1="2" y2="6" />
						<line x1="8" x2="8" y1="2" y2="6" />
						<line x1="3" x2="21" y1="10" y2="10" />
					</svg>
				);
			case 'roadblocks':
				return (
					<svg
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Roadblocks</title>
						<circle cx="12" cy="12" r="10" />
						<line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<Card className="p-4">
			<div className="flex items-start justify-between">
				<div>
					<h4 className="font-medium text-sm text-text-muted">{title}</h4>
					<div className="mt-1 flex items-baseline">
						<p className="font-semibold text-2xl">{value}</p>
					</div>
					<p className={`text-sm ${getStatusClass()}`}>{description}</p>
				</div>
				<div className="text-text-tertiary">{renderIcon()}</div>
			</div>
		</Card>
	);
}
