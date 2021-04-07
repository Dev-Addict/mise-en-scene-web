import {inputObjectType} from 'nexus';

export const VoteData = inputObjectType({
	name: 'VoteData',
	definition(t) {
		t.nonNull.id('poll');
		t.nonNull.int('option');
	},
});
