import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';

import {ChannelAdmin} from '../../types';
import {
	CHANNEL_POSTS_QUERY,
	ChannelPostsQueryData,
	ChannelPostsQueryVariables,
} from '../../api';
import {useAuth} from '../contexts';

export const useChannelPosts = (channel: string) => {
	const [posts, setPosts] = useState<ChannelAdmin[]>([]);
	const [page, setPage] = useState(1);

	const {token} = useAuth();

	const {data, loading, refetch} = useQuery<
		ChannelPostsQueryData,
		ChannelPostsQueryVariables
	>(CHANNEL_POSTS_QUERY, {
		variables: {
			page,
			channel,
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
			posts[posts.length - 1]?.id !==
				data.channelPosts.docs[data.channelPosts.docs.length - 1]?.id
		)
			setPosts((posts) => [...posts, ...data.channelPosts.docs]);
	}, [data, loading]);

	useEffect(() => {
		(async () => {
			if (!loading && !posts.length && data?.channelPosts?.results) {
				setPage(1);
				setPosts([]);
				await refetch();
			}
		})();
	}, [posts, loading, data]);

	const reload = async () => {
		setPage(1);
		setPosts([]);
		await refetch();
	};

	return {
		loading:
			loading ||
			(!loading && !posts.length && data?.channelPosts?.results) ||
			false,
		posts,
		loadMore: loadMore(),
		results: data?.channelPosts?.results,
		reload,
	};
};
