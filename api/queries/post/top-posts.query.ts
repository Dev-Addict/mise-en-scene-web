import {gql} from '@apollo/client';

import {Post} from '../../../types';

export const TOP_POSTS_QUERY = gql`
	query TopPosts {
		topPosts {
			id
			coverData {
				directory
				image
			}
			title
			subtitle
			description
			rating
			view
			publishedAt
			channelData {
				cover
				id
				handle
			}
		}
	}
`;

export interface TopPostsQueryData {
	topPosts: Post[];
}

export interface TopPostsQueryVariables {}
