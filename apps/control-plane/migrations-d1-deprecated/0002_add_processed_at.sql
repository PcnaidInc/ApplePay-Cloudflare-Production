-- apps/control-plane/migrations/0002_add_processed_at.sql
ALTER TABLE webhook_events ADD COLUMN processed_at TEXT;