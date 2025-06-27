-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "account" (
	"accessToken" text,
	"accessTokenExpiresAt" timestamp,
	"accountId" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"idToken" text,
	"password" text,
	"providerId" text NOT NULL,
	"refreshToken" text,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"updatedAt" timestamp NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"createdAt" timestamp NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"ipAddress" text,
	"token" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"createdAt" timestamp NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image" text,
	"name" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"createdAt" timestamp,
	"expiresAt" timestamp NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"updatedAt" timestamp,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"author_id" serial NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid DEFAULT public.uuid_generate_v7() NOT NULL,
	"name" text,
	"created" timestamp DEFAULT LOCALTIMESTAMP NOT NULL,
	"updated" timestamp DEFAULT LOCALTIMESTAMP NOT NULL,
	"deleted" timestamp,
	"compute_id" uuid
);
--> statement-breakpoint
CREATE UNIQUE INDEX "tenants_pkey" ON "tenants" USING btree ("id" uuid_ops);
*/