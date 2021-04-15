import {FormikErrors} from 'formik';

import {UserDetailFields} from '../../user';
import {nameValidator, usernameValidator} from '../../../../utils';
import {apolloClient, CHECK_USERNAME_MUTATION} from '../../../../api';

export const userDetailValidator = (currentUsername?: string) => async ({
	firstname,
	lastname,
	username,
	displayName,
	bio,
}: UserDetailFields): Promise<FormikErrors<UserDetailFields>> => {
	const errors: FormikErrors<UserDetailFields> = {};

	if (firstname && !nameValidator(firstname, false))
		errors.firstname = 'اسم شما نامناسب است.';

	if (lastname && !nameValidator(lastname, false))
		errors.lastname = 'فامیلی شما نامناسب است.';

	if (!username) errors.username = 'نام کاربری اجباری است.';
	else if (!usernameValidator(username, false))
		errors.username =
			'نام کاربری نامعتبر است. حداقل چهار کاراکتر با حروف انگلیسی و اعداد و آندرلاین.';
	try {
		if (!errors.username && currentUsername !== username)
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

	if (displayName && displayName.length < 4)
		errors.displayName =
			'نام نمایشی حداقل باید از چهار کاراکتر تشکیل شده باشد.';
	else if (displayName && displayName.length > 20)
		errors.displayName =
			'نام نمایشی حداکثر باید از بیست کاراکتر تشکیل شده باشد.';

	if (bio && bio.length > 200)
		errors.bio = 'بیو حداکثر باید از دویست کاراکتر تشکیل شده باشد.';

	return errors;
};
