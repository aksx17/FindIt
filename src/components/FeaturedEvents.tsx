
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { ButtonCustom } from "./ui/button-custom";
import { EventsApi, Event } from "@/services/api";

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await EventsApi.getFeaturedEvents();
        if (response.data) {
          setFeaturedEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching featured events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

  const handleBookmark = (id: string) => {
    setBookmarkedEvents((prev) => {
      if (prev.includes(id)) {
        return prev.filter((eventId) => eventId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Events</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover the latest opportunities curated for you - from hackathons to workshops and competitions.
            </p>
          </div>
          <Link to="/events" className="mt-6 md:mt-0">
            <ButtonCustom variant="outline">
              View All Events
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
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </ButtonCustom>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
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
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
