import { useAtomValue } from 'jotai';
import { useQueryState } from 'nuqs';

// import PackageList from '@/app/(app)/repository/_components/PackageList';
import { ProjectsAtom } from '@/lib/stores/app';

// TODO: What if NOT A MONOREPO?
// Show Files (if yes, show tokens and char count)
// Color Coding for apps/packages/domains
// List of Project Rules and where to use them.
// Add labels to projects

// Labels to the last. Valid types - Outdated, Security Warning, Indexing Failed
// Last updated must be a date in DDMMMYYYY format
// Documentation can be of type - Path / External URL / Auto-infer (Disable/Enable HMR with a warning of high token usage if enabled)

export default function RepositoryProjectPage() {
	const projects = useAtomValue(ProjectsAtom);

	const [projectName] = useQueryState('project', {
		defaultValue: projects[0].name,
	});
	const project = projects.find((project) => project.name === projectName);
	if (!project) throw new Error('Project not found');

	return (
		<div>
			{/* {projectName === "{MONOREPO}" ? (
		<div>Monorepo</div>
	) : (
		<div>Project Man</div>
	)} */}
			<h2>Project Rules</h2>

			<h2>Development Workflow</h2>

			<h2>MCP Servers</h2>

			<h2>
				Enable Whiteboarding like Firebase Studio (using a Chrome Extension)
			</h2>

			<h2>See File Structure and Total Tokens</h2>

			<h2>Include Tech Stack</h2>

			<h2>Styling Rules</h2>

			<h2>Git Rules</h2>

			<h2>CI-CD-Hosting-Infra-Observability-Monitoring-Logging-Alerting</h2>

			{/* // TODO: Make this external link to https://cursor.directory/
{
label: "Explore",
href: "/explore",
icon: PiCompass,

Add over every input box
*/}

			<h2>Packages</h2>
			{/* <PackageList project={project} /> */}
		</div>
	);
}
