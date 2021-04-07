import {Announcement} from './announcement.model';
import {User} from '../user';

export interface AnnouncementLike {
	id?: string;
	announcement?: string;
	announcementDate?: Announcement;
	user?: string;
	userDate?: User;
}
