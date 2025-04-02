// Define the types for current and historical assignments

export type AssignmentHistory = {
  id: number;
  courseCode: string;
  courseName: string;
  instructor: string;
  semester: string;
  year: string;
  status: "Completed";
};

// Sample historical assignments
export const historicalAssignments: AssignmentHistory[] = [
  {
    id: 101,
    courseCode: "CS100",
    courseName: "Computer Basics",
    instructor: "Dr. Michael Smith",
    semester: "Semester 1",
    year: "2023",
    status: "Completed",
  },
  {
    id: 102,
    courseCode: "CS200",
    courseName: "Object-Oriented Programming",
    instructor: "Prof. Emily Johnson",
    semester: "Semester 2",
    year: "2023",
    status: "Completed",
  },
];
