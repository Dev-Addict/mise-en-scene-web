import React, {FC} from 'react';
import Image from 'next/image';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {
	Body,
	ConvertLink,
	ConvertText,
	Profile,
	ProfileHeader,
	SubmitContainer,
} from '../sign-components.component';
import {Button, Errors} from '../../../shared';
import {Color} from '../../../../data';
import {SignUpInputs} from './sign-up-inputs.component';
import {signUpValidator} from '../../validators';
import {useThemeImage} from '../../../../hooks';

export interface SignUpFields {
	email: string;
	username: string;
	password: string;
}

interface Props {
	onSubmit: (
		values: SignUpFields,
		formikHelpers: FormikHelpers<SignUpFields>
	) => void | Promise<any>;
	errors: string[];
	switchSign: () => void;
	initialValues: SignUpFields;
}

export const SignUpForm: FC<Props> = ({
	errors,
	initialValues,
	switchSign,
	onSubmit,
}) => {
	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={signUpValidator}>
			{({isSubmitting}: FormikProps<SignUpFields>) => (
				<Body>
					<Profile>
						<Image src={profile} width="200px" height="200px" />
					</Profile>
					<ProfileHeader>ثبت نام</ProfileHeader>
					<SignUpInputs />
					<ConvertText>
						حساب کاربری دارید؟{' '}
						<ConvertLink onClick={switchSign}>وارد شوید!</ConvertLink>
					</ConvertText>
					<Errors errors={errors} />
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
