import {inputObjectType} from 'nexus';

export const ValidateResetEmailTokenData = inputObjectType({
	name: 'ValidateResetEmailTokenData',
	definition(t) {
		t.nonNull.string('resetToken');
	},
});
