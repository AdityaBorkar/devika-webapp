/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'change_log'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "change_log" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'mutation_queue'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "mutation_queue" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
CREATE UNIQUE INDEX "change_log_pkey" ON "change_log" USING btree ("tenant_id" uuid_ops,"id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "mutation_queue_pkey" ON "mutation_queue" USING btree ("tenant_id" uuid_ops,"id" uuid_ops);