import { motion } from 'motion/react';

import { ViewLayout, type ViewTab } from '@/components/layouts/ViewLayout';
import { TaskCardItem } from '@/components/tasks/TaskCardItem';
import { TaskListItem } from '@/components/tasks/TaskListItem';

export default function TaskViewPage() {
	// TODO: Properties

	const viewTabs = [
		{ display: 'kanban', label: 'All Tasks', value: 'all' },
		{ display: 'list', label: 'Un-assigned', value: 'unassigned' },
		{ display: 'kanban', label: 'Assigned', value: 'assigned' },
		{ display: 'kanban', label: 'Backlog', value: 'backlog' },
	] as ViewTab[];

	const saveViewTab = (_tab: ViewTab) => {
		// ...
	};

	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<ViewLayout
				components={{
					card: TaskCardItem,
					list: TaskListItem,
				}}
				defaultViewTab="active"
				saveViewTab={saveViewTab}
				viewTabs={viewTabs}
				wrapperClass="*:px-16"
			/>
		</motion.div>
	);
}
