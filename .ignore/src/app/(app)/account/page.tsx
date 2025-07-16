'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { authClient } from '@/lib/auth-client';

export default function AccountPage() {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState({
		email: true,
		marketing: false,
		productUpdates: true,
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await authClient.getUser();
				if (data) {
					setUser(data.user);
				}
			} catch (error) {
				console.error('Error fetching user:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	const handleSignIn = async () => {
		try {
			await authClient.signIn('github', {
				redirectTo: '/account',
			});
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

	const handleSignOut = async () => {
		try {
			await authClient.signOut();
			setUser(null);
			router.push('/');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	const handleNotificationChange = (key: keyof typeof notifications) => {
		setNotifications((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
		// Here you would typically make an API call to save the notification preferences
	};

	if (loading) {
		return (
			<div className="container mx-auto py-8">
				<Card>
					<CardHeader>
						<Skeleton className="mb-2 h-8 w-48" />
						<Skeleton className="h-4 w-3/4" />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
							<Skeleton className="h-4 w-4/5" />
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="container mx-auto py-8">
				<Card className="mx-auto max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="font-bold text-2xl">
							Sign in to your account
						</CardTitle>
						<CardDescription>
							Access your account to manage your profile and notifications
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button
							className="w-full bg-[#24292e] text-white hover:bg-[#24292e]/90"
							onClick={handleSignIn}
						>
							<Icons.gitHub className="mr-2 h-4 w-4" />
							Sign in with GitHub
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	const initials = user.name
		.split(' ')
		.map((n: string) => n[0])
		.join('')
		.toUpperCase()
		.substring(0, 2);

	return (
		<div className="container mx-auto space-y-6 py-8">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl">Account</h1>
				<Button onClick={handleSignOut} variant="outline">
					Sign out
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-1">
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center space-y-4">
								<Avatar className="h-24 w-24">
									{user.image ? (
										<AvatarImage alt={user.name} src={user.image} />
									) : (
										<AvatarFallback>{initials}</AvatarFallback>
									)}
								</Avatar>
								<div className="text-center">
									<h2 className="font-semibold text-xl">{user.name}</h2>
									<p className="text-muted-foreground">{user.email}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6 md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>
								Update your account's profile information and email address.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label htmlFor="name">Name</Label>
									<p className="mt-1 text-muted-foreground text-sm">
										{user.name}
									</p>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<p className="mt-1 text-muted-foreground text-sm">
										{user.email}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Email Notifications</CardTitle>
							<CardDescription>
								Manage how you receive email notifications.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="email-notifications">
										Email Notifications
									</Label>
									<p className="text-muted-foreground text-sm">
										Receive email notifications
									</p>
								</div>
								<Switch
									checked={notifications.email}
									id="email-notifications"
									onCheckedChange={() => handleNotificationChange('email')}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="product-updates">Product Updates</Label>
									<p className="text-muted-foreground text-sm">
										Get updates about new features and improvements
									</p>
								</div>
								<Switch
									checked={notifications.productUpdates}
									id="product-updates"
									onCheckedChange={() =>
										handleNotificationChange('productUpdates')
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="marketing-emails">Marketing Emails</Label>
									<p className="text-muted-foreground text-sm">
										Receive marketing and promotional emails
									</p>
								</div>
								<Switch
									checked={notifications.marketing}
									id="marketing-emails"
									onCheckedChange={() => handleNotificationChange('marketing')}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
