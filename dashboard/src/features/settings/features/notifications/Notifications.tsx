import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const NotificationsContainer = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <>
      <Card>
        <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">SMS Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </p>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>

          <div className="pt-6">
            <h3 className="text-base font-medium mb-3">Notification Types</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifySchedule"
                  defaultChecked
                  className="mr-2"
                />
                <Label htmlFor="notifySchedule">Schedule Changes</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyAnnouncements"
                  defaultChecked
                  className="mr-2"
                />
                <Label htmlFor="notifyAnnouncements">
                  Department Announcements
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyUpdates"
                  defaultChecked
                  className="mr-2"
                />
                <Label htmlFor="notifyUpdates">System Updates</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveNotifications}>
              Save Notification Settings
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NotificationsContainer;
