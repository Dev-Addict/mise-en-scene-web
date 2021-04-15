import React, {FC} from 'react';
import Image from 'next/image';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {
	Body,
	Profile,
	ProfileHeader,
	SubmitContainer,
} from '../../sign-components.component';
import {Button, Errors} from '../../../../shared';
import {useThemeImage} from '../../../../../hooks';
import {Color} from '../../../../../data';
import {ForgotPasswordInputs} from './forgot-password-inputs.component';
import {forgotPasswordValidator} from '../../../validators';

export interface ForgotPasswordFields {
	authKey: string;
}

interface Props {
	onSubmit: (
		values: ForgotPasswordFields,
		formikHelpers: FormikHelpers<ForgotPasswordFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: ForgotPasswordFields;
}

export const ForgotPasswordForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
}) => {
	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={forgotPasswordValidator}>
			{({isSubmitting}: FormikProps<ForgotPasswordFields>) => (
				<Body>
					<Profile>
						<Image src={profile} width="200px" height="200px" />
					</Profile>
					<ProfileHeader>بازیابی رمز عبور</ProfileHeader>
					<ForgotPasswordInputs />
					<Errors errors={errors} />
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							بازیابی رمز عبور
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
