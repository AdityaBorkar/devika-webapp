'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

export type StyleConfig = {
	id: string;
	name: string;
	isCommon: boolean;
	colors: string;
	typography: string;
	iconography: string;
	designSystem: string;
	animations: string;
	cssStrategy: string;
};

const defaultConfigs: StyleConfig[] = [
	{
		animations:
			'<h2>Transitions and Animations</h2><p>Define your animations here.</p>',
		colors: '<h2>Colors</h2><p>Define your color palette here.</p>',
		cssStrategy: '<h2>CSS Strategy</h2><p>Define your CSS strategy here.</p>',
		designSystem:
			'<h2>Component Library / Design System</h2><p>Define your design system here.</p>',
		iconography: '<h2>Iconography</h2><p>Define your iconography here.</p>',
		id: 'common',
		isCommon: true,
		name: 'Common Style Config',
		typography: '<h2>Typography</h2><p>Define your typography system here.</p>',
	},
	{
		animations:
			'<h2>Transitions and Animations</h2><p>App 1 specific animations.</p>',
		colors: '<h2>Colors</h2><p>App 1 specific colors.</p>',
		cssStrategy: '<h2>CSS Strategy</h2><p>App 1 specific CSS strategy.</p>',
		designSystem:
			'<h2>Component Library / Design System</h2><p>App 1 specific design system.</p>',
		iconography: '<h2>Iconography</h2><p>App 1 specific iconography.</p>',
		id: 'app1',
		isCommon: false,
		name: 'App 1 Style Config',
		typography: '<h2>Typography</h2><p>App 1 specific typography.</p>',
	},
	{
		animations:
			'<h2>Transitions and Animations</h2><p>App 2 specific animations.</p>',
		colors: '<h2>Colors</h2><p>App 2 specific colors.</p>',
		cssStrategy: '<h2>CSS Strategy</h2><p>App 2 specific CSS strategy.</p>',
		designSystem:
			'<h2>Component Library / Design System</h2><p>App 2 specific design system.</p>',
		iconography: '<h2>Iconography</h2><p>App 2 specific iconography.</p>',
		id: 'app2',
		isCommon: false,
		name: 'App 2 Style Config',
		typography: '<h2>Typography</h2><p>App 2 specific typography.</p>',
	},
];

interface StyleConfigContextType {
	configs: StyleConfig[];
	updateConfig: (
		id: string,
		field: keyof Omit<StyleConfig, 'id' | 'name' | 'isCommon'>,
		content: string,
	) => void;
	addConfig: (name: string) => void;
	deleteConfig: (id: string) => void;
}

const StyleConfigContext = createContext<StyleConfigContextType | undefined>(
	undefined,
);

export function StyleConfigProvider({ children }: { children: ReactNode }) {
	const [configs, setConfigs] = useState<StyleConfig[]>(defaultConfigs);

	const updateConfig = (
		id: string,
		field: keyof Omit<StyleConfig, 'id' | 'name' | 'isCommon'>,
		content: string,
	) => {
		setConfigs((prevConfigs) =>
			prevConfigs.map((config) =>
				config.id === id ? { ...config, [field]: content } : config,
			),
		);
	};

	const addConfig = (name: string) => {
		const newConfig: StyleConfig = {
			animations:
				'<h2>Transitions and Animations</h2><p>Define your animations here.</p>',
			colors: '<h2>Colors</h2><p>Define your color palette here.</p>',
			cssStrategy: '<h2>CSS Strategy</h2><p>Define your CSS strategy here.</p>',
			designSystem:
				'<h2>Component Library / Design System</h2><p>Define your design system here.</p>',
			iconography: '<h2>Iconography</h2><p>Define your iconography here.</p>',
			id: `app-${Date.now()}`,
			isCommon: false,
			name,
			typography:
				'<h2>Typography</h2><p>Define your typography system here.</p>',
		};

		setConfigs((prevConfigs) => [...prevConfigs, newConfig]);
	};

	const deleteConfig = (id: string) => {
		if (id === 'common') return; // Prevent deletion of common config
		setConfigs((prevConfigs) =>
			prevConfigs.filter((config) => config.id !== id),
		);
	};

	return (
		<StyleConfigContext.Provider
			value={{ addConfig, configs, deleteConfig, updateConfig }}
		>
			{children}
		</StyleConfigContext.Provider>
	);
}

export function useStyleConfig() {
	const context = useContext(StyleConfigContext);

	if (context === undefined) {
		throw new Error('useStyleConfig must be used within a StyleConfigProvider');
	}

	return context;
}
