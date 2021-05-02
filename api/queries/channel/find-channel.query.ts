import {gql} from '@apollo/client';

import {Channel, None} from '../../../types';

export const FIND_CHANNEL_QUERY = gql`
	query FindChannel($filter: JSON!) {
		findChannel(filter: $filter) {
			id
			name
			handle
			verified
			cover
			owner
			isFollowed
			followers
			ownerData {
				id
				username
				email
				firstname
				lastname
				displayName
			}
			admins {
				id
				accepted
				permissions
				userData {
					id
					username
					firstname
					lastname
					displayName
					email
				}
			}
			myAdmin {
				id
				accepted
				permissions
				userData {
					id
					username
					firstname
					lastname
					displayName
					email
				}
			}
		}
	}
`;

export interface FindChannelQueryData {
	findChannel: None<Channel>;
}

export interface FindChannelQueryVariables {
	filter: {[key: string]: any};
}
