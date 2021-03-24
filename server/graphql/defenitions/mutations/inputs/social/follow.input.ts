import {inputObjectType} from 'nexus';

export const FollowData = inputObjectType({
	name: 'FollowData',
	definition(t) {
		t.nonNull.field('following', {type: 'ID'});
	},
});
