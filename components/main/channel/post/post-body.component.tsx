import React, {useState} from 'react';
import {FormikHelpers} from 'formik';
import {EditorState} from 'draft-js';

import {PostFields, PostForm} from '../../../forms';

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

export const PostBody = () => {
	const [errors, setErrors] = useState<string[]>([]);

	const onSubmit = (): ((
		values: PostFields,
		formikHelpers: FormikHelpers<PostFields>
	) => void | Promise<any>) => async (values, {setSubmitting}) => {
		setSubmitting(true);

		setErrors([]);

		try {
		} catch (error) {}

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
