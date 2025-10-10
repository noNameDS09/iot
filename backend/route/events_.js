
const express = require('express');
const {
  getUpcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');

const router = express.Router();


router.get('/upcoming', getUpcomingEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
