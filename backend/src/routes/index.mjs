import { Router } from 'express';

import usersRouter from './users.mjs';
import authRouter from './auth.mjs';
import votesRouter from './votes.mjs';

import { validateToken } from '../middleware/auth.mjs';

const router = Router();

router.use('/', authRouter);
router.use('/users', validateToken, usersRouter);
router.use('/', validateToken, votesRouter);

export default router;
