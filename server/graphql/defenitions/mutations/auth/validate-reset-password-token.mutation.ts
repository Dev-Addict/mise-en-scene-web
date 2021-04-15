import crypto from 'crypto';
import {mutationField, nonNull} from 'nexus';

import {User} from '../../models';
import {ValidateResetPasswordTokenData} from '../inputs';
import {AppError} from '../../../../utils';

export const ValidateResetPasswordToken = mutationField(
	'validateResetPasswordToken',
	{
		type: User,
		args: {
			data: nonNull(ValidateResetPasswordTokenData),
		},
		async resolve(_root, {data: {resetToken}}, {models: {User}}) {
			const hashedToken = crypto
				.createHash('sha256')
				.update(resetToken)
				.digest('hex');

			const user = await User.findOne({
				passwordResetToken: hashedToken,
			});

			if (!user) throw new AppError('0xE00005A', 400);

			if (
				new Date(user.passwordResetTokenExpiresAt || 0).getTime() < Date.now()
			)
				throw new AppError('0xE00005B', 400);

			return <any>user;
		},
	}
);
