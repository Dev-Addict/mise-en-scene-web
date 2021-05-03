import {connect} from 'mongoose';
import logger from 'node-color-log';

export const connectDb = () => {
	const DB = (process.env.DATABASE_URL || '')
		.replace('<password>', process.env.DATABASE_PASSWORD || '')
		.replace('<dbname>', process.env.DATABASE_NAME || '');

	console.log(DB);

	connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	}).then(() => {
		logger.info(
			`🍃 Connected to ${
				process.env.DATABASE_NAME || 'Unknown'
			} database successfully.`
		);
	});
};
