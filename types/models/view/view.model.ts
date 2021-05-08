import {Channel} from '../channel';
import {User} from '../user';
import {Device, OS} from '../../enums';
import {None} from '../../none.type';

export interface View {
	id?: string;
	authed?: boolean;
	bot?: boolean;
	channel?: None<string>;
	channelData?: None<Channel>;
	city?: string;
	conversations?: boolean;
	country?: string;
	device?: Device;
	ip?: string;
	latitude?: string;
	longitude?: string;
	os?: OS;
	path?: None<string>;
	posts?: boolean;
	timeSpent?: number;
	user?: None<string>;
	userData?: None<User>;
	version?: string;
	viewEnd?: Date;
	viewStart?: Date;
	ended?: boolean;
}
