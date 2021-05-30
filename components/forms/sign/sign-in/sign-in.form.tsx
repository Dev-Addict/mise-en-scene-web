import React, {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Formik, FormikHelpers, FormikProps} from 'formik';

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

	console.log(errors);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={signInValidator}>
			{({isSubmitting}: FormikProps<SignInFields>) => (
				<Body>
					<Profile>
						<Image src={profile} width="200px" height="200px" />
					</Profile>
					<ProfileHeader>ورود</ProfileHeader>
					<SignInInputs />
					<ConvertText>
						<div>
							رمز عبور خود را فراموش کردید؟{' '}
							<Link href="/sign/password/forgot">
								<ConvertLink>رمز عبور خود را بازیابی کنید!</ConvertLink>
							</Link>
						</div>
						<div>
							حساب کاربری ندارید؟{' '}
							<ConvertLink onClick={switchSign}>ثبت نام کنید!</ConvertLink>
						</div>
					</ConvertText>
					<Errors errors={errors} />
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							ورود
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
