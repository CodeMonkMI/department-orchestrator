import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarRange, Clock } from "lucide-react";
import DashboardMetrics from "./components/DashboardMetrics";
import Analysischarts from "./components/analysis-charts";
import RecentActivities from "./components/recent-activities";
import Tasks from "./components/tasks";

const DashboardContainer = () => {
  return (
    <>
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <PageTitle
            title=" Welcome back, Chief Instructor"
            description=" Here's what's happening in your department today."
          />

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

        <DashboardMetrics />

        {/* Charts and data visualization */}
        <Analysischarts />

        {/* Recent activity and tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentActivities />
          <Tasks />
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
