import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui-elements/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Settings2, 
  Bell, 
  ShieldCheck, 
  Palette, 
  Database, 
  User, 
  School, 
  Save,
  MoonStar,
  Sun
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated.",
    });
  };
  
  const handleSaveSystem = () => {
    toast({
      title: "System Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheck size={16} /> Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings2 size={16} /> System
          </TabsTrigger>
        </TabsList>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Theme Preference</h3>
                  <p className="text-sm text-muted-foreground">Select how the application appears to you</p>
                </div>
                <Select 
                  value={theme} 
                  onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
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
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">SMS Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
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
                    <input type="checkbox" id="notifySchedule" defaultChecked className="mr-2" />
                    <Label htmlFor="notifySchedule">Schedule Changes</Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="notifyAnnouncements" defaultChecked className="mr-2" />
                    <Label htmlFor="notifyAnnouncements">Department Announcements</Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="notifyUpdates" defaultChecked className="mr-2" />
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
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-medium">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      className="mt-1" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6">
                <div>
                  <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={setTwoFactorAuth} 
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveSecurity}>
                  Save Security Settings
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* System Tab */}
        <TabsContent value="system">
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
                <Button onClick={handleSaveSystem}>
                  Save System Settings
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default SettingsPage;
