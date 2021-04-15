import React, {FC} from 'react';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {User} from '../../../../../types';
import {
	Body,
	ProfileHeader,
	SubmitContainer,
} from '../../sign-components.component';
import {Avatar, Button, Errors} from '../../../../shared';
import {Color} from '../../../../../data';
import {ResetEmailInputs} from './reset-email-inputs.component';

export interface ResetEmailFields {
	email: string;
}

interface Props {
	onSubmit: (
		values: ResetEmailFields,
		formikHelpers: FormikHelpers<ResetEmailFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: ResetEmailFields;
	user?: User;
}

export const ResetEmailForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
	user,
}) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({isSubmitting}: FormikProps<ResetEmailFields>) => (
				<Body>
					<Avatar user={user} />
					<ProfileHeader>ایمیل خود را عوض کنید!</ProfileHeader>
					<ResetEmailInputs />
					<Errors errors={errors} />
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							عوض کردن ایمیل
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
