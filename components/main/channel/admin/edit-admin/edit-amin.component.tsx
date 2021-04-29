import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {GraphQLError} from 'graphql';
import {FormikHelpers} from 'formik';

import {AdminPermissionsFields, AdminPermissionsForm} from '../../../../forms';
import {Channel, ChannelAdminPermission, User} from '../../../../../types';
import {
	EDIT_ADMIN_PERMISSIONS_MUTATION,
	EditAdminPermissionsMutationData,
	EditAdminPermissionsMutationVariables,
} from '../../../../../api';
import {useAuth} from '../../../../../hooks';
import {errorParser} from '../../../../../utils';

const initialValues: AdminPermissionsFields = {
	EDIT_OTHERS_POST: false,
	EDIT_ADMINS_PERMISSIONS: false,
	DELETE_POST: false,
	REMOVE_ADMIN: false,
	CREATE_NEW_ADMIN: false,
	POST: false,
};

interface Props {
	admin?: User;
	channel?: Channel;
}

export const EditAdmin: FC<Props> = ({admin, channel}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {token} = useAuth();

	const [editAdmin] = useMutation<
		EditAdminPermissionsMutationData,
		EditAdminPermissionsMutationVariables
	>(EDIT_ADMIN_PERMISSIONS_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const getInitialValues = () => {
		const permissions = channel?.admins?.find(
			({userData}) => userData?.id === admin?.id
		)?.permissions;

		const values = initialValues;
		if (permissions)
			for (const permission of permissions) (values as any)[permission] = true;

		return values;
	};

	const onSubmit = (): ((
		values: AdminPermissionsFields,
		formikHelpers: FormikHelpers<AdminPermissionsFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		setErrors([]);

		try {
			await editAdmin({
				variables: {
					admin: admin!.id!,
					channel: channel!.id!,
					permissions: Object.keys(values).filter(
						(key) => (values as any)[key]
					) as ChannelAdminPermission[],
				},
			});

			await router.push(`/channels/${channel?.handle}/manage`);
		} catch (error) {
			setErrors(
				errorParser(
					error?.graphQLErrors?.map(
						({extensions}: GraphQLError) => extensions
					) || []
				)
			);
		}

		setSubmitting(false);
	};

	return (
		<AdminPermissionsForm
			onSubmit={onSubmit()}
			errors={errors}
			initialValues={getInitialValues()}
			submitText="ویرایش مدیر"
			header="ویرایش مدیر!"
			admin={admin}
			channel={channel}
		/>
	);
};
