import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {GraphQLError} from 'graphql';
import {useMutation} from '@apollo/client';
import {
	EditorState,
	ContentState,
	convertFromRaw,
	convertToRaw,
} from 'draft-js';
import {FormikHelpers} from 'formik';

import {PostFields, PostForm} from '../../../forms';
import {
	UPDATE_POST_MUTATION,
	UpdatePostMutationData,
	UpdatePostMutationVariables,
} from '../../../../api';
import {useAuth} from '../../../../hooks';
import {editorStateToRawText, errorParser} from '../../../../utils';
import {Channel, Post} from '../../../../types';

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
	post: Post;
}

export const EditPost: FC<Props> = ({
	channel: {handle},
	post: {
		id,
		title,
		description,
		subtitle,
		publishAt,
		published,
		bodyData,
		coverData,
		tags,
	},
}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const {token} = useAuth();

	const [updatePost] = useMutation<
		UpdatePostMutationData,
		UpdatePostMutationVariables
	>(UPDATE_POST_MUTATION, {
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
			await updatePost({
				variables: {
					id: id || '',
					body: convertToRaw(body.getCurrentContent()),
					title: editorStateToRawText(title, ' '),
					description: editorStateToRawText(description, ' '),
					subtitle: editorStateToRawText(subtitle, ' '),
					publishAt: publishAt?.getTime(),
					tags,
					published: publish,
					cover: cover?.id,
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
				initialValues={{
					title: title
						? EditorState.createWithContent(ContentState.createFromText(title))
						: initialValues.title,
					subtitle: subtitle
						? EditorState.createWithContent(
								ContentState.createFromText(subtitle)
						  )
						: initialValues.subtitle,
					cover: coverData ? coverData : initialValues.cover,
					tags: tags ? tags : initialValues.tags,
					publish: published ? published : initialValues.publish,
					body: bodyData
						? EditorState.createWithContent(convertFromRaw(bodyData as any))
						: initialValues.body,
					description: description
						? EditorState.createWithContent(
								ContentState.createFromText(description)
						  )
						: initialValues.description,
					publishAt: publishAt ? new Date(publishAt) : initialValues.publishAt,
				}}
				submitText="ثبت مطلب"
			/>
		</div>
	);
};
