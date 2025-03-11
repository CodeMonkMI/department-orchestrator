import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 px-4">
      <div className="max-w-md w-full glass rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
            <FileQuestion size={48} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">404</h1>

        <p className="text-xl font-medium text-slate-800 mb-2">
          Page Not Found
        </p>

        <p className="text-slate-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div>
          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
