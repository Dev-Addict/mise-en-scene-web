import {AnnouncementPoll} from './announcement-poll.model';
import {User} from '../user';

export interface AnnouncementPollResult {
	id?: string;
	poll?: string;
	pollData?: AnnouncementPoll;
	user?: string;
	userData?: User;
	option?: number;
}
