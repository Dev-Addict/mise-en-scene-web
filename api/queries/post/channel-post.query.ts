import {gql} from '@apollo/client';

import {Post} from '../../../types';

export const CHANNEL_POST_QUERY = gql`
	query ChannelPost($id: ID!) {
		channelPost(id: $id) {
			id
			adminData {
				id
			}
			bodyData
			coverData {
				alt
				directory
				height
				width
				id
				image
			}
			description
			publishAt
			published
			subtitle
			tags
			title
		}
	}
`;

export interface ChannelPostQueryData {
	channelPost: Post;
}

export interface ChannelPostQueryVariables {
	id: string;
}
