'use client';

export default function TaskPage() {
	// Get initial task data
	// const { id } = useParams();
	// if (!id) throw new Error('Task ID is required');
	// const [task, setTask] = useState<TaskDetail>(() => getTaskDetail(id));

	// // Handle task updates
	// const handleTaskUpdate = (
	// 	field: keyof TaskDetail,
	// 	value: string | boolean | Date,
	// ) => {
	// 	setTask((prev) => ({ ...prev, [field]: value }));
	// };

	// // Handle subtask toggle
	// const handleSubtaskToggle = (subtaskId: string, completed: boolean) => {
	// 	setTask((prev) => ({
	// 		...prev,
	// 		subtasks: prev.subtasks.map((subtask) =>
	// 			subtask.id === subtaskId ? { ...subtask, completed } : subtask,
	// 		),
	// 	}));
	// };

	// // Handle adding comments
	// const handleAddComment = (content: string) => {
	// 	const newComment: Comment = {
	// 		author: 'Current User',
	// 		content,
	// 		id: Date.now(),
	// 		timestamp: new Date().toLocaleString(),
	// 	};

	// 	setTask((prev) => ({
	// 		...prev,
	// 		comments: [...prev.comments, newComment],
	// 	}));
	// };

	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			{/* <TaskDetailHeader task={task} /> */}

			<div className="flex flex-1 overflow-hidden">
				{/* Main content */}
				{/* <TaskDetailContent
					onAddComment={handleAddComment}
					onSubtaskToggle={handleSubtaskToggle}
					task={task}
				/> */}

				{/* Sidebar */}
				{/* <TaskDetailSidebar onTaskUpdate={handleTaskUpdate} task={task} /> */}
			</div>
		</div>
	);
}
