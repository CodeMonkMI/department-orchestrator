-- Step 1: Drop the foreign key constraints that reference User.id
ALTER TABLE
  "CourseOffering" DROP CONSTRAINT IF EXISTS "CourseOffering_userId_fkey";

ALTER TABLE
  "AttendanceRecord" DROP CONSTRAINT IF EXISTS "AttendanceRecord_userId_fkey";

ALTER TABLE
  "Report" DROP CONSTRAINT IF EXISTS "Report_generatedBy_fkey";

ALTER TABLE
  "Task" DROP CONSTRAINT IF EXISTS "Task_assignedTo_fkey";

ALTER TABLE
  "Task" DROP CONSTRAINT IF EXISTS "Task_assignedBy_fkey";

ALTER TABLE
  "Student" DROP CONSTRAINT IF EXISTS "Student_userId_fkey";

ALTER TABLE
  "StudentEnrollment" DROP CONSTRAINT IF EXISTS "StudentEnrollment_userId_fkey";

ALTER TABLE
  "Teacher" DROP CONSTRAINT IF EXISTS "Teacher_userId_fkey";

ALTER TABLE
  "Activity" DROP CONSTRAINT IF EXISTS "Activity_userId_fkey";

-- Step 2: Make your changes to the User table primary key
ALTER TABLE
  "User"
ALTER COLUMN
  "id" TYPE TEXT;

-- Step 3: Recreate the foreign key constraints
ALTER TABLE
  "CourseOffering"
ADD
  CONSTRAINT "CourseOffering_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE
SET
  NULL ON UPDATE CASCADE;

ALTER TABLE
  "AttendanceRecord"
ADD
  CONSTRAINT "AttendanceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE
  "Report"
ADD
  CONSTRAINT "Report_generatedBy_fkey" FOREIGN KEY ("generatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE
  "Task"
ADD
  CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE
  "Task"
ADD
  CONSTRAINT "Task_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE
  "Student"
ADD
  CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE
  "StudentEnrollment"
ADD
  CONSTRAINT "StudentEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE
SET
  NULL ON UPDATE CASCADE;

ALTER TABLE
  "Teacher"
ADD
  CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE
  "Activity"
ADD
  CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;