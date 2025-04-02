import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import React, { useState } from "react";

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Search and filters */}
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search students by name, roll number or email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <Button variant="outline" className="flex items-center shrink-0">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
