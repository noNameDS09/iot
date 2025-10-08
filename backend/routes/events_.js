// routes/events.js
const express = require('express');
const {
  getUpcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');

const router = express.Router();

// GET /events/upcoming
router.get('/upcoming', getUpcomingEvents);

// POST /events
router.post('/', createEvent);

// PUT /events/:id
router.put('/:id', updateEvent);

// DELETE /events/:id
router.delete('/:id', deleteEvent);

module.exports = router;