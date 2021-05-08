import {createServer} from 'http';
import {Express} from 'express';
import {Server} from 'socket.io';
import logger from 'node-color-log';

import {apolloServer} from './graphql';
import {socket} from './socket';

const port = process.env.PORT || 3000;

export const server = (app: Express) => {
	const server = createServer(app);
	const io = new Server(server);

	server.listen(port, (err?: any) => {
		if (err) throw err;

		logger.info(`🚀 server is running at http://localhost:${port}.`);
		logger.info(
			`☄️ apollo server is running at http://localhost:${port}${apolloServer.graphqlPath}.`
		);
	});

	socket(io);
};
