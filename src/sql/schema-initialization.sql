-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Writings Table
CREATE TABLE IF NOT EXISTS "writings" (
  "writing_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "user_id" UUID,
  "type" VARCHAR(50),
  "question" TEXT,
  "question_image" VARCHAR(250),
  "response" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE IF NOT EXISTS "payments" (
  "payment_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "assessment_id" UUID,
  "amount" DECIMAL(10,2),
  "status" VARCHAR(12),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_payment_status CHECK ("status" IN ('pending', 'paid', 'failed'))
);

-- Assessments Table
CREATE TABLE IF NOT EXISTS "assessments" (
  "assessment_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "assessor_id" UUID,
  "writing_id" UUID,
  "status" VARCHAR(12),
  "text" TEXT,
  "assessing_time" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessors Table
CREATE TABLE IF NOT EXISTS "assessors" (
  "assessor_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "model_name" VARCHAR UNIQUE
);

-- Add foreign key constraints only if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_assessment_id'
  ) THEN
    ALTER TABLE "payments" ADD CONSTRAINT fk_assessment_id
      FOREIGN KEY ("assessment_id") REFERENCES "assessments" ("assessment_id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_assessor_id'
  ) THEN
    ALTER TABLE "assessments" ADD CONSTRAINT fk_assessor_id
      FOREIGN KEY ("assessor_id") REFERENCES "assessors" ("assessor_id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_writing_id'
  ) THEN
    ALTER TABLE "assessments" ADD CONSTRAINT fk_writing_id
      FOREIGN KEY ("writing_id") REFERENCES "writings" ("writing_id");
  END IF;
END $$;

-- Indexes
-- Writings Table
CREATE INDEX IF NOT EXISTS idx_writing_user_id ON "writings" ("user_id");
CREATE INDEX IF NOT EXISTS idx_writing_created_at ON "writings" ("created_at");
CREATE INDEX IF NOT EXISTS idx_writing_type ON "writings" ("type");

-- Assessments Table
CREATE INDEX IF NOT EXISTS idx_assessment_assessor_id ON "assessments" ("assessor_id");
CREATE INDEX IF NOT EXISTS idx_assessment_writing_id ON "assessments" ("writing_id");
CREATE INDEX IF NOT EXISTS idx_assessment_status ON "assessments" ("status");
CREATE INDEX IF NOT EXISTS idx_assessment_assessing_time ON "assessments" ("assessing_time");

-- Assessors Table
CREATE INDEX IF NOT EXISTS idx_assessor_id ON "assessors" ("assessor_id");

-- Payments Table
CREATE INDEX IF NOT EXISTS idx_payment_status ON "payments" ("status");
CREATE INDEX IF NOT EXISTS idx_payment_created_at ON "payments" ("created_at");

-- Trigger Function to auto-update `updated_at`
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers only if not exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_writing'
  ) THEN
    CREATE TRIGGER set_updated_at_writing
      BEFORE UPDATE ON "writings"
      FOR EACH ROW EXECUTE FUNCTION update_timestamp();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_assessment'
  ) THEN
    CREATE TRIGGER set_updated_at_assessment
      BEFORE UPDATE ON "assessments"
      FOR EACH ROW EXECUTE FUNCTION update_timestamp();
  END IF;
END $$;
