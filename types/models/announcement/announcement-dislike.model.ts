import {Announcement} from './announcement.model';
import {User} from '../user';

export interface AnnouncementDislike {
	id?: string;
	announcement?: string;
	announcementDate?: Announcement;
	user?: string;
	userDate?: User;
}
