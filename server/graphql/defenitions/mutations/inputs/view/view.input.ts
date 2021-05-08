import {inputObjectType} from 'nexus';

export const ViewData = inputObjectType({
	name: 'ViewData',
	definition(t) {
		t.nonNull.string('page');
		t.id('post');
		t.id('channel');
		t.boolean('conversations');
		t.boolean('posts');
	},
});
