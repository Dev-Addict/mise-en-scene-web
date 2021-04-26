import React from 'react';
import {Field} from 'formik';

import {AdminFinderFields} from './admin-finder.form';
import {useThemeImage} from '../../../../../hooks';
import {InputContainer} from '../../../sign/sign-components.component';
import {FormikInput} from '../../../../shared';

const fields: {
	[key in keyof AdminFinderFields]: string;
} = {
	authKey: 'authKey',
};

export const AdminKeyInputs = () => {
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	return (
		<>
			<InputContainer>
				<Field
					label="ایمیل یا نام کاربری"
					placeholder="ایمیل یا نام کابری مدیر"
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
