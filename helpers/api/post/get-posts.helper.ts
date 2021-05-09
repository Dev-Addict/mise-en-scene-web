import {
	apolloClient,
	POSTS_QUERY,
	PostsQueryData,
	PostsQueryVariables,
} from '../../../api';
import {Post} from '../../../types';

export const getPosts = async (
	variables: PostsQueryVariables,
	token?: string
) => {
	let posts: Post[] = [];

	try {
		const {data} = await apolloClient.query<
			PostsQueryData,
			PostsQueryVariables
		>({
			query: POSTS_QUERY,
			context: {
				headers: {
					Authorization: token && `Bearer ${token}`,
				},
			},
			variables,
		});

		posts = data.posts.docs;
	} catch (error) {
		posts = [];
	}

	return posts;
};
