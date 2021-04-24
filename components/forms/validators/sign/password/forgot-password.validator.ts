import {FormikErrors} from 'formik';

import {authKeyValidator} from '../../../../../utils';
import {ForgotPasswordFields} from '../../../sign';
import {
	apolloClient,
	CHECK_AUTH_KEY_MUTATION,
	CheckAuthKeyMutationData,
	CheckAuthKeyMutationVariables,
} from '../../../../../api';

export const forgotPasswordValidator = async ({
	authKey,
}: ForgotPasswordFields) => {
	const errors: FormikErrors<ForgotPasswordFields> = {};

	if (!authKey) errors.authKey = 'ایمیل یا نام کاربری شما اجباری است.';
	else if (!authKeyValidator(authKey, false))
		errors.authKey = 'ایمیل یا نام کاربری وارد شده معتبر نمی باشد.';
	try {
		if (!errors.authKey)
			if (
				(
					await apolloClient.mutate<
						CheckAuthKeyMutationData,
						CheckAuthKeyMutationVariables
					>({
						mutation: CHECK_AUTH_KEY_MUTATION,
						variables: {authKey},
					})
				)?.data?.checkAuthKey
			)
				errors.authKey = 'ایمیل یا شناسه کاربری وارد شده پیدا نشد.';
	} catch (e) {
		errors.authKey = 'خطای نامشخصی رخ داد لطفا دوباره تلاش کنید.';
	}

	return errors;
};
