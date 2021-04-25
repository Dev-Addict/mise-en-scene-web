import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {GraphQLError} from 'graphql';
import {EditorState} from 'draft-js';

import {
	ANNOUNCE_MUTATION,
	AnnounceMutationData,
	AnnounceMutationVariables,
} from '../../../api';
import {WriteFields, WriteForm} from '../../forms';
import {FormikHelpers} from 'formik/dist/types';
import {useAnnouncements, useAuth} from '../../../hooks';
import {editorStateToRawText, errorParser} from '../../../utils';
import {ServerError} from '../../../types';

const initialValues: WriteFields = {
	text: EditorState.createEmpty(),
	gif: undefined,
	poll: undefined,
	publishAt: undefined,
	gallery: undefined,
	reAnnouncement: undefined,
	comment: undefined,
};

interface Props {
	onAnnounce?: () => void;
	reAnnouncement?: string;
	comment?: string;
}

export const Announce: FC<Props> = ({onAnnounce, reAnnouncement, comment}) => {
	const router = useRouter();
	const {asPath} = router;

	const [errors, setErrors] = useState<string[]>([]);

	const {isSigned, isLoading, token} = useAuth();
	const {reload} = useAnnouncements();

	const [announce] = useMutation<
		AnnounceMutationData,
		AnnounceMutationVariables
	>(ANNOUNCE_MUTATION);

	const onSubmit = () => async (
		{text, gif, gallery, poll, publishAt, reAnnouncement, comment}: WriteFields,
		{setSubmitting, resetForm}: FormikHelpers<WriteFields>
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
					comment,
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
			} else {
				onAnnounce && onAnnounce();
				reload();
				resetForm({values: initialValues});
			}
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
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, []);

	return (
		<WriteForm
			onSubmit={onSubmit()}
			errors={errors}
			initialValues={{
				...initialValues,
				reAnnouncement,
				comment,
			}}
		/>
	);
};
