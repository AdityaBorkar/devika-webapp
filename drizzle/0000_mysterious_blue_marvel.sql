-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
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