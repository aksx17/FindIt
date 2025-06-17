
import { Event } from "@/services/api";
import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Represents a source that can be scraped for events
 */
export interface ScraperSource {
  name: string;
  url: string;
  logo?: string; 
  isEnabled: boolean;
}

// List of available scraper sources
export const scraperSources: ScraperSource[] = [
  {
    name: "Devfolio",
    url: "https://devfolio.co/hackathons",
    logo: "https://assets.devfolio.co/company/e19b9016c0f8469e9d09b7312d3a63d7/assets/favicons/favicon-32x32.png",
    isEnabled: true,
  },
  {
    name: "MLH",
    url: "https://mlh.io/seasons/2023/events",
    logo: "https://mlh.io/assets/logos/mlh-logo-color-dark-29d0396cab07f7f4f28e9deeb03c77b2c2e1ca3f76bb69e834aceb57a1fd5322.svg",
    isEnabled: true,
  },
  {
    name: "Unstop",
    url: "https://unstop.com/hackathons",
    logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding/unstop-icon-192.png",
    isEnabled: true,
  },
  {
    name: "HackerEarth",
    url: "https://www.hackerearth.com/challenges/hackathon/",
    logo: "https://static-fastly.hackerearth.com/static/hackerearth/images/logo/HE_logo.png",
    isEnabled: true,
  },
];

/**
 * Scrapes events from Unstop
 * Note: This is a frontend implementation that would generally be done on the backend
 */
export const scrapeUnstopEvents = async (): Promise<Event[]> => {
  try {
    // In a real implementation, this would be a backend API endpoint
    // that uses puppeteer/cheerio to scrape Unstop
    console.log("Scraping Unstop events...");
    
    // For frontend demo, we'll use a mock implementation
    // In a real-world scenario, this would be:
    // 1. A serverless function or backend API that uses puppeteer
    // 2. Fetches the HTML content of the Unstop page
    // 3. Uses cheerio or similar to parse the HTML
    // 4. Extracts event information
    // 5. Stores it in MongoDB
    
    // Mock data for Unstop events
    return [
      {
        id: "unstop-1",
        title: "Unstop Hackathon Challenge 2024",
        organizer: "Unstop",
        date: "Feb 15-17, 2024",
        location: "Online",
        type: "Hackathon",
        imageUrl: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/65acd58ddbcbe_unstop-banner.png",
        isVirtual: true,
        description: "Join the Unstop Hackathon Challenge to showcase your skills and win exciting prizes.",
        registrationDeadline: "Feb 10, 2024",
        registrationUrl: "https://unstop.com/hackathons/sample-1",
        skills: ["Web Development", "Data Science", "AI"],
        eligibility: "Open to all college students and recent graduates",
        prizes: "₹50,000 in cash prizes, internship opportunities",
        source: "Unstop",
      },
      {
        id: "unstop-2",
        title: "Unstop Data Science Championship",
        organizer: "Unstop Partners",
        date: "Mar 5-10, 2024",
        location: "Online",
        type: "Competition",
        imageUrl: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/65b03e5a6cabe_data-science-banner.jpg",
        isVirtual: true,
        description: "Test your data science skills in this intensive online competition.",
        registrationDeadline: "Mar 1, 2024",
        registrationUrl: "https://unstop.com/competitions/sample-2",
        skills: ["Python", "Machine Learning", "Data Analysis"],
        eligibility: "Open to all",
        prizes: "₹30,000 in cash prizes, mentorship sessions",
        source: "Unstop",
      },
    ];
  } catch (error) {
    console.error("Error scraping Unstop events:", error);
    return [];
  }
};

/**
 * Scrapes events from a specific source
 */
export const scrapeEventsFromSource = async (source: ScraperSource): Promise<Event[]> => {
  console.log(`Scraping events from ${source.name} at ${source.url}`);
  
  // Special handling for Unstop
  if (source.name === "Unstop") {
    return scrapeUnstopEvents();
  }
  
  // For other sources, use mock data
  return [
    {
      id: `${source.name.toLowerCase()}-1`,
      title: `${source.name} Hackathon 2023`,
      organizer: source.name,
      date: "Dec 18-20, 2023",
      location: "Online",
      type: "Hackathon",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isVirtual: true,
      source: source.name,
      description: `This is a mock event from ${source.name}. In a real implementation, this data would be scraped from the source website.`,
    },
    {
      id: `${source.name.toLowerCase()}-2`,
      title: `${source.name} Workshop Series`,
      organizer: source.name,
      date: "Jan 10-15, 2024",
      location: "New York, NY",
      type: "Workshop",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isVirtual: false,
      source: source.name,
      description: `This is a mock event from ${source.name}. In a real implementation, this data would be scraped from the source website.`,
    },
  ];
};

/**
 * Scrapes events from all enabled sources
 */
export const scrapeEventsFromAllSources = async (): Promise<Event[]> => {
  const enabledSources = scraperSources.filter(source => source.isEnabled);
  const results = await Promise.all(
    enabledSources.map(source => scrapeEventsFromSource(source))
  );
  
  // Flatten the array of arrays
  return results.flat();
};
