import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.mjs';
import logger from './middleware/logger.mjs';
import notFound from './middleware/notFound.mjs';
import errorHandler from './middleware/error.mjs';

import createAdminUser from './controllers/adminController.mjs';

import routes from './routes/index.mjs';

export async function createApp(apiVersion) {
	const app = express();

	// Connect to the database
	await connectDB();

	// Create admin user
	await createAdminUser();

	// Body parser middleware
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	// Cookie parser middleware
	app.use(cookieParser());

	// Logger middleware
	app.use(logger);

	// Routes
	app.use(`/api/${apiVersion}`, routes);

	// Error handler
	app.use(notFound);
	app.use(errorHandler);

	return app;
}
