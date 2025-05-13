"use client";
import Card from "@/components/ui-elements/Card";
import { Badge } from "@/components/ui/badge";
import { useSemesterQuery } from "@/lib/api/semesterApi";
import Link from "next/link";

const Semester = () => {
  const { data: semesters, isLoading, isError, error } = useSemesterQuery();

  if (isLoading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }
  return (
    <div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Semesters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {semesters!.map((semester) => (
            <Link
              href={`/semester/semester-${semester.id}`}
              key={semester.id}
              className="p-4 rounded-lg border bg-card text-card-foreground hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{semester.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">6 Month</p>
                </div>
                <Badge variant="secondary">0 Courses</Badge>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Semester;
