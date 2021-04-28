import {inputObjectType} from 'nexus';

import {DateScalar, JSONScalar} from '../../../scalars';

export const UpdatePostData = inputObjectType({
	name: 'UpdatePostData',
	definition(t) {
		t.id('cover');
		t.string('title');
		t.string('subtitle');
		t.string('description');
		t.list.nonNull.string('tags');
		t.field('body', {type: JSONScalar});
		t.field('publishAt', {type: DateScalar});
		t.boolean('published');
	},
});
