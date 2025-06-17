import axios from "axios";

// API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User models
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

// Event models
export interface Event {
  id?: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  type: string;
  imageUrl?: string;
  isVirtual: boolean;
  description?: string;
  registrationDeadline?: string;
  registrationUrl?: string;
  skills?: string[];
  eligibility?: string;
  prizes?: string;
  source?: string;
  createdBy?: string;
}

// Contact model
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Scraper model
export interface ScraperSource {
  name: string;
  url: string;
  logo?: string;
  isEnabled: boolean;
  lastScraped?: string;
}

// Auth API
export const AuthApi = {
  signIn: async (credentials: SignInCredentials) => {
    try {
      const response = await api.post("/auth/signin", credentials);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to sign in" };
    }
  },

  signUp: async (credentials: SignUpCredentials) => {
    try {
      const response = await api.post("/auth/signup", credentials);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Sign up error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to sign up" };
    }
  },

  googleSignIn: async (token: string) => {
    try {
      const response = await api.post("/auth/google", { token });
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Google sign in error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to sign in with Google" };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Get profile error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to get profile" };
    }
  },
};

// Events API
export const EventsApi = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get("/events", { params: filters });
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Get events error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to fetch events" };
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/events/${id}`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Get event error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to fetch event" };
    }
  },
  getFeaturedEvents: async () => {
    try {
      const response = await api.get("/events/featured");
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Get featured events error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to fetch featured events" };
    }
  },
  create: async (event: Event) => {
    try {
      const response = await api.post("/events", event);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Create event error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to create event" };
    }
  },

  update: async (id: string, event: Partial<Event>) => {
    try {
      const response = await api.put(`/events/${id}`, event);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Update event error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to update event" };
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/events/${id}`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Delete event error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to delete event" };
    }
  },

  search: async (query: string) => {
    try {
      const response = await api.get(`/events/search/${query}`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Search events error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to search events" };
    }
  },
};

// Scraper API
export const ScraperApi = {
  getSources: async () => {
    try {
      const response = await api.get("/scrapers/sources");
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Get scraper sources error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to fetch scraper sources" };
    }
  },

  toggleSource: async (name: string, isEnabled: boolean) => {
    try {
      const response = await api.put(`/scrapers/sources/${name}`, { isEnabled });
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Toggle scraper source error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to update scraper source" };
    }
  },

  scrapeSources: async (sources: string[]) => {
    try {
      const results = await Promise.allSettled(
        sources.map((source) =>
          api.post(`/scrapers/scrape/${source}`).then(res => res.data)
        )
      );
  
      const data = results
        .filter((result): result is PromiseFulfilledResult<any> => result.status === "fulfilled")
        .map((result) => result.value);
  
      const errors = results
        .filter((result): result is PromiseRejectedResult => result.status === "rejected")
        .map((result, index) => ({
          source: sources[index],
          message: result.reason?.response?.data?.message || result.reason?.message || "Unknown error",
        }));
  
      return { data, error: errors.length ? errors : null };
    } catch (error) {
      console.error("Unexpected scrape sources error:", error);
      return {
        data: null,
        error: "Unexpected error while scraping sources",
      };
    }
  },
  

  scrapeAllSources: async () => {
    try {
      const response = await api.post("/scrapers/scrape-all");
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Scrape all sources error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to scrape all sources" };
    }
  },
};

// Contact API
export const ContactApi = {
  submit: async (formData: ContactForm) => {
    try {
      const response = await api.post("/contact", formData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Submit contact error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to submit contact form" };
    }
  },

  getAll: async () => {
    try {
      const response = await api.get("/contact");
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Get contacts error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to fetch contacts" };
    }
  },

  updateStatus: async (id: string, status: string) => {
    try {
      const response = await api.put(`/contact/${id}`, { status });
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Update contact status error:", error);
      return { data: null, error: error.response?.data?.message || "Failed to update contact status" };
    }
  },
};
