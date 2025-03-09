
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookPlus, BarChart2, FileText, MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  'Active': 'bg-emerald-100 text-emerald-800',
  'Upcoming': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-slate-100 text-slate-800',
};

const courseData = [
  { id: 1, code: 'CS101', name: 'Introduction to Programming', instructor: 'Dr. Michael Smith', status: 'Active', students: 45, semester: 'Semester 1' },
  { id: 2, code: 'CS201', name: 'Data Structures', instructor: 'Prof. Emily Johnson', status: 'Active', students: 38, semester: 'Semester 3' },
  { id: 3, code: 'CS301', name: 'Algorithms', instructor: 'Dr. James Wilson', status: 'Upcoming', students: 32, semester: 'Semester 5' },
  { id: 4, code: 'CS401', name: 'Database Systems', instructor: 'Dr. Lisa Brown', status: 'Completed', students: 29, semester: 'Semester 2' },
  { id: 5, code: 'CS501', name: 'Computer Networks', instructor: 'Prof. Robert Davis', status: 'Active', students: 35, semester: 'Semester 5' },
];

const semesterData = [
  { id: 1, name: 'Semester 1', courses: 4, period: 'July - December' },
  { id: 2, name: 'Semester 2', courses: 5, period: 'January - June' },
  { id: 3, name: 'Semester 3', courses: 6, period: 'July - December' },
  { id: 4, name: 'Semester 4', courses: 4, period: 'January - June' },
  { id: 5, name: 'Semester 5', courses: 5, period: 'July - December' },
  { id: 6, name: 'Semester 6', courses: 4, period: 'January - June' },
  { id: 7, name: 'Semester 7', courses: 3, period: 'July - December' },
  { id: 8, name: 'Semester 8', courses: 2, period: 'January - June' },
];

const Courses = () => {
  const navigate = useNavigate();

  const handleSemesterClick = (semesterId: number) => {
    navigate(`/semester/semester-${semesterId}`);
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage courses and academic schedules</p>
        </div>
        <Button
          onClick={() => navigate('/courses/add')}
          className="gap-2"
        >
          <BookPlus size={16} /> Add New Course
        </Button>
      </div>

      <div className="space-y-6">
        {/* Semesters */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Semesters</h2>
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {semesterData.map((semester) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-lg border bg-card text-card-foreground hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleSemesterClick(semester.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{semester.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{semester.period}</p>
                  </div>
                  <Badge variant="secondary">{semester.courses} Courses</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Course List */}
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
                        <div className="text-sm text-muted-foreground">{course.code}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn('', statusColors[course.status])}>
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
    </Layout>
  );
};

export default Courses;
