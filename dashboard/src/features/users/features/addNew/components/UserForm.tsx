"use client";
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
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type UserRole =
  | "Chief Instructor"
  | "Instructor"
  | "Junior Instructor"
  | "Craft Instructor"
  | "Staff"
  | "Student";

interface UserFormData {
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  employeeId: string;
  contactNumber: string;
}

const UserForm = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>();

  const onSubmit = (data: UserFormData) => {
    console.log("Form submitted with:", data);

    // This would typically connect to an API
    // For now we'll just show a success message
    toast({
      title: "User Created",
      description: `${data.fullName} has been added as a ${data.role}`,
    });

    // Navigate back to users list
    // setTimeout(() => navigate("/users"), 1500);
  };

  const handleRoleChange = (value: string) => {
    setValue("role", value as UserRole);
  };

  const handleDepartmentChange = (value: string) => {
    setValue("department", value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register("fullName", { required: "Full name is required" })}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={handleRoleChange} defaultValue="Student">
              <SelectTrigger
                id="role"
                className={errors.role ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chief Instructor">
                  Chief Instructor
                </SelectItem>
                <SelectItem value="Instructor">Instructor</SelectItem>
                <SelectItem value="Junior Instructor">
                  Junior Instructor
                </SelectItem>
                <SelectItem value="Craft Instructor">
                  Craft Instructor
                </SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              onValueChange={handleDepartmentChange}
              defaultValue="Computer Science"
            >
              <SelectTrigger
                id="department"
                className={errors.department ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="Information Technology">
                  Information Technology
                </SelectItem>
                <SelectItem value="Electrical Engineering">
                  Electrical Engineering
                </SelectItem>
                <SelectItem value="Mechanical Engineering">
                  Mechanical Engineering
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.department && (
              <p className="text-sm text-destructive">
                {errors.department.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee/Student ID</Label>
            <Input
              id="employeeId"
              placeholder="EMP12345"
              {...register("employeeId", { required: "ID is required" })}
              className={errors.employeeId ? "border-destructive" : ""}
            />
            {errors.employeeId && (
              <p className="text-sm text-destructive">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              placeholder="+1 (555) 123-4567"
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className={errors.contactNumber ? "border-destructive" : ""}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline">
            <Link href={"/users"} className="gap-2 flex">
              Cancel
            </Link>
          </Button>

          <Button type="submit" className="gap-2">
            <Save size={16} /> Save User
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
