import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {Field, Formik, FormikErrors, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {Button, FormikInput} from '../../shared';
import {Color} from '../../../data';
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
import {
	emailValidator,
	passwordValidator,
	usernameValidator,
} from '../../../utils';
import {useAuth} from '../../../hooks/auth.hook';

interface Fields {
	email: string;
	username: string;
	password: string;
}

const fields: {
	[key in keyof Fields]: string;
} = {
	email: 'email',
	username: 'username',
	password: 'password',
};

const initialValues: Fields = {
	email: '',
	username: '',
	password: '',
};

interface Props {
	switchSign: () => void;
}

export const SignUpBody: FC<Props> = ({switchSign}) => {
	const router = useRouter();

	const [error, setError] = useState('');

	const {signUp, isSigned} = useAuth();

	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');
	const atSign = useThemeImage('/assets/icons/at-sign/at-sign-$mode.svg');
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	const onSignInClick = () => () => switchSign();
	const onSubmit = (): ((
		values: Fields,
		formikHelpers: FormikHelpers<Fields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		const response = await signUp(values);

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
			{({isSubmitting}: FormikProps<Fields>) => (
				<Body>
					<Profile>
						<Image src={profile} width="200px" height="200px" />
					</Profile>
					<ProfileHeader>ثبت نام</ProfileHeader>
					<InputContainer>
						<Field
							label="ایمیل"
							placeholder="ایمیل شما"
							icon={atSign}
							primary
							type="text"
							name={fields.email}
							component={FormikInput}
						/>
					</InputContainer>
					<InputContainer>
						<Field
							label="نام کاربری"
							placeholder="نام کاربری شما"
							icon={username}
							primary
							type="text"
							name={fields.username}
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
						حساب کاربری دارید؟{' '}
						<ConvertLink onClick={onSignInClick()}>وارد شوید!</ConvertLink>
					</ConvertText>
					{error}
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							ثبت نام
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};

const validator = ({email, username, password}: Fields) => {
	const errors: FormikErrors<Fields> = {};

	if (!email) errors.email = 'ایمیل اجباری است.';
	else if (!emailValidator(email, false)) errors.email = 'ایمیل نامعتبر است.';

	if (!username) errors.username = 'نام کاربری اجباری است.';
	else if (!usernameValidator(username, false))
		errors.username =
			'نام کاربری نامعتبر است. حداقل چهار کاراکتر با حروف انگلیسی و اعداد و آندرلاین.';

	if (!password) errors.password = 'رمز عبور اجباری است.';
	else if (!passwordValidator(password, false))
		errors.password =
			'رمز عبور نامعتبر است. حداقل هشت کاراکتر با یک حرف انگلیسی.';

	return errors;
};
