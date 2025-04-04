/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SemesterTypeEnum" AS ENUM ('ACADEMIC', 'NONACADEMIC');

-- CreateEnum
CREATE TYPE "CourseTypeEnum" AS ENUM ('ELECTIVE', 'REQUIRED');

-- CreateEnum
CREATE TYPE "RoomTypeEnum" AS ENUM ('ClASSROOM', 'OFFICE', 'AUDITORIUM', 'LIBRARY', 'LAB');

-- CreateEnum
CREATE TYPE "AttendanceStatusEnum" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'REVOKED');

-- CreateEnum
CREATE TYPE "TaskPriorityEnum" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "TaskStatusEnum" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DELETED');

-- CreateEnum
CREATE TYPE "StudentStatusEnum" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'GRADUATED', 'DROPPED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "StudentEnrollmentStatusEnum" AS ENUM ('ENROLLED', 'PROGRESS', 'DROPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TeacherStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE', 'RETIRED', 'SUSPENDED', 'VACATION');

-- CreateEnum
CREATE TYPE "TeacherCourseAssignmentStatusEnum" AS ENUM ('PENDING', 'PROGRESS', 'DROPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ActivityTypeEnum" AS ENUM ('LOGIN', 'LOGOUT', 'CREATE', 'GIVE_ATTENDANCE', 'UPDATE_ATTENDANCE', 'DELETE_ATTENDANCE', 'CREATE_REPORT', 'UPDATE_REPORT', 'DELETE_REPORT', 'CREATE_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'CREATE_COURSE', 'UPDATE_COURSE', 'DELETE_COURSE', 'CREATE_SEMESTER', 'UPDATE_SEMESTER', 'DELETE_SEMESTER', 'CREATE_ROOM', 'UPDATE_ROOM', 'DELETE_ROOM', 'CREATE_COURSE_SCHEDULE', 'UPDATE_COURSE_SCHEDULE', 'DELETE_COURSE_SCHEDULE', 'CREATE_COURSE_OFFERING', 'UPDATE_COURSE_OFFERING', 'DELETE_COURSE_OFFERING', 'CREATE_STUDENT_ENROLLMENT', 'UPDATE_STUDENT_ENROLLMENT', 'DELETE_STUDENT_ENROLLMENT', 'CREATE_ATTENDANCE_RECORD', 'UPDATE_ATTENDANCE_RECORD', 'DELETE_ATTENDANCE_RECORD', 'CREATE_USER', 'UPDATE_USER', 'DELETE_USER');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "fullname" VARCHAR(255),
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "roleId" TEXT,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE CHAR(255),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "RoleEnum" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SemesterTypeEnum" NOT NULL DEFAULT 'ACADEMIC',
    "maxStudents" INTEGER NOT NULL,
    "maxCourses" INTEGER NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CourseTypeEnum" NOT NULL DEFAULT 'REQUIRED',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOffering" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "courseAssignmentIds" TEXT[],
    "status" TEXT NOT NULL,
    "userId" CHAR(255),

    CONSTRAINT "CourseOffering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 30,
    "type" "RoomTypeEnum" NOT NULL DEFAULT 'ClASSROOM',

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSchedule" (
    "id" TEXT NOT NULL,
    "courseOfferingId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "CourseSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" "AttendanceStatusEnum" NOT NULL DEFAULT 'PRESENT',
    "checkInTime" TIME NOT NULL,
    "checkOutTime" TIME NOT NULL,
    "courseOfferingId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "generatedBy" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL,
    "filePath" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assignedTo" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "dueDate" DATE NOT NULL,
    "priority" "TaskPriorityEnum" NOT NULL DEFAULT 'LOW',
    "status" "TaskStatusEnum" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enrollmentDate" DATE NOT NULL,
    "status" "StudentStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "session" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentEnrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseOfferingId" TEXT NOT NULL,
    "enrollmentDate" DATE NOT NULL,
    "status" "StudentEnrollmentStatusEnum" NOT NULL DEFAULT 'ENROLLED',
    "grade" TEXT NOT NULL,
    "userId" CHAR(255),

    CONSTRAINT "StudentEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TeacherStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "joinDate" DATE NOT NULL,
    "officeLocation" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherCourseAssignment" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "courseOfferingId" TEXT NOT NULL,
    "assignDate" DATE NOT NULL,
    "status" "TeacherCourseAssignmentStatusEnum" NOT NULL DEFAULT 'PENDING',
    "grade" TEXT NOT NULL,

    CONSTRAINT "TeacherCourseAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "activityType" "ActivityTypeEnum" NOT NULL,
    "description" TEXT,
    "ipAddress" TEXT NOT NULL,
    "serverOrigin" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_title_key" ON "User"("title");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOffering" ADD CONSTRAINT "CourseOffering_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOffering" ADD CONSTRAINT "CourseOffering_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOffering" ADD CONSTRAINT "CourseOffering_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSchedule" ADD CONSTRAINT "CourseSchedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSchedule" ADD CONSTRAINT "CourseSchedule_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "CourseOffering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "CourseOffering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_generatedBy_fkey" FOREIGN KEY ("generatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollment" ADD CONSTRAINT "StudentEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollment" ADD CONSTRAINT "StudentEnrollment_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "CourseOffering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollment" ADD CONSTRAINT "StudentEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCourseAssignment" ADD CONSTRAINT "TeacherCourseAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCourseAssignment" ADD CONSTRAINT "TeacherCourseAssignment_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "CourseOffering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
