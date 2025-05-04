CREATE TABLE IF NOT EXISTS "trading_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_name" varchar(100) NOT NULL,
	"broker" varchar(100) NOT NULL,
	"account_currency" varchar(10) NOT NULL,
	"max_daily_drawdown" real NOT NULL,
	"max_total_drawdown" real NOT NULL,
	"account_size" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trading_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"instruments" text NOT NULL,
	"note" text,
	"session" varchar(50),
	"is_default" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "risk_settings" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"account_balance" numeric(12, 2) NOT NULL,
	"risk_per_trade" numeric(5, 2) NOT NULL,
	"max_daily_risk" numeric(5, 2) NOT NULL,
	"max_open_trades" integer NOT NULL,
	"risk_reward_ratio" numeric(5, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "provider_account_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trading_accounts" ADD CONSTRAINT "trading_accounts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trading_plans" ADD CONSTRAINT "trading_plans_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "risk_settings" ADD CONSTRAINT "risk_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_provider_account_id_unique" UNIQUE("provider_account_id");