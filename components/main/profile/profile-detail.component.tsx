import React, {useState} from 'react';
import {FormikHelpers} from 'formik/dist/types';

import {useAuth} from '../../../hooks';
import {UserDetailFields, UserDetailForm} from '../../forms';

export const ProfileDetail = () => {
	const [errors, setErrors] = useState<string[]>([]);

	const {user, updateSelf} = useAuth();

	const onSubmit = (): ((
		values: UserDetailFields,
		formikHelpers: FormikHelpers<UserDetailFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setErrors([]);

		setSubmitting(true);

		const response = await updateSelf({
			avatar: typeof values.avatar === 'string' ? undefined : values.avatar,
			birthday: values.birthday?.getTime(),
			gender: values.gender || null,
			username: values.username || null,
			bio: values.bio || null,
			displayName: values.displayName || null,
			lastname: values.lastname || null,
			firstname: values.firstname || null,
		});

		if (!response.success) setErrors(response.errors);

		setSubmitting(false);
	};

	return (
		<UserDetailForm
			onSubmit={onSubmit()}
			errors={errors}
			initialValues={{
				birthday: user?.birthday ? new Date(user.birthday) : undefined,
				gender: user?.gender || undefined,
				bio: user?.bio || '',
				displayName: user?.displayName || '',
				avatar: user?.avatar || '',
				firstname: user?.firstname || '',
				lastname: user?.lastname || '',
				email: user?.email || '',
				username: user?.username || '',
			}}
			currentUsername={user?.username}
		/>
	);
};
