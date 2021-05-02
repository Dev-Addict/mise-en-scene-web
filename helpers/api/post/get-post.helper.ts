import {
	PostQueryData,
	PostQueryVariables,
	apolloClient,
	POST_QUERY,
} from '../../../api';
import {Post} from '../../../types';

export const getPost = async (id: string, token: string) => {
	let post: Post | undefined = undefined;

	try {
		const {data} = await apolloClient.query<PostQueryData, PostQueryVariables>({
			query: POST_QUERY,
			variables: {
				id: id as string,
			},
			context: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		post = data.post || undefined;
	} catch (error) {}

	return post;
};
