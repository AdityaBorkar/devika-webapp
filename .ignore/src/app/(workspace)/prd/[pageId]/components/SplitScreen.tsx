import { type Atom, useAtom } from 'jotai';
import { PiFile, PiX } from 'react-icons/pi';
import { Link } from 'react-router';

import { ChatUI } from '@/app/(workspace)/prd/[pageId]/components/ChatUI';
import { EditorUI } from '@/app/(workspace)/prd/[pageId]/components/EditorUI';
import { cn } from '@/lib/utils';

export function SplitScreen({
	width,
	atoms,
	fallback,
}: {
	fallback: React.ReactNode;
	atoms: {
		activeTabId: Atom<Promise<string> | string>;
		tabs: Atom<Promise<{ tabs: TabType[]; openTabId: string }>>;
	};
	width?: number;
}) {
	const [{ tabs, openTabId }, setTabs] = useAtom(atoms.tabs);
	const [activeTabId, setActiveTabId] = useAtom(atoms.activeTabId);

	const openTab = tabs.find((tab) => tab.id === openTabId);
	if (!openTab) {
		console.log({ openTabId, tabs });
		throw new Error(`Tab ${openTabId} not found`);
	}

	// Context Menu:
	// Split Left
	// Split Right
	// Open in New Tab
	// Export
	// Share
	// Close
	// Delete

	if (tabs.length === 0) return fallback;
	return (
		<div className="flex h-full w-full flex-col">
			<nav className="flex flex-row items-center gap-0.5 border-border border-b p-1">
				<div className="flex flex-row items-center gap-0.5">
					{tabs.map((tab) => (
						<Link
							className={cn(
								'group relative block rounded-md border border-transparent px-2 py-1.5 font-medium text-text-tertiary text-xs',
								tab.id === activeTabId
									? [
											'bg-bg-tertiary text-text-primary',
											'after:-bottom-1.5 after:absolute after:right-0 after:w-full after:border-zinc-400 after:border-b',
										]
									: 'hover:bg-bg-secondary',
							)}
							key={tab.id}
							onClick={() => setActiveTabId(tab.id)}
							to={`/prd/${tab.id}`}
							type="button"
						>
							<PiFile className="-mt-0.5 mr-1 inline-block size-4" />
							{tab.name}
							<PiX
								className="-mt-0.5 ml-1 inline-block w-4 stroke-3 opacity-0 group-hover:opacity-100"
								onClick={() =>
									setTabs({
										openTabId,
										tabs: tabs.filter((t) => t.id !== tab.id),
									})
								}
							/>
						</Link>
					))}
				</div>
			</nav>
			<div className="relative grow overflow-auto px-8 py-8 ">
				{openTab.type === 'doc' ? <EditorUI /> : <ChatUI />}
			</div>
		</div>
	);
}
