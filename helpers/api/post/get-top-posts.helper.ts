import {
	apolloClient,
	TOP_POSTS_QUERY,
	TopPostsQueryData,
	TopPostsQueryVariables,
} from '../../../api';
import {Post} from '../../../types';

export const getTopPosts = async (token?: string) => {
	let posts: Post[] = [];

	try {
		const {data} = await apolloClient.query<
			TopPostsQueryData,
			TopPostsQueryVariables
		>({
			query: TOP_POSTS_QUERY,
			context: {
				headers: {
					Authorization: token && `Bearer ${token}`,
				},
			},
		});

		posts = data.topPosts;
	} catch (error) {}

	return posts;
};
