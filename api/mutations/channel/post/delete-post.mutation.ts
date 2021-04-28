import {gql} from '@apollo/client';

import {Post} from '../../../../types';

export const DELETE_POST_MUTATION = gql`
	mutation DeletePost($id: ID!) {
		deletePost(id: $id) {
			id
		}
	}
`;

export interface DeletePostMutationData {
	deletePost?: Post;
}

export interface DeletePostMutationVariables {
	id: string;
}
