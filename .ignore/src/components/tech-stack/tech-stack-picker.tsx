'use client';

import { useState } from 'react';
import type {
	AppConfig,
	Package,
	PackageCategory,
	ViewMode,
} from 'types/tech-stack';

import { mockAppConfigs, mockPackages } from '@/lib/mock-data';
import { AppConfigEdit } from './app-config-edit';
import { DocUrlDialog } from './doc-url-dialog';
import { PackageCard } from './package-card';
import { PackageTableView } from './package-table-view';
import { ViewToggle } from './view-toggle';

export function TechStackPicker() {
	const [selectedConfigId, setSelectedConfigId] = useState<string>('common');
	const [viewMode, setViewMode] = useState<ViewMode>('card');
	const [appConfigs, setAppConfigs] = useState<AppConfig[]>(mockAppConfigs);
	const [packages, setPackages] = useState<Package[]>(mockPackages);

	// Dialog state for editing doc URL
	const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
	const [editingPackageId, setEditingPackageId] = useState('');
	const [editingDocUrl, setEditingDocUrl] = useState('');

	// Get the current config
	const currentConfig =
		appConfigs.find((config) => config.id === selectedConfigId) ||
		appConfigs[0];

	// Get packages for the selected config
	const getConfigPackages = () => {
		if (!currentConfig) return [];
		return packages.filter((pkg) => currentConfig.packages.includes(pkg.id));
	};

	const configPackages = getConfigPackages();

	// Handle config change
	const handleConfigChange = (configId: string) => {
		setSelectedConfigId(configId);
	};

	// Handle view mode toggle
	const handleViewModeToggle = (mode: ViewMode) => {
		setViewMode(mode);
	};

	// Open doc URL edit dialog
	const openDocUrlDialog = (packageId: string, currentUrl: string) => {
		setEditingPackageId(packageId);
		setEditingDocUrl(currentUrl);
		setIsDocDialogOpen(true);
	};

	// Save doc URL changes
	const saveDocUrl = (packageId: string, newUrl: string) => {
		setPackages((prev) =>
			prev.map((pkg) =>
				pkg.id === packageId ? { ...pkg, docsUrl: newUrl } : pkg,
			),
		);
	};

	// Save app config changes
	const saveAppConfig = (id: string, name: string, filePath: string) => {
		setAppConfigs((prev) =>
			prev.map((config) =>
				config.id === id ? { ...config, filePath, name } : config,
			),
		);
	};

	// Group packages by category
	const packagesByCategory: Record<PackageCategory, Package[]> = {
		backend: [],
		cicd: [],
		database: [],
		documentation: [],
		frontend: [],
		hosting: [],
		logging: [],
		monitoring: [],
		other: [],
		testing: [],
	};

	for (const pkg of configPackages) {
		packagesByCategory[pkg.category].push(pkg);
	}

	// Category labels for display
	const categoryLabels: Record<PackageCategory, string> = {
		backend: 'Backend',
		cicd: 'CI/CD and Deployment',
		database: 'Database',
		documentation: 'Documentation',
		frontend: 'Frontend',
		hosting: 'Hosting',
		logging: 'Logging',
		monitoring: 'Monitoring',
		other: 'Others',
		testing: 'Testing',
	};

	return (
		<div className="space-y-8">
			{/* App Configurations */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-xl">App Configuration</h2>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{appConfigs.map((config) => (
						<button
							aria-pressed={selectedConfigId === config.id}
							className={`rounded-lg border p-4 ${
								config.isLocal
									? 'border-indigo-200 dark:border-indigo-800'
									: 'border-zinc-200 dark:border-zinc-800'
							} w-full text-left transition-all hover:shadow-sm ${
								selectedConfigId === config.id
									? 'border-primary bg-bg-primary/5'
									: 'bg-white hover:border-primary/30 dark:bg-bg-primary'
							}`}
							key={config.id}
							onClick={() => handleConfigChange(config.id)}
							type="button"
						>
							<AppConfigEdit config={config} onSave={saveAppConfig} />
						</button>
					))}
				</div>
			</div>

			{/* Package display section */}
			<div className="space-y-4">
				<div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-bg-primary p-4 dark:border-zinc-700 dark:bg-bg-secondary">
					<h2 className="font-semibold text-xl">
						{currentConfig?.name || 'Tech Stack'} Packages
						<span className="ml-2 text-muted-foreground text-sm">
							({configPackages.length} packages)
						</span>
					</h2>
					<ViewToggle onToggle={handleViewModeToggle} viewMode={viewMode} />
				</div>

				{/* No packages message */}
				{configPackages.length === 0 && (
					<div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-bg-primary">
						<p className="text-muted-foreground">
							No packages found in this configuration.
						</p>
					</div>
				)}

				{/* Render packages based on view mode */}
				{configPackages.length > 0 &&
					(Object.keys(packagesByCategory) as PackageCategory[]).map(
						(category) => {
							const categoryPackages = packagesByCategory[category];
							if (categoryPackages.length === 0) return null;

							if (viewMode === 'table') {
								return (
									<PackageTableView
										categoryLabel={categoryLabels[category]}
										key={category}
										onEditDocs={openDocUrlDialog}
										packages={categoryPackages}
									/>
								);
							}

							return (
								<div className="mt-6 space-y-4" key={category}>
									<h3 className="border-zinc-200 border-b pb-2 font-medium text-lg dark:border-zinc-800">
										{categoryLabels[category]}
										<span className="ml-2 text-muted-foreground text-sm">
											({categoryPackages.length})
										</span>
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
										{categoryPackages.map((pkg) => (
											<PackageCard
												key={pkg.id}
												onEditDocs={openDocUrlDialog}
												pkg={pkg}
											/>
										))}
									</div>
								</div>
							);
						},
					)}
			</div>

			{/* Doc URL Dialog */}
			<DocUrlDialog
				initialUrl={editingDocUrl}
				isOpen={isDocDialogOpen}
				onClose={() => setIsDocDialogOpen(false)}
				onSave={saveDocUrl}
				packageId={editingPackageId}
			/>
		</div>
	);
}
