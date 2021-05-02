import {Image} from '../image';
import {None} from '../../none.type';
import {Channel, ChannelAdmin} from '../channel';
import {PostRating} from './post-rating.model';

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
	publishedAt?: number;
	channel?: string;
	channelData?: Channel;
	admin?: None<string>;
	adminData?: None<ChannelAdmin>;
	rating?: number;
	raters?: number;
	myRating?: None<PostRating>;
}
