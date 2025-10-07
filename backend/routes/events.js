// iot-backend/src/routes/events.js
const express = require('express');
const {
  getUpcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');

const router = express.Router();

// GET /events/upcoming - Upcoming events/tasks
router.get('/upcoming', getUpcomingEvents);

// POST /events - Add new event
router.post('/', createEvent);

// PUT /events/:id - Update an event
router.put('/:id', updateEvent);

// DELETE /events/:id - Cancel an event
router.delete('/:id', deleteEvent);

module.exports = router;
