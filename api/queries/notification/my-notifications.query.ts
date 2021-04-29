import {gql} from '@apollo/client';
import {Notification} from '../../../types';

export const MY_NOTIFICATIONS_QUERY = gql`
	query MyNotifications($page: Int) {
		myNotifications(page: $page) {
			docs {
				id
				type
				userData {
					username
					firstname
					lastname
					displayName
					avatar
				}
				announcementData {
					id
				}
				seen
			}
			results
		}
	}
`;

export interface MyNotificationsQueryData {
	myNotifications: {
		docs: Notification[];
		results: number;
	};
}

export interface MyNotificationsQueryVariables {
	page?: number;
}
