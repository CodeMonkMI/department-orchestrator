import Card from "@/components/ui-elements/Card";
import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookPlus } from "lucide-react";

import Link from "next/link";
import StudentForm from "./components/StudentForm";

const AddNewStudentContainer = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle
          title="Add New Student"
          description=" Enter student details to add them to the system."
        />

        <Button variant="outline">
          <Link href={"/students"} className="gap-2 flex items-center">
            <ArrowLeft size={16} /> Back to Students
          </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <BookPlus size={24} />
          </div>
          <h2 className="text-xl font-semibold">Student Information</h2>
        </div>

        <StudentForm />
      </Card>
    </div>
  );
};

export default AddNewStudentContainer;
