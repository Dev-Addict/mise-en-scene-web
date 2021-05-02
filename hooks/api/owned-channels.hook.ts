import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';

import {ChannelAdmin} from '../../types';
import {
	OWNED_CHANNELS_QUERY,
	OwnedChannelsQueryData,
	OwnedChannelsQueryVariables,
} from '../../api';
import {useAuth} from '../contexts';

export const useOwnedChannels = () => {
	const [channels, setChannels] = useState<ChannelAdmin[]>([]);
	const [page, setPage] = useState(1);

	const {token} = useAuth();

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
		notifyOnNetworkStatusChange: true,
	});

	const loadMore = () => () => {
		setPage((page) => page + 1);
	};

	useEffect(() => {
		if (
			data &&
			channels[channels.length - 1]?.id !==
				data.ownedChannels.docs[data.ownedChannels.docs.length - 1]?.id
		)
			setChannels((channels) => [...channels, ...data.ownedChannels.docs]);
	}, [data, loading]);

	useEffect(() => {
		(async () => {
			if (!loading && !channels.length && data?.ownedChannels?.results) {
				setPage(1);
				setChannels([]);
				await refetch();
			}
		})();
	}, [channels, loading, data]);

	const reload = async () => {
		setPage(1);
		setChannels([]);
		await refetch();
	};

	return {
		loading:
			loading ||
			(!loading && !channels.length && data?.ownedChannels?.results) ||
			false,
		channels,
		loadMore: loadMore(),
		results: data?.ownedChannels?.results,
		reload,
	};
};
