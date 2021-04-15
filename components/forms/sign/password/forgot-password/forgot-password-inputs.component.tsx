import React from 'react';
import {Field} from 'formik';

import {InputContainer} from '../../sign-components.component';
import {FormikInput} from '../../../../shared';
import {useThemeImage} from '../../../../../hooks';
import {ForgotPasswordFields} from './forgot-password.form';

const fields: {
	[key in keyof ForgotPasswordFields]: string;
} = {
	authKey: 'authKey',
};

export const ForgotPasswordInputs = () => {
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
		</>
	);
};
