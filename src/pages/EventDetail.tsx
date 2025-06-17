
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import EventCard from "@/components/EventCard";
import { cn } from "@/lib/utils";

// Mock event data
const mockEventDetails = {
  id: "1",
  title: "Global Tech Hackathon 2023",
  organizer: "TechCrunch",
  date: "Dec 15-17, 2023",
  startTime: "9:00 AM",
  endTime: "6:00 PM",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
  type: "Hackathon",
  isVirtual: false,
  tags: ["Technology", "Coding", "Innovation", "Networking"],
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  description: `
    <p>Join us for the Global Tech Hackathon 2023, where the brightest minds in technology come together to solve real-world problems. This 48-hour event brings together developers, designers, and entrepreneurs from around the world to collaborate, innovate, and build amazing projects.</p>
    
    <p>Whether you're a seasoned developer or just starting your coding journey, this hackathon offers something for everyone. Work on challenges in AI, blockchain, climate tech, or healthcare, and compete for prizes worth over $50,000.</p>
    
    <h3>What to Expect:</h3>
    <ul>
      <li>Industry mentors from top tech companies</li>
      <li>Workshops and tech talks</li>
      <li>Networking opportunities</li>
      <li>Free food and refreshments</li>
      <li>Amazing prizes for winning teams</li>
    </ul>
    
    <h3>Schedule:</h3>
    <p><strong>Day 1 (Dec 15):</strong> Opening ceremony, team formation, and kickoff</p>
    <p><strong>Day 2 (Dec 16):</strong> Full day of hacking, workshops, and mentoring</p>
    <p><strong>Day 3 (Dec 17):</strong> Project submission, demos, judging, and awards</p>
    
    <h3>Requirements:</h3>
    <p>Participants should bring their own laptops and necessary equipment. All skill levels are welcome!</p>
  `,
  organizedBy: {
    name: "TechCrunch",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
  },
  deadline: "Dec 10, 2023",
  registrationFee: "Free",
  prizes: "$50,000 in cash and prizes",
  website: "https://example.com/global-tech-hackathon",
};

// Mock similar events
const similarEvents = [
  {
    id: "2",
    title: "AI Summit Workshop Series",
    organizer: "DeepMind",
    date: "Nov 10, 2023",
    location: "Online",
    type: "Workshop",
    imageUrl: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isVirtual: true,
  },
  {
    id: "3",
    title: "International Programming Competition",
    organizer: "CodeForces",
    date: "Jan 5-7, 2024",
    location: "Tokyo, Japan",
    type: "Competition",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isVirtual: false,
  },
  {
    id: "6",
    title: "Mobile App Innovation Contest",
    organizer: "Google",
    date: "Jan 15, 2024",
    location: "Berlin, Germany",
    type: "Competition",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    isVirtual: false,
  },
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(mockEventDetails);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSimilarEventBookmark = (id: string) => {
    setBookmarkedEvents((prev) => {
      if (prev.includes(id)) {
        return prev.filter((eventId) => eventId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12">
          <div className="container px-6 mx-auto">
            <div className="animate-pulse">
              <div className="h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6" />
                </div>
                <div>
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-6 mx-auto">
          {/* Hero Section */}
          <div className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-96">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            <img
              src={event.imageUrl}
              alt={event.title}
              className={cn(
                "w-full h-full object-cover",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-sm font-medium bg-primary text-white rounded-full">
                  {event.type}
                </span>
                {event.isVirtual && (
                  <span className="px-3 py-1 text-sm font-medium bg-indigo-600 text-white rounded-full">
                    Virtual
                  </span>
                )}
                <span className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded-full">
                  Registration Open
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <p className="text-white/80 text-lg">
                Organized by {event.organizer}
              </p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center gap-6">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{event.startTime} - {event.endTime}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{event.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBookmark}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-colors",
                  isBookmarked
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isBookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary transition-colors">
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
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="md:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <div dangerouslySetInnerHTML={{ __html: event.description }} />
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <h3 className="text-lg font-medium w-full mb-2">Tags:</h3>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Date and Time
                      </h4>
                      <p className="text-gray-900 dark:text-white">{event.date}, {event.startTime} - {event.endTime}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Location
                      </h4>
                      <p className="text-gray-900 dark:text-white">{event.location}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{event.address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Registration Deadline
                      </h4>
                      <p className="text-gray-900 dark:text-white">{event.deadline}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Registration Fee
                      </h4>
                      <p className="text-gray-900 dark:text-white">{event.registrationFee}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Prizes
                      </h4>
                      <p className="text-gray-900 dark:text-white">{event.prizes}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <ButtonCustom variant="primary" className="w-full">
                      Register Now
                    </ButtonCustom>
                  </div>
                  <div className="mt-4">
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-primary hover:underline"
                    >
                      Visit Official Website
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Organized By</h3>
                  <div className="flex items-center mb-4">
                    <img
                      src={event.organizedBy.logo}
                      alt={event.organizedBy.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <h4 className="font-medium">{event.organizedBy.name}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {event.organizedBy.description}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-block text-primary hover:underline"
                  >
                    View Organizer Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Events */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Similar Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarEvents.map((event) => (
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
                  onBookmark={handleSimilarEventBookmark}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
