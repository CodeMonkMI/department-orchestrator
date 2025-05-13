"use client";
import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSemesterQuery } from "@/lib/api/semesterApi";
import { Semester } from "@/lib/api/semesterApi/type";
import { BookPlus, FileText, MoreHorizontal, Users } from "lucide-react";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Upcoming: "bg-blue-100 text-blue-800",
  Completed: "bg-slate-100 text-slate-800",
};

const SemesterList = () => {
  const { data: semesters, isLoading, isError, error } = useSemesterQuery();

  if (isLoading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }
  return (
    <div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Semester List</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Max Student</TableHead>
              <TableHead>Max Courses</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters!.slice(0, 5).map((semester: Semester) => (
              <TableRow key={semester.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <BookPlus size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{semester.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{semester.type}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-muted-foreground" />
                    {semester.maxStudents}
                  </div>
                </TableCell>
                <TableCell>{semester.maxCourses}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText size={14} className="mr-2" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default SemesterList;
