import {gql} from '@apollo/client';

import {Post, PostSort} from '../../../types';

export const POSTS_QUERY = gql`
	query Posts($filter: JSON, $page: Int, $sort: PostSort, $limit: Int) {
		posts(filter: $filter, page: $page, sort: $sort, limit: $limit) {
			results
			docs {
				id
				title
				channelData {
					id
					handle
					cover
				}
				coverData {
					alt
					directory
					image
					width
					height
				}
				publishedAt
				subtitle
				rating
				view
				seen
			}
		}
	}
`;

export interface PostsQueryData {
	posts: {
		results: number;
		docs: Post[];
	};
}

export interface PostsQueryVariables {
	filter?: {[key: string]: any};
	sort?: PostSort;
	page?: number;
	limit?: number;
}
