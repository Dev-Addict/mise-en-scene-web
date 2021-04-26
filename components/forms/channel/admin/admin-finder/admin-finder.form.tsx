import React, {FC} from 'react';
import {Formik, FormikHelpers, FormikProps} from 'formik';

import {Body, SubmitContainer} from '../../../sign/sign-components.component';
import {Button, Errors} from '../../../../shared';
import {Color} from '../../../../../data';
import {AdminKeyInputs} from './admin-finder-inputs.component';
import {adminFinderValidator} from '../../../validators';

export interface AdminFinderFields {
	authKey: string;
}

interface Props {
	onSubmit: (
		values: AdminFinderFields,
		formikHelpers: FormikHelpers<AdminFinderFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: AdminFinderFields;
}

export const AdminFinderForm: FC<Props> = ({
	onSubmit,
	errors,
	initialValues,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={adminFinderValidator}>
			{({isSubmitting}: FormikProps<AdminFinderFields>) => (
				<Body>
					<AdminKeyInputs />
					<Errors errors={errors} />
					<SubmitContainer space={false}>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							اضافه کردن مدیر
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
