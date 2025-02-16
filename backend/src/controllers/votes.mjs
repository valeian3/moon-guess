import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { Vote } from '../models/votes.mjs';
import { User } from '../models/users.mjs';

const getVotes = async (req, res) => {
	try {
		const votes = await Vote.find({});

		if (votes.length === 0) return res.status(404).json({ message: 'No votes found' });

		res.status(200).json({ votes });
	} catch (err) {
		res.status(500).send('Internal server error', err);
	}
};

const createVote = async (req, res) => {
	const { userId, price } = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(userId))
			return res.status(400).json({ message: 'Invalid user ID format' });

		const existingVote = await Vote.findOne({ userId });
		if (existingVote)
			return res.status(400).json({ message: 'You have already voted' });

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		const newVote = new Vote({
			userId,
			username: user.username,
			price,
		});

		await newVote.save();
		res.status(200).json({ message: 'Vote cast successfully' });
	} catch (error) {
		if (error.name === 'ValidationError')
			return res
				.status(400)
				.json({ message: 'Validation error', errors: error.errors });
		res.status(500).json({ message: 'Error casting vote', error });
	}
};

export default { getVotes, createVote };
