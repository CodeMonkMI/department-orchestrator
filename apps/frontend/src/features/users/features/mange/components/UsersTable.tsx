"use client";
import CustomTable from "@/components/custom/CustomTable";
import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { useTeacherQuery } from "@/lib/api/teacherApi";
import { Teacher } from "@/lib/api/teacherApi/type";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { BookPlus, CheckCircle, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function UsersTable() {
  const [data, setData] = useState<Teacher[]>([]);
  const {
    data: teachers = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useTeacherQuery();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (isSuccess) {
      setData(teachers);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
  }

  return (
    <div>
      <Card className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <CustomTable data={teachers} columns={columns} />
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing 1 to 8 of 100 results
          </p>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

const columnHelper = createColumnHelper<Teacher>();

const columns = [
  columnHelper.accessor("user.fullname", {
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
  columnHelper.accessor("user.email", {
    cell: (row) => (
      <div className="flex items-center gap-1.5">
        <Users size={14} className="text-muted-foreground" />
        {row.getValue().toLocaleLowerCase()}
      </div>
    ),

    header: () => <span>Email</span>,
  }),
  columnHelper.accessor("title", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium">{row.getValue()}</div>
        </div>
      </div>
    ),

    header: () => <span>Title</span>,
  }),
  columnHelper.accessor("joinDate", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium">
            {format(new Date(row.getValue()), "dd MMM yyyy")}
          </div>
        </div>
      </div>
    ),

    header: () => <span>Join Date</span>,
  }),
  columnHelper.accessor("officeLocation", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium">{row.getValue()}</div>
        </div>
      </div>
    ),

    header: () => <span>Office</span>,
  }),

  columnHelper.accessor("status", {
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.getValue().toLocaleLowerCase() === "active" ? (
          <>
            <CheckCircle size={16} className="text-emerald-500 mr-1.5" />
            <span className="text-emerald-800">Active</span>
          </>
        ) : (
          <>
            <XCircle size={16} className="text-red-500 mr-1.5" />
            <span className="text-red-800">Inactive</span>
          </>
        )}
      </div>
    ),
    header: () => <span>Status</span>,
  }),
];
