import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {GraphQLError} from 'graphql';
import {FormikHelpers} from 'formik';

import {AdminPermissionsFields, AdminPermissionsForm} from '../../../../forms';
import {Channel, ChannelAdminPermission, User} from '../../../../../types';
import {
	ADD_ADMIN_MUTATION,
	AddAdminMutationData,
	AddAdminMutationVariables,
} from '../../../../../api';
import {useAuth} from '../../../../../hooks';
import {errorParser} from '../../../../../utils';

const initialValues: AdminPermissionsFields = {
	EDIT_OTHERS_POST: true,
	EDIT_ADMINS_PERMISSIONS: false,
	DELETE_POST: true,
	DELETE_ADMIN: false,
	CREATE_NEW_ADMIN: false,
	POST: true,
};

interface Props {
	admin?: User;
	channel?: Channel;
}

export const AddAdmin: FC<Props> = ({admin, channel}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {token} = useAuth();

	const [addAdmin] = useMutation<
		AddAdminMutationData,
		AddAdminMutationVariables
	>(ADD_ADMIN_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onSubmit = (): ((
		values: AdminPermissionsFields,
		formikHelpers: FormikHelpers<AdminPermissionsFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		setErrors([]);

		try {
			await addAdmin({
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
			initialValues={initialValues}
			submitText="ساخت مدیر"
			header="ساخت مدیر جدید!"
			admin={admin}
			channel={channel}
		/>
	);
};
