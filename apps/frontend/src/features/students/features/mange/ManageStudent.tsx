"use client";

import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";

import { UserPlus } from "lucide-react";

import Link from "next/link";
import SearchFilter from "./components/SearchFilter";
import StudentTable from "./components/StudentTable";

const ManageStudentContainer = () => {
  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageTitle
            title="Student Management"
            description="Manage student records, enrollments and academic information"
          />

          <Button>
            <Link href={"/students/add"} className="gap-2 flex">
              <UserPlus size={16} className="mr-2" />
              Add New Student
            </Link>
          </Button>
        </div>

        <SearchFilter />
        {/* Students table */}
        <StudentTable />
      </div>
    </>
  );
};

export default ManageStudentContainer;
