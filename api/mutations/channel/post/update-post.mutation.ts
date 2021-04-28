import {gql} from '@apollo/client';

import {Post} from '../../../../types';

export const UPDATE_POST_MUTATION = gql`
	mutation UpdatePost(
		$id: ID!
		$body: JSON
		$cover: ID
		$description: String
		$publishAt: Date
		$published: Boolean
		$subtitle: String
		$tags: [String!]
		$title: String
	) {
		updatePost(
			data: {
				body: $body
				cover: $cover
				description: $description
				publishAt: $publishAt
				published: $published
				subtitle: $subtitle
				tags: $tags
				title: $title
			}
			id: $id
		) {
			id
		}
	}
`;

export interface UpdatePostMutationData {
	updatePost: Post;
}

export interface UpdatePostMutationVariables {
	id: string;
	body?: {[key: string]: any};
	cover?: string;
	description?: string;
	publishAt?: number;
	published?: boolean;
	subtitle?: string;
	tags?: string[];
	title?: string;
}
