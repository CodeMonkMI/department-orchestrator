"use client";
import Card from "@/components/ui-elements/Card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { semesterData } from "@/features/course/data/semester";
import { Search } from "lucide-react";
import Link from "next/link";

const Semester = () => {
  return (
    <div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Semesters</h2>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {semesterData.map((semester) => (
            <Link
              href={`/semester/semester-${semester.id}`}
              key={semester.id}
              className="p-4 rounded-lg border bg-card text-card-foreground hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{semester.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {semester.period}
                  </p>
                </div>
                <Badge variant="secondary">{semester.courses} Courses</Badge>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Semester;
