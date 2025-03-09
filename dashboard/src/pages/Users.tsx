import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Filter, MoreHorizontal, CheckCircle, XCircle, BookCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import FadeIn from '@/components/animations/FadeIn';

const roleColors: Record<string, string> = {
  'Chief Instructor': 'bg-blue-100 text-blue-800',
  'Instructor': 'bg-emerald-100 text-emerald-800',
  'Junior Instructor': 'bg-purple-100 text-purple-800',
  'Craft Instructor': 'bg-amber-100 text-amber-800',
  'Staff': 'bg-slate-100 text-slate-800',
  'Student': 'bg-teal-100 text-teal-800',
};

const users = [
  { id: 1, name: 'Dr. Michael Smith', role: 'Chief Instructor', email: 'michael.smith@example.com', status: 'Active', department: 'Computer Science' },
  { id: 2, name: 'Prof. Emily Johnson', role: 'Instructor', email: 'emily.johnson@example.com', status: 'Active', department: 'Computer Science' },
  { id: 3, name: 'James Wilson', role: 'Junior Instructor', email: 'james.wilson@example.com', status: 'Active', department: 'Computer Science' },
  { id: 4, name: 'Lisa Brown', role: 'Craft Instructor', email: 'lisa.brown@example.com', status: 'Active', department: 'Computer Science' },
  { id: 5, name: 'Robert Davis', role: 'Staff', email: 'robert.davis@example.com', status: 'Active', department: 'Computer Science' },
  { id: 6, name: 'Sarah Martinez', role: 'Junior Instructor', email: 'sarah.martinez@example.com', status: 'Inactive', department: 'Computer Science' },
  { id: 7, name: 'John Thompson', role: 'Student', email: 'john.thompson@example.com', status: 'Active', department: 'Computer Science' },
  { id: 8, name: 'Angela White', role: 'Instructor', email: 'angela.white@example.com', status: 'Active', department: 'Computer Science' },
];

const Users = () => {
  const navigate = useNavigate();
  
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
              User Management
            </motion.h2>
            <motion.p 
              className="text-slate-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Manage department users, roles and permissions
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex gap-2"
          >
            <Button 
              variant="outline"
              onClick={() => navigate('/assigned-courses')}
            >
              <BookCheck size={16} className="mr-2" />
              Assigned Courses
            </Button>
            
            <Button 
              className="bg-primary text-white"
              onClick={() => navigate('/users/add')}
            >
              <UserPlus size={16} className="mr-2" />
              Add New User
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
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <Button variant="outline" className="flex items-center shrink-0">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>
        </FadeIn>
        
        {/* Users table */}
        <FadeIn delay={0.4}>
          <div className="glass rounded-xl overflow-hidden">
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
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {users.map((user, index) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-slate-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          {user.status === 'Active' ? (
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Users;
