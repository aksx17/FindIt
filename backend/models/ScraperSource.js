
const mongoose = require('mongoose');

const scraperSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  logo: String,
  isEnabled: {
    type: Boolean,
    default: true
  },
  lastScraped: Date
});

const ScraperSource = mongoose.model('ScraperSource', scraperSourceSchema);

module.exports = ScraperSource;
