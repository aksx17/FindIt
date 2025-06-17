
const puppeteer = require('puppeteer');
const Event = require('../models/Event');
const ScraperSource = require('../models/ScraperSource');

// Initialize default scraper sources if not exists
const initSources = async () => {
  const defaultSources = [
    {
      name: "Unstop",
      url: "https://unstop.com/hackathons",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding/unstop-icon-192.png",
      isEnabled: true,
    },
    {
      name: "Devfolio",
      url: "https://devfolio.co/hackathons",
      logo: "https://assets.devfolio.co/company/e19b9016c0f8469e9d09b7312d3a63d7/assets/favicons/favicon-32x32.png",
      isEnabled: true,
    },
    {
      name: "MLH",
      url: "https://mlh.io/seasons/2025/events",
      logo: "https://mlh.io/assets/logos/mlh-logo-color-dark-29d0396cab07f7f4f28e9deeb03c77b2c2e1ca3f76bb69e834aceb57a1fd5322.svg",
      isEnabled: true,
    },
    {
      name: "HackerEarth",
      url: "https://www.hackerearth.com/challenges/hackathon/",
      logo: "https://static-fastly.hackerearth.com/static/hackerearth/images/logo/HE_logo.png",
      isEnabled: true,
    },
  ];

  const count = await ScraperSource.countDocuments();
  if (count === 0) {
    await ScraperSource.insertMany(defaultSources);
    console.log('Default scraper sources initialized');
  }
};

// Call this when server starts
initSources().catch(err => console.error('Error initializing scraper sources:', err));

exports.getSources = async (req, res) => {
  try {
    const sources = await ScraperSource.find().sort({ name: 1 });
    res.json(sources);
  } catch (error) {
    console.error('Get sources error:', error);
    res.status(500).json({ message: 'Error fetching scraper sources' });
  }
};

exports.toggleSource = async (req, res) => {
  try {
    const { name } = req.params;
    const { isEnabled } = req.body;
    
    const source = await ScraperSource.findOne({ name });
    if (!source) {
      return res.status(404).json({ message: 'Scraper source not found' });
    }
    
    source.isEnabled = isEnabled;
    await source.save();
    
    res.json(source);
  } catch (error) {
    console.error('Toggle source error:', error);
    res.status(500).json({ message: 'Error updating scraper source' });
  }
};

exports.scrapeSource = async (req, res) => {
  try {
    const { source } = req.params;
    
    const scraperSource = await ScraperSource.findOne({ name: source });
    if (!scraperSource) {
      return res.status(404).json({ message: 'Scraper source not found' });
    }
    
    if (!scraperSource.isEnabled) {
      return res.status(400).json({ message: 'This scraper source is disabled' });
    }
    
    const events = await scrapeEvents(scraperSource);
    
    // Save events to database
    if (events.length > 0) {
      await Promise.all(
        events.map(async (event) => {
          // Check if event already exists based on title and source
          const exists = await Event.findOne({ 
            title: event.title,
            source: event.source
          });
          
          if (!exists) {
            await Event.create(event);
          }
        })
      );
    }
    
    res.json({ 
      message: `Successfully scraped ${events.length} events from ${source}`,
      events 
    });
  } catch (error) {
    console.error(`Scrape ${req.params.source} error:`, error);
    res.status(500).json({ message: `Error scraping ${req.params.source}` });
  }
};

exports.scrapeAllSources = async (req, res) => {
  try {
    const enabledSources = await ScraperSource.find({ isEnabled: true });
    
    let allEvents = [];
    let successCount = 0;
    let errorSources = [];
    
    for (const source of enabledSources) {
      try {
        const events = await scrapeEvents(source);
        
        // Save events to database
        if (events.length > 0) {
          await Promise.all(
            events.map(async (event) => {
              // Check if event already exists
              const exists = await Event.findOne({ 
                title: event.title,
                source: event.source
              });
              
              if (!exists) {
                await Event.create(event);
              }
            })
          );
        }
        
        allEvents = [...allEvents, ...events];
        successCount++;
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error);
        errorSources.push(source.name);
      }
    }
    
    res.json({
      message: `Scraped ${allEvents.length} events from ${successCount} sources`,
      errorSources: errorSources.length > 0 ? errorSources : null,
      eventsCount: allEvents.length
    });
  } catch (error) {
    console.error('Scrape all sources error:', error);
    res.status(500).json({ message: 'Error scraping all sources' });
  }
};

