import {gql} from '@apollo/client';

import {AnnouncementDislike} from '../../../types';

export const DISLIKE_MUTATION = gql`
	mutation Dislike($announcement: ID!) {
		dislike(announcement: $announcement) {
			id
		}
	}
`;

export interface DislikeMutationVariables {
	announcement: string;
}

export interface DislikeMutationData {
	dislike: AnnouncementDislike;
}
