"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Bell, Moon, Search, Sun } from "lucide-react";
import React from "react";
import HeaderMenu from "./Menu";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // In a real app, you would toggle the theme in your app context
  };

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between gap-4 bg-background">
      {isDesktop && (
        <div className="w-[280px] relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 max-w-[280px]"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute h-2 w-2 rounded-full bg-red-500 top-2 right-2" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <div className="border-l h-8 mx-2" />

        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
