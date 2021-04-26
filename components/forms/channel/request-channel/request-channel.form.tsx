import React, {FC} from 'react';
import {Formik, FormikProps, FormikHelpers} from 'formik';

import {
	Body,
	ProfileHeader,
	SubmitContainer,
} from '../../sign/sign-components.component';
import {Button, Errors} from '../../../shared';
import {Color} from '../../../../data';
import {RequestChannelInputs} from './request-channel-inputs.component';
import {requestChannelValidator} from '../../validators';

export interface RequestChannelFields {
	name: string;
	handle: string;
	cover?: File;
}

interface Props {
	onSubmit: (
		values: RequestChannelFields,
		formikHelpers: FormikHelpers<RequestChannelFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: RequestChannelFields;
}

export const RequestChannelForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={requestChannelValidator}>
			{({isSubmitting}: FormikProps<RequestChannelFields>) => (
				<Body>
					<ProfileHeader>درخواست کانال جدید</ProfileHeader>
					<RequestChannelInputs />
					<Errors errors={errors} />
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							درخواست کانال
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
