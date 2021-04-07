import {gql} from '@apollo/client';
import {AnnouncementPollResult} from '../../../types';

export const VOTE_MUTATION = gql`
	mutation Vote($poll: ID!, $option: Int!) {
		vote(data: {poll: $poll, option: $option}) {
			id
		}
	}
`;

export interface VoteMutationVariables {
	poll: string;
	option: number;
}

export interface VoteMutationData {
	vote: AnnouncementPollResult;
}
