import Card from "@/components/ui-elements/Card";
import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import UserForm from "./components/UserForm";

const AddUserContainer = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle
          title="Add New User"
          description="Create a new user account"
        />
        <Button variant="outline">
          <Link to={"/users"} className="gap-2 flex">
            <ArrowLeft size={16} /> Back to Users
          </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <UserPlus size={24} />
          </div>
          <h2 className="text-xl font-semibold">User Information</h2>
        </div>

        <UserForm />
      </Card>
    </>
  );
};

export default AddUserContainer;
