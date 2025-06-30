CREATE TABLE "change_log" (
	"id" uuid PRIMARY KEY DEFAULT public.uuid_generate_v7() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"table_name" text NOT NULL,
	"record_id" uuid NOT NULL,
	"operation" text NOT NULL,
	"change_data" jsonb,
	"timestamp" timestamp DEFAULT NOW() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mutation_queue" (
	"id" uuid PRIMARY KEY DEFAULT public.uuid_generate_v7() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"mutation_data" jsonb NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT NOW() NOT NULL,
	"processed_at" timestamp,
	"error" text,
	"retry_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX "change_log_tenant_timestamp_idx" ON "change_log" USING btree ("tenant_id","timestamp");--> statement-breakpoint
CREATE INDEX "change_log_record_idx" ON "change_log" USING btree ("tenant_id","table_name","record_id");--> statement-breakpoint
CREATE INDEX "change_log_user_idx" ON "change_log" USING btree ("tenant_id","user_id");--> statement-breakpoint
CREATE INDEX "change_log_table_idx" ON "change_log" USING btree ("tenant_id","table_name","timestamp");--> statement-breakpoint
CREATE INDEX "mutation_queue_tenant_status_idx" ON "mutation_queue" USING btree ("tenant_id","status");--> statement-breakpoint
CREATE INDEX "mutation_queue_pending_idx" ON "mutation_queue" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "mutation_queue_user_idx" ON "mutation_queue" USING btree ("tenant_id","user_id");