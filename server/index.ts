import {join} from 'path';
import {config} from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';

config({
	path: join(__dirname, '..', `.${dev ? 'dev' : 'pro'}.env`),
});

import next from 'next';
import logger from 'node-color-log';

import {app} from './app';
import {connectDb} from './utils';

const port = process.env.PORT || 3000;
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

nextApp
	.prepare()
	.then(() => {
		app.all('*', (req, res) => handle(req, res));

		app.listen(port, (err?: any) => {
			if (err) throw err;

			logger.info(`🚀 server is running at http://localhost:${port}.`);
		});

		connectDb();
	})
	.catch((err: any) => {
		logger.error(err);

		process.exit(1);
	});
