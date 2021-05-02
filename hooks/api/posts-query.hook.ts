import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import Cookie from 'js-cookie';

import {
	PostsQueryData,
	PostsQueryVariables,
	MyPostsQueryData,
	MyPostsQueryVariables,
	POSTS_QUERY,
	MY_POSTS_QUERY,
} from '../../api';
import {Post} from '../../types';

export const usePostsQuery = (
	filter: {},
	page: number,
	setPage: Dispatch<SetStateAction<number>>,
	myPage: number,
	setMyPage: Dispatch<SetStateAction<number>>
) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [myPosts, setMyPosts] = useState<Post[]>([]);

	const token = Cookie.get('auth-token');

	const {data, loading, refetch} = useQuery<
		PostsQueryData,
		PostsQueryVariables
	>(POSTS_QUERY, {
		variables: {
			filter,
			page,
			sort: {publishedAt: -1, updatedAt: -1},
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
		notifyOnNetworkStatusChange: true,
	});

	const {data: myData, loading: myLoading, refetch: myRefetch} = useQuery<
		MyPostsQueryData,
		MyPostsQueryVariables
	>(MY_POSTS_QUERY, {
		variables: {
			page: myPage,
			sort: {publishedAt: -1, updatedAt: -1},
		},
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
		notifyOnNetworkStatusChange: true,
	});

	useEffect(() => {
		if (
			data &&
			posts[posts.length - 1]?.id !==
				data.posts.docs[data.posts.docs.length - 1]?.id
		)
			setPosts((posts) => [...posts, ...data.posts.docs]);
	}, [data]);

	useEffect(() => {
		if (
			myData &&
			myPosts[myPosts.length - 1]?.id !==
				myData.myPosts.docs[myData.myPosts.docs.length - 1]?.id
		)
			setMyPosts((posts) => [...posts, ...myData.myPosts.docs]);
	}, [myData]);

	useEffect(() => {
		if (!loading && !posts.length) {
			setPage(1);
			refetch();
		}
	}, [posts]);

	useEffect(() => {
		if (!myLoading && !myPosts.length) {
			setMyPage(1);
			myRefetch();
		}
	}, [myPosts]);

	const reload = () => async () => {
		setPage(1);
		setMyPage(1);
		setPosts([]);
		setMyPosts([]);
		await refetch();
	};

	return {
		loading,
		posts,
		results: data?.posts?.results,
		myLoading,
		myPosts,
		myResults: myData?.myPosts?.results,
		reload: reload(),
	};
};
