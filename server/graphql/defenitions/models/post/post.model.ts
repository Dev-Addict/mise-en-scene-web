import {objectType} from 'nexus';

import {DateScalar, JSONScalar} from '../../scalars';
import {Channel, ChannelAdmin} from '../channel';
import {Image} from '../image';
import {readJson} from '../../../utils';

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
		t.nonNull.string('body');
		t.nonNull.field('bodyData', {
			type: JSONScalar,
			resolve({body}, _args) {
				return readJson(body, 'post');
			},
		});
		t.field('publishAt', {type: DateScalar});
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
			async resolve({admin}, _args, {models: {ChannelAdmin}}) {
				return <any>ChannelAdmin.findById(admin);
			},
		});
	},
});
