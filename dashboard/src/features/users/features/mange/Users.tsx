import PageTitle from "@/components/ui-elements/PageTitle";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

import Link from "next/link";
import SearchFilter from "./components/SearchFilter";
import UsersTable from "./components/UsersTable";

const UsersContainer = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageTitle
            title="User Management"
            description=" Manage department users, roles and permissions"
          />

          <Button>
            <Link href={"/users/add"} className="gap-2 flex">
              <UserPlus size={16} className="mr-2" /> Add New User
            </Link>
          </Button>
        </div>

        {/* Search and filters */}
        <SearchFilter />

        {/* Users table */}
        <UsersTable />
      </div>
    </>
  );
};

export default UsersContainer;
