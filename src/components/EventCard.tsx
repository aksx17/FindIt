
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  type: string;
  imageUrl: string;
  isVirtual?: boolean;
  isBookmarked?: boolean;
  onBookmark?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  organizer,
  date,
  location,
  type,
  imageUrl,
  isVirtual = false,
  isBookmarked = false,
  onBookmark,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(id);
    }
  };

  return (
    <Link 
      to={`/events/${id}`}
      className={cn(
        "block rounded-lg overflow-hidden card-shadow hover-scale", 
        "bg-white dark:bg-gray-800 h-full"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-all duration-500", 
            imageLoaded ? "image-fade-in" : "opacity-0",
            isHovered ? "scale-105" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-md">
            {type}
          </span>
          {isVirtual && (
            <span className="px-2 py-1 text-xs font-medium bg-indigo-500/90 text-white rounded-md">
              Virtual
            </span>
          )}
        </div>
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
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
            className={isBookmarked ? "text-primary" : "text-gray-600 dark:text-gray-300"}
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{organizer}</p>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
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
            className="mr-1.5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="line-clamp-1">{date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
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
            className="mr-1.5"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="line-clamp-1">{location}</span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
