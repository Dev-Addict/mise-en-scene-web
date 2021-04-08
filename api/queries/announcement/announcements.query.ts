import {gql} from '@apollo/client';

import {Announcement} from '../../../types';

export const ANNOUNCEMENTS_QUERY = gql`
	query Announcements($filter: JSON, $page: Int, $sort: JSON) {
		announcements(filter: $filter, page: $page, sort: $sort) {
			results
			docs {
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
	}
`;

export interface AnnouncementsQueryData {
	announcements: {
		results: number;
		docs: Announcement[];
	};
}

export interface AnnouncementsQueryVariables {
	filter?: {[key: string]: any};
	sort?: {[key: string]: any};
	page?: number;
}
