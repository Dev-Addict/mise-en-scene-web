import {nonNull, queryField} from 'nexus';

import {Post} from '../../models';

export const PostQuery = queryField('post', {
	type: Post,
	args: {
		id: nonNull('ID'),
	},
	resolve(_root, {id}, {models: {Post}}) {
		return <any>Post.findOne({_id: id, published: true});
	},
});
