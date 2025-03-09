import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Filter, Search, XCircle } from "lucide-react";
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

const SearchFilter = () => {
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
      {/* Search and filters */}
      <FadeIn delay={0.3}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search students by name, roll number or email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <Button variant="outline" className="flex items-center shrink-0">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default SearchFilter;
