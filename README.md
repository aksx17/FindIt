
# FindIt - Event Discovery Platform

FindIt is a comprehensive event discovery platform that helps users find and attend events like hackathons, workshops, and conferences. The platform uses web scraping to aggregate events from multiple sources and provides a clean interface for users to browse, filter, and register for these events.

## Features

- 🔍 **Smart Event Discovery**: Find events from multiple sources in one place
- 🌐 **Web Scraping**: Automatic aggregation of events from platforms like Unstop, Devfolio, MLH, and HackerEarth
- 👤 **User Authentication**: Create an account, sign in with email or Google
- 📝 **Event Creation**: Registered users can create and publish their own events
- 🔎 **Advanced Filtering**: Filter events by type, location, skills, and more
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Shadcn/UI components
- Tanstack Query for data fetching

### Backend
- Node.js with Express
- MongoDB with Mongoose for data storage
- JWT for authentication
- Puppeteer for web scraping

## Project Structure

The project is organized into frontend and backend directories:

```
findit/
├── backend/             # Backend server code
│   ├── controllers/     # API request handlers
│   ├── models/          # MongoDB models
│   ├── routes/          # API route definitions
│   ├── middleware/      # Express middleware
│   └── server.js        # Main server file
│
└── src/                 # Frontend React code
    ├── components/      # Reusable UI components
    ├── contexts/        # React contexts
    ├── hooks/           # Custom React hooks
    ├── pages/           # Page components
    ├── services/        # API service functions
    └── utils/           # Utility functions
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or newer)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/findit
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the root directory (if you're in the backend directory, go back with `cd ..`)

2. Create a `.env` file in the root directory with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/signin` - Sign in a user
- POST `/api/auth/google` - Sign in with Google
- GET `/api/auth/profile` - Get user profile (protected)

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get event by ID
- POST `/api/events` - Create a new event (protected)
- PUT `/api/events/:id` - Update an event (protected)
- DELETE `/api/events/:id` - Delete an event (protected)
- GET `/api/events/search/:query` - Search events

### Scrapers
- GET `/api/scrapers/sources` - Get all scraper sources (protected)
- PUT `/api/scrapers/sources/:name` - Toggle scraper source (protected)
- POST `/api/scrapers/scrape/:source` - Scrape events from a specific source (protected)
- POST `/api/scrapers/scrape-all` - Scrape events from all enabled sources (protected)

### Contact
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contact submissions (protected)
- PUT `/api/contact/:id` - Update contact status (protected)

## Development Notes

- The web scraping functionality uses Puppeteer to navigate and extract data from event websites. The scrapers may need periodic updates if the source websites change their structure.
- For Google authentication to work properly, you need to set up a Google OAuth client ID and add the appropriate redirect URIs.
- MongoDB connection requires either a local MongoDB instance or a MongoDB Atlas connection string.

## License
MIT
