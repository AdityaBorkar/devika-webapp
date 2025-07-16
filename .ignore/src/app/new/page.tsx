import { useState } from 'react';

import { Step1 } from '@/app/new/components/Step1';
import { Step2 } from '@/app/new/components/Step2';
import { Step3 } from '@/app/new/components/Step3';

export default function OnboardingPage() {
	const [step, setStep] = useState(1);
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg rounded-xl border border-border bg-bg-primary shadow-sm">
				{step === 1 && <Step1 setStep={setStep} />}
				{step === 2 && <Step2 setStep={setStep} />}
				{step === 3 && <Step3 setStep={setStep} />}
			</div>
		</div>
	);
}