// Scraper implementations
async function scrapeEvents(source) {
  console.log(`Scraping events from ${source.name}...`);
  
  switch(source.name) {
    case 'Unstop':
      return scrapeUnstop(source);
    case 'Devfolio':
      return scrapeDevfolio(source);
    case 'MLH':
      return scrapeMLH(source);
    case 'HackerEarth':
      return scrapeHackerEarth(source);
    default:
      throw new Error(`No scraper implemented for ${source.name}`);
  }
}

async function scrapeUnstop(source) {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for hackathon cards to load
    await page.waitForSelector('app-competition-listing, app-featured-opportunity-tile', { timeout: 30000 });
    
    // Extract hackathon data
    const events = await page.evaluate((sourceName) => {
      const hackathons = [];
      const cards = document.querySelectorAll('app-competition-listing, app-featured-opportunity-tile');
      
      cards.forEach((card) => {
        const titleEl = card.querySelector('h2'); // Internship title
        const companyEl = card.querySelector('p'); // Company name
        const imageEl = card.querySelector('img'); // Company logo
        const daysLeftEl = card.querySelector('.seperate_box align-center ng-star-inserted'); // Days left
        const skillsEl = card.querySelectorAll('.skill_list .chip_text'); // Skills
        const impressionsEl = card.querySelector('.seperate_box span.ng-star-inserted'); // Impressions
        const linkEl = card.closest('a');
        
        if (titleEl && companyEl) {
          const title = titleEl.textContent.trim();
          const organizer = companyEl.textContent.trim();
          const imageUrl = imageEl ? imageEl.src : null;
          const registrationDeadline = daysLeftEl ? daysLeftEl.textContent.trim() : 'N/A';
          const skills = Array.from(skillsEl).map(skill => skill.textContent.trim());
          const impressions = impressionsEl ? impressionsEl.textContent.trim() : 'N/A';
          const registrationUrl = linkEl ? linkEl.href : null;
          
          hackathons.push({
            title,
            organizer,
            date: registrationDeadline,
            impressions,
            skills,
            imageUrl,
            registrationUrl,
            source: sourceName,
            type: 'Internship',
            location: 'Online',
            isVirtual: true,
            description: `${title} at ${organizer}`,
            eligibility: 'Open to all', // Default eligibility
            prizes: 'N/A', // Default prizes
            source: sourceName,
            registrationDeadline,
          });
        }
      });
      
      return hackathons;
    }, source.name);
    
    return events;
  } finally {
    await browser.close();
  }
}

async function scrapeDevfolio(source) {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for hackathon cards to load
    await page.waitForSelector('.CompactHackathonCard__StyledCard-sc-9ff45231-0', { timeout: 30000 });
    
    // Extract hackathon data
    const events = await page.evaluate((sourceName) => {
      const hackathons = [];
      const cards = document.querySelectorAll('.CompactHackathonCard__StyledCard-sc-9ff45231-0');

      
      cards.forEach((card) => {
        const titleEl = card.querySelector('h3'); // Event title
        const typeEl = card.querySelector('p'); // Event type (e.g., Hackathon)
        const linkEl = card.querySelector('a'); // Event link
        const locationEl = card.querySelector('.ifkmYk'); // Location (e.g., Online)
        const participantsEl = card.querySelector('.iYRNEE'); // Participants count
        const imageEl = card.querySelector('img'); // Organizer or event image
        
        if (titleEl && linkEl) {
          const title = titleEl.textContent.trim();
          const type = typeEl ? typeEl.textContent.trim() : 'Event';
          const registrationUrl = linkEl.href;
          const location = locationEl ? locationEl.textContent.trim() : 'Unknown';
          const participants = participantsEl ? participantsEl.textContent.trim() : 'N/A';
          const imageUrl = imageEl ? imageEl.src : null;
          
          hackathons.push({
            title,
            organizer: 'Devfolio', // Default organizer for Devfolio
            date: 'TBD', // Devfolio does not provide a specific date in the card
            location,
            type,
            imageUrl,
            isVirtual: location.toLowerCase().includes('online'),
            description: `${title} - ${type}`,
            registrationDeadline: 'TBD', // Default deadline
            registrationUrl,
            skills: ['Coding', 'Teamwork', 'Innovation'], // Default skills
            eligibility: 'Open to all', // Default eligibility
            prizes: 'N/A', // Default prizes
            source: sourceName,
          });
        }
      });
      
      return hackathons;
    }, source.name);
    
    return events;
  } finally {
    await browser.close();
  }
}

