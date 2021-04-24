import React, {FC} from 'react';
import {Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import styled from 'styled-components';

import {Channel, User} from '../../../../../types';
import {
	Body,
	ProfileHeader,
	SubmitContainer,
} from '../../../sign/sign-components.component';
import {Avatar, Button, Cover, Errors} from '../../../../shared';
import {Color} from '../../../../../data';
import {AdminPermissionsInputs} from './admin-permissions-inputs.component';

export interface AdminPermissionsFields {
	POST: boolean;
	EDIT_OTHERS_POST: boolean;
	CREATE_NEW_ADMIN: boolean;
	EDIT_ADMINS_PERMISSIONS: boolean;
	DELETE_ADMIN: boolean;
	DELETE_POST: boolean;
}

const ConnectContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;

	& > *:nth-child(2) {
		margin-left: -30px;
	}
`;

interface Props {
	onSubmit: (
		values: AdminPermissionsFields,
		formikHelpers: FormikHelpers<AdminPermissionsFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: AdminPermissionsFields;
	admin?: User;
	channel?: Channel;
	submitText: string;
	header: string;
}

export const AdminPermissionsForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
	admin,
	channel,
	submitText,
	header,
}) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({isSubmitting}: FormikProps<AdminPermissionsFields>) => (
				<Body>
					<ConnectContainer>
						<Cover
							size={120}
							src={`/image/channel/cover/${channel?.cover || 'default.svg'}`}
							link={`/channels/${channel?.handle}`}
						/>
						<Avatar user={admin} size={120} />
					</ConnectContainer>
					<ProfileHeader>{header}</ProfileHeader>
					<AdminPermissionsInputs />
					<Errors errors={errors} />
					<SubmitContainer>
						<Button
							primary
							color={Color.GHOST_WHITE}
							type="submit"
							disabled={isSubmitting}>
							{submitText}
						</Button>
					</SubmitContainer>
				</Body>
			)}
		</Formik>
	);
};
