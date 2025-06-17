
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const scraperRoutes = require('./routes/scrapers');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/scrapers', scraperRoutes);
app.use('/api/contact', contactRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'FindIt API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT,'::', () => {
  console.log(`Server running on port ${PORT}`);
});
