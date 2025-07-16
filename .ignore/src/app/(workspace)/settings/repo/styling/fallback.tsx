export default function RepositoryStylingFallback() {
	return (
		<div className="space-y-6 p-6">
			<div className="h-8 w-1/3 animate-pulse rounded-md bg-bg-secondary" />

			<div className="space-y-4">
				<div className="h-6 w-1/4 animate-pulse rounded-md bg-bg-secondary" />
				<div className="h-64 w-full animate-pulse rounded-md bg-bg-primary" />
			</div>

			<div className="space-y-4">
				<div className="flex justify-between">
					<div className="h-6 w-1/4 animate-pulse rounded-md bg-bg-secondary" />
					<div className="h-10 w-1/3 animate-pulse rounded-md bg-bg-secondary" />
				</div>
				<div className="h-64 w-full animate-pulse rounded-md bg-bg-primary" />
				<div className="h-64 w-full animate-pulse rounded-md bg-bg-primary" />
			</div>
		</div>
	);
}
