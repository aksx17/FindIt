
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonCustom } from "./ui/button-custom";

interface FilterOption {
  id: string;
  label: string;
}

interface EventFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    eventType: [],
    location: [],
    dateRange: [],
  });

  const eventTypes: FilterOption[] = [
    { id: "hackathon", label: "Hackathon" },
    { id: "workshop", label: "Workshop" },
    { id: "conference", label: "Conference" },
    { id: "competition", label: "Competition" },
    { id: "webinar", label: "Webinar" },
    { id: "seminar", label: "Seminar" },
  ];

  const locations: FilterOption[] = [
    { id: "online", label: "Online" },
    { id: "in-person", label: "In-Person" },
    { id: "hybrid", label: "Hybrid" },
  ];

  const dateRanges: FilterOption[] = [
    { id: "today", label: "Today" },
    { id: "this-week", label: "This Week" },
    { id: "this-month", label: "This Month" },
    { id: "upcoming", label: "Upcoming" },
  ];

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      const categoryFilters = [...(prev[category] || [])];
      
      const index = categoryFilters.indexOf(value);
      if (index === -1) {
        categoryFilters.push(value);
      } else {
        categoryFilters.splice(index, 1);
      }
      
      updatedFilters[category] = categoryFilters;
      return updatedFilters;
    });
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedFilters({
      eventType: [],
      location: [],
      dateRange: [],
    });
  };

  const totalSelectedFilters = Object.values(selectedFilters).reduce(
    (sum, filters) => sum + filters.length,
    0
  );

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <ButtonCustom
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 w-full md:w-auto"
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
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filters</span>
            {totalSelectedFilters > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-primary text-white rounded-full">
                {totalSelectedFilters}
              </span>
            )}
          </ButtonCustom>

          {/* Filters dropdown */}
          <div
            className={cn(
              "absolute left-0 top-full z-30 mt-2 w-72 md:w-96 rounded-lg border border-border bg-card p-4 shadow-lg transition-all duration-200 transform origin-top",
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}
          >
            <div className="grid gap-6">
              <div>
                <h3 className="font-medium mb-2">Event Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedFilters.eventType.includes(type.id)}
                        onChange={() => toggleFilter("eventType", type.id)}
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((location) => (
                    <label
                      key={location.id}
                      className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedFilters.location.includes(location.id)}
                        onChange={() => toggleFilter("location", location.id)}
                      />
                      <span>{location.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Date Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  {dateRanges.map((range) => (
                    <label
                      key={range.id}
                      className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedFilters.dateRange.includes(range.id)}
                        onChange={() => toggleFilter("dateRange", range.id)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t">
                <ButtonCustom variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </ButtonCustom>
                <ButtonCustom variant="primary" size="sm" onClick={applyFilters}>
                  Apply Filters
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "all", label: "All Events" },
            { id: "hackathon", label: "Hackathons" },
            { id: "workshop", label: "Workshops" },
            { id: "conference", label: "Conferences" },
            { id: "competition", label: "Competitions" },
          ].map((category) => (
            <button
              key={category.id}
              className={cn(
                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                category.id === "all"
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
