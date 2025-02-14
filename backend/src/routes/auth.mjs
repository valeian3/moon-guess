import { Router } from 'express';

import { validateLogin } from '../middleware/auth.mjs';
import authControllers from '../controllers/authControllers.mjs';

const router = Router();

router.route('/login').post(validateLogin, authControllers.login);
router.route('/logout').post(authControllers.logout);
router.route('/register').post(authControllers.register);
router.route('/me').get(authControllers.getUser);

export default router;
