import crypto from 'crypto';
import {mutationField, nonNull} from 'nexus';

import {User} from '../../models';
import {ValidateResetEmailTokenData} from '../inputs';
import {AppError} from '../../../../utils';

export const ValidateResetEmailToken = mutationField(
	'validateResetEmailToken',
	{
		type: User,
		args: {
			data: nonNull(ValidateResetEmailTokenData),
		},
		async resolve(_root, {data: {resetToken}}, {models: {User}}) {
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

			return <any>user;
		},
	}
);
