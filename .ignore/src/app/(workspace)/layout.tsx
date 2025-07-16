import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons/lib';
import {
	PiCheckCircleDuotone,
	PiCheckSquare,
	PiGear,
	PiHouse,
	PiLightbulbFilament,
	PiPlayCircle,
	PiXCircleDuotone,
} from 'react-icons/pi';
import { Link, Navigate, Outlet, useLocation, useParams } from 'react-router';

import { ConnectionDialog } from '@/components/ConnectionDialog';
import { Dialog } from '@/contexts/DialogContext';
import { $fetch } from '@/lib/$fetch';
import { cn } from '@/lib/utils';

const NAV_ITEMS_TOP = [
	{ href: 'dashboard', icon: PiHouse, label: 'Dashboard' },
	{ href: 'prd', icon: PiLightbulbFilament, label: 'PRD' },
	{ href: 'tasks', icon: PiCheckSquare, label: 'Tasks' },
	{ href: 'cycles', icon: PiPlayCircle, label: 'Cycles' },
	// { href: 'workspace', icon: PiCode, label: 'Workspace' },
	// { href: 'versions', icon: PiClockCounterClockwise, label: 'Versions' },
	// { href: 'deployments', icon: PiRocketLaunch, label: 'Deployments' },
];

const NAV_ITEMS_BOTTOM = [
	// { href: "stats", icon: PiChartPieSlice, label: "Stats" },
	{ href: 'settings', icon: PiGear, label: 'Settings' },
];

export default function WorkspaceLayout() {
	// const workspace = use(useWorkspace());
	// if (!workspace) redirect("/new");

	const { userSlug, workspaceSlug } = useParams();
	const [workspace, setWorkspace] = useState<any>(null);
	useEffect(() => {
		if (workspace) return;
		const slug = `${userSlug}/${workspaceSlug}`;
		$fetch('GET', '/api/actions/workspace', { slug }).then(
			({ success, data }) => {
				console.log({ data, success });
				if (success) setWorkspace(data);
				else setWorkspace('NOT-FOUND');
			},
		);
	}, [userSlug, workspace, workspaceSlug]);

	const location = useLocation();
	const segment = location.pathname.split('/')[3];

	if (workspace === 'NOT-FOUND') return <Navigate to="/new" />;
	// if (workspace === "UNAUTHORIZED")
	return (
		<div className="grid h-screen grid-cols-[3.5rem_auto]">
			<nav className="relative flex flex-col px-1.5 py-1">
				<Dialog.Trigger content={<ConnectionDialog />}>
					<NavItem
						className="mt-2 border-pink-700 bg-pink-800 py-1.5 font-medium text-pink-100 hover:border-pink-700 hover:bg-pink-700 hover:text-pink-50"
						isActive={false}
						label="Workspace"
					>
						{/* Switch Workspace, Account Settings, Logout, All Projects */}
						DA
					</NavItem>
				</Dialog.Trigger>
				{NAV_ITEMS_TOP.map((item) => (
					<NavItem key={item.href} {...item} isActive={segment === item.href} />
				))}
				<div className="grow" />
				{NAV_ITEMS_BOTTOM.map((item) => (
					<NavItem key={item.href} {...item} isActive={segment === item.href} />
				))}
				<Dialog.Trigger content={<ConnectionDialog />}>
					<NavItem isActive={false} label="Client Connection">
						<ClientConnection />
					</NavItem>
				</Dialog.Trigger>
			</nav>
			<main className="my-2 mr-2 overflow-y-auto rounded-md border border-border bg-bg-primary shadow-md">
				<Outlet />
			</main>
		</div>
	);
}

function NavItem({
	icon: Icon,
	href,
	label,
	children,
	isActive,
	className,
	...props
}: {
	isActive: boolean;
	label: string;
	href?: string;
	icon?: IconType;
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}) {
	const cue = null;
	const to = href ?? '#';
	const Component = href ? Link : 'div';
	return (
		<Component
			className={cn(
				'group relative my-1 w-fit select-none rounded-md border border-transparent px-2 py-2 text-sm text-text-muted',
				'transition-all duration-200',
				isActive
					? 'border-border bg-bg-secondary text-text-primary'
					: 'hover:border-border hover:bg-bg-secondary/80 hover:text-text-primary/80',
				className,
			)}
			to={to}
			{...props}
		>
			{cue && (
				<div
					className={cn(
						'absolute top-1.75 right-1.5 size-2 rounded-full',
						cue === 'error' && 'bg-rose-500/80',
						cue === 'warning' && 'bg-amber-500/80',
						cue === 'info' && 'bg-sky-500/80',
						cue === 'muted' && 'bg-stone-300/80',
					)}
				/>
			)}
			{Icon && <Icon className="mx-auto size-5 stroke-3" />}
			{children}
			<div
				className={cn(
					'pointer-events-none invisible absolute top-1.5 left-11 z-50 text-nowrap rounded bg-text-tertiary px-2 py-1 font-semibold text-bg-primary text-xs',
					'opacity-0 transition-all duration-200',
					'group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100',
				)}
			>
				{label}
			</div>
		</Component>
	);
}

function ClientConnection() {
	const isConnected = false;
	return isConnected ? (
		<PiCheckCircleDuotone className="mx-auto size-5 text-green-600 " />
	) : (
		<PiXCircleDuotone className="mx-auto size-5 text-rose-500 " />
	);
}
