'use client';

import {
	Book,
	Edit,
	ExternalLink,
	FileSymlink,
	FolderDot,
	Shield,
	ShieldAlert,
	XCircle,
} from 'lucide-react';
import type { Package } from 'types/tech-stack';

interface PackageTableViewProps {
	packages: Package[];
	onEditDocs: (id: string, currentUrl: string) => void;
	categoryLabel: string;
}

export function PackageTableView({
	packages,
	onEditDocs,
	categoryLabel,
}: PackageTableViewProps) {
	return (
		<div className="my-4 overflow-x-auto">
			<h3 className="mb-3 font-medium text-lg">{categoryLabel}</h3>
			<div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-bg-primary">
				<table className="w-full border-collapse">
					<thead className="bg-bg-primary dark:bg-bg-primary/80">
						<tr>
							<th className="border-zinc-200 border-b p-3 text-left font-medium text-sm dark:border-zinc-800">
								Package
							</th>
							<th className="border-zinc-200 border-b p-3 text-left font-medium text-sm dark:border-zinc-800">
								Version
							</th>
							<th className="border-zinc-200 border-b p-3 text-left font-medium text-sm dark:border-zinc-800">
								Last Updated
							</th>
							<th className="border-zinc-200 border-b p-3 text-left font-medium text-sm dark:border-zinc-800">
								Status
							</th>
							<th className="border-zinc-200 border-b p-3 text-left font-medium text-sm dark:border-zinc-800">
								Documentation
							</th>
							<th className="border-zinc-200 border-b p-3 text-left font-medium text-sm dark:border-zinc-800">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{packages.map((pkg) => (
							<tr
								className="border-zinc-200 border-b transition-colors hover:bg-bg-primary dark:border-zinc-800 dark:hover:bg-bg-secondary/50"
								key={pkg.id}
							>
								<td className="p-3">
									<div className="flex items-center gap-2">
										{pkg.logoUrl && (
											<div className="relative h-6 w-6 overflow-hidden rounded-sm bg-bg-primary p-0.5 dark:bg-bg-secondary">
												<img
													alt={pkg.name}
													className="object-contain"
													height={24}
													src={pkg.logoUrl}
													width={24}
												/>
											</div>
										)}
										<div className="flex flex-col">
											<div className="flex items-center gap-2">
												<span className="font-medium">{pkg.name}</span>
												{pkg.isLocal && (
													<span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-indigo-800 text-xs leading-none dark:bg-indigo-900 dark:text-indigo-300">
														Local
													</span>
												)}
											</div>
											{pkg.description && (
												<span className="mt-0.5 max-w-xs truncate text-muted-foreground text-xs">
													{pkg.description}
												</span>
											)}
										</div>
									</div>
								</td>
								<td className="p-3">
									<span className="rounded-full bg-bg-secondary px-2 py-1 text-xs">
										{pkg.version}
									</span>
								</td>
								<td className="p-3 text-muted-foreground text-sm">
									{pkg.lastScrapedDate}
								</td>
								<td className="p-3">
									<div className="flex flex-wrap gap-1">
										{pkg.isUpdateAvailable && (
											<span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-500 text-xs">
												<XCircle className="h-3 w-3" />
												Update
											</span>
										)}
										{pkg.isUnused && (
											<span className="flex items-center gap-1 rounded-full bg-bg-primary0/10 px-2 py-0.5 text-text-muted text-xs">
												<Shield className="h-3 w-3" />
												Unused
											</span>
										)}
										{pkg.hasSecurityAlert && (
											<span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-red-500 text-xs">
												<ShieldAlert className="h-3 w-3" />
												Security
											</span>
										)}
									</div>
								</td>
								<td className="p-3">
									{pkg.isLocal ? (
										<div className="flex items-center gap-1 text-xs">
											{pkg.docSource === 'path' ? (
												<>
													<FolderDot className="h-3 w-3 text-blue-500" />
													<span className="text-muted-foreground">
														Path: {pkg.docsUrl}
													</span>
												</>
											) : (
												<>
													<Book className="h-3 w-3 text-blue-500" />
													<span className="text-muted-foreground">
														JSDoc: {pkg.docsUrl}
													</span>
												</>
											)}
										</div>
									) : (
										<div className="flex items-center gap-1 text-xs">
											<ExternalLink className="h-3 w-3 text-blue-500" />
											<span className="max-w-xs truncate text-muted-foreground">
												{pkg.docsUrl}
											</span>
										</div>
									)}
								</td>
								<td className="p-3">
									<div className="flex items-center gap-2">
										<a
											className="rounded-md p-1 text-muted-foreground hover:bg-bg-primary hover:text-primary dark:hover:bg-bg-secondary"
											href={pkg.docsUrl}
											rel="noopener noreferrer"
											target="_blank"
											title={`View ${pkg.isLocal ? 'local documentation' : 'external documentation'}`}
										>
											{pkg.isLocal ? (
												pkg.docSource === 'path' ? (
													<FileSymlink className="h-4 w-4" />
												) : (
													<Book className="h-4 w-4" />
												)
											) : (
												<ExternalLink className="h-4 w-4" />
											)}
										</a>
										<button
											className="rounded-md p-1 text-muted-foreground hover:bg-bg-primary hover:text-primary dark:hover:bg-bg-secondary"
											onClick={() => onEditDocs(pkg.id, pkg.docsUrl)}
											title="Edit documentation link"
											type="button"
										>
											<Edit className="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
