import {gql} from '@apollo/client';
import {Channel, QueryResponse} from '../../../types';

export const OWNED_CHANNELS_QUERY = gql`
	query OwnedChannels($page: Int) {
		ownedChannels(page: $page) {
			docs {
				id
				cover
				name
				handle
				owner
				admins {
					id
					accepted
				}
				verified
			}
			results
		}
	}
`;

export interface OwnedChannelsQueryData {
	ownedChannels: QueryResponse<Channel>;
}

export interface OwnedChannelsQueryVariables {
	page?: number;
}
