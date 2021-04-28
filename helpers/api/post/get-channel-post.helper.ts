import {
	apolloClient,
	CHANNEL_POST_QUERY,
	ChannelPostQueryData,
	ChannelPostQueryVariables,
} from '../../../api';
import {Post} from '../../../types';

export const getChannelPost = async (id: string, token?: string) => {
	let post: Post | undefined = undefined;

	try {
		const {data} = await apolloClient.query<
			ChannelPostQueryData,
			ChannelPostQueryVariables
		>({
			query: CHANNEL_POST_QUERY,
			context: {
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined,
				},
			},
			variables: {
				id,
			},
		});

		post = data.channelPost || undefined;
	} catch (error) {}

	return post;
};
