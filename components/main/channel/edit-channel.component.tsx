import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {GraphQLError} from 'graphql';
import {useMutation} from '@apollo/client';
import {FormikHelpers} from 'formik';

import {RequestChannelFields, RequestChannelForm} from '../../forms';
import {
	UPDATE_CHANNEL_MUTATION,
	UpdateChannelMutationData,
	UpdateChannelMutationVariables,
} from '../../../api';
import {useAuth} from '../../../hooks';
import {errorParser} from '../../../utils';
import {Channel, ServerError} from '../../../types';

interface Props {
	channel: Channel;
}

export const EditChannel: FC<Props> = ({
	channel: {handle, name, cover, id},
	channel,
}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {token} = useAuth();

	const [requestChannel] = useMutation<
		UpdateChannelMutationData,
		UpdateChannelMutationVariables
	>(UPDATE_CHANNEL_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onSubmit = (): ((
		values: RequestChannelFields,
		formikHelpers: FormikHelpers<RequestChannelFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setErrors([]);

		setSubmitting(true);

		try {
			const {errors} = await requestChannel({
				variables: {id: id || '', ...values},
			});

			setErrors(
				errorParser(
					(errors
						?.map(({extensions}) => extensions as ServerError | undefined)
						.filter((value) => value) as ServerError[]) || []
				)
			);

			await router.push(`/channels/${handle}/manage`);
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
		<RequestChannelForm
			onSubmit={onSubmit()}
			errors={errors}
			initialValues={{handle: handle || '', name: name || '', cover: undefined}}
			defaultCover={`/image/channel/cover/${cover || 'default.svg'}`}
			submitText="ذخیره تغییرات"
			channel={channel}
		/>
	);
};
