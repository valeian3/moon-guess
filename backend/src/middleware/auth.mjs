import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

export const loginValidation = [
	body('username').trim().notEmpty().withMessage('Username is required'),
	body('password').notEmpty().withMessage('Password is required'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export const registerValidation = [
	body('username').trim().notEmpty().withMessage('Username is required'),
	body('password').notEmpty().withMessage('Password is required'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export const tokenValidation = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) return res.status(401).json({ message: 'Unauthorized access' });

	try {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		next();
	} catch (err) {
		res.clearCookie('token');
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};
