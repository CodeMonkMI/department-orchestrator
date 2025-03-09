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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CourseFormData {
  courseCode: string;
  courseName: string;
  semester: string;
  creditHours: string;
  instructor: string;
  description: string;
  maxStudents: string;
}

const CourseAddForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CourseFormData>();

  const onSubmit = (data: CourseFormData) => {
    console.log("Form submitted with:", data);

    // This would typically connect to an API
    // For now we'll just show a success message
    toast({
      title: "Course Created",
      description: `${data.courseName} (${data.courseCode}) has been added`,
    });
  };

  const handleSemesterChange = (value: string) => {
    setValue("semester", value);
  };

  const handleCreditHoursChange = (value: string) => {
    setValue("creditHours", value);
  };

  const handleInstructorChange = (value: string) => {
    setValue("instructor", value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              placeholder="CS101"
              {...register("courseCode", {
                required: "Course code is required",
              })}
              className={errors.courseCode ? "border-destructive" : ""}
            />
            {errors.courseCode && (
              <p className="text-sm text-destructive">
                {errors.courseCode.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              placeholder="Introduction to Computer Science"
              {...register("courseName", {
                required: "Course name is required",
              })}
              className={errors.courseName ? "border-destructive" : ""}
            />
            {errors.courseName && (
              <p className="text-sm text-destructive">
                {errors.courseName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select onValueChange={handleSemesterChange} defaultValue="1">
              <SelectTrigger
                id="semester"
                className={errors.semester ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Semester</SelectItem>
                <SelectItem value="2">2nd Semester</SelectItem>
                <SelectItem value="3">3rd Semester</SelectItem>
                <SelectItem value="4">4th Semester</SelectItem>
                <SelectItem value="5">5th Semester</SelectItem>
                <SelectItem value="6">6th Semester</SelectItem>
                <SelectItem value="7">7th Semester</SelectItem>
                <SelectItem value="8">8th Semester</SelectItem>
              </SelectContent>
            </Select>
            {errors.semester && (
              <p className="text-sm text-destructive">
                {errors.semester.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditHours">Credit Hours</Label>
            <Select onValueChange={handleCreditHoursChange} defaultValue="3">
              <SelectTrigger
                id="creditHours"
                className={errors.creditHours ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select credit hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Credit Hour</SelectItem>
                <SelectItem value="2">2 Credit Hours</SelectItem>
                <SelectItem value="3">3 Credit Hours</SelectItem>
                <SelectItem value="4">4 Credit Hours</SelectItem>
              </SelectContent>
            </Select>
            {errors.creditHours && (
              <p className="text-sm text-destructive">
                {errors.creditHours.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor">Primary Instructor</Label>
            <Select onValueChange={handleInstructorChange} defaultValue="">
              <SelectTrigger
                id="instructor"
                className={errors.instructor ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select instructor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. John Smith">Dr. John Smith</SelectItem>
                <SelectItem value="Prof. Sarah Johnson">
                  Prof. Sarah Johnson
                </SelectItem>
                <SelectItem value="Dr. David Williams">
                  Dr. David Williams
                </SelectItem>
                <SelectItem value="Prof. Emily Brown">
                  Prof. Emily Brown
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.instructor && (
              <p className="text-sm text-destructive">
                {errors.instructor.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Max Students</Label>
            <Input
              id="maxStudents"
              type="number"
              placeholder="60"
              {...register("maxStudents", {
                required: "Maximum number of students is required",
                min: {
                  value: 1,
                  message: "Must allow at least 1 student",
                },
                max: {
                  value: 200,
                  message: "Cannot exceed 200 students",
                },
              })}
              className={errors.maxStudents ? "border-destructive" : ""}
            />
            {errors.maxStudents && (
              <p className="text-sm text-destructive">
                {errors.maxStudents.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Course Description</Label>
          <Textarea
            id="description"
            placeholder="Enter course description and learning objectives..."
            rows={4}
            {...register("description", {
              required: "Course description is required",
              minLength: {
                value: 50,
                message: "Description should be at least 50 characters",
              },
            })}
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/courses")}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2">
            <Save size={16} /> Save Course
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseAddForm;
