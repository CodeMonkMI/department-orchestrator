import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 px-4">
      <div className="max-w-3xl w-full glass rounded-2xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
            Computer Science Department
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Department Management System
          </h1>
        </div>

        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          A comprehensive platform for managing faculty roles, semester
          planning, course management, and department resources.
        </p>

        <div>
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition-all"
          >
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-slate-500 mt-4">
            Access the department management portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
