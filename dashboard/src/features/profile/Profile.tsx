import PageTitle from "@/components/ui-elements/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, BookOpen, Clock, Edit, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  department: z.string(),
  title: z.string(),
  bio: z
    .string()
    .max(500, { message: "Bio cannot be longer than 500 characters." })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  fullName: "Admin User",
  email: "admin@university.edu",
  phone: "+1 (555) 123-4567",
  department: "Computer Science",
  title: "Department Administrator",
  bio: "Experienced department administrator with a focus on student success and faculty support.",
};

const ProfileContainer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  }

  return (
    <>
      <div className="mb-6">
        <PageTitle
          title="Profile"
          description="Manage your personal information"
        />
      </div>

      <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/avatars/admin.png" alt="Admin User" />
              <AvatarFallback className="text-xl">AU</AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-semibold">Monirul Islam</h2>
            <p className="text-muted-foreground">Student</p>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>mmislam027@gmail.com</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>019xxxxxxxxx</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <AtSign className="h-4 w-4 text-muted-foreground" />
                <span>Computer Science & Technology</span>
              </div>
            </div>

            <Button variant="outline" className="mt-6 w-full">
              <Link
                to={"/settings/system"}
                className="flex justify-center w-full items-center"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Link>
            </Button>
          </div>
        </Card>

        {/* Profile Form Card */}
        <Card className="md:col-span-2 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile Information</h3>
              <p className="text-sm text-muted-foreground">
                View your personal information below.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">About</h4>
                <p className="mt-1 text-sm">"No bio provided."</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Full Name</h4>
                  <p className="mt-1 text-sm">Monirul Islam</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Email</h4>
                  <p className="mt-1 text-sm">mmislam027@gmail.com</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Phone</h4>
                  <p className="mt-1 text-sm">Not provided</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Department</h4>
                  <p className="mt-1 text-sm">
                    Computer Science and Technology
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="mt-1 text-sm">Student</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Courses Tab Content */}
        <Card className="md:col-span-3 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Enrolled Courses</h3>
              <p className="text-sm text-muted-foreground">
                Courses you are currently enrolled in.
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrolledCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {course.title}
                      </div>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {course.schedule}
                        </span>
                        <span className="text-muted-foreground">
                          {course.room}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Semesters Tab Content */}
        <Card className="md:col-span-3 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Semester History</h3>
              <p className="text-sm text-muted-foreground">
                Your academic progress by semester.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {semesterHistory.map((semester) => (
                <Card key={semester.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{semester.name}</CardTitle>
                      <Badge
                        className={
                          semester.status === "Completed"
                            ? "bg-green-50 text-green-700"
                            : semester.status === "In Progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }
                      >
                        {semester.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {semester.startDate} - {semester.endDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          GPA:
                        </span>
                        <span className="font-medium">{semester.gpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Credits:
                        </span>
                        <span className="font-medium">{semester.credits}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Achievements Tab Content */}
        <Card className="md:col-span-3 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Academic Achievements</h3>
              <p className="text-sm text-muted-foreground">
                Your academic accomplishments and recognitions.
              </p>
            </div>

            <div className="space-y-4">
              {academicAchievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        {achievement.title}
                      </CardTitle>
                      <Badge variant="outline">{achievement.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProfileContainer;

const enrolledCourses = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Programming",
    instructor: "Dr. Smith",
    schedule: "Mon/Wed 10:00-11:30 AM",
    room: "Tech Building 101",
    status: "Active",
  },
  {
    id: 2,
    code: "CS201",
    title: "Data Structures",
    instructor: "Prof. Johnson",
    schedule: "Tue/Thu 2:00-3:30 PM",
    room: "Science Hall 305",
    status: "Active",
  },
  {
    id: 3,
    code: "MATH150",
    title: "Calculus I",
    instructor: "Dr. Williams",
    schedule: "Mon/Wed/Fri 1:00-2:00 PM",
    room: "Math Building 203",
    status: "Active",
  },
];

// Sample data for semesters
const semesterHistory = [
  {
    id: 1,
    name: "Fall 2023",
    startDate: "August 28, 2023",
    endDate: "December 15, 2023",
    gpa: "3.8",
    credits: 15,
    status: "Completed",
  },
  {
    id: 2,
    name: "Spring 2024",
    startDate: "January 15, 2024",
    endDate: "May 10, 2024",
    gpa: "3.9",
    credits: 16,
    status: "In Progress",
  },
  {
    id: 3,
    name: "Summer 2024",
    startDate: "June 5, 2024",
    endDate: "August 15, 2024",
    gpa: "N/A",
    credits: 9,
    status: "Upcoming",
  },
];

// Sample data for academic achievements
const academicAchievements = [
  {
    id: 1,
    title: "Dean's List",
    date: "Fall 2023",
    description: "Achieved a GPA of 3.8 or higher for the semester",
  },
  {
    id: 2,
    title: "Research Assistant",
    date: "Spring 2024",
    description: "Selected to assist in departmental research on AI algorithms",
  },
  {
    id: 3,
    title: "Academic Scholarship",
    date: "2023-2024",
    description: "Received merit-based scholarship for academic excellence",
  },
];
