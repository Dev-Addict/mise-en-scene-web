import {list, nonNull, objectType} from 'nexus';

import {DateScalar} from '../../scalars';
import {Gif} from '../gif';
import {Image} from '../image';
import {AnnouncementPoll} from './announcement-poll.model';
import {AnnouncementLike} from './announcement-like.model';
import {AnnouncementDislike} from './announcement-dislike.model';

export const Announcement = objectType({
	name: 'Announcement',
	definition(t) {
		t.nonNull.string('text');
		t.field('publishAt', {type: DateScalar});
		t.id('gif');
		t.field('gifData', {
			type: Gif,
			resolve({gif}, _args, {models: {Gif}}) {
				return Gif.findById(gif);
			},
		});
		t.nonNull.list.id('images');
		t.nonNull.list.field('imagesData', {
			type: nonNull(Image),
			resolve({images}, _args, {models: {Image}}) {
				return Image.find({id: images});
			},
		});
		t.id('poll');
		t.field('pollData', {
			type: AnnouncementPoll,
			resolve({poll}, _args, {models: {AnnouncementPoll}}) {
				return AnnouncementPoll.findById(poll);
			},
		});
		t.nonNull.int('like', {
			resolve({id}, _args, {models: {AnnouncementLike}}) {
				return AnnouncementLike.countDocuments({announcement: id});
			},
		});
		t.nonNull.field('likeData', {
			type: list(nonNull(AnnouncementLike)),
			resolve({id}, _args, {models: {AnnouncementLike}}) {
				return AnnouncementLike.find({announcement: id});
			},
		});
		t.nonNull.int('dislike', {
			resolve({id}, _args, {models: {AnnouncementDislike}}) {
				return AnnouncementDislike.countDocuments({announcement: id});
			},
		});
		t.nonNull.field('dislikeData', {
			type: list(nonNull(AnnouncementDislike)),
			resolve({id}, _args, {models: {AnnouncementDislike}}) {
				return AnnouncementDislike.find({announcement: id});
			},
		});
	},
});
