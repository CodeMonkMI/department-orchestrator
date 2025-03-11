import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  CheckCircle,
  MoreHorizontal,
  Trash2,
  UserCog,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  department: string;
  email: string;
  contactNumber: string;
  enrollmentDate: string;
  status: "Active" | "Inactive" | "Suspended";
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "John Smith",
    rollNumber: "ST001",
    department: "Computer Science",
    email: "john.smith@example.com",
    contactNumber: "555-1234",
    enrollmentDate: "2023-08-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Emily Johnson",
    rollNumber: "ST002",
    department: "Computer Science",
    email: "emily.johnson@example.com",
    contactNumber: "555-2345",
    enrollmentDate: "2023-08-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    rollNumber: "ST003",
    department: "Computer Science",
    email: "michael.brown@example.com",
    contactNumber: "555-3456",
    enrollmentDate: "2023-08-20",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    rollNumber: "ST004",
    department: "Computer Science",
    email: "sarah.wilson@example.com",
    contactNumber: "555-4567",
    enrollmentDate: "2023-07-25",
    status: "Active",
  },
  {
    id: 5,
    name: "David Lee",
    rollNumber: "ST005",
    department: "Computer Science",
    email: "david.lee@example.com",
    contactNumber: "555-5678",
    enrollmentDate: "2023-07-15",
    status: "Active",
  },
  {
    id: 6,
    name: "Jessica Martinez",
    rollNumber: "ST006",
    department: "Computer Science",
    email: "jessica.martinez@example.com",
    contactNumber: "555-6789",
    enrollmentDate: "2023-09-01",
    status: "Suspended",
  },
  {
    id: 7,
    name: "Robert Taylor",
    rollNumber: "ST007",
    department: "Computer Science",
    email: "robert.taylor@example.com",
    contactNumber: "555-7890",
    enrollmentDate: "2023-08-28",
    status: "Active",
  },
  {
    id: 8,
    name: "Jennifer Garcia",
    rollNumber: "ST008",
    department: "Computer Science",
    email: "jennifer.garcia@example.com",
    contactNumber: "555-8901",
    enrollmentDate: "2023-08-05",
    status: "Active",
  },
];
const StudentTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    department: "Computer Science",
    status: "Active",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewStudent = () => {
    if (!newStudent.name || !newStudent.rollNumber || !newStudent.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...students.map((s) => s.id), 0) + 1;
    const studentToAdd = {
      id: newId,
      name: newStudent.name || "",
      rollNumber: newStudent.rollNumber || "",
      department: newStudent.department || "Computer Science",
      email: newStudent.email || "",
      contactNumber: newStudent.contactNumber || "",
      enrollmentDate:
        newStudent.enrollmentDate || new Date().toISOString().split("T")[0],
      status: newStudent.status || "Active",
    } as Student;

    setStudents([...students, studentToAdd]);
    setIsAddDialogOpen(false);
    setNewStudent({
      department: "Computer Science",
      status: "Active",
    });

    toast({
      title: "Student Added",
      description: `${studentToAdd.name} has been added successfully`,
    });
  };

  const handleDeleteStudent = (id: number) => {
    const studentToDelete = students.find((s) => s.id === id);
    setStudents(students.filter((student) => student.id !== id));

    toast({
      title: "Student Removed",
      description: `${studentToDelete?.name} has been removed from the system`,
    });
  };

  const handleStatusChange = (
    id: number,
    newStatus: "Active" | "Inactive" | "Suspended"
  ) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );

    const student = students.find((s) => s.id === id);

    toast({
      title: "Status Updated",
      description: `${student?.name}'s status changed to ${newStatus}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle size={16} className="text-emerald-500 mr-1.5" />;
      case "Inactive":
        return <XCircle size={16} className="text-amber-500 mr-1.5" />;
      case "Suspended":
        return <XCircle size={16} className="text-red-500 mr-1.5" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "text-emerald-800";
      case "Inactive":
        return "text-amber-800";
      case "Suspended":
        return "text-red-800";
      default:
        return "";
    }
  };
  return (
    <div>
      <div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Student</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-600">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.contactNumber}</TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center text-sm ${getStatusClass(
                          student.status
                        )}`}
                      >
                        {getStatusIcon(student.status)}
                        <span>{student.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Edit Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>View Courses</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              handleStatusChange(student.id, "Active")
                            }
                            disabled={student.status === "Active"}
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                            <span>Set as Active</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              handleStatusChange(student.id, "Inactive")
                            }
                            disabled={student.status === "Inactive"}
                          >
                            <XCircle className="mr-2 h-4 w-4 text-amber-500" />
                            <span>Set as Inactive</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              handleStatusChange(student.id, "Suspended")
                            }
                            disabled={student.status === "Suspended"}
                          >
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                            <span>Set as Suspended</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Student</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentTable;
