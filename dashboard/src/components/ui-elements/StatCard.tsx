import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
  className?: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  positive,
  className,
  delay = 0,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-6 glass hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className="mt-2 text-2xl font-semibold">{value}</h4>

          {change && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  "text-xs font-medium",
                  positive ? "text-emerald-600" : "text-red-600"
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>

        <div className="p-2 rounded-lg bg-primary/10">
          <Icon size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
