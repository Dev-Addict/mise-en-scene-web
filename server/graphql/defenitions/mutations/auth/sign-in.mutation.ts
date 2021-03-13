import {arg, mutationField, nonNull} from 'nexus';

import {SignInData} from '../inputs';
import {AuthResponse} from '../../types';
import {AppError, signCookie, signToken} from '../../../../utils';

export const SignInMutation = mutationField('signIn', {
	type: AuthResponse,
	args: {
		data: arg({type: nonNull(SignInData)}),
	},
	async resolve(_root, {data: {authKey, password}}, {res, models: {User}}) {
		const user: any = await User.findOne({
			$or: [
				{
					email: authKey,
				},
				{
					username: authKey,
				},
			],
		}).select('+password');

		if (!user) throw new AppError('0xE00000D', 400);
		if (!(await user.correctPassword(password, user.password)))
			throw new AppError('0xE00000D', 400);

		const token = signToken(user);

		signCookie(res, 'token', `Bearer ${token}`);

		return {
			token,
			user,
		};
	},
});
