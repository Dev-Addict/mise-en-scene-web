import {gql} from '@apollo/client';

import {Announcement} from '../../../types';

export const DELETE_ANNOUNCEMENT_MUTATION = gql`
	mutation DeleteAnnouncement($id: ID!) {
		deleteAnnouncement(id: $id) {
			id
		}
	}
`;

export interface DeleteAnnouncementMutationData {
	deleteAnnouncement?: Announcement;
}

export interface DeleteAnnouncementMutationVariables {
	id: string;
}
