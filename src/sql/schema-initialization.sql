-- Safeguard: Create tables only if they do not exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID generation support


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
  CONSTRAINT "unique_assessment_payment" UNIQUE ("assessment_id"), -- Prevent duplicates for the same assessment
  CONSTRAINT chk_payment_status CHECK ("status" IN ('pending', 'paid', 'failed')) -- Ensure valid status values
);

-- Assessments Table
CREATE TABLE IF NOT EXISTS "assessments" (
  "assessment_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "assessor_id" UUID,
  "writing_id" UUID,
  "payment_id" UUID, -- Relationship to payments table
  "status" VARCHAR(12),
  "text" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessors Table
CREATE TABLE IF NOT EXISTS "assessors" (
  "assessor_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "model_name" VARCHAR UNIQUE -- Ensures no duplicates for model names
);


ALTER TABLE "payments" ADD CONSTRAINT fk_assessment_id FOREIGN KEY ("assessment_id") 
  REFERENCES "assessments" ("assessment_id");

ALTER TABLE "assessments" ADD CONSTRAINT fk_assessor_id FOREIGN KEY ("assessor_id") 
  REFERENCES "assessors" ("assessor_id");

ALTER TABLE "assessments" ADD CONSTRAINT fk_writing_id FOREIGN KEY ("writing_id") 
  REFERENCES "writings" ("writing_id");

ALTER TABLE "assessments" ADD CONSTRAINT fk_payment_id FOREIGN KEY ("payment_id") 
  REFERENCES "payments" ("payment_id");

-- Indexes for better performance

-- Writings Table
CREATE INDEX IF NOT EXISTS idx_writing_user_id ON "writings" ("user_id");
CREATE INDEX IF NOT EXISTS idx_writing_created_at ON "writings" ("created_at");
CREATE INDEX IF NOT EXISTS idx_writing_type ON "writings" ("type");

-- Assessments Table
CREATE INDEX IF NOT EXISTS idx_assessment_assessor_id ON "assessments" ("assessor_id");
CREATE INDEX IF NOT EXISTS idx_assessment_payment_id ON "assessments" ("payment_id");
CREATE INDEX IF NOT EXISTS idx_assessment_writing_id ON "assessments" ("writing_id");
CREATE INDEX IF NOT EXISTS idx_assessment_status ON "assessments" ("status");

-- Assessors Table
CREATE INDEX IF NOT EXISTS idx_assessor_id ON "assessors" ("assessor_id");

-- Payments Table
CREATE INDEX IF NOT EXISTS idx_payment_status ON "payments" ("status");
CREATE INDEX IF NOT EXISTS idx_payment_created_at ON "payments" ("created_at");

-- Trigger Function to update 'updated_at' automatically
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update 'updated_at' on Writings table
CREATE TRIGGER set_updated_at_writing
  BEFORE UPDATE ON "writings"
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Trigger to automatically update 'updated_at' on Assessments table
CREATE TRIGGER set_updated_at_assessment
  BEFORE UPDATE ON "assessments"
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();
