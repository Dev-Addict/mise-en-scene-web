import React from 'react';
import {Field} from 'formik';

import {FormikImageInput} from '../../../shared';
import {PostFields} from './post.form';
import {InputContainer} from '../../sign/sign-components.component';
import {FormikClearInput} from '../../../shared/input/clear-input';

const fields: {
	[key in keyof PostFields]: string;
} = {
	title: 'title',
	subtitle: 'subtitle',
	description: 'description',
	tags: 'tags',
	body: 'body',
	publish: 'publish',
	cover: 'cover',
	publishAt: 'publishAt',
};

export const PostInputs = () => {
	return (
		<>
			<InputContainer>
				<Field name={fields.cover} component={FormikImageInput} />
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.title}
					component={FormikClearInput}
					placeholder="عنوان مطلب..."
					primary
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.subtitle}
					component={FormikClearInput}
					placeholder="عنوان فرعی مطلب..."
					primary
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.description}
					component={FormikClearInput}
					placeholder="توضیحات مطلب..."
					primary
				/>
			</InputContainer>
		</>
	);
};
