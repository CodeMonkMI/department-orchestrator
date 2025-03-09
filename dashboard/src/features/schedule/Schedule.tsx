import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseScheduleDialog from "./components/CourseScheduleDialog";
import ScheduleList from "./components/ScheduleList";

const ScheduleContainer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle
          title="Course Schedule"
          description="Manage your department's course schedule"
        />

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>
      <Card className="w-full">
        <CardContent className="p-0">
          <ScheduleList />
        </CardContent>

        <CourseScheduleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </Card>
    </div>
  );
};

export default ScheduleContainer;
