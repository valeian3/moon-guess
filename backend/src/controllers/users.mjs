import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { User } from '../models/users.mjs';

import { USER_ROLES } from '../utils/constants.mjs';

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});

		if (users.length === 0) return res.status(404).send('No users found');

		res.status(200).send(users);
	} catch (err) {
		res.status(500).send('Internal server error', err);
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ message: 'Invalid user ID format' });

		const user = await User.findById(id);

		if (!user) return res.status(404).json({ message: 'User not found' });

		res.status(200).json(user);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error retrieving user', error: err.message });
	}
};

const createUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password)
			return res.status(400).json({ message: 'All fields are required.' });

		const existingUser = await User.findOne({ username });

		if (existingUser) {
			if (existingUser.username === username)
				return res.status(400).json({ message: 'Username is already in use' });
		}

		const newUser = new User({
			username,
			password,
			role: USER_ROLES.READER,
		});

		await newUser.validate();

		const hashedPassword = await bcrypt.hash(password, 10);
		newUser.password = hashedPassword;

		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		if (err.name === 'ValidationError') {
			return res
				.status(400)
				.json({ message: 'Validation error', errors: err.errors });
		}
		res.status(500).json({ message: 'Error adding user', error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { username } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ message: 'Invalid user ID format' });

		if (!username)
			return res.status(400).json({ message: 'Username is required' });

		const updateFields = {
			updatedAt: new Date(),
		};

		if (username) updateFields.username = username;

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: updateFields },
			{ new: true },
		);

		if (!updatedUser)
			return res.status(404).json({ message: 'User not found' });

		res.status(200).json({ message: 'User updated successfully' });
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error updating user', error: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ message: 'Invalid user ID format' });

		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser)
			return res.status(404).json({ message: 'User not found' });

		res.status(200).json({ message: 'User deleted successfully' });
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error deleting user', error: err.message });
	}
};

export default { getUsers, getUser, createUser, updateUser, deleteUser };
