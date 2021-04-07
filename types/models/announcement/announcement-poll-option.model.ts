import {AnnouncementPollResult} from './announcement-poll-result.model';

export interface AnnouncementPollOption {
	poll?: string;
	index?: number;
	option?: string;
	votes?: number;
	votesData?: AnnouncementPollResult[];
}
