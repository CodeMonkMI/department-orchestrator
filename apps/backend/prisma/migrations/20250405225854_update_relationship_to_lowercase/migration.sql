/*
  Warnings:

  - You are about to drop the column `enrollmentDate` on the `Student` table. All the data in the column will be lost.
  - Added the required column `registrationNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingDate` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "enrollmentDate",
ADD COLUMN     "registrationNo" TEXT NOT NULL,
ADD COLUMN     "rollNumber" TEXT NOT NULL,
ADD COLUMN     "startingDate" DATE NOT NULL;
