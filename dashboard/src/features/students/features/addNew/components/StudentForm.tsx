import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

const StudentForm = () => {
  const { toast } = useToast();

  const { handleSubmit } = useForm();

  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    department: "Computer Science",
    status: "Active",
  });

  const onSubmit = () => {
    toast({
      title: "Student Added",
      description: `Student has been added successfully`,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={newStudent.name || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                placeholder="ST001"
                value={newStudent.rollNumber || ""}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    rollNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={newStudent.department}
                onValueChange={(value) =>
                  setNewStudent({ ...newStudent, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="Electrical Engineering">
                    Electrical Engineering
                  </SelectItem>
                  <SelectItem value="Mechanical Engineering">
                    Mechanical Engineering
                  </SelectItem>
                  <SelectItem value="Civil Engineering">
                    Civil Engineering
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={
                  newStudent.enrollmentDate ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    enrollmentDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.smith@example.com"
                value={newStudent.email || ""}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                placeholder="555-1234"
                value={newStudent.contactNumber || ""}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={newStudent.status}
              onValueChange={(value: "Active" | "Inactive" | "Suspended") =>
                setNewStudent({ ...newStudent, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline">
            <Link to={"/students"}>Cancel</Link>
          </Button>
          <Button type="submit" className="gap-2">
            <Save size={16} /> Save Student
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
