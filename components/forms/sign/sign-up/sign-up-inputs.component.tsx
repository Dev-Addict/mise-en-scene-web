import React from 'react';
import {Field} from 'formik';

import {InputContainer} from '../sign-components.component';
import {FormikInput} from '../../../shared';
import {useThemeImage} from '../../../../hooks';
import {SignUpFields} from './sign-up.form';

const fields: {
	[key in keyof SignUpFields]: string;
} = {
	email: 'email',
	username: 'username',
	password: 'password',
};

export const SignUpInputs = () => {
	const atSign = useThemeImage('/assets/icons/at-sign/at-sign-$mode.svg');
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	return (
		<>
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
		</>
	);
};
