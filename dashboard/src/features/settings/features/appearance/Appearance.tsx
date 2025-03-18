"use client";
import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MoonStar, Sun } from "lucide-react";
import { useState } from "react";
const AppearanceContainer = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const { toast } = useToast();

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  return (
    <>
      <Card>
        <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Theme Preference</h3>
              <p className="text-sm text-muted-foreground">
                Select how the application appears to you
              </p>
            </div>
            <Select
              value={theme}
              onValueChange={(value) =>
                setTheme(value as "light" | "dark" | "system")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light" className="flex items-center gap-2">
                  <Sun size={16} /> Light
                </SelectItem>
                <SelectItem value="dark" className="flex items-center gap-2">
                  <MoonStar size={16} /> Dark
                </SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">Text Size</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="textSizeSmall">Small</Label>
                <div className="mt-2">
                  <input
                    type="radio"
                    id="textSizeSmall"
                    name="textSize"
                    className="mr-2"
                  />
                  <span className="text-sm">Aa</span>
                </div>
              </div>
              <div>
                <Label htmlFor="textSizeMedium">Medium</Label>
                <div className="mt-2">
                  <input
                    type="radio"
                    id="textSizeMedium"
                    name="textSize"
                    defaultChecked
                    className="mr-2"
                  />
                  <span className="text-base">Aa</span>
                </div>
              </div>
              <div>
                <Label htmlFor="textSizeLarge">Large</Label>
                <div className="mt-2">
                  <input
                    type="radio"
                    id="textSizeLarge"
                    name="textSize"
                    className="mr-2"
                  />
                  <span className="text-lg">Aa</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveAppearance}>
              Save Appearance Settings
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AppearanceContainer;
