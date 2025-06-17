
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middleware/auth');

// Event routes
router.get('/', eventController.getAllEvents);
router.get('/featured', eventController.getFeaturedEvents);
router.get('/:id', eventController.getEventById);
router.post('/', verifyToken, eventController.createEvent);
router.put('/:id', verifyToken, eventController.updateEvent);
router.delete('/:id', verifyToken, eventController.deleteEvent);
router.get('/search/:query', eventController.searchEvents);

module.exports = router;
