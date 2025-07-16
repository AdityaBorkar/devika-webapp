'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TipTapEditor } from '@/components/ui/tiptap-editor';
import {
	type StyleConfig,
	useStyleConfig,
} from '@/contexts/StyleConfigContext';

interface StyleConfigEditorProps {
	config: StyleConfig;
}

export function StyleConfigEditor({ config }: StyleConfigEditorProps) {
	const { updateConfig } = useStyleConfig();
	const [activeTab, setActiveTab] = useState('colors');

	const handleContentChange = (content: string) => {
		updateConfig(
			config.id,
			activeTab as keyof Omit<StyleConfig, 'id' | 'name' | 'isCommon'>,
			content,
		);
	};

	const _getContentForTab = (tab: string) => {
		const key = tab as keyof Omit<StyleConfig, 'id' | 'name' | 'isCommon'>;
		return config[key];
	};

	return (
		<div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
			<h2 className="mb-4 font-semibold text-xl">{config.name}</h2>

			<Tabs defaultValue="colors" onValueChange={setActiveTab}>
				<TabsList className="mb-4 grid w-full grid-cols-3 md:grid-cols-6">
					<TabsTrigger value="colors">Colors</TabsTrigger>
					<TabsTrigger value="typography">Typography</TabsTrigger>
					<TabsTrigger value="iconography">Iconography</TabsTrigger>
					<TabsTrigger value="designSystem">Design System</TabsTrigger>
					<TabsTrigger value="animations">Animations</TabsTrigger>
					<TabsTrigger value="cssStrategy">CSS Strategy</TabsTrigger>
				</TabsList>

				<TabsContent value="colors">
					<TipTapEditor
						content={config.colors}
						onChange={handleContentChange}
					/>
				</TabsContent>

				<TabsContent value="typography">
					<TipTapEditor
						content={config.typography}
						onChange={handleContentChange}
					/>
				</TabsContent>

				<TabsContent value="iconography">
					<TipTapEditor
						content={config.iconography}
						onChange={handleContentChange}
					/>
				</TabsContent>

				<TabsContent value="designSystem">
					<TipTapEditor
						content={config.designSystem}
						onChange={handleContentChange}
					/>
				</TabsContent>

				<TabsContent value="animations">
					<TipTapEditor
						content={config.animations}
						onChange={handleContentChange}
					/>
				</TabsContent>

				<TabsContent value="cssStrategy">
					<TipTapEditor
						content={config.cssStrategy}
						onChange={handleContentChange}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
