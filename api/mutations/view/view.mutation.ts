import {gql} from '@apollo/client';

import {View} from '../../../types';

export const VIEW_MUTATION = gql`
	mutation ViewMutation(
		$page: String!
		$post: ID
		$channel: ID
		$conversations: Boolean
		$posts: Boolean
	) {
		view(
			data: {
				page: $page
				post: $post
				channel: $channel
				conversations: $conversations
				posts: $posts
			}
		) {
			id
		}
	}
`;

export interface ViewMutationData {
	view: View;
}

export interface ViewMutationVariables {
	page: string;
	post?: string;
	channel?: string;
	conversations?: boolean;
	posts?: boolean;
}
