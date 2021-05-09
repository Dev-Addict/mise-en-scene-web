import {createContext, Dispatch, SetStateAction} from 'react';

import {Post, PostSort} from '../../../types';

export interface PostContextType {
	posts: Post[];
	loading: boolean;
	loadMore: () => void;
	reload: () => void;
	results?: number;
	setSort: Dispatch<SetStateAction<PostSort>>;
	sort: PostSort;
}

export const PostContext = createContext<PostContextType>({
	posts: [],
	loading: true,
	loadMore: () => {},
	reload: () => {},
	results: undefined,
	setSort: () => {},
	sort: PostSort.LAST,
});
