import { Router } from 'express';

import votesController from '../controllers/votesControllers.mjs';

const router = Router();

router.route('/votes').get(votesController.getAllVotes);

router.route('/vote').post(votesController.sendVote);

export default router;
