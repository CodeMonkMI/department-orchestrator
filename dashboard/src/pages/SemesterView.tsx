import Layout from "@/components/layout/Layout";
import Card from "@/components/ui-elements/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CalendarDays,
  Clock,
  MoreHorizontal,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Define types for our data
interface SemesterDetail {
  id: number;
  name: string;
  period: string;
  courseCount: number;
  year: string;
}

interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  status: string;
  students: number;
  schedule?: CourseSchedule[];
}

interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  date?: Date;
}

interface InstructorData {
  courses: number;
  students: number;
}

// Sample semester data
const semesterDetails: Record<string, SemesterDetail> = {
  "semester-1": {
    id: 1,
    name: "Semester 1",
    period: "July - December",
    courseCount: 4,
    year: "2023",
  },
  "semester-2": {
    id: 2,
    name: "Semester 2",
    period: "January - June",
    courseCount: 5,
    year: "2024",
  },
  "semester-3": {
    id: 3,
    name: "Semester 3",
    period: "July - December",
    courseCount: 6,
    year: "2024",
  },
};

// Sample courses data with schedule information
const semesterCourses: Record<string, Course[]> = {
  "semester-1": [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      instructor: "Dr. Michael Smith",
      status: "Active",
      students: 45,
      schedule: [
        {
          day: "Monday",
          startTime: "10:00 AM",
          endTime: "11:30 AM",
          room: "Room 101",
        },
        {
          day: "Wednesday",
          startTime: "10:00 AM",
          endTime: "11:30 AM",
          room: "Room 101",
        },
      ],
    },
    {
      id: 2,
      code: "CS201",
      name: "Data Structures",
      instructor: "Prof. Emily Johnson",
      status: "Active",
      students: 38,
      schedule: [
        {
          day: "Tuesday",
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          room: "Room 203",
        },
        {
          day: "Thursday",
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          room: "Room 203",
        },
      ],
    },
    {
      id: 3,
      code: "MATH101",
      name: "Calculus I",
      instructor: "Dr. Robert Taylor",
      status: "Active",
      students: 52,
      schedule: [
        {
          day: "Monday",
          startTime: "02:00 PM",
          endTime: "03:30 PM",
          room: "Room 305",
        },
        {
          day: "Wednesday",
          startTime: "02:00 PM",
          endTime: "03:30 PM",
          room: "Room 305",
        },
      ],
    },
    {
      id: 4,
      code: "ENG101",
      name: "Technical Writing",
      instructor: "Dr. Sarah Williams",
      status: "Active",
      students: 41,
      schedule: [
        {
          day: "Friday",
          startTime: "11:00 AM",
          endTime: "01:00 PM",
          room: "Room 102",
        },
      ],
    },
  ],
  "semester-2": [
    {
      id: 5,
      code: "CS301",
      name: "Algorithms",
      instructor: "Dr. James Wilson",
      status: "Upcoming",
      students: 32,
      schedule: [
        {
          day: "Tuesday",
          startTime: "01:00 PM",
          endTime: "02:30 PM",
          room: "Room 202",
        },
        {
          day: "Thursday",
          startTime: "01:00 PM",
          endTime: "02:30 PM",
          room: "Room 202",
        },
      ],
    },
    {
      id: 6,
      code: "CS401",
      name: "Database Systems",
      instructor: "Dr. Lisa Brown",
      status: "Upcoming",
      students: 29,
      schedule: [
        {
          day: "Monday",
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          room: "Room 304",
        },
        {
          day: "Wednesday",
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          room: "Room 304",
        },
      ],
    },
  ],
  "semester-3": [
    {
      id: 7,
      code: "CS501",
      name: "Computer Networks",
      instructor: "Prof. Robert Davis",
      status: "Planned",
      students: 35,
      schedule: [
        {
          day: "Monday",
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          room: "Room 201",
        },
        {
          day: "Wednesday",
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          room: "Room 201",
        },
      ],
    },
    {
      id: 8,
      code: "CS601",
      name: "Software Engineering",
      instructor: "Dr. Amanda Lee",
      status: "Planned",
      students: 27,
      schedule: [
        {
          day: "Tuesday",
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          room: "Room 301",
        },
        {
          day: "Thursday",
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          room: "Room 301",
        },
      ],
    },
  ],
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Upcoming: "bg-blue-100 text-blue-800",
  Completed: "bg-slate-100 text-slate-800",
  Planned: "bg-purple-100 text-purple-800",
};

