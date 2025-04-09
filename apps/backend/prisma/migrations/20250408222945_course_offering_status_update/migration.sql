/*
  Warnings:

  - The `status` column on the `CourseOffering` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CourseOfferingStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'REVOKED');

-- AlterTable
ALTER TABLE "CourseOffering" DROP COLUMN "status",
ADD COLUMN     "status" "CourseOfferingStatus" NOT NULL DEFAULT 'ACTIVE';
