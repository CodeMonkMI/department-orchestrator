import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddCourse from "./pages/AddCourse";
import AddNewStudents from "./pages/AddNewStudents";
import AddUser from "./pages/AddUser";
import Appearance from "./pages/Appearance";
import AssignedCourses from "./pages/AssignedCourses";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import ProfilePage from "./pages/Profile";
import Reports from "./pages/Reports";
import Schedule from "./pages/Schedule";
import Security from "./pages/Security";
import SemesterView from "./pages/SemesterView";
import Students from "./pages/Students";
import System from "./pages/System";
import Users from "./pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/add" element={<AddCourse />} />
            <Route path="/semester/:semesterId" element={<SemesterView />} />
            <Route path="/assigned-courses" element={<AssignedCourses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<AddNewStudents />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/settings"
              element={<Navigate to={"/settings/appearance"} />}
            />
            <Route path="/settings/appearance" element={<Appearance />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="/settings/security" element={<Security />} />
            <Route path="/settings/system" element={<System />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
