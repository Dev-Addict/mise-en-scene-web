import {Image} from '../image';
import {None} from '../../none.type';
import {Channel, ChannelAdmin} from '../channel';

export interface Post {
	id?: string;
	cover?: None<string>;
	coverData?: None<Image>;
	title?: string;
	subtitle?: None<string>;
	description?: None<string>;
	tags?: string[];
	body?: string;
	bodyData?: {[key: string]: any};
	publishAt?: None<number>;
	published?: boolean;
	channel?: string;
	channelData?: Channel;
	admin?: None<string>;
	adminData?: None<ChannelAdmin>;
}
