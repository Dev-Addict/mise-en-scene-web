import React, {FC} from 'react';
import {Formik, FormikProps, FormikHelpers} from 'formik';
import {EditorState} from 'draft-js';

import {Body, SubmitContainer} from '../../sign/sign-components.component';
import {Button, Errors} from '../../../shared';
import {PostInputs} from './post-inputs.component';
import {Color} from '../../../../data';
import {Image} from '../../../../types';
import {postValidator} from '../../validators';

export interface PostFields {
	cover: Image | undefined;
	title: EditorState;
	subtitle: EditorState;
	description: EditorState;
	tags: string[];
	body: EditorState;
	publishAt: Date | undefined;
	publish: boolean;
}

interface Props {
	onSubmit: (
		values: PostFields,
		formikHelpers: FormikHelpers<PostFields>
	) => void | Promise<any>;
	errors: string[];
	initialValues: PostFields;
	submitText: string;
}

export const PostForm: FC<Props> = ({
	errors,
	initialValues,
	onSubmit,
	submitText,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={postValidator}>
			{({isSubmitting}: FormikProps<PostFields>) => (
				<Body>
					<PostInputs />
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
