import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import {
	PiChat,
	PiEye,
	PiFile,
	PiPencilLine,
	PiPlus,
	PiPlusMinus,
	PiTarget,
} from 'react-icons/pi';
import { Outlet } from 'react-router';

import ChangesNavigation from '@/app/(workspace)/prd/components/nav-changes';
import FilesNavigation from '@/app/(workspace)/prd/components/nav-files';
import SearchNavigation from '@/app/(workspace)/prd/components/nav-search';
import { PrdVersionAtom } from '@/app/(workspace)/prd/store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const TABS = [
	{
		icon: PiChat,
		label: 'Chats',
		navigation: SearchNavigation,
		segment: 'search',
	},
	{
		icon: PiFile,
		label: 'Files',
		navigation: FilesNavigation,
		segment: 'files',
	},
	{
		icon: PiPlusMinus,
		label: 'Changes',
		navigation: ChangesNavigation,
		segment: 'changes',
	},
];

export default function PrdLayout() {
	const version = useAtomValue(PrdVersionAtom);
	const [TabSegment, setTabSegment] = useState('files');
	const Navigation = useMemo(
		() => TABS.find((tab) => tab.segment === TabSegment)?.navigation,
		[TabSegment],
	);

	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="grid h-full w-full grid-cols-[18rem_1fr]"
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<aside className="border-border border-r ">
				<div className="border-border border-b">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex w-full flex-row items-center gap-2 px-4 pt-2 pb-1.5 font-medium text-text-tertiary hover:bg-bg-secondary">
								<PiTarget className="size-5" />
								{version.name}
								<span className="rounded-md bg-bg-secondary px-2 py-1 text-text-secondary text-xs">
									12.x.x
								</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full">
							<DropdownMenuItem className="w-full">
								<PiPencilLine className="mr-2" />
								Rename Version
							</DropdownMenuItem>
							<DropdownMenuItem>
								<PiPlus className="mr-2" />
								Bump Version
							</DropdownMenuItem>
							<DropdownMenuItem>
								<PiPlus className="mr-2" />
								Switch Version
							</DropdownMenuItem>
							<DropdownMenuItem>
								<PiEye className="mr-2" />
								View All Versions
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="mx-4 my-2 grid grid-cols-3 gap-1 rounded-md border border-border bg-bg-secondary p-0.5 font-medium text-xs tracking-tight">
					{TABS.map((tab) => (
						<button
							className={cn(
								'select-none rounded-md px-1 py-1.5 text-center',
								tab.segment === TabSegment
									? 'bg-bg-tertiary'
									: 'hover:bg-bg-tertiary/50',
							)}
							key={tab.segment}
							onClick={() => setTabSegment(tab.segment)}
							type="button"
						>
							<tab.icon className="-mt-1 mr-1 inline-block size-4 w-auto" />
							{tab.label}
						</button>
					))}
				</div>

				{Navigation && <Navigation />}
			</aside>
			<Outlet />
		</motion.div>
	);
}

// <div
// 	class="aislash-editor-input"
// 	contenteditable="true"
// 	spellcheck="false"
// 	style="resize: none; grid-area: 1 / 1 / 1 / 1; overflow: hidden; line-height: 1.5; font-family: inherit; font-size: 12px; color: var(--vscode-input-foreground); background-color: transparent; display: block; outline: none; scrollbar-width: none; box-sizing: border-box; border: none; overflow-wrap: break-word; word-break: break-word; padding: 0px; user-select: text; white-space: pre-wrap;"
// 	data-lexical-editor="true"
// 	role="textbox"
// >
// 	<p dir="ltr">
// 		<span data-lexical-text="true">aditya </span>
// 		<span
// 			class="mention"
// 			contenteditable="false"
// 			data-lexical-text="true"
// 			style="background-color: color-mix(in srgb, var(--vscode-charts-blue) 20%, transparent);"
// 		>
// 			@src
// 		</span>
// 		<span data-lexical-text="true" />
// 		<span data-lexical-text="true"> is here </span>
// 		<span
// 			class="mention"
// 			contenteditable="false"
// 			data-mention-name="route.ts"
// 			data-mention-key="70"
// 			data-typeahead-type="file"
// 			data-lexical-text="true"
// 			style="background-color: color-mix(in srgb, var(--vscode-charts-blue) 20%, transparent); cursor: pointer;"
// 		>
// 			@route.ts
// 		</span>
// 		<span data-lexical-text="true" />
// 		<span data-lexical-text="true"> </span>
// 	</p>
// </div>;
