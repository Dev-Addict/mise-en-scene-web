import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik/dist/types';

import {useAuth} from '../../../hooks/auth.hook';
import {SignUpFields, SignUpForm} from '../../forms';

const initialValues: SignUpFields = {
	email: '',
	username: '',
	password: '',
};

interface Props {
	switchSign: () => void;
}

export const SignUpBody: FC<Props> = ({switchSign}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {signUp, isSigned} = useAuth();
	const onSubmit = (): ((
		values: SignUpFields,
		formikHelpers: FormikHelpers<SignUpFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		const response = await signUp(values);

		if (response.success) await router.push('/');
		else setErrors(response.errors);

		setSubmitting(false);
	};

	useEffect(() => {
		if (isSigned) router.push('/');
	}, []);

	return (
		<SignUpForm
			onSubmit={onSubmit()}
			errors={errors}
			switchSign={switchSign}
			initialValues={initialValues}
		/>
	);
};
