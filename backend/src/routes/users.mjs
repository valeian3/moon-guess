import { Router } from 'express';

import userController from '../controllers/users.mjs';

const router = Router();

router
	.route('/')
	.get(userController.getUsers)
	.post(userController.createUser);

router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default router;
