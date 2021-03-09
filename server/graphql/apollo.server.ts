import {ApolloServer} from 'apollo-server-express';

import {schema} from './nexus.schema';
import {mainContext} from './main.context';

export const apolloServer = new ApolloServer({
	schema,
	context: mainContext,
});
