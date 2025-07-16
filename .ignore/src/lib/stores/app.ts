import { atom } from 'jotai';

// Types
type Label = {
	name: string;
	color:
		| 'red'
		| 'blue'
		| 'green'
		| 'yellow'
		| 'purple'
		| 'pink'
		| 'indigo'
		| 'cyan'
		| 'amber'
		| 'orange'
		| 'violet'
		| 'emerald';
};

type PackageCategory =
	| 'Testing'
	| 'Hosting'
	| 'Frontend'
	| 'Backend'
	| 'DevOps'
	| 'Utilities'
	| 'Other';

type Package = {
	name: string;
	version: string;
	labels: Label[];
	docLink?: string;
	lastUpdated: Date;
	category: PackageCategory;
};

type MonorepoApp = {
	name: string;
	description: string;
	path: string;
	packages: Package[];
};

// Mock data
const projects: MonorepoApp[] = [
	{
		description: 'Outside the context of apps',
		name: '$Root',
		packages: [
			{
				category: 'Frontend',
				docLink: 'https://reactjs.org/docs',
				labels: [{ color: 'blue', name: 'UI' }],
				lastUpdated: new Date('2023-05-15'),
				name: 'react',
				version: '18.2.0',
			},
			{
				category: 'Frontend',
				docLink: 'https://tailwindcss.com/docs',
				labels: [{ color: 'cyan', name: 'CSS' }],
				lastUpdated: new Date('2023-06-20'),
				name: 'tailwindcss',
				version: '3.3.3',
			},
			{
				category: 'Testing',
				docLink: 'https://jestjs.io/docs',
				labels: [{ color: 'red', name: 'Critical' }],
				lastUpdated: new Date('2023-04-10'),
				name: 'jest',
				version: '29.6.2',
			},
			{
				category: 'Hosting',
				docLink: 'https://vercel.com/docs',
				labels: [{ color: 'green', name: 'Production' }],
				lastUpdated: new Date('2023-07-05'),
				name: 'vercel',
				version: '32.1.0',
			},
		],
		path: 'app/repository',
	},
	{
		description: 'Web App',
		name: 'web-app',
		packages: [
			{
				category: 'Frontend',
				docLink: 'https://reactjs.org/docs',
				labels: [{ color: 'blue', name: 'UI' }],
				lastUpdated: new Date('2023-05-15'),
				name: 'react',
				version: '18.2.0',
			},
			{
				category: 'Frontend',
				docLink: 'https://tailwindcss.com/docs',
				labels: [{ color: 'cyan', name: 'CSS' }],
				lastUpdated: new Date('2023-06-20'),
				name: 'tailwindcss',
				version: '3.3.3',
			},
			{
				category: 'Testing',
				docLink: 'https://jestjs.io/docs',
				labels: [{ color: 'red', name: 'Critical' }],
				lastUpdated: new Date('2023-04-10'),
				name: 'jest',
				version: '29.6.2',
			},
			{
				category: 'Hosting',
				docLink: 'https://vercel.com/docs',
				labels: [{ color: 'green', name: 'Production' }],
				lastUpdated: new Date('2023-07-05'),
				name: 'vercel',
				version: '32.1.0',
			},
		],
		path: '/app/...',
	},
	{
		description: 'API Service',
		name: 'API Service',
		packages: [
			{
				category: 'Backend',
				docLink: 'https://expressjs.com/',
				labels: [{ color: 'purple', name: 'Server' }],
				lastUpdated: new Date('2023-03-18'),
				name: 'express',
				version: '4.18.2',
			},
			{
				category: 'Backend',
				docLink: 'https://www.prisma.io/docs',
				labels: [
					{ color: 'indigo', name: 'ORM' },
					{ color: 'red', name: 'Critical' },
				],
				lastUpdated: new Date('2023-07-20'),
				name: 'prisma',
				version: '5.1.1',
			},
			{
				category: 'DevOps',
				docLink: 'https://www.typescriptlang.org/docs',
				labels: [{ color: 'blue', name: 'Language' }],
				lastUpdated: new Date('2023-06-15'),
				name: 'typescript',
				version: '5.1.6',
			},
			{
				category: 'Testing',
				docLink: 'https://github.com/visionmedia/supertest#readme',
				labels: [{ color: 'amber', name: 'Testing' }],
				lastUpdated: new Date('2023-05-12'),
				name: 'supertest',
				version: '6.3.3',
			},
		],
		path: '/app/...',
	},
	{
		description: 'Mobile App',
		name: 'Mobile App',
		packages: [
			{
				category: 'Frontend',
				docLink: 'https://reactnative.dev/docs',
				labels: [
					{ color: 'blue', name: 'Core' },
					{ color: 'orange', name: 'Mobile' },
				],
				lastUpdated: new Date('2023-07-10'),
				name: 'react-native',
				version: '0.72.3',
			},
			{
				category: 'Frontend',
				docLink: 'https://docs.expo.dev/',
				labels: [{ color: 'violet', name: 'Framework' }],
				lastUpdated: new Date('2023-07-15'),
				name: 'expo',
				version: '49.0.5',
			},
			{
				category: 'Testing',
				docLink: 'https://wix.github.io/Detox/',
				labels: [{ color: 'amber', name: 'E2E' }],
				lastUpdated: new Date('2023-06-30'),
				name: 'detox',
				version: '20.7.0',
			},
			{
				category: 'DevOps',
				docLink: 'https://docs.microsoft.com/en-us/appcenter/',
				labels: [{ color: 'emerald', name: 'CI/CD' }],
				lastUpdated: new Date('2023-04-25'),
				name: 'app-center',
				version: '5.0.0',
			},
		],
		path: '/app/...',
	},
];

const workspace = {
	monorepo: 'bun',
	name: 'My Workspace',
	repo: 'github',
	vcs: 'git',
};

export const ProjectsAtom = atom(projects);

export const WorkspaceAtom = atom(workspace);

export const CycleAtom = {
	Views: atom([
		{
			display: {},
			filters: [{ status: 'All' }],
			id: '1',
			label: 'View 1',
			sort: { column: 'endDate', direction: 'asc' },
		},
		// { id: '2', label: 'View 2', filters: [], display: {} },
		// { id: '3', label: 'View 3', filters: [], display: {} },
	] as const),
};
