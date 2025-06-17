
const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const { type, location, isVirtual, skills } = req.query;
    
    // Build filter based on query parameters
    const filter = {};
    
    if (type) filter.type = type;
    if (location) filter.location = location;
    if (isVirtual !== undefined) filter.isVirtual = isVirtual === 'true';
    if (skills) {
      const skillsArray = skills.split(',');
      filter.skills = { $in: skillsArray };
    }
    
    const events = await Event.find(filter).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Error fetching event' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const event = new Event(eventData);
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the creator of the event
    if (event.createdBy && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the creator of the event
    if (event.createdBy && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

exports.searchEvents = async (req, res) => {
  try {
    const query = req.params.query;
    
    const events = await Event.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    
    res.json(events);
  } catch (error) {
    console.error('Search events error:', error);
    res.status(500).json({ message: 'Error searching events' });
  }
};

exports.getFeaturedEvents = async (req, res) => {
  try {
    const featuredEvents = await Event.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.status(200).json(featuredEvents);
  } catch (error) {
    console.error("Get featured events error:", error);
    res.status(500).json({ message: "Error fetching featured events" });
  }
};