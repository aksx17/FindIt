
const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');
const { verifyToken } = require('../middleware/auth');

// Scraper routes - all require authentication
router.get('/sources', verifyToken, scraperController.getSources);
router.post('/scrape/:source', verifyToken, scraperController.scrapeSource);
router.post('/scrape-all', verifyToken, scraperController.scrapeAllSources);
router.put('/sources/:name', verifyToken, scraperController.toggleSource);

module.exports = router;
