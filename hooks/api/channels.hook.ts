import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import Cookie from 'js-cookie';

import {Channel} from '../../types';
import {
	OWNED_CHANNELS_QUERY,
	OwnedChannelsQueryData,
	OwnedChannelsQueryVariables,
} from '../../api';

export const useChannels = () => {
	const [channels, setChannels] = useState<Channel[]>([]);
	const [page, setPage] = useState(1);

	const token = Cookie.get('auth-token');

	const loadMore = () => () => {
		setPage((page) => page + 1);
	};

	const {data, loading, refetch} = useQuery<
		OwnedChannelsQueryData,
		OwnedChannelsQueryVariables
	>(OWNED_CHANNELS_QUERY, {
		variables: {
			page,
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	useEffect(() => {
		if (
			data &&
			channels[channels.length - 1]?.id !==
				data.ownedChannels.docs[data.ownedChannels.docs.length - 1]?.id
		)
			setChannels((channels) => [...channels, ...data.ownedChannels.docs]);
	}, [data]);

	useEffect(() => {
		if (!loading && !channels.length && data?.ownedChannels?.results) {
			setPage(1);
			refetch();
		}
	}, [channels]);

	return {
		loading,
		channels,
		loadMore: loadMore(),
		results: data?.ownedChannels?.results,
	};
};
