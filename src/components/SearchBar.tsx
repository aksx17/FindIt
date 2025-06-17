
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className,
  placeholder = "Search for events...",
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-md transition-all duration-300 group",
        isFocused ? "scale-[1.01]" : "scale-100",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center w-full overflow-hidden rounded-full transition-all duration-300",
          isFocused
            ? "bg-white shadow-lg dark:bg-gray-800"
            : "bg-white/80 shadow-md dark:bg-gray-800/80"
        )}
      >
        <span className="absolute left-4 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform duration-300",
              isFocused ? "scale-110" : "scale-100"
            )}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-12 pl-11 pr-12 bg-transparent border-none outline-none text-base"
        />
        {query.length > 0 && (
          <button
            type="button"
            className="absolute right-12 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-0 h-full px-4 text-white bg-primary hover:bg-primary/90 rounded-r-full transition-colors"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
