import express from 'express';
import { getPreferences, updatePreferences } from '../controllers/settingsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// The settings routes are protected and require a valid user token
// to know which user's preferences to get or set.

// Corresponds to the getPreferences() call in the frontend
router.get('/preferences', authMiddleware, getPreferences);

// Corresponds to the updatePreferences() call in the frontend
router.put('/preferences', authMiddleware, updatePreferences);

export default router;

