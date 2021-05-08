import {join} from 'path';
import {config} from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';

config({
	path: join(__dirname, '..', `.${dev ? 'dev' : 'pro'}.env`),
});

import next from 'next';
import logger from 'node-color-log';

import {server} from './server';
import {app} from './app';
import {apolloServer} from './graphql';
import {connectDb} from './utils';

const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

apolloServer.applyMiddleware({app, path: '/api/graphql'});

nextApp
	.prepare()
	.then(() => {
		app.all('*', (req, res) => handle(req, res));

		server(app);

		connectDb();
	})
	.catch((err: any) => {
		logger.error(err);

		process.exit(1);
	});
