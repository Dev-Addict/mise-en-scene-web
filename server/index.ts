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
import {apolloServer} from './graphql/apollo.server';

const port = process.env.PORT || 3000;
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

apolloServer.applyMiddleware({app, path: '/api/graphql'});

nextApp
	.prepare()
	.then(() => {
		app.all('*', (req, res) => handle(req, res));

		app.listen(port, (err?: any) => {
			if (err) throw err;

			logger.info(`🚀 server is running at http://localhost:${port}.`);
			logger.info(
				`☄️ apollo server is running at http://localhost:${port}${apolloServer.graphqlPath}.`
			);
		});

		connectDb();
	})
	.catch((err: any) => {
		logger.error(err);

		process.exit(1);
	});
