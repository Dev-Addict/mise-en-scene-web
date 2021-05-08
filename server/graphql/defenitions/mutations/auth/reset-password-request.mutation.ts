import {mutationField, nonNull} from 'nexus';

import {User} from '../../models';
import {ResetPasswordRequestData} from '../inputs';
import {AppError} from '../../../../utils';
import {
	requestResetPasswordEmailTemplate,
	RequestResetPasswordEmailTemplateVariables,
} from '../../../../templates';
import {BASE_URL} from '../../../../../config';

export const ResetPasswordRequestMutation = mutationField(
	'resetPasswordRequest',
	{
		type: User,
		args: {
			data: nonNull(ResetPasswordRequestData),
		},
		async resolve(_root, {data: {authKey}}, {mailService, models: {User}}) {
			const user = await User.findOne({
				$or: [
					{
						email: authKey,
					},
					{
						username: authKey,
					},
				],
			});

			if (!user) throw new AppError('0xE000058', 400);

			const resetToken = user.createPasswordResetToken();
			await user.save();

			const mailVariables: RequestResetPasswordEmailTemplateVariables = {
				home_url: `${BASE_URL}/`,
				reset_url: `${BASE_URL}/sign/password/reset/${resetToken}`,
				name: user.displayName || user.firstname || user.username,
			};

			await mailService.sendMail(
				requestResetPasswordEmailTemplate,
				mailVariables,
				{
					to: user.email,
					subject: '!رمز عبور خود را بازنشانی کنید',
				}
			);

			return <any>user;
		},
	}
);
