import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const ScheduleList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);

  // This would come from an API in a real application
  const scheduledCourses = [
    {
      id: 1,
      courseName: "Introduction to Computer Science",
      courseCode: "CS101",
      instructor: "Dr. Jane Smith",
      day: "Monday",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      room: "Room 101",
      semester: "Semester 1",
    },
    {
      id: 2,
      courseName: "Data Structures and Algorithms",
      courseCode: "CS201",
      instructor: "Dr. John Doe",
      day: "Wednesday",
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      room: "Room 203",
      semester: "Semester 1",
    },
  ];

  const dayHasEvent = (day: Date) => {
    const dayName = format(day, "EEEE");
    return scheduledCourses.some((course) => course.day === dayName);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[400px] p-6 border-r border-border">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                modifiers={{
                  hasEvent: (date) => dayHasEvent(date),
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: "bold",
                    backgroundColor: "var(--primary)",
                    color: "white",
                    borderRadius: "0.375rem",
                  },
                }}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1 p-6">
          <h3 className="text-lg font-medium mb-4">
            {date
              ? format(date, "EEEE, MMMM do, yyyy")
              : "Select a date to view courses"}
          </h3>

          {date && (
            <div className="space-y-4">
              {scheduledCourses
                .filter((course) => course.day === format(date, "EEEE"))
                .map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-md border border-border bg-card"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{course.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.courseCode}
                        </p>
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {course.startTime} - {course.endTime}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Instructor: {course.instructor}</p>
                      <p>Room: {course.room}</p>
                      <p>Semester: {course.semester}</p>
                    </div>
                  </div>
                ))}
              {scheduledCourses.filter(
                (course) => course.day === format(date, "EEEE")
              ).length === 0 && (
                <p className="text-muted-foreground">
                  No courses scheduled for this day
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;
