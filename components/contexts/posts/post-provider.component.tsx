import React, {FC, useState} from 'react';

import {PostContext} from './post.context';
import {usePostsQuery} from '../../../hooks';

interface Props {
	filter?: {
		[key: string]: any;
	};
	my?: boolean;
}

export const PostProvider: FC<Props> = ({children, filter, my = false}) => {
	const [page, setPage] = useState(1);
	const [myPage, setMyPage] = useState(1);

	const {
		posts,
		loading,
		results,
		myPosts,
		myLoading,
		myResults,
		reload,
	} = usePostsQuery(filter || {}, page, setPage, myPage, setMyPage);

	const loadMore = () => () =>
		my
			? myPosts.length < (myResults || 0) && setMyPage((page) => page + 1)
			: posts.length < (results || 0) && setPage((page) => page + 1);

	return (
		<PostContext.Provider
			value={{
				posts: my ? myPosts : posts,
				loading: my ? myLoading : loading,
				loadMore: loadMore(),
				results: my ? myResults : results,
				reload,
			}}>
			{children}
		</PostContext.Provider>
	);
};
