-- AlterTable
ALTER TABLE "Receipt" ALTER COLUMN "filename" DROP NOT NULL,
ALTER COLUMN "filename" SET DEFAULT 'invoice';
