import {gql} from '@apollo/client';

import {Announcement} from '../../../types';

export const MY_ANNOUNCEMENTS_QUERY = gql`
	query MyAnnouncements($filter: JSON, $page: Int, $sort: JSON) {
		myAnnouncements(filter: $filter, page: $page, sort: $sort) {
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

export interface MyAnnouncementsQueryData {
	myAnnouncements: {
		results: number;
		docs: Announcement[];
	};
}

export interface MyAnnouncementsQueryVariables {
	filter?: {[key: string]: any};
	sort?: {[key: string]: any};
	page?: number;
}
