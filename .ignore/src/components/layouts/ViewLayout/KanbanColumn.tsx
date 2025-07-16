interface KanbanColumnProps<T> {
	title: string;
	filter: (data: T[]) => T[];
	component: React.ComponentType<{ data: T }>;
}

export function KanbanColumn<T>({
	title,
	filter,
	component: CardComponent,
}: KanbanColumnProps<T>) {
	const data = [];
	const filteredData = data.filter(filter);
	const total = filteredData.length;
	return (
		<div className="h-full rounded-lg bg-background px-6 ">
			<div className="flex items-center gap-2 py-4">
				<h2 className="font-medium text-sm">{title}</h2>
				<div className="size-5 rounded-full bg-bg-tertiary text-center text-text-secondary text-xs leading-5">
					{total}
				</div>
			</div>
			<div className="space-y-2">
				{filteredData.map((data) => (
					<CardComponent data={data} key={data.id} />
				))}

				{total === 0 && (
					<div className="rounded-md border border-zinc-200 border-dashed p-3 text-center text-muted-foreground text-sm dark:border-zinc-700">
						No tasks
					</div>
				)}
			</div>
		</div>
	);
}
