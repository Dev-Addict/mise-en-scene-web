import {gql} from '@apollo/client';

export const ANNOUNCE_MUTATION = gql`
	mutation Announce(
		$text: String!
		$gif: ID
		$images: [Upload!]
		$poll: AnnouncementPollData
		$publishAt: Date
	) {
		announce(
			data: {
				text: $text
				gif: $gif
				images: $images
				poll: $poll
				publishAt: $publishAt
			}
		) {
			id
		}
	}
`;

export interface AnnounceMutationVariablesPoll {
	question: string;
	options: string[];
}

export interface AnnounceMutationVariables {
	text: string;
	gif?: string;
	images?: File[];
	poll?: AnnounceMutationVariablesPoll;
	publishAt?: string;
}

export interface AnnounceMutationDataAnnounce {
	id: string;
}

export interface AnnounceMutationData {
	announce: AnnounceMutationDataAnnounce;
}
