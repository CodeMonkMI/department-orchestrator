import {
  BookOpen,
  Calendar as CalendarIcon,
  FileText,
  GraduationCap,
  Home,
  Settings,
  Users,
} from "lucide-react";

type MenuItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  isMatch?: (pathname: string) => boolean;
};

export const menuItems: MenuItem[] = [
  { path: "/dashboard", name: "Dashboard", icon: <Home size={20} /> },
  {
    path: "/semester",
    name: "Semesters",
    icon: <BookOpen size={20} />,
  },
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
