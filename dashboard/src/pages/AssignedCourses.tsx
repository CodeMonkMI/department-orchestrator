
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Filter, MoreHorizontal, BookCheck, History, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui-elements/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FadeIn from '@/components/animations/FadeIn';

// Define the types for current and historical assignments
interface BaseAssignment {
  id: number;
  courseCode: string;
  courseName: string;
  instructor: string;
  semester: string;
  status: string;
}

interface CurrentAssignment extends BaseAssignment {
  status: 'Current';
}

interface HistoricalAssignment extends BaseAssignment {
  year: string;
  status: 'Completed';
}

// Sample data for assigned courses
const assignedCoursesData: CurrentAssignment[] = [
  { id: 1, courseCode: 'CS101', courseName: 'Introduction to Programming', instructor: 'Dr. Michael Smith', semester: 'Semester 1', status: 'Current' },
  { id: 2, courseCode: 'CS201', courseName: 'Data Structures', instructor: 'Prof. Emily Johnson', semester: 'Semester 3', status: 'Current' },
  { id: 3, courseCode: 'CS301', courseName: 'Algorithms', instructor: 'Dr. James Wilson', semester: 'Semester 5', status: 'Current' },
  { id: 4, courseCode: 'CS401', courseName: 'Database Systems', instructor: 'Dr. Lisa Brown', semester: 'Semester 2', status: 'Current' },
  { id: 5, courseCode: 'CS501', courseName: 'Computer Networks', instructor: 'Prof. Robert Davis', semester: 'Semester 5', status: 'Current' },
];

// Sample historical assignments
const historicalAssignments: HistoricalAssignment[] = [
  { id: 101, courseCode: 'CS100', courseName: 'Computer Basics', instructor: 'Dr. Michael Smith', semester: 'Semester 1', year: '2023', status: 'Completed' },
  { id: 102, courseCode: 'CS200', courseName: 'Object-Oriented Programming', instructor: 'Prof. Emily Johnson', semester: 'Semester 2', year: '2023', status: 'Completed' },
];

const AssignedCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentAssignments, setCurrentAssignments] = useState<CurrentAssignment[]>(assignedCoursesData);
  const [history, setHistory] = useState<HistoricalAssignment[]>(historicalAssignments);
  const [viewMode, setViewMode] = useState<'current' | 'history'>('current');

  const handleStoreToHistory = () => {
    const timestamp = new Date().getFullYear().toString();
    const movedAssignments: HistoricalAssignment[] = currentAssignments.map(course => ({
      ...course,
      id: course.id + 1000, // Create new IDs for history
      year: timestamp,
      status: 'Completed' as const
    }));
    
    setHistory(prev => [...movedAssignments, ...prev]);
    
    toast({
      title: "Assignments Archived",
      description: `${currentAssignments.length} course assignments have been stored in history.`,
    });
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assigned Courses</h1>
          <p className="text-muted-foreground mt-1">Track and manage course assignments for instructors</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'current' ? 'default' : 'outline'}
            onClick={() => setViewMode('current')}
            className="gap-2"
          >
            <BookCheck size={16} /> Current Assignments
          </Button>
          <Button
            variant={viewMode === 'history' ? 'default' : 'outline'}
            onClick={() => setViewMode('history')}
            className="gap-2"
          >
            <History size={16} /> Assignment History
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {viewMode === 'current' ? 'Current Course Assignments' : 'Historical Course Assignments'}
          </h2>
          
          <div className="flex gap-3">
            <div className="relative">
              <Input
                placeholder="Search assignments..."
                className="pl-9 w-[250px]"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            {viewMode === 'current' && (
              <Button
                onClick={handleStoreToHistory}
                variant="secondary"
                className="gap-2"
              >
                <Save size={16} /> Archive Current Assignments
              </Button>
            )}
          </div>
        </div>

        <FadeIn delay={0.2}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Semester</TableHead>
                {viewMode === 'history' && <TableHead>Year</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(viewMode === 'current' 
                ? currentAssignments 
                : history
              ).map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <BookOpen size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{assignment.courseName}</div>
                        <div className="text-sm text-muted-foreground">{assignment.courseCode}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.instructor}</TableCell>
                  <TableCell>{assignment.semester}</TableCell>
                  {viewMode === 'history' && (
                    <TableCell>
                      {(assignment as HistoricalAssignment).year}
                    </TableCell>
                  )}
                  <TableCell>
                    <Badge variant="secondary" className={assignment.status === 'Current' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}>
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
                        {viewMode === 'current' && (
                          <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FadeIn>
      </Card>
    </Layout>
  );
};

export default AssignedCourses;
