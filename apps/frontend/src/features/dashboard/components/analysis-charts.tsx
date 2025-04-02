import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart } from "lucide-react";
const Analysischarts = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-semibold">Department Performance</h3>
              <p className="text-sm text-slate-500">
                Faculty and student metrics
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View Report
            </Button>
          </div>

          <div className="h-[300px] flex items-center justify-center">
            <BarChart3 size={120} className="text-slate-300" />
            <p className="text-slate-400 text-sm ml-4">
              Interactive performance chart will appear here
            </p>
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
    </div>
  );
};

export default Analysischarts;
