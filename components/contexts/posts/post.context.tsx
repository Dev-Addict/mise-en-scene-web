import {createContext} from 'react';

import {Post} from '../../../types';

export interface PostContextType {
	posts: Post[];
	loading: boolean;
	loadMore: () => void;
	reload: () => void;
	results?: number;
}

export const PostContext = createContext<PostContextType>({
	posts: [],
	loading: true,
	loadMore: () => {},
	reload: () => {},
	results: undefined,
});
