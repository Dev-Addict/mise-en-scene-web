import {inputObjectType} from 'nexus';

export const ValidateResetPasswordTokenData = inputObjectType({
	name: 'ValidateResetPasswordTokenData',
	definition(t) {
		t.nonNull.string('resetToken');
	},
});
