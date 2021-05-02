import {gql} from '@apollo/client';

import {Post} from '../../../types';

export const POSTS_QUERY = gql`
	query Posts($filter: JSON, $page: Int, $sort: JSON) {
		posts(filter: $filter, page: $page, sort: $sort) {
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
	sort?: {[key: string]: any};
	page?: number;
}
