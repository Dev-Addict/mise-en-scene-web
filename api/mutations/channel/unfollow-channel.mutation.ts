import {gql} from '@apollo/client';

export const UNFOLLOW_CHANNEL_MUTATION = gql`
	mutation UnfollowChannel($following: ID!) {
		unfollowChannel(data: {following: $following}) {
			id
		}
	}
`;

export interface UnfollowChannelMutationVariables {
	following: string;
}

export interface UnfollowChannelMutationData {
	unfollowChannel: {
		id: string;
	};
}