async function scrapeMLH(source) {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Extract hackathon data
    const events = await page.evaluate((sourceName) => {
      const hackathons = [];
      const cards = document.querySelectorAll('.event-wrapper');
      
      cards.forEach((card) => {
        const titleEl = card.querySelector('.event-name'); // Event title
        const dateEl = card.querySelector('.event-date'); // Event date
        const locationEl = card.querySelector('.event-location'); // Event location
        const linkEl = card.querySelector('a.event-link'); // Event link
        const imageEl = card.querySelector('.image-wrap img'); // Event image
        
        if (titleEl && linkEl) {
          const title = titleEl.textContent.trim();
          const imageUrl = imageEl ? imageEl.src : null;
          const date = dateEl ? dateEl.textContent.trim() : 'Upcoming';
          const location = locationEl ? locationEl.textContent.trim() : 'Online';
          const registrationUrl = linkEl ? linkEl.href : null;
          const isVirtual = location.toLowerCase().includes('online') || location.toLowerCase().includes('virtual');
          
          hackathons.push({
            title,
            date,
            location,
            imageUrl,
            registrationUrl,
            source: sourceName,
            type: 'Hackathon',
            isVirtual,
            description: `${title} - ${date}`,
            organizer: 'Major League Hacking',
            skills: ['Coding', 'Teamwork', 'Innovation'],
          });
        }
      });
      
      return hackathons;
    }, source.name);
    
    return events;
  } finally {
    await browser.close();
  }
}

async function scrapeHackerEarth(source) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(source.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for challenge cards to load
    await page.waitForSelector('.challenge-card-modern', { timeout: 30000 });

    // Extract ongoing and upcoming events
    const events = await page.evaluate((sourceName) => {
      const hackathons = [];

      // Helper function to extract event details
      const extractEventDetails = (card) => {
        const titleEl = card.querySelector('.challenge-name span'); // Event title
        const typeEl = card.querySelector('.challenge-type'); // Event type
        const linkEl = card.querySelector('a.challenge-card-link'); // Event link
        const imageEl = card.querySelector('.event-image'); // Event image
        const registrationsEl = card.querySelector('.registrations .fa-user'); // Registrations count
        const dateEl = card.querySelector('.date'); // Event date or countdown
        const organizerEl = card.querySelector('.company-details'); // Organizer details

        const title = titleEl ? titleEl.textContent.trim() : 'Unknown';
        const type = typeEl ? typeEl.textContent.trim() : 'Hackathon';
        const registrationUrl = linkEl ? linkEl.href : null;
        const imageUrl = imageEl ? imageEl.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1') : null;
        const registrations = registrationsEl ? registrationsEl.parentElement.textContent.trim() : 'N/A';
        //const date = dateEl ? dateEl.textContent.trim() : 'TBD';
        const organizer = organizerEl ? organizerEl.textContent.trim() : 'HackerEarth';


        const countdownText = dateEl ? dateEl.textContent.trim() : '';
        let registrationDeadline = 'TBD';

        // If countdown exists, parse the remaining time
        if (countdownText.match(/\d+/g)) {
          const timeParts = countdownText.match(/\d+/g);
          const [days, hours, minutes, seconds] = timeParts.map(num => parseInt(num, 10));

          if (days || hours || minutes || seconds) {
            // Get current time and calculate the registration deadline
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + days);
            currentDate.setHours(currentDate.getHours() + hours);
            currentDate.setMinutes(currentDate.getMinutes() + minutes);
            currentDate.setSeconds(currentDate.getSeconds() + seconds);

            date = currentDate.toISOString(); // Convert to ISO string format
          }
        }

        return {
          title,
          organizer,
          date,
          location: 'Online', // Assuming all events are virtual
          type,
          imageUrl,
          isVirtual: true, // Assuming all events are virtual
          description: `${title} - ${type}`,
          registrationDeadline: date, // Using the same date as the deadline
          registrationUrl,
          skills: ['Coding', 'Teamwork', 'Innovation'], // Default skills
          eligibility: 'Open to all', // Default eligibility
          prizes: 'N/A', // Default prizes
          source: sourceName,
        };
      };

      // Extract ongoing events
      const ongoingSection = document.querySelector('.ongoing.challenge-list');
      if (ongoingSection) {
        const ongoingCards = ongoingSection.querySelectorAll('.challenge-card-modern');
        ongoingCards.forEach((card) => {
          const event = extractEventDetails(card);
          event.status = 'Ongoing';
          hackathons.push(event);
        });
      }

      // Extract upcoming events
      const upcomingSection = document.querySelector('.upcoming.challenge-list');
      if (upcomingSection) {
        const upcomingCards = upcomingSection.querySelectorAll('.challenge-card-modern');
        upcomingCards.forEach((card) => {
          const event = extractEventDetails(card);
          event.status = 'Upcoming';
          hackathons.push(event);
        });
      }

      return hackathons;
    }, source.name);

    return events;
  } finally {
    await browser.close();
  }
}