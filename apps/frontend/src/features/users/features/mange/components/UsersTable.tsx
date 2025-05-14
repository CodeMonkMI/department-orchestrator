"use client";
import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTeacherQuery } from "@/lib/api/teacherApi";
import { Teacher } from "@/lib/api/teacherApi/type";
import {
  createColumnHelper,
  flexRender,
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
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

const roleColors: Record<string, string> = {
  "Chief Instructor": "bg-blue-100 text-blue-800",
  Instructor: "bg-emerald-100 text-emerald-800",
  "Junior Instructor": "bg-purple-100 text-purple-800",
  "Craft Instructor": "bg-amber-100 text-amber-800",
  Staff: "bg-slate-100 text-slate-800",
  Student: "bg-teal-100 text-teal-800",
};

const users = [
  {
    id: 1,
    name: "Dr. Michael Smith",
    role: "Chief Instructor",
    email: "michael.smith@example.com",
    status: "Active",
    department: "Computer Science",
  },
  {
    id: 2,
    name: "Prof. Emily Johnson",
    role: "Instructor",
    email: "emily.johnson@example.com",
    status: "Active",
    department: "Computer Science",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Junior Instructor",
    email: "james.wilson@example.com",
    status: "Active",
    department: "Computer Science",
  },
  {
    id: 4,
    name: "Lisa Brown",
    role: "Craft Instructor",
    email: "lisa.brown@example.com",
    status: "Active",
    department: "Computer Science",
  },
  {
    id: 5,
    name: "Robert Davis",
    role: "Staff",
    email: "robert.davis@example.com",
    status: "Active",
    department: "Computer Science",
  },
  {
    id: 6,
    name: "Sarah Martinez",
    role: "Junior Instructor",
    email: "sarah.martinez@example.com",
    status: "Inactive",
    department: "Computer Science",
  },
  {
    id: 7,
    name: "John Thompson",
    role: "Student",
    email: "john.thompson@example.com",
    status: "Active",
    department: "Computer Science",
  },
  {
    id: 8,
    name: "Angela White",
    role: "Instructor",
    email: "angela.white@example.com",
    status: "Active",
    department: "Computer Science",
  },
];

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

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
