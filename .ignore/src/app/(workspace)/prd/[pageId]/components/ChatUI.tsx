export function ChatUI() {
	const messages = [
		{
			content: 'Hello, how are you?',
			id: '1',
			type: 'user',
		},
		{
			content:
				'I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you! I am good, thank you!I am good, thank you!I am good, thank you!I am good, thank you!I am good, thank you!I am good, thank you!',
			id: '2',
			type: 'assistant',
		},
	];
	return (
		<div className="">
			{messages.map((message) => (
				<div className="border-border/50 border-b py-2" key={message.id}>
					<div className="text-text-muted">{message.type}</div>
					<div className="py-1 text-text-primary">{message.content}</div>
				</div>
			))}
			<div className="absolute right-0 bottom-8 left-0 mx-[10%] w-[80%] rounded-lg bg-bg-secondary px-4 py-2">
				<div className="flex flex-row items-center gap-2">
					<textarea
						className="h-16 grow py-2 text-sm"
						placeholder="Ask me anything..."
					/>
					<button className="rounded-full bg-bg-tertiary p-2" type="button">
						Mic
					</button>
					<button className="rounded-full bg-bg-tertiary p-2" type="button">
						Send
					</button>
				</div>
				<div className="flex flex-row items-center gap-2">
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Model
					</div>
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Attach
					</div>
				</div>
				<div className="mt-2 flex flex-row items-center gap-2">
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Web Search
					</div>
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Reference
					</div>
					<div className="rounded-full bg-bg-tertiary/50 px-4 py-1 text-text-muted">
						Thinking
					</div>
				</div>
			</div>
		</div>
	);
}
