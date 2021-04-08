import {gql} from '@apollo/client';
import {Announcement} from '../../../types';

export const ANNOUNCE_MUTATION = gql`
	mutation Announce(
		$text: String
		$gif: ID
		$images: [Upload!]
		$poll: AnnouncementPollData
		$publishAt: Date
		$reAnnouncement: ID
		$comment: ID
	) {
		announce(
			data: {
				text: $text
				gif: $gif
				images: $images
				poll: $poll
				publishAt: $publishAt
				reAnnouncement: $reAnnouncement
				comment: $comment
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
	reAnnouncement?: string;
	comment?: string;
}

export interface AnnounceMutationData {
	announce: Announcement;
}
