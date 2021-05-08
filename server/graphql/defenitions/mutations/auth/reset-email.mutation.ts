import crypto from 'crypto';
import {mutationField, nonNull} from 'nexus';

import {AuthResponse} from '../../types';
import {ResetEmailData} from '../inputs';
import {AppError, signCookie, signToken} from '../../../../utils';

export const ResetEmailMutation = mutationField('resetEmail', {
	type: AuthResponse,
	args: {
		data: nonNull(ResetEmailData),
	},
	async resolve(_root, {data: {email, resetToken}}, {models: {User}, res}) {
		const hashedToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex');

		const user = await User.findOne({
			emailResetToken: hashedToken,
		});

		if (!user) throw new AppError('0xE00005E', 400);

		if (new Date(user.emailResetTokenExpiresAt || 0).getTime() < Date.now())
			throw new AppError('0xE00005F', 400);

		user.email = email;
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
