import {gql} from '@apollo/client';
import {ChannelAdmin, ChannelAdminPermission} from '../../../../types';

export const ADD_ADMIN_MUTATION = gql`
	mutation AddAdmin(
		$permissions: [ChannelAdminPermission!]!
		$admin: ID!
		$channel: ID!
	) {
		addAdmin(
			data: {permissions: $permissions, admin: $admin, channel: $channel}
		) {
			id
		}
	}
`;

export interface AddAdminMutationData {
	addAdmin: ChannelAdmin;
}

export interface AddAdminMutationVariables {
	permissions: ChannelAdminPermission[];
	admin: string;
	channel: string;
}
