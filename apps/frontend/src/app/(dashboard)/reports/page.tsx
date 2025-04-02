import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Download,
  FileText,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

const Reports = () => {
  return (
    <div>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <p className="text-slate-500 mt-1">
              Generate and view department reports
            </p>
          </div>

          <div>
            <Button className="bg-primary text-white">
              <FileText size={16} className="mr-2" />
              Generate New Report
            </Button>
          </div>
        </div>

        {/* Report Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Report Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportCategories.map((category, index) => (
              <div
                key={category.id}
                className="glass rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start">
                  <div
                    className={`h-10 w-10 rounded-lg ${category.color} bg-opacity-20 flex items-center justify-center mr-4`}
                  >
                    <category.icon
                      size={20}
                      className={`text-${category.color.split("-")[1]}-600`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {category.count} reports available
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <div className="glass rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold">Recent Reports</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Report Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Date Generated
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Downloads
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {recentReports.map((report, index) => (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={18} className="text-slate-400 mr-3" />
                          <div className="text-sm font-medium text-slate-900">
                            {report.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {report.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <div className="flex items-center">
                          <Calendar
                            size={16}
                            className="mr-1.5 text-slate-400"
                          />
                          {new Date(report.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {report.downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                        >
                          <Download size={16} className="mr-1.5" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200">
              <Button variant="outline" size="sm" className="w-full">
                View All Reports
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Faculty Performance</h4>
                <Button variant="outline" size="sm">
                  <TrendingUp size={16} className="mr-1.5" />
                  View Trends
                </Button>
              </div>

              <div className="h-[250px] flex items-center justify-center">
                <BarChart size={120} className="text-slate-300" />
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Student Distribution</h4>
                <Button variant="outline" size="sm">
                  <PieChart size={16} className="mr-1.5" />
                  View Details
                </Button>
              </div>

              <div className="h-[250px] flex items-center justify-center">
                <PieChart size={120} className="text-slate-300" />
              </div>
            </Card>
          </div>
        </div>

        {/* Custom Reports */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Custom Report Generator</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Generate custom reports based on specific parameters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Report Type
                </label>
                <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20">
                  <option>Faculty Performance</option>
                  <option>Student Progress</option>
                  <option>Course Analytics</option>
                  <option>Attendance Summary</option>
                  <option>Resource Utilization</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Time Period
                </label>
                <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20">
                  <option>Current Semester</option>
                  <option>Previous Semester</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>Custom Date Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Format
                </label>
                <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                  <option>HTML</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-primary text-white">Generate Report</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;

const reportCategories = [
  {
    id: 1,
    name: "Faculty Performance",
    icon: Users,
    count: 5,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Student Progress",
    icon: GraduationCap,
    count: 8,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Course Analytics",
    icon: BookOpen,
    count: 6,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Attendance Reports",
    icon: ClipboardCheck,
    count: 4,
    color: "bg-amber-500",
  },
  {
    id: 5,
    name: "Department Metrics",
    icon: BarChart,
    count: 3,
    color: "bg-red-500",
  },
  {
    id: 6,
    name: "Resource Utilization",
    icon: TrendingUp,
    count: 2,
    color: "bg-teal-500",
  },
];

const recentReports = [
  {
    id: 1,
    name: "Faculty Performance Q3 2023",
    category: "Faculty Performance",
    date: "2023-08-01",
    downloads: 24,
  },
  {
    id: 2,
    name: "Student Progress Report - Semester 5",
    category: "Student Progress",
    date: "2023-07-25",
    downloads: 48,
  },
  {
    id: 3,
    name: "Course Completion Analysis",
    category: "Course Analytics",
    date: "2023-07-18",
    downloads: 35,
  },
  {
    id: 4,
    name: "Monthly Attendance Summary",
    category: "Attendance Reports",
    date: "2023-07-05",
    downloads: 62,
  },
];
