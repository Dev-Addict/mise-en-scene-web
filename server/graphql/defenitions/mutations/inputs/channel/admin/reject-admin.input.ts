import {inputObjectType} from 'nexus';

export const RejectAdminData = inputObjectType({
	name: 'RejectAdminData',
	definition(t) {
		t.nonNull.id('channel');
	},
});
