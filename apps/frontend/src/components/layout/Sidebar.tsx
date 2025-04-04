"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronLeft,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: <Home size={20} /> },
    {
      path: "/courses",
      name: "Courses",
      icon: <BookOpen size={20} />,
    },
    {
      path: "/students",
      name: "Students",
      icon: <GraduationCap size={20} />,
    },
    { path: "/users", name: "Users", icon: <Users size={20} /> },
    {
      path: "/calender",
      name: "Calendar",
      icon: <CalendarIcon size={20} />,
    },
    {
      path: "/schedule",
      name: "Schedule",
      icon: <CalendarIcon size={20} />,
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <FileText size={20} />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-40",
        collapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "h-16 flex items-center px-4 border-b border-sidebar-border",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <div className="font-semibold text-xl text-sidebar-foreground">
              CS Dept
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.path
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center"
                )}
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "justify-center"
            )}
            onClick={() => console.log("Logout")}
          >
            <LogOut size={20} className="mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
