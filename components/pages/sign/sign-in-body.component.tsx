import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik/dist/types';

import {useAuth} from '../../../hooks/auth.hook';
import {SignInForm, SignInFields} from '../../forms';

const initialValues: SignInFields = {
	authKey: '',
	password: '',
};

interface Props {
	switchSign: () => void;
}

export const SignInBody: FC<Props> = ({switchSign}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {isSigned, signIn} = useAuth();

	const onSubmit = (): ((
		values: SignInFields,
		formikHelpers: FormikHelpers<SignInFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		const response = await signIn(values);

		if (response.success) await router.push('/');
		else setErrors(response.errors);

		setSubmitting(false);
	};

	useEffect(() => {
		if (isSigned) router.push('/');
	}, []);

	return (
		<SignInForm
			onSubmit={onSubmit()}
			errors={errors}
			switchSign={switchSign}
			initialValues={initialValues}
		/>
	);
};
