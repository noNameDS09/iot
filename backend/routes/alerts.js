const express = require('express');
const { getActiveAlerts, acknowledgeAlert } = require('../controllers/alertsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// All alert routes are protected and require a valid user token
router.get('/', authMiddleware, getActiveAlerts);
router.post('/acknowledge', authMiddleware, acknowledgeAlert);

module.exports = router;