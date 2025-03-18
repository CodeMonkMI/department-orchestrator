import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

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
  semester?: string;
}

interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  date?: Date;
}

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
          day: "Sunday",
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
        {
          day: "Sunday",
          startTime: "11:00 AM",
          endTime: "01:00 PM",
          room: "Room 102",
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

const ScheduleCourses = () => {
  const coursesData: Course[] = Object.entries(semesterCourses)
    .map(([key, value]) => value.map((i) => ({ ...i, semester: key })))
    .flat(1);

  // Generate days of the week for the calendar view
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
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

  const getDaySchedule = (day: string) => {
    const daySchedule: Record<string, Course[]> = {};

    coursesData.forEach((course) => {
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
    <div>
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
                            "bg-purple-100 text-purple-800",
                            {
                              "bg-emerald-100 text-emerald-800":
                                course.status === "Active",
                              "bg-blue-100 text-blue-800":
                                course.status === "Upcoming",
                            }
                          )}
                        >
                          <div className="font-medium flex justify-between">
                            <p>{course.code}</p>
                            <p>{course.semester}</p>
                          </div>
                          <div className="truncate">{course.name}</div>
                          <div className="flex items-center mt-1 space-x-1">
                            <Clock size={10} />
                            <span>
                              {
                                course.schedule?.find((s) => s.day === day)
                                  ?.startTime
                              }{" "}
                              -
                              {
                                course.schedule?.find((s) => s.day === day)
                                  ?.endTime
                              }
                            </span>
                          </div>
                          <div className="mt-1 text-xs opacity-75">
                            {course.schedule?.find((s) => s.day === day)?.room}
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
    </div>
  );
};

export default ScheduleCourses;
