import {objectType} from 'nexus';

export const Gif = objectType({
	name: 'Gif',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.id('giphyId');
		t.nonNull.string('title');
		t.nonNull.string('url');
		t.nonNull.int('width');
		t.nonNull.int('height');
	},
});
