import Card from "@/components/ui-elements/Card";
import { Badge } from "@/components/ui/badge";
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
import { courseData } from "@/features/course/data/course";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  BookPlus,
  FileText,
  MoreHorizontal,
  Users,
} from "lucide-react";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Upcoming: "bg-blue-100 text-blue-800",
  Completed: "bg-slate-100 text-slate-800",
};

const CourseList = () => {
  return (
    <div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Course List</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseData.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <BookPlus size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.code}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn("", statusColors[course.status])}
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-muted-foreground" />
                    {course.students}
                  </div>
                </TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText size={14} className="mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart2 size={14} className="mr-2" /> View Analytics
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

export default CourseList;
