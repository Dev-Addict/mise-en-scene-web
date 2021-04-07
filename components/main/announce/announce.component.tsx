import React, {FC, useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import {EditorState} from 'draft-js';

import {
	ANNOUNCE_MUTATION,
	AnnounceMutationData,
	AnnounceMutationVariables,
} from '../../../api';
import {WriteFields, WriteForm} from '../../forms';
import {FormikHelpers} from 'formik/dist/types';
import {useAuth} from '../../../hooks';
import {useRouter} from 'next/router';
import {GraphQLError} from 'graphql';
import {editorStateToRawText, errorParser} from '../../../utils';
import {ServerError} from '../../../types';

const initialValues: WriteFields = {
	text: EditorState.createEmpty(),
	gif: undefined,
	poll: undefined,
	publishAt: undefined,
	gallery: undefined,
	reAnnouncement: undefined,
};

interface Props {
	onAnnounce?: () => void;
	reAnnouncement?: string;
}

export const Announce: FC<Props> = ({onAnnounce, reAnnouncement}) => {
	const router = useRouter();
	const {asPath} = router;

	const [errors, setErrors] = useState<string[]>([]);

	const {isSigned, isLoading, token} = useAuth();

	const [announce] = useMutation<
		AnnounceMutationData,
		AnnounceMutationVariables
	>(ANNOUNCE_MUTATION);

	const onSubmit = () => async (
		{text, gif, gallery, poll, publishAt, reAnnouncement}: WriteFields,
		{setSubmitting}: FormikHelpers<WriteFields>
	) => {
		setSubmitting(true);

		try {
			const {errors} = await announce({
				variables: {
					text: editorStateToRawText(text),
					gif: gif?.id,
					images: gallery,
					poll,
					publishAt: publishAt?.toString(),
					reAnnouncement,
				},
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});

			if (errors) {
				setErrors(
					errorParser(
						(errors.map(
							({extensions}: GraphQLError) => extensions
						) as ServerError[]) || []
					)
				);
			} else onAnnounce && onAnnounce();
		} catch (error) {
			console.log({...error});
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
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, []);

	return (
		<WriteForm
			onSubmit={onSubmit()}
			errors={errors}
			initialValues={{
				...initialValues,
				reAnnouncement,
			}}
		/>
	);
};
