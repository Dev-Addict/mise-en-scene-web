import {gql} from '@apollo/client';
import {ChannelAdmin} from '../../../../types';

export const REMOVE_ADMIN_MUTATION = gql`
	mutation RemoveAdmin($channel: ID!, $admin: ID!) {
		removeAdmin(data: {channel: $channel, admin: $admin}) {
			id
		}
	}
`;

export interface RemoveAdminMutationData {
	removeAdmin?: ChannelAdmin;
}

export interface RemoveAdminMutationVariables {
	channel: string;
	admin: string;
}
