import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/users.mjs';
import { USER_ROLES } from '../utils/constants.mjs';

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password)
			return res
				.status(400)
				.json({ message: 'Username and password are required' });

		const user = await User.findOne({ username: username });
		if (!user)
			return res.status(401).json({ message: 'Invalid username or password' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

		const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '15m',
		});

		res.cookie('token', token, { httpOnly: true, maxAge: 15 * 60 * 1000 });
		return res
			.status(200)
			.json({
				message: 'Login successful',
				user: { username: user.username, role: user.role },
			});
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Server error', error: error.message });
	}
};

const logout = (req, res) => {
	const token = req.cookies.token;

	if (!token) return res.status(200).json({ message: 'Already logged out' });

	res.clearCookie('token', { httpOnly: true });
	return res.status(200).json({ message: 'Logout successful' });
};

const register = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password)
			return res
				.status(400)
				.json({ message: 'Username and password are required' });

		const existingUser = await User.findOne({ username });
		if (existingUser)
			return res.status(400).json({ message: 'Username is already taken' });

		const newUser = new User({
			username,
			password,
			role: USER_ROLES.READER,
		});

		await newUser.validate();

		const hashedPassword = await bcrypt.hash(password, 10);
		newUser.password = hashedPassword;

		await newUser.save();

		res.status(201).json({ message: 'Registered successfully' });
	} catch (err) {
		if (err.name === 'ValidationError')
			return res
				.status(400)
				.json({ message: 'Validation error', errors: err.errors });

		res
			.status(500)
			.json({ message: 'Error registering user', error: err.message });
	}
};

const getUser = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ message: 'Unauthorized access' });

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findOne({ username: decoded.username }).select(
			'-password',
		);
		if (!user) {
			res.clearCookie('token', { httpOnly: true });
			return res.status(404).json({ message: 'User not found' });
		}

		return res
			.status(200)
			.json({
				user: { id: user.id, username: user.username, role: user.role },
			});
	} catch (error) {
		res.clearCookie('token', { httpOnly: true });
		return res
			.status(401)
			.json({ message: 'Invalid or expired token', error: error.message });
	}
};

export default { login, logout, register, getUser };
