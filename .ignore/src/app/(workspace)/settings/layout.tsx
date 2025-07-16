import { motion } from 'motion/react';
import type { IconType } from 'react-icons';
import {
	PiArrowUpRight,
	PiChatCircleText,
	PiCirclesThree,
	PiCube,
	PiDesktop,
	PiDiscordLogo,
	PiHeadset,
	PiNotebook,
	PiNotepad,
	PiUser,
} from 'react-icons/pi';
import { Link, Outlet } from 'react-router';

import { cn } from '@/lib/utils';

export default function SettingsLayout() {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="grid h-full grid-cols-[12rem_auto]"
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<nav className="flex flex-col justify-between border-border border-r px-2 py-2">
				<div className="flex flex-col gap-0.5">
					<NavLink href="/settings/account" icon={PiUser}>
						Account
					</NavLink>
					<NavLink href="/settings/workspace" icon={PiDesktop}>
						Workspace
					</NavLink>
					<NavLink href="/settings/ai-models" icon={PiCirclesThree}>
						AI Models
					</NavLink>
					<NavLink href="/settings/connected-apps" icon={PiCube}>
						Connected Apps
					</NavLink>
					<NavLink href="/settings/support" icon={PiHeadset}>
						Support
					</NavLink>
				</div>
				<div className="flex flex-col gap-1">
					<NavLink external href="/docs" icon={PiNotebook}>
						Documentation
					</NavLink>
					<NavLink external href="/release-notes" icon={PiNotepad}>
						Release Notes
					</NavLink>
					<NavLink external href="/discord" icon={PiDiscordLogo}>
						Community
					</NavLink>
					<NavLink external href="/feedback" icon={PiChatCircleText}>
						Feedback
					</NavLink>
				</div>
			</nav>
			<Outlet />
		</motion.div>
	);
}

function NavLink({
	icon: Icon,
	children,
	href,
	external = false,
}: {
	children: React.ReactNode;
	icon: IconType;
	href: string;
	external?: boolean;
}) {
	return (
		<Link
			className={cn(
				'flex flex-row items-center gap-2 rounded px-4 py-2 text-left text-text-secondary text-xs hover:bg-bg-tertiary',
				external && 'cursor-pointer *:cursor-pointer',
			)}
			target={external ? '_blank' : undefined}
			to={href}
		>
			<Icon className="size-4" />
			{children}
			{external && <PiArrowUpRight className="ml-auto size-4" />}
		</Link>
	);
}
