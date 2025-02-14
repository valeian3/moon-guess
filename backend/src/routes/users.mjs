import { Router } from 'express';

import usersController from '../controllers/usersControllers.mjs';

const router = Router();

router
	.route('/')
	.get(usersController.getAllUsers)
	.post(usersController.createNewUser);
router
	.route('/:id')
	.get(usersController.getUser)
	.patch(usersController.updateUser)
	.delete(usersController.deleteUser);

export default router;