const SemesterView = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Fallback if semester not found
  const currentSemester =
    semesterId && semesterDetails[semesterId]
      ? semesterDetails[semesterId]
      : {
          id: 0,
          name: "Unknown Semester",
          period: "",
          courseCount: 0,
          year: "",
        };

  const courses =
    semesterId && semesterCourses[semesterId]
      ? semesterCourses[semesterId]
      : [];

  // Generate days of the week for the calendar view
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  // Filter courses for the selected day
  const getCoursesForDay = (day: string) => {
    return courses.filter((course) =>
      course.schedule?.some((schedule) => schedule.day === day)
    );
  };

  const getDaySchedule = (day: string) => {
    const daySchedule: Record<string, Course[]> = {};

    courses.forEach((course) => {
      course.schedule?.forEach((schedule) => {
        if (schedule.day === day) {
          if (!daySchedule[schedule.startTime]) {
            daySchedule[schedule.startTime] = [];
          }
          daySchedule[schedule.startTime].push(course);
        }
      });
    });

    return daySchedule;
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to All Courses
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{currentSemester.name}</h1>
            <p className="text-muted-foreground mt-1">
              {currentSemester.period} • {currentSemester.year}
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-wrap gap-4 p-6">
          <div className="flex-1 min-w-[200px] p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="text-blue-600 mb-1 flex items-center gap-2">
              <Calendar size={18} />
              <span className="font-medium">Period</span>
            </div>
            <div className="text-lg font-semibold">
              {currentSemester.period}
            </div>
          </div>

          <div className="flex-1 min-w-[200px] p-4 rounded-lg bg-green-50 border border-green-100">
            <div className="text-green-600 mb-1 flex items-center gap-2">
              <BookOpen size={18} />
              <span className="font-medium">Courses</span>
            </div>
            <div className="text-lg font-semibold">
              {currentSemester.courseCount} Courses
            </div>
          </div>

          <div className="flex-1 min-w-[200px] p-4 rounded-lg bg-purple-50 border border-purple-100">
            <div className="text-purple-600 mb-1 flex items-center gap-2">
              <Users size={18} />
              <span className="font-medium">Students</span>
            </div>
            <div className="text-lg font-semibold">
              {courses.reduce((sum, course) => sum + course.students, 0)}{" "}
              Enrolled
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Tabs
          defaultValue="courses"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="p-6 pb-0 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="courses" className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <BookOpen size={18} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{course.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.code}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusColors[course.status]}
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-muted-foreground" />
                          {course.students}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Course</DropdownMenuItem>
                            <DropdownMenuItem>
                              Assign Instructor
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No courses found for this semester
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="instructors" className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length > 0 ? (
                  // Group by instructor and count courses
                  Object.entries(
                    courses.reduce((acc, course) => {
                      if (!acc[course.instructor]) {
                        acc[course.instructor] = {
                          courses: 0,
                          students: 0,
                        };
                      }
                      acc[course.instructor].courses += 1;
                      acc[course.instructor].students += course.students;
                      return acc;
                    }, {} as Record<string, InstructorData>)
                  ).map(([instructor, data], idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="font-medium">{instructor}</div>
                      </TableCell>
                      <TableCell>{data.courses}</TableCell>
                      <TableCell>{data.students}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No instructors found for this semester
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="schedule" className="p-6">
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <h3 className="text-lg font-semibold">Course Schedule</h3>

              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-20 p-3 border bg-slate-50 text-slate-500 text-xs font-medium uppercase"></th>
                    {daysOfWeek.map((day) => (
                      <th
                        key={day}
                        className="p-3 border bg-slate-50 text-slate-500 text-xs font-medium uppercase"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, index) => (
                    <tr key={time}>
                      <td className="border p-2 text-center text-xs font-medium text-slate-500 bg-slate-50">
                        {time}
                      </td>
                      {daysOfWeek.map((day) => {
                        const daySchedule = getDaySchedule(day);
                        const coursesAtTime = daySchedule[time] || [];

                        return (
                          <td
                            key={`${day}-${time}`}
                            className="border p-1 h-20 align-top"
                          >
                            {coursesAtTime.map((course) => (
                              <div
                                key={`${course.id}-${day}-${time}`}
                                className={cn(
                                  "p-1 mb-1 rounded text-xs",
                                  course.status === "Active"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : course.status === "Upcoming"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                )}
                              >
                                <div className="font-medium">{course.code}</div>
                                <div className="truncate">{course.name}</div>
                                <div className="flex items-center mt-1 space-x-1">
                                  <Clock size={10} />
                                  <span>
                                    {
                                      course.schedule?.find(
                                        (s) => s.day === day
                                      )?.startTime
                                    }{" "}
                                    -
                                    {
                                      course.schedule?.find(
                                        (s) => s.day === day
                                      )?.endTime
                                    }
                                  </span>
                                </div>
                                <div className="mt-1 text-xs opacity-75">
                                  {
                                    course.schedule?.find((s) => s.day === day)
                                      ?.room
                                  }
                                </div>
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default SemesterView;
