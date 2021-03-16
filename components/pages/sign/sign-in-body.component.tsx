import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import {Field, Formik, FormikErrors} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {Button, FormikInput} from '../../shared';
import {
	Body,
	ConvertLink,
	ConvertText,
	InputContainer,
	Profile,
	ProfileHeader,
	SubmitContainer,
} from './sign-components.component';
import {useThemeImage} from '../../../hooks';
import {Color} from '../../../data';
import {authKeyValidator, passwordValidator} from '../../../utils';
import {useRouter} from 'next/router';
import {useAuth} from '../../../hooks/auth.hook';

interface Fields {
	authKey: string;
	password: string;
}

const fields: {
	[key in keyof Fields]: string;
} = {
	authKey: 'authKey',
	password: 'password',
};

const initialValues: Fields = {
	authKey: '',
	password: '',
};

interface Props {
	switchSign: () => void;
}

export const SignInBody: FC<Props> = ({switchSign}) => {
	const router = useRouter();

	const [error, setError] = useState('');

	const {isSigned, signIn} = useAuth();

	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	const onSignUpClick = () => () => switchSign();
	const onSubmit = (): ((
		values: Fields,
		formikHelpers: FormikHelpers<Fields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		const response = await signIn(values);

		if (response.success) await router.push('/');
		else setError(response.message || '');

		setSubmitting(false);
	};

	useEffect(() => {
		if (isSigned) router.push('/');
	}, []);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit()}
			validate={validator}>
			<Body>
				<Profile>
					<Image src={profile} width="200px" height="200px" />
				</Profile>
				<ProfileHeader>ورود</ProfileHeader>
				<InputContainer>
					<Field
						label="ایمیل یا نام کاربری"
						placeholder="ایمیل یا نام کابری شما"
						icon={username}
						primary
						type="text"
						name={fields.authKey}
						component={FormikInput}
					/>
				</InputContainer>
				<InputContainer>
					<Field
						label="رمز عبور"
						placeholder="رمز عبور شما"
						primary
						type="password"
						name={fields.password}
						component={FormikInput}
					/>
				</InputContainer>
				<ConvertText>
					<div>
						رمز عبور خود را فراموش کردید؟{' '}
						<ConvertLink>رمز عبور خود را بازیابی کنید!</ConvertLink>
					</div>
					<div>
						حساب کاربری ندارید؟{' '}
						<ConvertLink onClick={onSignUpClick()}>ثبت نام کنید!</ConvertLink>
					</div>
				</ConvertText>
				{error}
				<SubmitContainer>
					<Button primary color={Color.GHOST_WHITE} type="submit">
						ثبت نام
					</Button>
				</SubmitContainer>
			</Body>
		</Formik>
	);
};

const validator = ({authKey, password}: Fields): FormikErrors<Fields> => {
	const errors: FormikErrors<Fields> = {};

	if (!authKey) errors.authKey = 'ایمیل یا نام کاربری شما اجباری است.';
	else if (!authKeyValidator(authKey, false))
		errors.authKey = 'ایمیل یا نام کاربری وارد شده معتبر نمی باشد.';

	if (!password) errors.password = 'رمز عبور اجباری است.';
	else if (!passwordValidator(password, false))
		errors.password = 'رمز عبورر معتبر نمی باشد.';

	return errors;
};
