import { Router } from 'express';

import voteController from '../controllers/votes.mjs';

const router = Router();

router.route('/').get(voteController.getVotes).post(voteController.createVote);

export default router;
