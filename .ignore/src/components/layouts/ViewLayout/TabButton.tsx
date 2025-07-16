export function TabButton({
	label,
	value,
	activeTab,
	onTabChange,
}: {
	label: string;
	value: string;
	activeTab: string;
	onTabChange: (value: string) => void;
}) {
	return (
		<button
			className={`rounded-md border px-3 py-1 font-medium text-sm ${
				activeTab === value
					? 'border-border bg-bg-primary dark:bg-bg-secondary'
					: 'border-transparent text-text-muted hover:bg-bg-tertiary hover:text-text-primary dark:hover:text-text-tertiary'
			}`}
			onClick={() => onTabChange(value)}
			type="button"
		>
			{label}
		</button>
	);
}
