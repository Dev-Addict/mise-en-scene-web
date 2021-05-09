import {objectType} from 'nexus';

import {Post} from './post.model';
import {User} from '../user';
import {DateScalar} from '../../scalars';

export const PostRating = objectType({
	name: 'PostRating',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('post');
		t.nonNull.field('postData', {
			type: Post,
			resolve({post}, _args, {models: {Post}}) {
				return <any>Post.findById(post);
			},
		});
		t.nonNull.id('user');
		t.nonNull.field('userData', {
			type: User,
			resolve({user}, _args, {models: {User}}) {
				return <any>User.findById(user);
			},
		});
		t.nonNull.int('rating');
		t.nonNull.field('ratedAt', {type: DateScalar});
	},
});
