import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProjectOnboarding_ProjectStructure() {
	return (
		<div>
			<Label>
				Execute this prompt to understand the project structure and generate
				existing PRD:
			</Label>
			<pre className="my-8 rounded-lg border border-border bg-text-primary p-4">
				Prompt
			</pre>

			{/* <Button>Generate PRD</Button> */}
			<Link to="/prd/files">
				<Button>Next</Button>
			</Link>
		</div>
	);
}
