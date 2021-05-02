import {gql} from '@apollo/client';

export const FOLLOW_CHANNEL_MUTATION = gql`
	mutation FollowChannel($following: ID!) {
		followChannel(data: {following: $following}) {
			id
		}
	}
`;

export interface FollowChannelMutationVariables {
	following: string;
}

export interface FollowChannelMutationData {
	followChannel: {
		id: string;
	};
}
