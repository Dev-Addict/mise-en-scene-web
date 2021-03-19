import {FormikErrors} from 'formik';

import {
	emailValidator,
	passwordValidator,
	usernameValidator,
} from '../../../../utils';
import {SignUpFields} from '../../sign';

export const signUpValidator = ({email, username, password}: SignUpFields) => {
	const errors: FormikErrors<SignUpFields> = {};

	if (!email) errors.email = 'ایمیل اجباری است.';
	else if (!emailValidator(email, false)) errors.email = 'ایمیل نامعتبر است.';

	if (!username) errors.username = 'نام کاربری اجباری است.';
	else if (!usernameValidator(username, false))
		errors.username =
			'نام کاربری نامعتبر است. حداقل چهار کاراکتر با حروف انگلیسی و اعداد و آندرلاین.';

	if (!password) errors.password = 'رمز عبور اجباری است.';
	else if (!passwordValidator(password, false))
		errors.password =
			'رمز عبور نامعتبر است. حداقل هشت کاراکتر با یک حرف انگلیسی.';

	return errors;
};
