import React from 'react';
import {Field} from 'formik';

import {InputContainer} from '../sign-components.component';
import {FormikInput} from '../../../shared';
import {useThemeImage} from '../../../../hooks';
import {SignInFields} from './sign-in.form';

const fields: {
	[key in keyof SignInFields]: string;
} = {
	authKey: 'authKey',
	password: 'password',
};

export const SignInInputs = () => {
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	return (
		<>
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
		</>
	);
};
