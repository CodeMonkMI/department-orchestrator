
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, BarChart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui-elements/Card';
import FadeIn from '@/components/animations/FadeIn';

const statusColors: Record<string, string> = {
  'Present': 'bg-emerald-100 text-emerald-800',
  'Absent': 'bg-red-100 text-red-800',
  'Late': 'bg-amber-100 text-amber-800',
  'Excused': 'bg-blue-100 text-blue-800',
};

const attendanceData = [
  { id: 1, name: 'Dr. Michael Smith', role: 'Chief Instructor', date: '2023-08-10', status: 'Present', time: '09:00 AM', course: 'Introduction to Programming' },
  { id: 2, name: 'Prof. Emily Johnson', role: 'Instructor', date: '2023-08-10', status: 'Present', time: '09:15 AM', course: 'Data Structures' },
  { id: 3, name: 'James Wilson', role: 'Junior Instructor', date: '2023-08-10', status: 'Late', time: '09:32 AM', course: 'Algorithms' },
  { id: 4, name: 'Lisa Brown', role: 'Craft Instructor', date: '2023-08-10', status: 'Absent', time: '00:00 AM', course: 'Database Systems' },
  { id: 5, name: 'Robert Davis', role: 'Staff', date: '2023-08-10', status: 'Present', time: '08:55 AM', course: 'N/A' },
  { id: 6, name: 'Sarah Martinez', role: 'Junior Instructor', date: '2023-08-10', status: 'Excused', time: '00:00 AM', course: 'Computer Networks' },
];

const attendanceStats = [
  { label: 'Present', percentage: 82, color: 'bg-emerald-500' },
  { label: 'Absent', percentage: 7, color: 'bg-red-500' },
  { label: 'Late', percentage: 8, color: 'bg-amber-500' },
  { label: 'Excused', percentage: 3, color: 'bg-blue-500' },
];

const Attendance = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <motion.h2 
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Attendance Tracking
            </motion.h2>
            <motion.p 
              className="text-slate-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Monitor faculty and student attendance
            </motion.p>
          </div>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button variant="outline" className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Today
            </Button>
            
            <Button className="bg-primary text-white">
              <CheckCircle size={16} className="mr-2" />
              Mark Attendance
            </Button>
          </motion.div>
        </div>
        
        {/* Search and filters */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or role..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <Button variant="outline" className="flex items-center shrink-0">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>
        </FadeIn>
        
        {/* Stats */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-3">
              <h3 className="font-semibold mb-6">Attendance Overview</h3>
              <div className="space-y-6">
                {attendanceStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{stat.label}</span>
                      <span className="text-sm text-slate-500">{stat.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${stat.color}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${stat.percentage}%` }}
                        transition={{ delay: 0.5 + (0.1 * index), duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Today's Summary</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-700">
                      <Users size={24} />
                    </div>
                    <p className="mt-2 text-2xl font-semibold">48</p>
                    <p className="text-sm text-slate-500">Total Faculty</p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-sm grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-medium text-emerald-600">82%</p>
                        <p className="text-slate-500">Present</p>
                      </div>
                      <div>
                        <p className="font-medium text-red-600">7%</p>
                        <p className="text-slate-500">Absent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </FadeIn>
        
        {/* Attendance Table */}
        <FadeIn delay={0.5}>
          <div className="glass rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold">Faculty Attendance</h3>
              <div className="flex items-center text-slate-500 text-sm">
                <Calendar size={16} className="mr-1.5" />
                August 10, 2023
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Check-in Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {attendanceData.map((record, index) => (
                    <motion.tr 
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-slate-600">
                              {record.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900">{record.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {record.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {record.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1.5 text-slate-400" />
                          {record.time}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing 6 of 48 faculty members
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
          </div>
        </FadeIn>
        
        {/* Additional Stats */}
        <FadeIn delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Attendance Trends</h3>
                <Button variant="outline" size="sm">
                  <BarChart size={16} className="mr-1.5" />
                  View Report
                </Button>
              </div>
              
              <div className="h-[200px] flex items-center justify-center">
                <p className="text-slate-500 text-sm">Attendance trend visualization will appear here</p>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Upcoming Classes</h3>
                <Button variant="outline" size="sm">
                  <Calendar size={16} className="mr-1.5" />
                  View Schedule
                </Button>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Introduction to Programming</p>
                      <div className="flex items-center mt-1 text-xs text-slate-500">
                        <Clock size={12} className="mr-1" />
                        10:30 AM - 12:00 PM
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-primary">Semester 1</p>
                      <p className="text-xs text-slate-500 mt-1">Room 101</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Attendance;
