ALTER TABLE "trading_accounts" ADD COLUMN "current_balance" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "trading_accounts" ADD COLUMN "pnl" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "trading_accounts" ADD COLUMN "roi" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "trading_accounts" ADD COLUMN "winrate" real DEFAULT 0 NOT NULL;