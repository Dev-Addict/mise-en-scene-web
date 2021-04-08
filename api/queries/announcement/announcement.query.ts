import {gql} from '@apollo/client';

import {Announcement, None} from '../../../types';

export const ANNOUNCEMENT_QUERY = gql`
	query Announcement($id: ID!) {
		announcement(id: $id) {
			id
			userData {
				id
				firstname
				lastname
				username
				displayName
				avatar
			}
			text
			gifData {
				url
				width
				height
			}
			imagesData {
				image
				directory
				width
				height
				alt
			}
			pollData {
				id
				question
				optionsData {
					option
					votes
					index
				}
				votes
				myVote {
					option
				}
			}
			publishedAt
			like
			dislike
			isLiked
			isDisliked
			reAnnouncementData {
				id
				userData {
					id
					firstname
					lastname
					username
					displayName
					avatar
				}
				text
				gifData {
					url
					width
					height
				}
				imagesData {
					image
					directory
					width
					height
					alt
				}
				pollData {
					id
					question
					optionsData {
						option
						votes
						index
					}
					votes
					myVote {
						option
					}
				}
				publishedAt
				like
				dislike
				isLiked
				isDisliked
				reAnnouncements
				comments
			}
			reAnnouncements
			comments
		}
	}
`;

export interface AnnouncementQueryData {
	announcement: None<Announcement>;
}

export interface AnnouncementQueryVariables {
	id: string;
}
