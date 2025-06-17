
const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await contact.save();
    
    res.status(201).json({ 
      message: 'Your message has been submitted. We will get back to you soon.',
      contact
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Error updating contact status' });
  }
};
