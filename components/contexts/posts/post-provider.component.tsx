import React, {FC, useEffect, useState} from 'react';

import {PostContext} from './post.context';
import {usePostsQuery} from '../../../hooks';
import {useRouter} from 'next/router';
import {PostSort} from '../../../types';

interface Props {
	filter?: {
		[key: string]: any;
	};
	my?: boolean;
}

export const PostProvider: FC<Props> = ({children, filter, my = false}) => {
	const router = useRouter();
	const {sort: outSort} = router.query;

	const [page, setPage] = useState(1);
	const [myPage, setMyPage] = useState(1);
	const [sort, setSort] = useState(
		(outSort as PostSort | undefined) || PostSort.LAST
	);

	const {
		posts,
		loading,
		results,
		myPosts,
		myLoading,
		myResults,
		reload,
	} = usePostsQuery(filter || {}, page, setPage, myPage, setMyPage, sort);

	const loadMore = () => () =>
		my
			? myPosts.length < (myResults || 0) && setMyPage((page) => page + 1)
			: posts.length < (results || 0) && setPage((page) => page + 1);

	useEffect(() => {
		setSort((outSort as PostSort) || PostSort.LAST);
	}, [outSort]);

	return (
		<PostContext.Provider
			value={{
				posts: my ? myPosts : posts,
				loading: my ? myLoading : loading,
				loadMore: loadMore(),
				results: my ? myResults : results,
				reload,
				setSort,
				sort,
			}}>
			{children}
		</PostContext.Provider>
	);
};
