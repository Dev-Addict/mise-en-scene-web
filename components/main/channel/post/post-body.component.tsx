import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {EditorState, convertToRaw} from 'draft-js';
import {FormikHelpers} from 'formik';

import {PostFields, PostForm} from '../../../forms';
import {
	CREATE_POST_MUTATION,
	CreatePostMutationData,
	CreatePostMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {editorStateToRawText, errorParser} from '../../../../utils';
import {Channel} from '../../../../types';
import {GraphQLError} from 'graphql';

const initialValues: PostFields = {
	cover: undefined,
	title: EditorState.createEmpty(),
	subtitle: EditorState.createEmpty(),
	description: EditorState.createEmpty(),
	tags: [],
	body: EditorState.createEmpty(),
	publishAt: undefined,
	publish: false,
};

interface Props {
	channel: Channel;
}

export const PostBody: FC<Props> = ({channel: {id, myAdmin, handle}}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {token} = useAuth();

	const [createPost] = useMutation<
		CreatePostMutationData,
		CreatePostMutationVariables
	>(CREATE_POST_MUTATION, {
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});

	const onSubmit = (): ((
		values: PostFields,
		formikHelpers: FormikHelpers<PostFields>
	) => void | Promise<any>) => async (
		{body, title, description, subtitle, publishAt, publish, cover, tags},
		{setSubmitting}
	) => {
		setSubmitting(true);

		setErrors([]);

		try {
			await createPost({
				variables: {
					body: convertToRaw(body.getCurrentContent()),
					title: editorStateToRawText(title, ' '),
					description: editorStateToRawText(description, ' '),
					subtitle: editorStateToRawText(subtitle, ' '),
					publishAt: publishAt?.getTime(),
					tags,
					channel: id || '',
					published: publish,
					cover: cover?.id,
					admin: myAdmin?.id,
				},
			});

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
		<div>
			<PostForm
				onSubmit={onSubmit()}
				errors={errors}
				initialValues={initialValues}
				submitText="ثبت مطلب"
			/>
		</div>
	);
};
