'use client';

import { Github, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Navigate } from 'react-router';

import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export default function HomePage() {
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const session = authClient.useSession();
	if (session.data?.user) return <Navigate to="/workspaces" />;

	const handleGitHubLogin = () => {
		if (!acceptedTerms) return;

		setIsLoading(true);
		authClient.signIn
			.social({ provider: 'github' })
			.catch((error) => {
				console.error('Login failed:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-secondary to-background p-4">
			<div className="w-full max-w-md space-y-8">
				{/* Logo Section */}
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="text-center"
					initial={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.6 }}
				>
					<div className="mx-auto mb-6 flex h-16 w-auto justify-center">
						<img alt="Devika Logo" className="h-full w-auto" src={Logo} />
					</div>
				</motion.div>

				{/* Login Card */}
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					<Card className="text-text-secondary shadow-xl backdrop-blur-lg">
						<CardHeader className="pb-4 text-center">
							<CardTitle className="text-xl">Sign In</CardTitle>
							<CardDescription>
								Continue with your GitHub account
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Features */}
							<div className="space-y-3">
								<div className="flex items-center space-x-3 text-sm">
									<Sparkles className="h-4 w-4 text-blue-500" />
									<span>AI-powered code generation</span>
								</div>
								<div className="flex items-center space-x-3 text-sm">
									<Shield className="h-4 w-4 text-green-500" />
									<span>Secure and private development</span>
								</div>
								<div className="flex items-center space-x-3 text-sm">
									<Github className="h-4 w-4 text-gray-700" />
									<span>Seamless GitHub integration</span>
								</div>
							</div>

							{/* Terms Acceptance */}
							<div className="space-y-4 border-t pt-4">
								<div className="flex items-start space-x-3">
									<Checkbox
										checked={acceptedTerms}
										className="mt-0.5"
										id="terms"
										onCheckedChange={(checked) =>
											setAcceptedTerms(checked as boolean)
										}
									/>
									<Label
										className="cursor-pointer text-sm leading-relaxed"
										htmlFor="terms"
									>
										I agree to the{' '}
										<a
											className="text-blue-600 underline hover:text-blue-700"
											href="/terms"
										>
											Terms of Service
										</a>{' '}
										and{' '}
										<a
											className="text-blue-600 underline hover:text-blue-700"
											href="/privacy"
										>
											Privacy Policy
										</a>
									</Label>
								</div>
							</div>

							{/* Login Button */}
							<Button
								className="w-full bg-text-primary transition-all duration-200 hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
								disabled={!acceptedTerms || isLoading}
								onClick={handleGitHubLogin}
								size="lg"
							>
								{isLoading ? (
									<div className="flex items-center space-x-2">
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
										<span>Signing in...</span>
									</div>
								) : (
									<div className="flex items-center space-x-2">
										<Github className="h-5 w-5" />
										<span>Continue with GitHub</span>
									</div>
								)}
							</Button>

							{!acceptedTerms && (
								<p className="text-center text-gray-500 text-xs">
									Please accept the terms and conditions to continue
								</p>
							)}
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
