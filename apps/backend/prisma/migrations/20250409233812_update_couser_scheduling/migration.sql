/*
  Warnings:

  - The `dayOfWeek` column on the `CourseSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `startTime` on the `CourseSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `CourseSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeekEnum" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY');

-- AlterTable
ALTER TABLE "CourseSchedule" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" "DayOfWeekEnum" NOT NULL DEFAULT 'SUNDAY',
DROP COLUMN "startTime",
ADD COLUMN     "startTime" VARCHAR(5) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" VARCHAR(5) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_code_key" ON "Room"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
