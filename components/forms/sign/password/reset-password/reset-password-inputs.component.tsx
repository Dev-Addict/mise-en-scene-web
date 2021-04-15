import React from 'react';
import {Field} from 'formik';

import {InputContainer} from '../../sign-components.component';
import {FormikInput} from '../../../../shared';
import {ResetPasswordFields} from './reset-password.form';

const fields: {
	[key in keyof ResetPasswordFields]: string;
} = {
	password: 'password',
	passwordConfirm: 'passwordConfirm',
};

export const ResetPasswordInputs = () => {
	return (
		<>
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
			<InputContainer>
				<Field
					label="تکرار رمز عبور"
					placeholder="تکرار رمز عبور شما"
					primary
					type="password"
					name={fields.passwordConfirm}
					component={FormikInput}
				/>
			</InputContainer>
		</>
	);
};
