import type React from 'react';
import { createContext, useContext, useState } from 'react';

interface DialogContextType {
	openDialog: (content: React.ReactNode) => void;
	closeDialog: () => void;
	isOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = (content: React.ReactNode) => {
		console.log('openDialog', content);
		setDialogContent(content);
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
		setTimeout(() => setDialogContent(null), 200); // Clear content after animation
	};

	return (
		<DialogContext.Provider value={{ closeDialog, isOpen, openDialog }}>
			{children}
			{isOpen && (
				<div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-background/70">
					{dialogContent}
				</div>
			)}
		</DialogContext.Provider>
	);
}

function DialogTrigger({
	children,
	content,
}: {
	children: React.ReactNode;
	content: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<span className="contents" onClick={() => setIsOpen(true)}>
				{children}
			</span>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70">
					{content}
				</div>
			)}
		</>
	);
}

export const Dialog = {
	Trigger: DialogTrigger,
};

export function useDialog() {
	const context = useContext(DialogContext);
	if (!context)
		throw new Error('useDialog must be used within a DialogProvider');
	return context;
}
