import {gql} from '@apollo/client';

import {Post, None} from '../../../types';

export const POST_QUERY = gql`
	query Post($id: ID!) {
		post(id: $id) {
			id
			bodyData
			channelData {
				id
				cover
				followers
				handle
				name
				isFollowed
			}
			coverData {
				alt
				image
				directory
				width
				height
			}
			description
			subtitle
			title
			tags
			publishedAt
			rating
			raters
			view
			myRating {
				rating
			}
		}
	}
`;

export interface PostQueryData {
	post: None<Post>;
}

export interface PostQueryVariables {
	id: string;
}
