
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, CalendarRange, Clock, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui-elements/Card';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <motion.h2 
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Welcome back, Chief Instructor
            </motion.h2>
            <motion.p 
              className="text-slate-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Here's what's happening in your department today.
            </motion.p>
          </div>
          
          <motion.div 
            className="mt-4 md:mt-0 flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button variant="outline" size="sm" className="flex items-center">
              <CalendarRange className="mr-2 h-4 w-4" />
              July - December 2023
            </Button>
            
            <Button size="sm" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Current Semester
            </Button>
          </motion.div>
        </div>
        
        {/* Metrics cards */}
        <section>
          <DashboardMetrics />
        </section>
        
        {/* Charts and data visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold">Department Performance</h3>
                <p className="text-sm text-slate-500">Faculty and student metrics</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View Report
              </Button>
            </div>
            
            <div className="h-[300px] flex items-center justify-center">
              <BarChart3 size={120} className="text-slate-300" />
              <p className="text-slate-400 text-sm ml-4">Interactive performance chart will appear here</p>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold">Course Distribution</h3>
                <p className="text-sm text-slate-500">By department</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Details
              </Button>
            </div>
            
            <div className="h-[300px] flex items-center justify-center">
              <PieChart size={120} className="text-slate-300" />
            </div>
          </Card>
        </div>
        
        {/* Recent activity and tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold">Recent Activity</h3>
                <p className="text-sm text-slate-500">Latest department updates</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Users size={16} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium">New instructor onboarded</p>
                    <p className="text-xs text-slate-500 mt-1">Dr. Sarah Johnson joined the Computer Science department</p>
                  </div>
                  
                  <span className="text-xs text-slate-400">2h ago</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold">Upcoming Tasks</h3>
                <p className="text-sm text-slate-500">Next 7 days</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Add Task
              </Button>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-3 border border-slate-200 rounded-lg">
                  <p className="text-sm font-medium">Review semester course allocation</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Due in 2 days</span>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <ArrowUpRight size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Tasks
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
