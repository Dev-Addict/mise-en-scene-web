import {FormikErrors} from 'formik';

import {passwordValidator} from '../../../../../utils';
import {ResetPasswordFields} from '../../../sign/password/reset-password/reset-password.form';

export const resetPasswordValidator = ({
	password,
	passwordConfirm,
}: ResetPasswordFields): FormikErrors<ResetPasswordFields> => {
	const errors: FormikErrors<ResetPasswordFields> = {};

	if (!password) errors.password = 'رمز عبور اجباری است.';
	else if (!passwordValidator(password, false))
		errors.password = 'رمز عبورر معتبر نمی باشد.';

	if (passwordConfirm !== password)
		errors.passwordConfirm = 'تکرار رمز عبور نادرست است.';

	return errors;
};
