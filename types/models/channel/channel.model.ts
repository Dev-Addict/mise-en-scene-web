import {User} from '../user';
import {ChannelAdmin} from './channel-admin.model';

export interface Channel {
	id?: string;
	handle?: string;
	name?: string;
	owner?: string;
	ownerData?: User;
	cover?: string;
	verified?: boolean;
	admins?: ChannelAdmin[];
}
