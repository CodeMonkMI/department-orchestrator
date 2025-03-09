import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Database } from "lucide-react";

const SystemContainer = () => {
  const { toast } = useToast();
  const handleSaveSystem = () => {
    toast({
      title: "System Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };
  return (
    <>
      <Card>
        <h2 className="text-xl font-semibold mb-6">System Settings</h2>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-medium">Department Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departmentName">Department Name</Label>
                <Input
                  id="departmentName"
                  defaultValue="Computer Science Department"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="institutionName">Institution Name</Label>
                <Input
                  id="institutionName"
                  defaultValue="University of Technology"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">Academic Calendar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentSemester">Current Semester</Label>
                <Select defaultValue="Fall2023">
                  <SelectTrigger id="currentSemester" className="mt-1">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall2023">Fall 2023</SelectItem>
                    <SelectItem value="Spring2024">Spring 2024</SelectItem>
                    <SelectItem value="Summer2024">Summer 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="semesterStartDate">Semester Start Date</Label>
                <Input
                  id="semesterStartDate"
                  type="date"
                  defaultValue="2023-09-01"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">Data Management</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" /> Export Department Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" /> Import Department Data
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveSystem}>Save System Settings</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SystemContainer;
