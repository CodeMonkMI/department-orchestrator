"use client";
import CustomTable from "@/components/custom/CustomTable";
import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCourseQuery } from "@/lib/api/coureseApi";
import { useCourseRemoveMutation } from "@/lib/api/coureseApi/removeApi";
import { Course } from "@/lib/api/coureseApi/type";
import { createColumnHelper } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { BookPlus, Trash2Icon, Users } from "lucide-react";
import { useEffect } from "react";

const CourseList = () => {
  const { data: courses, isLoading, isError, error } = useCourseQuery();
  const {
    mutateAsync: remove,
    isSuccess,
    isError: isRemoveError,
    error: removeError,
  } = useCourseRemoveMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Course removed successfully",
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isRemoveError) {
      if (removeError instanceof AxiosError) {
        const msg =
          ((removeError as AxiosError).response?.data as any).message || "";
        toast({
          title: msg,
        });
      }
    }
  }, [isRemoveError]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
  }
  return (
    <div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Course List</h2>
        </div>

        <CustomTable
          data={courses || []}
          columns={columns}
          meta={{
            remove,
          }}
        />
      </Card>
    </div>
  );
};

export default CourseList;

const columnHelper = createColumnHelper<Course>();

const columns = [
  columnHelper.accessor("name", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <BookPlus size={18} className="text-primary" />
        </div>
        <div>
          <div className="font-medium">{row.getValue()}</div>
        </div>
      </div>
    ),

    header: () => <span>Full Name</span>,
  }),
  columnHelper.accessor("code", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium">{row.getValue()}</div>
        </div>
      </div>
    ),

    header: () => <span>Code</span>,
  }),
  columnHelper.accessor("name", {
    cell: (row) => (
      <div className="flex items-center gap-1.5">
        <Users size={14} className="text-muted-foreground" />
        {row.getValue().toLocaleLowerCase()}
      </div>
    ),

    header: () => <span>Instructor</span>,
  }),

  columnHelper.accessor("credits", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium">{row.getValue()}</div>
        </div>
      </div>
    ),

    header: () => <span>Credits</span>,
  }),

  columnHelper.accessor("type", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <span className="">{row.getValue()}</span>
      </div>
    ),
    header: () => <span>Type</span>,
  }),
  columnHelper.accessor("id", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div>
          <Button
            onClick={() => {
              console.log("click");
              if ((row.table.options.meta as any).remove) {
                (row.table.options.meta as any).remove(row.getValue());
              }
            }}
            variant={"destructive"}
            size={"sm"}
          >
            <Trash2Icon size={14} className="" />
          </Button>
        </div>
      </div>
    ),
    header: () => <span>Type</span>,
  }),
];
