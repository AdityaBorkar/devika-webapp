import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
	return (
		<div className="min-h-screen p-4">
			<div className="mx-auto max-w-4xl space-y-8 py-8">
				<div className="text-center">
					<h1 className="mb-2 font-bold text-3xl text-text-primary">
						Privacy Policy
					</h1>
					<p className="text-text-tertiary">Last updated: January 2025</p>
				</div>

				<Card className="text-text-secondary shadow-xl backdrop-blur-lg">
					<CardHeader>
						<CardTitle>Devika Privacy Policy</CardTitle>
					</CardHeader>
					<CardContent className="prose prose-gray max-w-none">
						<h3>1. Information We Collect</h3>
						<p>
							We collect information you provide directly to us, such as when
							you create an account, use our services, or contact us for
							support.
						</p>

						<h3>2. How We Use Your Information</h3>
						<p>
							We use the information we collect to provide, maintain, and
							improve our services, process transactions, and communicate with
							you.
						</p>

						<h3>3. Information Sharing</h3>
						<p>
							We do not sell, trade, or otherwise transfer your personal
							information to third parties without your consent, except as
							described in this policy.
						</p>

						<h3>4. GitHub Integration</h3>
						<p>
							When you authenticate with GitHub, we only access the information
							you explicitly grant us permission to access. This may include
							your public profile information and repository access based on
							your choices.
						</p>

						<h3>5. Data Security</h3>
						<p>
							We implement appropriate security measures to protect your
							personal information against unauthorized access, alteration,
							disclosure, or destruction.
						</p>

						<h3>6. Code and Project Data</h3>
						<p>
							Your code and project data remain your property. We process this
							data solely to provide our AI-powered development assistance
							services.
						</p>

						<h3>7. Data Retention</h3>
						<p>
							We retain your information for as long as your account is active
							or as needed to provide you services and comply with legal
							obligations.
						</p>

						<h3>8. Your Rights</h3>
						<p>
							You have the right to access, update, or delete your personal
							information. You can also request a copy of your data at any time.
						</p>

						<h3>9. Contact Us</h3>
						<p>
							If you have any questions about this Privacy Policy, please
							contact us at privacy@devika.ai
						</p>
					</CardContent>
				</Card>

				<div className="text-center">
					<Button onClick={() => window.history.back()} variant="outline">
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
}
