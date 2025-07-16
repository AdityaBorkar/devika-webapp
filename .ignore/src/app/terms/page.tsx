import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br p-4">
			<div className="mx-auto max-w-4xl space-y-8 py-8">
				<div className="text-center">
					<h1 className="mb-2 font-bold text-3xl text-text-primary">
						Terms of Service
					</h1>
					<p className="text-text-tertiary">Last updated: January 2025</p>
				</div>

				<Card className="text-text-secondary shadow-xl backdrop-blur-lg">
					<CardHeader>
						<CardTitle>Devika Terms of Service</CardTitle>
					</CardHeader>
					<CardContent className="prose prose-gray max-w-none">
						<h3>1. Acceptance of Terms</h3>
						<p>
							By accessing and using Devika, you agree to be bound by these
							Terms of Service and all applicable laws and regulations.
						</p>

						<h3>2. Use License</h3>
						<p>
							Permission is granted to temporarily use Devika for personal and
							commercial purposes. This license will automatically terminate if
							you violate any of these restrictions.
						</p>

						<h3>3. Privacy Policy</h3>
						<p>
							Your privacy is important to us. Please review our Privacy Policy,
							which also governs your use of the Service.
						</p>

						<h3>4. User Accounts</h3>
						<p>
							When you create an account with us, you must provide information
							that is accurate, complete, and current at all times.
						</p>

						<h3>5. Acceptable Use</h3>
						<p>
							You may not use Devika for any unlawful purpose or to solicit
							others to perform unlawful acts.
						</p>

						<h3>6. Intellectual Property</h3>
						<p>
							The Service and its original content, features, and functionality
							are and will remain the exclusive property of Devika and its
							licensors.
						</p>

						<h3>7. Termination</h3>
						<p>
							We may terminate or suspend your account immediately, without
							prior notice or liability, for any reason whatsoever.
						</p>

						<h3>8. Contact Information</h3>
						<p>
							If you have any questions about these Terms of Service, please
							contact us at support@devika.ai
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
