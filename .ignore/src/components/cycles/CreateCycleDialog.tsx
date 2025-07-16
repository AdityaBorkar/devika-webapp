'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateCycleDialogProps {
	onCycleCreate: (data: {
		name: string;
		description: string;
		startDate: string;
		endDate: string;
	}) => void;
}

export function CreateCycleDialog({ onCycleCreate }: CreateCycleDialogProps) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		description: '',
		endDate: '',
		name: '',
		startDate: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onCycleCreate(formData);
		setFormData({
			description: '',
			endDate: '',
			name: '',
			startDate: '',
		});
		setOpen(false);
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button className="justify-end">
					<PlusCircle className="mr-2 h-4 w-4" />
					Create Cycle
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create New Cycle</DialogTitle>
						<DialogDescription>
							Create a new development cycle to organize your tasks.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right" htmlFor="name">
								Name
							</Label>
							<Input
								className="col-span-3"
								id="name"
								name="name"
								onChange={handleChange}
								required
								value={formData.name}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right" htmlFor="description">
								Description
							</Label>
							<Textarea
								className="col-span-3"
								defaultValue={formData.description}
								id="description"
								name="description"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right" htmlFor="startDate">
								Start Date
							</Label>
							<Input
								className="col-span-3"
								id="startDate"
								name="startDate"
								onChange={handleChange}
								required
								type="date"
								value={formData.startDate}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right" htmlFor="endDate">
								End Date
							</Label>
							<Input
								className="col-span-3"
								id="endDate"
								name="endDate"
								onChange={handleChange}
								required
								type="date"
								value={formData.endDate}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
