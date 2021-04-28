import {gql} from '@apollo/client';
import {Post} from '../../../types';

export const CHANNEL_POSTS_QUERY = gql`
	query ChannelPosts($channel: ID!, $page: Int, $limit: Int) {
		channelPosts(channel: $channel, page: $page, limit: $limit) {
			docs {
				coverData {
					id
					width
					height
					alt
					directory
					image
				}
				published
				adminData {
					id
					userData {
						avatar
						username
						firstname
						lastname
						displayName
					}
				}
				title
				subtitle
				description
				id
			}
			results
		}
	}
`;

export interface ChannelPostsQueryData {
	channelPosts: {
		docs: Post[];
		results: number;
	};
}

export interface ChannelPostsQueryVariables {
	channel: string;
	page?: number;
	limit?: number;
}
