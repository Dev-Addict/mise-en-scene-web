import {Types} from 'mongoose';
import {objectType} from 'nexus';

import {DateScalar, JSONScalar} from '../../scalars';
import {Channel, ChannelAdmin} from '../channel';
import {Image} from '../image';
import {readJson} from '../../../utils';
import {PostRating} from './post-rating.model';
import {protect} from '../../../../utils';

export const Post = objectType({
	name: 'Post',
	definition(t) {
		t.nonNull.id('id');
		t.id('cover');
		t.field('coverData', {
			type: Image,
			resolve({cover}, _args, {models: {Image}}) {
				return <any>Image.findById(cover);
			},
		});
		t.nonNull.string('title');
		t.string('subtitle');
		t.string('description');
		t.nonNull.list.nonNull.string('tags');
		t.string('body');
		t.field('bodyData', {
			type: JSONScalar,
			resolve({body}, _args) {
				return body && readJson(body, 'post');
			},
		});
		t.field('publishAt', {type: DateScalar});
		t.nonNull.field('publishedAt', {type: DateScalar});
		t.nonNull.boolean('published');
		t.nonNull.id('channel');
		t.nonNull.field('channelData', {
			type: Channel,
			async resolve({channel}, _args, {models: {Channel}}) {
				return <any>Channel.findById(channel);
			},
		});
		t.id('admin');
		t.field('adminData', {
			type: ChannelAdmin,
			resolve({admin}, _args, {models: {ChannelAdmin}}) {
				return <any>ChannelAdmin.findById(admin);
			},
		});
		t.nonNull.float('rating', {
			async resolve({id}, _args, {models: {PostRating}}) {
				return (
					(
						await PostRating.aggregate([
							{
								$match: {
									post: Types.ObjectId(id),
								},
							},
							{
								$group: {
									_id: '$post',
									rating: {
										$avg: '$rating',
									},
								},
							},
						])
					)[0]?.rating || 0
				);
			},
		});
		t.nonNull.int('raters', {
			resolve({id}, _args, {models: {PostRating}}) {
				return PostRating.countDocuments({post: id});
			},
		});
		t.field('myRating', {
			type: PostRating,
			async resolve({id}, _args, {req, models: {PostRating, User}}) {
				const user = req.user || (await protect(req, User, false));

				return user ? <any>PostRating.findOne({
							post: Types.ObjectId(id) as any,
							user: user._id,
					  }) : undefined;
			},
		});
		t.nonNull.int('view', {
			resolve({id}, _args, {models: {View}}) {
				return View.countDocuments({
					post: id,
					ended: true,
					timeSpent: {$gte: 60000},
					bot: false,
				});
			},
		});
		t.nonNull.boolean('seen', {
			resolve({id}, _args, {req, models: {View}}) {
				return View.exists({
					post: id,
					ended: true,
					timeSpent: {$gte: 60000},
					user: req.user?.id,
					bot: false,
				});
			},
		});
	},
});
