import {FormikErrors} from 'formik';

import {SignInFields} from '../../sign';
import {authKeyValidator, passwordValidator} from '../../../../utils';

export const signInValidator = ({
	authKey,
	password,
}: SignInFields): FormikErrors<SignInFields> => {
	const errors: FormikErrors<SignInFields> = {};

	if (!authKey) errors.authKey = 'ایمیل یا نام کاربری شما اجباری است.';
	else if (!authKeyValidator(authKey, false))
		errors.authKey = 'ایمیل یا نام کاربری وارد شده معتبر نمی باشد.';

	if (!password) errors.password = 'رمز عبور اجباری است.';
	else if (!passwordValidator(password, false))
		errors.password = 'رمز عبورر معتبر نمی باشد.';

	return errors;
};
