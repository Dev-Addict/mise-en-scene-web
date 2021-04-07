import {AnnouncementPollOption} from './announcement-poll-option.model';
import {AnnouncementPollResult} from './announcement-poll-result.model';
import {None} from '../../none.type';

export interface AnnouncementPoll {
	id?: string;
	question?: string;
	option?: string[];
	optionsData?: AnnouncementPollOption[];
	votes?: number;
	votesData?: AnnouncementPollResult[];
	myVote?: None<AnnouncementPollResult>;
}
