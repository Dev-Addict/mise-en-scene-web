import {User} from '../user';
import {Post} from '../post';
import {Announcement} from '../announcement';
import {NotificationType} from '../../enums';
import {None} from '../../none.type';

export interface Notification {
	id?: string;
	to?: string;
	toData?: User;
	type?: NotificationType;
	user?: None<string>;
	userData?: None<User>;
	announcement?: None<string>;
	announcementData?: None<Announcement>;
	post?: None<string>;
	postData?: None<Post>;
	seen?: boolean;
}
