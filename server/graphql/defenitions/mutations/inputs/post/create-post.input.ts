import {inputObjectType} from 'nexus';

import {DateScalar, JSONScalar} from '../../../scalars';

export const CreatePostData = inputObjectType({
	name: 'CreatePostData',
	definition(t) {
		t.id('cover');
		t.nonNull.string('title');
		t.string('subtitle');
		t.string('description');
		t.list.nonNull.string('tags');
		t.nonNull.field('body', {type: JSONScalar});
		t.field('publishAt', {type: DateScalar});
		t.boolean('published');
		t.nonNull.id('channel');
		t.id('admin');
	},
});
