ALTER TABLE "trading_plans" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "risk_settings" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "trading_accounts_user_id_unique" ON "trading_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "trading_plans_user_id_unique" ON "trading_plans" USING btree ("user_id");