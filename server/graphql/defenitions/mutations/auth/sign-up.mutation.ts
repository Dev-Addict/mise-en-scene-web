import {arg, mutationField, nonNull} from 'nexus';

import {SignUpData} from '../inputs';
import {AuthResponse} from '../../types';
import {saveCover} from '../../../utils';
import {signCookie, signToken} from '../../../../utils';
import {
	welcomeEmailTemplate,
	WelcomeEmailTemplateVariables,
} from '../../../../templates';
import {BASE_URL} from '../../../../../config';

export const SignUpMutation = mutationField('signUp', {
	type: nonNull(AuthResponse),
	args: {
		data: arg({type: nonNull(SignUpData)}),
	},
	async resolve(
		_root,
		{data: {avatar, ...data}},
		{res, models: {User, ChannelFollow, UserFollow}, mailService}
	) {
		const avatarUrl = avatar
			? await saveCover(avatar, 'user/avatar')
			: undefined;

		const user: any = await User.create({avatar: avatarUrl, ...data});

		const token = signToken(user);

		signCookie(res, 'token', token);

		if (process.env.USER_TO_FOLLOW)
			await UserFollow.create({
				follower: user.id,
				following: process.env.USER_TO_FOLLOW,
			});
		if (process.env.CHANNEL_TO_FOLLOW)
			await ChannelFollow.create({
				follower: user.id,
				following: process.env.CHANNEL_TO_FOLLOW,
			});

		const verifyToken = user.createEmailVerifyToken();
		await user.save();

		const mailVariables: WelcomeEmailTemplateVariables = {
			home_url: `${BASE_URL}/`,
			verify_url: `${BASE_URL}/sign/email/verify/${verifyToken}`,
		};

		await mailService.sendMail(welcomeEmailTemplate, mailVariables, {
			to: user.email,
			subject: 'به میزانسن خوش آمدید!',
		});

		return {
			user,
			token,
		};
	},
});
