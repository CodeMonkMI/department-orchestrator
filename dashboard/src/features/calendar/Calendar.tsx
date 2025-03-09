import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseScheduleDialog from "./components/CourseScheduleDialog";
import ScheduleCourses from "./components/ScheduleCourses";

const CalendarContainer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle
          title="Course Schedule"
          description="Manage your department's course schedule"
        />

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule For Course
        </Button>
      </div>
      <Card className="w-full">
        <CardContent className="p-4">
          <ScheduleCourses />
        </CardContent>

        <CourseScheduleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </Card>
    </>
  );
};

export default CalendarContainer;
