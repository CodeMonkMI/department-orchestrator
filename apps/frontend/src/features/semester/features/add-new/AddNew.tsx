import Card from "@/components/ui-elements/Card";
import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookPlus } from "lucide-react";

import Link from "next/link";
import CourseAddForm from "./components/coure-add-form";

const AddNewSemesterContainer = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle
          title="Add New Semester"
          description=" Create a new semester for the department"
        />

        <Button variant="outline">
          <Link href={"/semester"} className="gap-2 flex items-center">
            <ArrowLeft size={16} /> Back
          </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <BookPlus size={24} />
          </div>
          <h2 className="text-xl font-semibold">Semester Information</h2>
        </div>

        <CourseAddForm />
      </Card>
    </div>
  );
};

export default AddNewSemesterContainer;
