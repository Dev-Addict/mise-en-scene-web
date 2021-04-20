import {Channel} from './channel.model';
import {User} from '../user';
import {ChannelAdminPermission} from '../../enums';

export interface ChannelAdmin {
	id?: string;
	channel?: string;
	channelData?: Channel;
	user?: string;
	userData?: User;
	permissions?: ChannelAdminPermission[];
	accepted?: boolean;
}
