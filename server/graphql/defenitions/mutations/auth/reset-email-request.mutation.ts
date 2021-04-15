import {mutationField, nonNull} from 'nexus';

import {User} from '../../models';
import {ResetEmailRequestData} from '../inputs';
import {AppError} from '../../../../utils';
import {
	requestResetEmailEmailTemplate,
	RequestResetEmailEmailTemplateVariables,
} from '../../../../templates';
import {BASE_URL} from '../../../../../config';

export const ResetEmailRequestMutation = mutationField('resetEmailRequest', {
	type: User,
	args: {
		data: nonNull(ResetEmailRequestData),
	},
	async resolve(_root, {data: {email}}, {mailService, models: {User}}) {
		const user = await User.findOne({
			email,
		});

		if (!user) throw new AppError('0xE00005C', 400);

		const resetToken = user.createEmailResetToken();
		await user.save();

		const mailVariables: RequestResetEmailEmailTemplateVariables = {
			home_page: `${BASE_URL}/`,
			reset_url: `${BASE_URL}/sign/email/reset/${resetToken}`,
			logo: `${BASE_URL}/assets/logo/mes-light.svg`,
		};

		await mailService.sendMail(requestResetEmailEmailTemplate, mailVariables, {
			to: user.email,
			subject: 'ایمیل خود را تغییر بدهید.',
		});

		return <any>user;
	},
});
