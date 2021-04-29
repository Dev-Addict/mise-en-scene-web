import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	Logo,
	Meta,
	RequestChannelFields,
	RequestChannelForm,
} from '../../components';
import {FormikHelpers} from 'formik/dist/types';
import {useMutation} from '@apollo/client';
import {
	REQUEST_CHANNEL_MUTATION,
	RequestChannelMutationData,
	RequestChannelMutationVariables,
} from '../../api';
import {useAuth} from '../../hooks';
import {errorParser} from '../../utils';
import {GraphQLError} from 'graphql';
import {ServerError} from '../../types';
import {useRouter} from 'next/router';

const Header = styled.div`
	padding: 10px 20px;
	margin-bottom: 40px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	direction: rtl;
`;

const Request = () => {
	const router = useRouter();
	const {asPath} = router;

	const [errors, setErrors] = useState<string[]>([]);

	const {token, isSigned, isLoading} = useAuth();

	const [requestChannel] = useMutation<
		RequestChannelMutationData,
		RequestChannelMutationVariables
	>(REQUEST_CHANNEL_MUTATION, {
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
				variables: values,
			});

			setErrors(
				errorParser(
					(errors
						?.map(({extensions}) => extensions as ServerError | undefined)
						.filter((value) => value) as ServerError[]) || []
				)
			);

			await router.push('/dashboard/channels');
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

	useEffect(() => {
		if (!isSigned && !isLoading) router.push(`/sign?callback=${asPath}`);
	}, [isSigned, isLoading]);

	return (
		<div>
			<Meta title="درخواست کانال" />
			<Header>
				<Logo />
			</Header>
			<RequestChannelForm
				onSubmit={onSubmit()}
				errors={errors}
				initialValues={{handle: '', name: '', cover: undefined}}
			/>
		</div>
	);
};

export default Request;
