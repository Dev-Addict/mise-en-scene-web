import {gql} from '@apollo/client';

import {ChannelAdmin} from '../../../../types';

export const ACCEPT_ADMIN_MUTATION = gql`
	mutation AcceptAdmin($channel: ID!) {
		acceptAdmin(data: {channel: $channel}) {
			id
		}
	}
`;

export interface AcceptAdminMutationData {
	acceptAdmin?: ChannelAdmin;
}

export interface AcceptAdminMutationVariables {
	channel: string;
}
