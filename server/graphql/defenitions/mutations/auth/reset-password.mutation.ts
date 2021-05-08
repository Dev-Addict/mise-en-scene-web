import crypto from 'crypto';
import {mutationField, nonNull} from 'nexus';

import {AuthResponse} from '../../types';
import {ResetPasswordData} from '../inputs';
import {AppError, signCookie, signToken} from '../../../../utils';

export const ResetPasswordMutation = mutationField('resetPassword', {
	type: AuthResponse,
	args: {
		data: nonNull(ResetPasswordData),
	},
	async resolve(_root, {data: {password, resetToken}}, {models: {User}, res}) {
		const hashedToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex');

		const user = await User.findOne({
			passwordResetToken: hashedToken,
		});

		if (!user) throw new AppError('0xE00005A', 400);

		if (new Date(user.passwordResetTokenExpiresAt || 0).getTime() < Date.now())
			throw new AppError('0xE00005B', 400);

		user.password = password;
		user.verifiedEmail = true;

		await user.save();

		const token = signToken(user);

		signCookie(res, 'token', token);

		return <any>{
			token,
			user,
		};
	},
});
