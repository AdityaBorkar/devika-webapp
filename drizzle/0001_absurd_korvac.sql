CREATE TYPE "public"."task_status" AS ENUM('pending', 'in_progress', 'completed', 'cancelled', 'failed');--> statement-breakpoint
CREATE TABLE "cdc" (
	"action" text NOT NULL,
	"data" jsonb NOT NULL,
	"id" text,
	"item_id" text NOT NULL,
	"operation" text NOT NULL,
	"tenant_id" uuid,
	"timestamp" timestamp NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cdc_cache" (
	"client_applied_at" timestamp,
	"end" text NOT NULL,
	"id" text,
	"start" text NOT NULL,
	"storage_url" text NOT NULL,
	"tenant_id" uuid,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_metadata" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_mutations" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"mutation_name" text NOT NULL,
	"request_id" uuid NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_schemas" (
	"checksum" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"is_rolled_back" boolean DEFAULT false NOT NULL,
	"snapshot" text NOT NULL,
	"sql" text NOT NULL,
	"tag" text,
	"version" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"access_token" text,
	"access_token_expires_at" timestamp,
	"account_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"id_token" text,
	"password" text,
	"provider_id" text NOT NULL,
	"refresh_token" text,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"created_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"ip_address" text,
	"token" text NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"created_at" timestamp NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"name" text NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"created_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"updated_at" timestamp,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changelog" (
	"created_at" timestamp NOT NULL,
	"tenant_id" uuid NOT NULL,
	"updated_at" timestamp NOT NULL,
	"cycle_id" text,
	"notes" text NOT NULL,
	"summary" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cycle" (
	"created_at" timestamp NOT NULL,
	"tenant_id" uuid NOT NULL,
	"updated_at" timestamp NOT NULL,
	"id" text,
	"name" text NOT NULL,
	"version_prefix" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"created_at" timestamp NOT NULL,
	"tenant_id" uuid NOT NULL,
	"updated_at" timestamp NOT NULL,
	"description" text,
	"id" text,
	"is_running" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"status" "task_status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"created_at" timestamp NOT NULL,
	"tenant_id" uuid NOT NULL,
	"updated_at" timestamp NOT NULL,
	"description" text,
	"id" text,
	"name" text NOT NULL,
	"slug" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;