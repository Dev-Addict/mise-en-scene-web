import {User} from '../user';
import {ChannelAdmin} from './channel-admin.model';
import {None} from '../../none.type';

export interface Channel {
	id?: string;
	handle?: string;
	name?: string;
	owner?: string;
	ownerData?: User;
	cover?: string;
	verified?: boolean;
	admins?: ChannelAdmin[];
	myAdmin?: None<ChannelAdmin>;
}
