import {FormikErrors} from 'formik';

import {
	emailValidator,
	passwordValidator,
	usernameValidator,
} from '../../../../utils';
import {SignUpFields} from '../../sign';
import {
	apolloClient,
	CHECK_EMAIL_MUTATION,
	CHECK_USERNAME_MUTATION,
} from '../../../../api';

export const signUpValidator = async ({
	email,
	username,
	password,
}: SignUpFields) => {
	const errors: FormikErrors<SignUpFields> = {};

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

	if (!username) errors.username = 'نام کاربری اجباری است.';
	else if (!usernameValidator(username, false))
		errors.username =
			'نام کاربری نامعتبر است. حداقل چهار کاراکتر با حروف کوچک انگلیسی و اعداد و آندرلاین.';
	try {
		if (!errors.username)
			if (
				!(
					await apolloClient.mutate({
						mutation: CHECK_USERNAME_MUTATION,
						variables: {username},
					})
				).data.checkUsername
			)
				errors.username = 'نام کاربری تکراری است.';
	} catch (e) {}

	if (!password) errors.password = 'رمز عبور اجباری است.';
	else if (!passwordValidator(password, false))
		errors.password =
			'رمز عبور نامعتبر است. حداقل هشت کاراکتر با یک حرف انگلیسی.';

	return errors;
};
