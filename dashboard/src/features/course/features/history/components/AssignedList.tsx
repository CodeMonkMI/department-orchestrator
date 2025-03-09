import FadeIn from "@/components/animations/FadeIn";
import Card from "@/components/ui-elements/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Filter, MoreHorizontal } from "lucide-react";

import { AssignmentHistory, historicalAssignments } from "../data";

const AssignedList = () => {
  return (
    <div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Course Assignments</h2>

          <div className="flex gap-3">
            <div className="relative">
              <Input
                placeholder="Search assignments..."
                className="pl-9 w-[250px]"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <FadeIn delay={0.2}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <BookOpen size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {assignment.courseName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {assignment.courseCode}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.instructor}</TableCell>
                  <TableCell>{assignment.semester}</TableCell>
                  <TableCell>
                    {(assignment as AssignmentHistory).year}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-800"
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FadeIn>
      </Card>
    </div>
  );
};

export default AssignedList;
