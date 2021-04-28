import {gql} from '@apollo/client';

import {Post} from '../../../../types';

export const CREATE_POST_MUTATION = gql`
	mutation CreatePost(
		$body: JSON!
		$channel: ID!
		$cover: ID
		$description: String
		$publishAt: Date
		$published: Boolean
		$subtitle: String
		$tags: [String!]!
		$title: String!
		$admin: ID
	) {
		createPost(
			data: {
				body: $body
				channel: $channel
				cover: $cover
				description: $description
				publishAt: $publishAt
				published: $published
				subtitle: $subtitle
				tags: $tags
				title: $title
				admin: $admin
			}
		) {
			id
		}
	}
`;

export interface CreatePostMutationData {
	createPost: Post;
}

export interface CreatePostMutationVariables {
	body: {[key: string]: any};
	channel: string;
	cover?: string;
	description?: string;
	publishAt?: number;
	published?: boolean;
	subtitle?: string;
	tags: string[];
	title: string;
	admin?: string;
}
