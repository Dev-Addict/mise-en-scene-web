import React, {useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik/dist/types';

import {
	ErrorPage,
	Meta,
	ResetEmailFields,
	ResetEmailForm,
	SignHeader,
} from '../../../../components';
import {useAuth} from '../../../../hooks';
import {Props, User} from '../../../../types';
import {validateResetEmailTokenHelper} from '../../../../helpers';

const initialValues: ResetEmailFields = {
	email: '',
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

	const [errors, setErrorPages] = useState<string[]>([]);

	const {resetEmail} = useAuth();

	if (!exists)
		return (
			<ErrorPage
				code={404}
				title="نشانه بازیابی پیدا نشد."
				setTheme={setTheme}
			/>
		);

	if (expired)
		return (
			<ErrorPage
				code={410}
				title="زمان استفاده از نشانه وارد شده گذشته است لطفا دوباره است. لطفا دوباره تلاش کنید."
				setTheme={setTheme}
			/>
		);

	const onSubmit = (): ((
		values: ResetEmailFields,
		formikHelpers: FormikHelpers<ResetEmailFields>
	) => void | Promise<any>) => async ({email}, {setSubmitting}) => {
		setSubmitting(true);

		const response = await resetEmail({
			email,
			resetToken: token as string,
		});

		if (response.success) await router.push(callback?.toString() || '/');
		else setErrorPages(response.errors);

		setSubmitting(false);
	};

	return (
		<div>
			<Meta title="بازنشانی ایمیل" />
			<SignHeader />
			<ResetEmailForm
				errors={errors}
				initialValues={initialValues}
				onSubmit={onSubmit()}
				user={user}
			/>
		</div>
	);
};

Reset.getInitialProps = async ({query: {token}}) => {
	return validateResetEmailTokenHelper(token as string);
};

export default Reset;
