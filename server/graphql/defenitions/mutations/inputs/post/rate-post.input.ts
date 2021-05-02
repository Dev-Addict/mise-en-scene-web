import {inputObjectType} from 'nexus';

export const RatePostData = inputObjectType({
	name: 'RatePostData',
	definition(t) {
		t.nonNull.id('post');
		t.nonNull.int('rating');
	},
});
