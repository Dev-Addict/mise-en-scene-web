import {mutationField, nonNull} from 'nexus';

import {User} from '../../models';
import {VerifyEmailRequestData} from '../inputs';
import {AppError} from '../../../../utils';
import {
	verifyEmailEmailTemplate,
	VerifyEmailEmailTemplateVariables,
} from '../../../../templates';
import {BASE_URL} from '../../../../../config';

export const VerifyEmailRequestMutation = mutationField('verifyEmailRequest', {
	type: User,
	args: {
		data: nonNull(VerifyEmailRequestData),
	},
	async resolve(_root, {data: {email}}, {mailService, models: {User}}) {
		const user = await User.findOne({
			email,
		});

		if (!user) throw new AppError('0xE00005C', 400);

		const verifyToken = user.createEmailVerifyToken();
		await user.save();

		const mailVariables: VerifyEmailEmailTemplateVariables = {
			home_url: `${BASE_URL}/`,
			verify_url: `${BASE_URL}/sign/email/verify/${verifyToken}`,
			name: user.displayName || user.firstname || user.username,
		};

		await mailService.sendMail(verifyEmailEmailTemplate, mailVariables, {
			to: user.email,
			subject: 'ایمیل خود را تایید کنید.',
		});

		return <any>user;
	},
});
