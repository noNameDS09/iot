import express from 'express';
import { signup, login, logout, getProfile, updateUserRole } from '../controllers/usersController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes (require a valid token)
router.get('/profile', authMiddleware, getProfile);

// Admin-only routes (require an admin/manager role)
router.put('/:id/role', authMiddleware, adminMiddleware, updateUserRole);

// You can add other user routes from your YAML here
// router.get('/', authMiddleware, adminMiddleware, listAllUsers);
// router.delete('/:id', authMiddleware, adminMiddleware, removeUser);

export default router;