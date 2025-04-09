/*
  Warnings:

  - You are about to drop the column `userId` on the `StudentEnrollment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_userId_fkey";

-- AlterTable
ALTER TABLE "StudentEnrollment" DROP COLUMN "userId",
ALTER COLUMN "grade" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");
