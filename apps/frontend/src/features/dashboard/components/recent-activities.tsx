import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
const RecentActivities = () => {
  return (
    <>
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
            <div
              key={item}
              className="flex items-start p-3 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Users size={16} className="text-primary" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">New instructor onboarded</p>
                <p className="text-xs text-slate-500 mt-1">
                  Dr. Sarah Johnson joined the Computer Science department
                </p>
              </div>

              <span className="text-xs text-slate-400">2h ago</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default RecentActivities;
