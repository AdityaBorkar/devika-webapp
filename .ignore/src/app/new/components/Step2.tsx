import { arktypeResolver } from '@hookform/resolvers/arktype';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { workspaceAtom } from '@/app/new/store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useClientSync } from '@/lib/server-sync/ServerSync';
import { cn } from '@/lib/utils';
import { ProjectOnboarding } from '@/schema/ProjectOnboarding';

export function Step2({
	setStep: setCurrentStep,
}: {
	setStep: (step: number) => void;
}) {
	const form = useForm<ProjectOnboarding>({
		mode: 'onChange',
		resolver: arktypeResolver(ProjectOnboarding),
	});
	const { handleSubmit } = form;

	const workspace = useAtomValue(workspaceAtom);
	const { socket } = useClientSync();
	function onSubmit(_data: ProjectOnboarding) {
		const params = { command: 'ONBOARDING', data: workspace };
		socket.send(JSON.stringify(params));
		setCurrentStep(3);
	}

	const [workspacePath, _setWorkspacePath] = useState<string | undefined>(
		undefined,
	);
	return (
		<form className="px-8 py-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-6 font-medium text-lg">
				Connect to a Local Workspace
			</div>
			<div className="flex flex-col gap-2">
				<div>
					<Label>Connect to Local Workspace (Empty Works)</Label>
					<div className="mt-2 flex justify-between rounded-md border border-border p-1">
						<div className="px-2 py-1 font-mono text-text-secondary">
							bunx devika connect EXPIRES-IN-TWO-MINS
						</div>
						<div className="rounded-md bg-bg-tertiary px-2 py-1 text-text-tertiary">
							Copy
						</div>
					</div>
					<div className="px-2 pt-2">
						<div
							className={cn(
								'-mb-0.5 mr-2 inline-block size-4 rounded-full ',
								workspacePath && 'bg-green-500',
								!workspacePath && 'animate-pulse bg-amber-500',
							)}
						/>
						{workspacePath
							? `Connected to ${workspacePath}`
							: 'Waiting for connection...'}
					</div>
				</div>
				{/* <Button className="">Connect to GitHub Repository</Button> */}
			</div>

			<Button className="mt-6 w-full" disabled={!workspacePath} type="submit">
				Next
			</Button>
			<Button className="mt-6 w-full" type="submit">
				I will connect later
			</Button>
		</form>
	);
}
