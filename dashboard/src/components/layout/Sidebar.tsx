
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Users, BookOpen, Calendar as CalendarIcon, 
  FileText, Settings, LogOut, Menu, ChevronLeft,
  BookOpenCheck, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const location = useLocation();
  
  React.useEffect(() => {
    if (!isDesktop) {
      setCollapsed(true);
    }
  }, [isDesktop]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarVariants = {
    expanded: { width: '250px' },
    collapsed: { width: '80px' }
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/courses', name: 'Courses', icon: <BookOpen size={20} /> },
    { path: '/assigned-courses', name: 'Assigned Courses', icon: <BookOpenCheck size={20} /> },
    { path: '/students', name: 'Students', icon: <GraduationCap size={20} /> },
    { path: '/users', name: 'Users', icon: <Users size={20} /> },
    { path: '/calendar', name: 'Calendar', icon: <CalendarIcon size={20} /> },
    { path: '/reports', name: 'Reports', icon: <FileText size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial={collapsed ? 'collapsed' : 'expanded'}
      animate={collapsed ? 'collapsed' : 'expanded'}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-40",
        collapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "h-16 flex items-center px-4 border-b border-sidebar-border",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-semibold text-xl text-sidebar-foreground"
            >
              CS Dept
            </motion.div>
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
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center"
                )}
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
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
            onClick={() => console.log('Logout')}
          >
            <LogOut size={20} className="mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
