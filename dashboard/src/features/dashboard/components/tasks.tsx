import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const Tasks = () => {
  return (
    <>
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
              <p className="text-sm font-medium">
                Review semester course allocation
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                  Due in 2 days
                </span>
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
    </>
  );
};

export default Tasks;
