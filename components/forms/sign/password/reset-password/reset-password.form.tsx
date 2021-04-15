import React, {FC} from 'react';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {
	Body,
	ProfileHeader,
	SubmitContainer,
} from '../../sign-components.component';
import {Avatar, Button, Errors} from '../../../../shared';
import {Color} from '../../../../../data';
import {User} from '../../../../../types';
import {ResetPasswordInputs} from './reset-password-inputs.component';
import {resetPasswordValidator} from '../../../validators';

export interface ResetPasswordFields {
	password: string;
	passwordConfirm: string;
}

interface Props {
	onSubmit: (
		values: ResetPasswordFields,
		formikHelpers: FormikHelpers<ResetPasswordFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: ResetPasswordFields;
	user?: User;
}

export const ResetPasswordForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
	user,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={resetPasswordValidator}>
			{({isSubmitting}: FormikProps<ResetPasswordFields>) => (
				<Body>
					<Avatar user={user} />
					<ProfileHeader>رمز عبور خود را عوض کنید!</ProfileHeader>
					<ResetPasswordInputs />
					<Errors errors={errors} />
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							عوض کردن رمز عبور
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
