import { Input } from '@/components/ui/input';

export default function SearchNavigation() {
	return (
		<div className="px-4 py-2">
			{/* TODO: VS Code Search UI */}
			<Input disabled placeholder="Search" />
			<div className="py-8 text-center text-muted-foreground text-sm">
				This feature is under development.
			</div>
		</div>
	);
}
