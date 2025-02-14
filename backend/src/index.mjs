import { createApp } from './createApp.mjs';

const startServer = async () => {
	const port = process.env.PORT || 3000;
	const apiVersion = process.env.API_VERSION || 'v1';

	if (!process.env.API_VERSION) {
		console.warn('API_VERSION not defined in .env, using default "v1"');
	}

	const app = await createApp(apiVersion);

	app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
