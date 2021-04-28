import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import Cookie from 'js-cookie';

import {Post} from '../../types';
import {
	CHANNEL_POSTS_QUERY,
	ChannelPostsQueryData,
	ChannelPostsQueryVariables,
} from '../../api';

export const useChannelPosts = (channel: string) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [page, setPage] = useState(1);

	const token = Cookie.get('auth-token');

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
	}, [data]);

	useEffect(() => {
		(async () => {
			if (!loading && !posts.length && data?.channelPosts?.results) {
				setPage(1);
				setPosts([]);
				await refetch();
			}
		})();
	}, [posts]);

	const reload = async () => {
		setPage(1);
		setPosts([]);
		await refetch();
	};

	return {
		loading,
		posts,
		loadMore: loadMore(),
		results: data?.channelPosts?.results,
		reload,
	};
};
