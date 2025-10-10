// controllers/eventsController.js
const EventModel = require('../models/event'); 

// GET /events/upcoming
exports.getUpcomingEvents = async (req, res) => {
  try {
    // AWAIT is crucial here
    const upcomingEvents = await EventModel.getUpcoming(); 
    res.status(200).json(upcomingEvents);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ message: 'Failed to retrieve upcoming events.' });
  }
};

// POST /events
exports.createEvent = async (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Missing required fields: title and date.' });
  }

  try {
    const newEvent = await EventModel.create(title, date);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event.' });
  }
};

// PUT /events/:id
exports.updateEvent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, date } = req.body;

  if (isNaN(id) || !title || !date) {
    return res.status(400).json({ message: 'Invalid ID or missing required fields.' });
  }

  try {
    const updatedEvent = await EventModel.update(id, title, date);
    if (!updatedEvent) {
      return res.status(404).json({ message: `Event with ID ${id} not found.` });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    res.status(500).json({ message: 'Failed to update event.' });
  }
};

// DELETE /events/:id
exports.deleteEvent = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid event ID format.' });
  }

  try {
    const wasDeleted = await EventModel.delete(id);
    if (!wasDeleted) {
      return res.status(404).json({ message: `Event with ID ${id} not found.` });
    }
    res.status(200).json({ message: `Event ${id} deleted successfully.` });
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    res.status(500).json({ message: 'Failed to delete event.' });
  }
};
