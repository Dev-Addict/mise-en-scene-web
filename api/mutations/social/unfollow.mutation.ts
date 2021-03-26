import {gql} from '@apollo/client';

export const UNFOLLOW_MUTATION = gql`
	mutation Unfollow($following: ID!) {
		unfollow(data: {following: $following}) {
			id
		}
	}
`;

export interface UnfollowMutationVariables {
	following: string;
}

export interface UnfollowMutationDataFollow {
	id: string;
}

export interface UnfollowMutationData {
	follow: UnfollowMutationDataFollow;
}
