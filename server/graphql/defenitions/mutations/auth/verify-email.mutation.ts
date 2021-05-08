import crypto from 'crypto';
import {mutationField, nonNull} from 'nexus';

import {AuthResponse} from '../../types';
import {VerifyEmailData} from '../inputs';
import {AppError, signCookie, signToken} from '../../../../utils';

export const VerifyEmailMutation = mutationField('verifyEmail', {
	type: AuthResponse,
	args: {
		data: nonNull(VerifyEmailData),
	},
	async resolve(_root, {data: {verifyToken}}, {models: {User}, res}) {
		const hashedToken = crypto
			.createHash('sha256')
			.update(verifyToken)
			.digest('hex');

		const user = await User.findOne({
			emailVerifyToken: hashedToken,
		});

		if (!user) throw new AppError('0xE00005E', 400);

		if (new Date(user.emailVerifyTokenExpiresAt || 0).getTime() < Date.now())
			throw new AppError('0xE00005F', 400);

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
