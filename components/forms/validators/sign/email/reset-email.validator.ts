import {FormikErrors} from 'formik';

import {ResetEmailFields} from '../../../sign';
import {emailValidator} from '../../../../../utils';
import {apolloClient, CHECK_EMAIL_MUTATION} from '../../../../../api';

export const resetEmailValidator = async ({
	email,
}: ResetEmailFields): Promise<FormikErrors<ResetEmailFields>> => {
	const errors: FormikErrors<ResetEmailFields> = {};

	if (!email) errors.email = 'ایمیل اجباری است.';
	else if (!emailValidator(email, false)) errors.email = 'ایمیل نامعتبر است.';
	try {
		if (!errors.email)
			if (
				!(
					await apolloClient.mutate({
						mutation: CHECK_EMAIL_MUTATION,
						variables: {email},
					})
				).data.checkEmail
			)
				errors.email = 'ایمیل تکراری است.';
	} catch (e) {}

	return errors;
};
