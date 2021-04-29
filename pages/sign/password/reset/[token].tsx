import React, {useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik/dist/types';

import {
	Error,
	Meta,
	ResetPasswordFields,
	ResetPasswordForm,
	SignHeader,
} from '../../../../components';
import {useAuth} from '../../../../hooks';
import {Props, User} from '../../../../types';
import {validateResetPasswordTokenHelper} from '../../../../helpers';

const initialValues: ResetPasswordFields = {
	password: '',
	passwordConfirm: '',
};

interface InitialProps {
	user?: User;
	exists: boolean;
	expired: boolean;
}

const Reset: NextPage<Props & InitialProps, InitialProps> = ({
	user,
	exists,
	expired,
	setTheme,
}) => {
	const router = useRouter();
	const {callback, token} = router.query;

	const [errors, setErrors] = useState<string[]>([]);

	const {resetPassword} = useAuth();

	if (!exists)
		return (
			<Error code={404} title="نشانه بازیابی پیدا نشد." setTheme={setTheme} />
		);

	if (expired)
		return (
			<Error
				code={410}
				title="زمان استفاده از نشانه وارد شده گذشته است لطفا دوباره است. لطفا دوباره تلاش کنید."
				setTheme={setTheme}
			/>
		);

	const onSubmit = (): ((
		values: ResetPasswordFields,
		formikHelpers: FormikHelpers<ResetPasswordFields>
	) => void | Promise<any>) => async ({password}, {setSubmitting}) => {
		setSubmitting(true);

		const response = await resetPassword({
			password,
			resetToken: token as string,
		});

		if (response.success) await router.push(callback?.toString() || '/');
		else setErrors(response.errors);

		setSubmitting(false);
	};

	return (
		<div>
			<Meta title="بازنشانی رمز عبور" />
			<SignHeader />
			<ResetPasswordForm
				errors={errors}
				initialValues={initialValues}
				onSubmit={onSubmit()}
				user={user}
			/>
		</div>
	);
};

Reset.getInitialProps = async ({query: {token}}) => {
	return validateResetPasswordTokenHelper(token as string);
};

export default Reset;
