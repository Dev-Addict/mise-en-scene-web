import {User} from '../user';
import {None} from '../../none.type';
import {Gif} from '../gif';
import {Image} from '../image';
import {AnnouncementPoll} from './announcement-poll.model';
import {AnnouncementLike} from './announcement-like.model';
import {AnnouncementDislike} from './announcement-dislike.model';

export interface Announcement {
	id?: string;
	text?: None<string>;
	user?: string;
	userData?: User;
	publishAt?: None<number>;
	gif?: None<string>;
	gifData?: None<Gif>;
	images?: string[];
	imagesData?: Image[];
	poll?: None<string>;
	pollData?: None<AnnouncementPoll>;
	published?: boolean;
	publishedAt?: number;
	like?: number;
	likeData?: AnnouncementLike[];
	dislike?: number;
	dislikeData?: AnnouncementDislike[];
	isLiked?: boolean;
	isDisliked?: boolean;
	reAnnouncement?: None<string>;
	reAnnouncementData?: None<Announcement>;
	reAnnouncements?: number;
}
