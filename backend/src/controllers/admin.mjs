import bcrypt from 'bcrypt';

import { User } from '../models/users.mjs';

import { USER_ROLES } from '../utils/constants.mjs';

const createAdminUser = async () => {
	try {
		const username = process.env.ADMIN_USER_USERNAME || 'admin';
		const password = process.env.ADMIN_USER_PASSWORD || 'admin123';

		if (!process.env.ADMIN_USER_USERNAME || !process.env.ADMIN_USER_PASSWORD) {
			console.log(
				'Admin user credentials not found in environment variables. Using default values.',
			);
			console.log(`Username: ${username}`);
			console.log(`Password: ${password}`);
		}

		const existingAdmin = await User.findOne({ role: USER_ROLES.ADMIN });

		if (existingAdmin) {
			console.log('Admin user already exists.');
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await new User({
			username,
			password: hashedPassword,
			role: USER_ROLES.ADMIN,
		}).save();

		console.log('Admin user created successfully');
	} catch (err) {
		console.error('Error creating admin user:', err.message);
	}
};

export default createAdminUser;
