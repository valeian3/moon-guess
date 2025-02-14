import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		username: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true },
);

export const Vote = mongoose.model('Vote', voteSchema);
