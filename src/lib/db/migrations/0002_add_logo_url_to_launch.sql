ALTER TABLE "launch" ADD COLUMN "logo_url" text;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;