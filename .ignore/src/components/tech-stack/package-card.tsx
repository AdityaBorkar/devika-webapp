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

import { cn } from '@/lib/utils';

interface PackageCardProps {
	pkg: Package;
	onEditDocs: (id: string, currentUrl: string) => void;
}

export function PackageCard({ pkg, onEditDocs }: PackageCardProps) {
	const {
		name,
		version,
		docsUrl,
		lastScrapedDate,
		isUpdateAvailable,
		description,
		logoUrl,
		isUnused,
		hasSecurityAlert,
		isLocal,
		docSource,
	} = pkg;

	return (
		<div
			className={cn(
				'relative w-full rounded-lg border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-sm dark:bg-bg-primary',
				isLocal
					? 'border-indigo-200 dark:border-indigo-800'
					: 'border-zinc-200 dark:border-zinc-800',
			)}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					{logoUrl && (
						<div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-bg-primary p-1 dark:bg-bg-secondary">
							<img
								alt={name}
								className="object-contain"
								height={40}
								src={logoUrl}
								width={40}
							/>
						</div>
					)}
					<div>
						<div className="flex items-center gap-2">
							<h3 className="font-medium text-lg">{name}</h3>
							{isLocal && (
								<span className="rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-800 text-xs dark:bg-indigo-900 dark:text-indigo-300">
									Local
								</span>
							)}
						</div>
						{description && (
							<p className="mt-1 text-muted-foreground text-sm">
								{description}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					<a
						className="rounded-md p-1 text-muted-foreground hover:bg-bg-primary hover:text-primary dark:hover:bg-bg-secondary"
						href={docsUrl}
						rel="noopener noreferrer"
						target="_blank"
						title={`View ${isLocal ? 'local documentation' : 'external documentation'}`}
					>
						{isLocal ? (
							docSource === 'path' ? (
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
						onClick={(e) => {
							e.stopPropagation();
							onEditDocs(pkg.id, docsUrl);
						}}
						title="Edit documentation link"
						type="button"
					>
						<Edit className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="mt-5 flex flex-col gap-3">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-full bg-bg-secondary px-2 py-1 text-xs">
						v{version}
					</span>
					{isLocal && docSource && (
						<span className="flex items-center gap-1 rounded-full bg-bg-primary px-2 py-0.5 text-xs dark:bg-bg-secondary">
							{docSource === 'path' ? (
								<FolderDot className="h-3 w-3" />
							) : (
								<Book className="h-3 w-3" />
							)}
							{docSource === 'path' ? 'Path' : 'JSDoc'}
						</span>
					)}
					{isUpdateAvailable && (
						<span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-500 text-xs">
							<XCircle className="h-3 w-3" />
							Update
						</span>
					)}
					{isUnused && (
						<span className="flex items-center gap-1 rounded-full bg-bg-primary0/10 px-2 py-0.5 text-text-muted text-xs">
							<Shield className="h-3 w-3" />
							Unused
						</span>
					)}
					{hasSecurityAlert && (
						<span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-red-500 text-xs">
							<ShieldAlert className="h-3 w-3" />
							Security
						</span>
					)}
				</div>

				<div className="flex items-center justify-between border-zinc-200 border-t border-dashed pt-2 text-muted-foreground text-xs dark:border-zinc-800">
					<span>Last updated: {lastScrapedDate}</span>
					{isLocal && (
						<span className="rounded-full bg-bg-primary px-2 py-0.5 text-xs dark:bg-bg-secondary">
							{docsUrl}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
