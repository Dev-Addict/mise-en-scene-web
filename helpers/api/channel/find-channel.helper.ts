import {
	apolloClient,
	FIND_CHANNEL_QUERY,
	FindChannelQueryData,
	FindChannelQueryVariables,
} from '../../../api';
import {Channel} from '../../../types';

export const findChannel = async (handle: string, token?: string) => {
	let channel: Channel | undefined = undefined;

	try {
		const {data} = await apolloClient.query<
			FindChannelQueryData,
			FindChannelQueryVariables
		>({
			query: FIND_CHANNEL_QUERY,
			variables: {
				filter: {handle},
			},
			context: {
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined,
				},
			},
		});

		channel = data.findChannel || undefined;
	} catch (error) {}

	return channel;
};
