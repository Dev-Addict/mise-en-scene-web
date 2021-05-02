import {gql} from '@apollo/client';

import {Post} from '../../../types';

export const MY_POSTS_QUERY = gql`
	query MyPosts($filter: JSON, $page: Int, $sort: JSON) {
		myPosts(filter: $filter, page: $page, sort: $sort) {
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

export interface MyPostsQueryData {
	myPosts: {
		results: number;
		docs: Post[];
	};
}

export interface MyPostsQueryVariables {
	filter?: {[key: string]: any};
	sort?: {[key: string]: any};
	page?: number;
}
