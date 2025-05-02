"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  useIsSidebarOpen,
  useSidebarActions,
} from "@/store/preference/PreferenceStore";
import { ChevronLeft, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "../data/SidebarMenu";

const Sidebar = () => {
  const collapsed: boolean = useIsSidebarOpen();
  const actions = useSidebarActions();

  const pathname = usePathname();

  const toggleSidebar = () => {
    actions.toggleSidebar();
  };

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
            {menuItems.map((item) => {
              const matched = item.isMatch
                ? item.isMatch(pathname)
                : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    {
                      "bg-sidebar-primary text-sidebar-primary-foreground":
                        matched,
                      "justify-center": collapsed,
                    }
                  )}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
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
