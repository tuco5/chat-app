"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const title = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <Button
      suppressHydrationWarning
      onClick={toggleTheme}
      className="relative flex h-9 w-9 rounded-full cursor-pointer border-2"
      size="icon"
      variant="ghost"
      title={title}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span suppressHydrationWarning className="sr-only">
        {title}
      </span>
    </Button>
  );
}
