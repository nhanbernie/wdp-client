"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SearchBar() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
            theme === "dark" ? "text-gray-400" : "text-black"
          }`}
          size={20}
        />
        <Input
          placeholder="Searching for materials..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-10 rounded-2xl placeholder:text-[0.8rem] ${
            theme === "dark"
              ? "placeholder:text-gray-400 focus-visible:ring-[var(--primary)]"
              : "placeholder:text-black"
          }`}
        />
      </div>
    </div>
  );
}
