import {inputObjectType} from 'nexus';

export const ChannelFollowData = inputObjectType({
	name: 'ChannelFollowData',
	definition(t) {
		t.nonNull.field('following', {type: 'ID'});
	},
});
