"use client";
import Card from "@/components/ui-elements/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const SecurityContainer = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated.",
    });
  };

  return (
    <>
      <Card>
        <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-medium">Change Password</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="mt-1" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <div>
              <h3 className="text-base font-medium">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SecurityContainer;
