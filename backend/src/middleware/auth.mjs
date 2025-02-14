import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

export const validateLogin = [
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

export const validateToken = (req, res, next) => {
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

export const validateRole = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.status(403).json({
				message: 'Forbidden: Your role does not allow access to this resource.',
			});
		}
		next();
	};
};
