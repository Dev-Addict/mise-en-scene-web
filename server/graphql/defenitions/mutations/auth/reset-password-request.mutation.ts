import {mutationField, nonNull} from 'nexus';

import {User} from '../../models';
import {ResetPasswordRequestData} from '../inputs';
import {AppError} from '../../../../utils';
import {
	forgotPasswordEmailTemplate,
	ForgotPasswordEmailTemplateVariables,
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

			const mailVariables: ForgotPasswordEmailTemplateVariables = {
				home_page: `${BASE_URL}/`,
				reset_url: `${BASE_URL}/sign/password/reset/${resetToken}`,
				logo: `${BASE_URL}/assets/logo/mes-light.svg`,
			};

			await mailService.sendMail(forgotPasswordEmailTemplate, mailVariables, {
				to: user.email,
				subject: '!رمز عبور خود را بازنشانی کنید',
			});

			return <any>user;
		},
	}
);
