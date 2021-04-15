import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik/dist/types';

import {
	ForgotPasswordFields,
	ForgotPasswordForm,
	SignHeader,
} from '../../../../components';
import {useAuth} from '../../../../hooks';

const initialValues: ForgotPasswordFields = {
	authKey: '',
};

const ResetPassword = () => {
	const router = useRouter();
	const {callback} = router.query;

	const [errors, setErrors] = useState<string[]>([]);

	const {isSigned, forgotPassword} = useAuth();

	const onSubmit = (): ((
		values: ForgotPasswordFields,
		formikHelpers: FormikHelpers<ForgotPasswordFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		const response = await forgotPassword(values);

		if (response.success)
			await router.push(
				callback?.toString() || '/sign/password/forgot/success'
			);
		else setErrors(response.errors);

		setSubmitting(false);
	};

	useEffect(() => {
		if (isSigned) router.push(callback?.toString() || '/');
	}, [isSigned]);

	return (
		<div>
			<SignHeader />
			<ForgotPasswordForm
				errors={errors}
				onSubmit={onSubmit()}
				initialValues={initialValues}
			/>
		</div>
	);
};

export default ResetPassword;
