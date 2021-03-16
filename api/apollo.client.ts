import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

import {APOLLO_CLIENT_URI} from '../config';

export const apolloClient = new ApolloClient({
	link: createUploadLink({
		uri: APOLLO_CLIENT_URI,
	}),
	cache: new InMemoryCache({
		addTypename: false,
	}),
	credentials: 'include',
});
