export const BASE_URL =
	(global.window && window.location.hostname) ||
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:3000'
		: 'https://www.miseenscene.ir';
export const APOLLO_CLIENT_URI = `${BASE_URL}/api/graphql`;
