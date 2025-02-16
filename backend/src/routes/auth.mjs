import { Router } from 'express';

import { loginValidation, registerValidation } from '../middleware/auth.mjs';
import authController from '../controllers/auth.mjs';

const router = Router();

// Authentication routes
router.post('/login', loginValidation, authController.authenticateUser);
router.post('/logout', authController.logoutUser);
router.post('/register', registerValidation, authController.registerUser);

// Get authenticated user
router.get('/user', authController.getAuthenticatedUser);

export default router;
