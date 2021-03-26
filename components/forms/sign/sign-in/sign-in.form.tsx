import React, {FC} from 'react';
import Image from 'next/image';
import {Formik} from 'formik';

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
import {FormikHelpers} from 'formik/dist/types';
import {useThemeImage} from '../../../../hooks';
import {SignInInputs} from './sign-in-inputs.component';
import {signInValidator} from '../../validators';

export interface SignInFields {
	authKey: string;
	password: string;
}

interface Props {
	onSubmit: (
		values: SignInFields,
		formikHelpers: FormikHelpers<SignInFields>
	) => void | Promise<any>;
	errors: string[];
	switchSign: () => void;
	initialValues: SignInFields;
}

export const SignInForm: FC<Props> = ({
	onSubmit,
	errors,
	switchSign,
	initialValues,
}) => {
	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={signInValidator}>
			<Body>
				<Profile>
					<Image src={profile} width="200px" height="200px" />
				</Profile>
				<ProfileHeader>ورود</ProfileHeader>
				<SignInInputs />
				<ConvertText>
					<div>
						رمز عبور خود را فراموش کردید؟{' '}
						<ConvertLink>رمز عبور خود را بازیابی کنید!</ConvertLink>
					</div>
					<div>
						حساب کاربری ندارید؟{' '}
						<ConvertLink onClick={switchSign}>ثبت نام کنید!</ConvertLink>
					</div>
				</ConvertText>
				<Errors errors={errors} />
				<SubmitContainer>
					<Button primary color={Color.GHOST_WHITE} type="submit">
						ورود
					</Button>
				</SubmitContainer>
			</Body>
		</Formik>
	);
};
