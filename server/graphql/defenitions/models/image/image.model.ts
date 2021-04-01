import {objectType} from 'nexus';

export const Image = objectType({
	name: 'Image',
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.string('image');
		t.nonNull.string('directory');
		t.nonNull.float('width');
		t.nonNull.float('height');
		t.string('alt');
	},
});
