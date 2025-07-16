import { useAtomValue } from 'jotai';

import { Divider } from '@/app/(workspace)/prd/[pageId]/components/Divider';
import PrdDefaultPage from '@/app/(workspace)/prd/page';
import {
	PrdActiveTabIdAtom,
	PrdLeftTabsAtom,
	PrdRightTabsAtom,
	PrdRightWidthAtom,
} from '@/app/(workspace)/prd/store';
import { SplitScreen } from './components/SplitScreen';

export function PrdDocPage() {
	return (
		<div className="flex flex-row flex-nowrap">
			<SplitScreen
				atoms={{
					activeTabId: PrdActiveTabIdAtom,
					tabs: PrdLeftTabsAtom,
				}}
				fallback={<PrdDefaultPage />}
			/>
			<RightSplitScreen />
		</div>
	);
}

function RightSplitScreen() {
	const rightWidth = useAtomValue(PrdRightWidthAtom);
	return (
		<>
			<Divider atom={PrdRightWidthAtom} />
			<SplitScreen
				atoms={{
					activeTabId: PrdActiveTabIdAtom,
					tabs: PrdRightTabsAtom,
				}}
				fallback={null}
				width={rightWidth}
			/>
		</>
	);
}
