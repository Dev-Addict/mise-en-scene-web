import {gql} from '@apollo/client';

import {AnnouncementLike} from '../../../types';

export const LIKE_MUTATION = gql`
	mutation Like($announcement: ID!) {
		like(announcement: $announcement) {
			id
		}
	}
`;

export interface LikeMutationVariables {
	announcement: string;
}

export interface LikeMutationData {
	like: AnnouncementLike;
}
