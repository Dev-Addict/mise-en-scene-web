import {connect} from 'mongoose';
import logger from 'node-color-log';

export const connectDb = () => {
	const DB = (process.env.DATABASE_URL || '').replace(
		'<dbname>',
		process.env.DATABASE_NAME || ''
	);

	connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
		.then(() => {
			logger.info(
				`🍃 Connected to ${
					process.env.DATABASE_NAME || 'Unknown'
				} database successfully.`
			);
		})
		.catch((error) => {
			logger.error(`💥 Error while trying to connect to DB:`);
			logger.error(error);
		});
};
