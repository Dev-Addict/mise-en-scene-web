import React, {FC} from 'react';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {Body} from '../../sign/sign-components.component';
import {Button, Errors} from '../../../shared';
import {Color} from '../../../../data';
import {UserDetailInputs} from './user-detail-inputs.component';
import {Gender} from '../../../../types';
import {userDetailValidator} from '../../validators';

export interface UserDetailFields {
	email: string;
	firstname: string;
	lastname: string;
	avatar: string | File;
	birthday?: Date;
	gender?: Gender;
	bio: string;
	displayName: string;
	username: string;
}

interface Props {
	onSubmit: (
		values: UserDetailFields,
		formikHelpers: FormikHelpers<UserDetailFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: UserDetailFields;
	currentUsername?: string;
}

export const UserDetailForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
	currentUsername,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			enableReinitialize
			validate={userDetailValidator(currentUsername)}>
			{({isSubmitting}: FormikProps<UserDetailFields>) => (
				<Body>
					<UserDetailInputs />
					<Errors errors={errors} />
					<div>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							ثبت تغییرات
						</Button>
					</div>
				</Body>
			)}
		</Formik>
	);
};
