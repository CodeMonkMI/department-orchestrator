import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

import Link from "next/link";
import CourseList from "./components/course-ist";
import Semester from "./components/semester";

const CoursesContainer = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle
          title="Course Management"
          description="Manage courses and academic schedules"
        />
        <div className="space-x-4">
          <Button>
            <Link href={"/courses/history"} className="gap-2 flex">
              <BookPlus size={16} /> History
            </Link>
          </Button>
          <Button>
            <Link href={"/courses/add"} className="gap-2 flex">
              <BookPlus size={16} /> Add New Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Semester />

        <CourseList />
      </div>
    </div>
  );
};

export default CoursesContainer;
