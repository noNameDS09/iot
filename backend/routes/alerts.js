import express from 'express';
import { getActiveAlerts, acknowledgeAlert } from '../controllers_/alertsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All alert routes are protected and require a valid user token
router.get('/', authMiddleware, getActiveAlerts);
router.post('/acknowledge', authMiddleware, acknowledgeAlert);

export default router;