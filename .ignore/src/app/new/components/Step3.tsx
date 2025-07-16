import { useAtomValue } from 'jotai';
import { redirect } from 'react-router';

import { workspaceAtom } from '@/app/new/store';
import { Button } from '@/components/ui/button';

export function Step3({
	setStep: setCurrentStep,
}: {
	setStep: (step: number) => void;
}) {
	const workspace = useAtomValue(workspaceAtom);
	return (
		<div>
			<div>Connect Jira / Atlassian / Slack</div>
			<div>
				<Button onClick={() => redirect(`/${workspace?.slug}`)}>Next</Button>
				<Button className="mt-6 w-full" type="submit">
					I will connect later
				</Button>
			</div>
		</div>
	);
}
