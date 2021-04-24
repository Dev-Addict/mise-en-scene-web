import {gql} from '@apollo/client';

import {ChannelAdmin} from '../../../../types';

export const REJECT_ADMIN_MUTATION = gql`
	mutation RejectAdmin($channel: ID!) {
		rejectAdmin(data: {channel: $channel}) {
			id
		}
	}
`;

export interface RejectAdminMutationData {
	rejectAdmin?: ChannelAdmin;
}

export interface RejectAdminMutationVariables {
	channel: string;
}
