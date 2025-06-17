
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import SearchBar from "@/components/SearchBar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { EventsApi, Event } from "@/services/api";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Build filters object including search query
        const filters: Record<string, string | string[]> = { ...activeFilters };
        if (searchQuery) {
          filters.search = searchQuery;
        }
        
        const response = await EventsApi.getAll(filters);
        if (response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        // Add a small delay to show loading state
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchEvents();
  }, [searchQuery, activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };

  const handleBookmark = (id: string) => {
    setBookmarkedEvents((prev) => {
      if (prev.includes(id)) {
        return prev.filter((eventId) => eventId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would use pagination
      // For now, we'll just simulate loading more events
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      console.error("Error loading more events:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-6 mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Discover Events</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <SearchBar onSearch={handleSearch} />
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{events.length}</span> events found
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-6 mx-auto">
            <EventFilters onFilterChange={handleFilterChange} />

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      organizer={event.organizer}
                      date={event.date}
                      location={event.location}
                      type={event.type}
                      imageUrl={event.imageUrl}
                      isVirtual={event.isVirtual}
                      isBookmarked={bookmarkedEvents.includes(event.id)}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <ButtonCustom 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleLoadMore}
                    isLoading={loading}
                  >
                    {!loading && (
                      <>
                        <span>Load More</span>
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
                          <polyline points="1 4 1 10 7 10"></polyline>
                          <polyline points="23 20 23 14 17 14"></polyline>
                          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                        </svg>
                      </>
                    )}
                  </ButtonCustom>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
