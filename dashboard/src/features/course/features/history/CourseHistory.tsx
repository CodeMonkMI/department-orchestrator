import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AssignedList from "./components/AssignedList";

const CourseHistoryContainer = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assigned Courses</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage course assignments for instructors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Link to={"/courses"} className="gap-2 flex items-center">
              <ArrowLeft size={16} /> Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <AssignedList />
    </div>
  );
};

export default CourseHistoryContainer;
