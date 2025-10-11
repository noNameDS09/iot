import express from 'express';
import { getAllDevices, addDevice, getDeviceById, updateDevice, deleteDevice } from '../controllers/devicesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All device routes are protected and require a valid user token
router.get('/', authMiddleware, getAllDevices);
router.post('/', authMiddleware, addDevice);
router.get('/:id', authMiddleware, getDeviceById);
router.put('/:id', authMiddleware, updateDevice); // This endpoint is key for status updates and alerts
router.delete('/:id', authMiddleware, deleteDevice);

export default router;