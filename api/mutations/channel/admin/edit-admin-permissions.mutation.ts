import {gql} from '@apollo/client';
import {ChannelAdmin, ChannelAdminPermission} from '../../../../types';

export const EDIT_ADMIN_PERMISSIONS_MUTATION = gql`
	mutation EditAdminPermissions(
		$channel: ID!
		$permissions: [ChannelAdminPermission!]!
		$admin: ID!
	) {
		editAdminPermissions(
			data: {channel: $channel, permissions: $permissions, admin: $admin}
		) {
			id
		}
	}
`;

export interface EditAdminPermissionsMutationData {
	editAdminPermissions: ChannelAdmin;
}

export interface EditAdminPermissionsMutationVariables {
	channel: string;
	permissions: ChannelAdminPermission[];
	admin: string;
}
