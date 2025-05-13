import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

import Link from "next/link";
import SemesterList from "./components/semester-list";

const SemesterContainer = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle title="Semester Management" description="Manage semester" />
        <div className="space-x-4">
          <Button>
            <Link href={"/semester/add"} className="gap-2 flex">
              <BookPlus size={16} /> Add New Semester
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="xl:w-1/2">
            <SemesterList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterContainer;
