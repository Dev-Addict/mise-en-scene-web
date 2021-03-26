import {gql} from '@apollo/client';

export const FOLLOW_MUTATION = gql`
	mutation Follow($following: ID!) {
		follow(data: {following: $following}) {
			id
		}
	}
`;

export interface FollowMutationVariables {
	following: string;
}

export interface FollowMutationDataFollow {
	id: string;
}

export interface FollowMutationData {
	follow: FollowMutationDataFollow;
}
