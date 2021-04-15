import React from 'react';
import {Field} from 'formik';

import {InputContainer} from '../../sign-components.component';
import {FormikInput} from '../../../../shared';
import {ResetEmailFields} from './reset-email.form';
import {useThemeImage} from '../../../../../hooks';

const fields: {
	[key in keyof ResetEmailFields]: string;
} = {
	email: 'email',
};

export const ResetEmailInputs = () => {
	const atSign = useThemeImage('/assets/icons/at-sign/at-sign-$mode.svg');

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
		</>
	);
};
