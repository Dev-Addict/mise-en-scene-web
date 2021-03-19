import {ApolloServer} from 'apollo-server-express';

import {schema} from './nexus.schema';
import {mainContext} from './main.context';
import {formatError} from './utils';

export const apolloServer = new ApolloServer({
	schema,
	context: mainContext,
	formatError: formatError,
});
