
import React from 'react';
import { Users, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import StatCard from '../ui-elements/StatCard';
import { formatNumber } from '@/lib/utils';

const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Faculty"
        value={formatNumber(48)}
        icon={Users}
        change="+2 this month"
        positive={true}
        delay={0.1}
      />
      
      <StatCard
        title="Total Students"
        value={formatNumber(1254)}
        icon={GraduationCap}
        change="+128 this semester"
        positive={true}
        delay={0.2}
      />
      
      <StatCard
        title="Active Courses"
        value={formatNumber(32)}
        icon={BookOpen}
        change="98% completion rate"
        positive={true}
        delay={0.3}
      />
      
      <StatCard
        title="Current Semester"
        value="Fall 2023"
        icon={Calendar}
        change="Ends in 45 days"
        positive={false}
        delay={0.4}
      />
    </div>
  );
};

export default DashboardMetrics;
