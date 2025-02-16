import { Router } from 'express';

import usersRouter from './users.mjs';
import authRouter from './auth.mjs';
import votesRouter from './votes.mjs';

import { tokenValidation } from '../middleware/auth.mjs';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', tokenValidation, usersRouter);
router.use('/votes', tokenValidation, votesRouter);

export default router;
