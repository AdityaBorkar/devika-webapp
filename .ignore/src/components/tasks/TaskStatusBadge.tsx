import type React from 'react';

import { getStatusColor } from './utils';

interface TaskStatusBadgeProps {
	status: string;
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status }) => {
	return (
		<span
			className={`rounded-full px-2 py-1 text-xs ${getStatusColor(status)}`}
		>
			{status}
		</span>
	);
};
