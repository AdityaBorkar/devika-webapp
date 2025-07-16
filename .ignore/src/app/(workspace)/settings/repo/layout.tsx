import { useAtomValue } from 'jotai';
import { Link } from 'react-router';

import { ProjectsAtom, WorkspaceAtom } from '@/lib/stores/app';

export default function RepositoryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const workspace = useAtomValue(WorkspaceAtom);
	const projects = useAtomValue(ProjectsAtom);

	// TODO: Add agents and memory

	return (
		<div className="cursor-default px-16 py-8 text-sm">
			<div className="grid grid-cols-[16rem_auto] rounded-md border border-border">
				<aside className="flex flex-col gap-2 overflow-y-auto border-border border-r px-4 py-4">
					{workspace.monorepo && (
						<div className="rounded-md border border-border bg-amber-100 px-2 py-1 text-amber-800">
							Monorepo managed by {workspace.monorepo}
						</div>
					)}
					{workspace.vcs && (
						<div className="rounded-md border border-border bg-amber-100 px-2 py-1 text-amber-800">
							VCS using {workspace.vcs}
						</div>
					)}
					{workspace.repo && (
						<div className="rounded-md border border-border bg-amber-100 px-2 py-1 text-amber-800">
							Repository managed on {workspace.repo}
						</div>
					)}
					{projects.map((project) => (
						<Link
							className="group rounded-md border border-border px-2 py-1"
							key={project.name}
							to={
								project.name === '$Root'
									? '/repository'
									: `/repository/${project.name}`
							}
						>
							<div className="flex flex-row justify-between gap-8">
								<div className="font-medium">{project.name}</div>
								<div className="not-group-hover:invisible text-xs">
									{project.path}
								</div>
							</div>
							<div className="text-xs">{project.description}</div>
						</Link>
					))}
				</aside>

				<main className="px-16 py-4">{children}</main>
			</div>
		</div>
	);
}
