import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
	try {
		if (!MONGO_URL) {
			throw new Error('MONGO_URL is not defined in environment variables.');
		}

		await mongoose.connect(MONGO_URL);

		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('MongoDB Connection Error:', error.message);
		process.exit(1);
	}
};

export default connectDB;
