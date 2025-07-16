import { PiBoxArrowDown, PiBoxArrowUp } from 'react-icons/pi';
import { Link } from 'react-router';

export default function WorkspaceSettings() {
	return (
		<div>
			<Link className="" to="/settings/import-profile">
				<PiBoxArrowUp className="-mt-0.5" />
				Import VSC Profile
			</Link>
			<Link className="" to="/settings/export-profile">
				<PiBoxArrowDown className="-mt-0.5" />
				Export VSC Profile
			</Link>
		</div>
	);
}

// Data & Shared Links
