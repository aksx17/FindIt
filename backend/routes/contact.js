
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');

// Contact form submission - public
router.post('/', contactController.submitContact);

// Admin routes - protected
router.get('/', verifyToken, contactController.getContacts);
router.put('/:id', verifyToken, contactController.updateContactStatus);

module.exports = router;
