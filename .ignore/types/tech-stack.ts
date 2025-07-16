export type PackageCategory =
	| 'backend'
	| 'frontend'
	| 'database'
	| 'logging'
	| 'testing'
	| 'hosting'
	| 'cicd'
	| 'monitoring'
	| 'documentation'
	| 'other';

export type ViewMode = 'card' | 'table';

export type DocSource = 'url' | 'path' | 'jsdoc';

export interface Package {
	id: string;
	name: string;
	version: string;
	docsUrl: string;
	lastScrapedDate: string;
	isUpdateAvailable: boolean;
	category: PackageCategory;
	description?: string;
	logoUrl?: string;
	isUnused?: boolean;
	hasSecurityAlert?: boolean;
	isLocal?: boolean;
	docSource?: DocSource;
}

export interface AppConfig {
	id: string;
	name: string;
	description: string;
	isCommon: boolean;
	isLocal?: boolean;
	filePath?: string;
	packages: string[]; // Array of package IDs
}
