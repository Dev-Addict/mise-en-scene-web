import {list, nonNull, objectType} from 'nexus';

import {DateScalar} from '../../scalars';
import {Gif} from '../gif';
import {Image} from '../image';
import {AnnouncementPoll} from './announcement-poll.model';
import {AnnouncementLike} from './announcement-like.model';
import {AnnouncementDislike} from './announcement-dislike.model';
import {User} from '../user';
import {protect} from '../../../../utils';

export const Announcement = objectType({
	name: 'Announcement',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('user');
		t.nonNull.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return <any>User.findById(user);
			},
		});
		t.string('text');
		t.field('publishAt', {type: DateScalar});
		t.id('gif');
		t.field('gifData', {
			type: Gif,
			resolve({gif}, _args, {models: {Gif}}) {
				return <any>Gif.findById(gif);
			},
		});
		t.nonNull.list.id('images');
		t.nonNull.list.field('imagesData', {
			type: nonNull(Image),
			resolve({images}, _args, {models: {Image}}) {
				return <any>Image.find({_id: {$in: images}});
			},
		});
		t.id('poll');
		t.field('pollData', {
			type: AnnouncementPoll,
			resolve({poll}, _args, {models: {AnnouncementPoll}}) {
				return <any>AnnouncementPoll.findById(poll);
			},
		});
		t.nonNull.boolean('published');
		t.nonNull.field('publishedAt', {type: DateScalar});
		t.nonNull.int('like', {
			resolve({id}, _args, {models: {AnnouncementLike}}) {
				return AnnouncementLike.countDocuments({announcement: id});
			},
		});
		t.nonNull.field('likeData', {
			type: list(nonNull(AnnouncementLike)),
			resolve({id}, _args, {models: {AnnouncementLike}}) {
				return <any>AnnouncementLike.find({announcement: id});
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
				return <any>AnnouncementDislike.find({announcement: id});
			},
		});
		t.nonNull.boolean('isLiked', {
			async resolve({id}, _args, {req, models: {User, AnnouncementLike}}) {
				const user = req.user || (await protect(req, User, false));

				return user
					? await AnnouncementLike.exists({announcement: id, user: user.id})
					: false;
			},
		});
		t.nonNull.boolean('isDisliked', {
			async resolve({id}, _args, {req, models: {User, AnnouncementDislike}}) {
				const user = req.user || (await protect(req, User, false));

				return user
					? await AnnouncementDislike.exists({announcement: id, user: user.id})
					: false;
			},
		});
		t.id('reAnnouncement');
		t.field('reAnnouncementData', {
			type: Announcement,
			resolve({reAnnouncement}, _args, {models: {Announcement}}) {
				return <any>Announcement.findById(reAnnouncement);
			},
		});
		t.nonNull.int('reAnnouncements', {
			resolve({id}, _args, {models: {Announcement}}) {
				return Announcement.countDocuments({reAnnouncement: id});
			},
		});
	},
});
