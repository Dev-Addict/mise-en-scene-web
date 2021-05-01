import React from 'react';
import {Field} from 'formik';

import {
	FormikCheckBox,
	FormikClearInput,
	FormikDateTimeInput,
	FormikEditor,
	FormikImageInput,
	FormikItemInput,
} from '../../../shared';
import {PostFields} from './post.form';
import {InputContainer} from '../../sign/sign-components.component';
import {useThemeImage} from '../../../../hooks';
import styled from 'styled-components';

const DateTimeContainer = styled(InputContainer)`
	& > * > * {
		width: 100%;
	}
`;

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
	const calendar = useThemeImage('/assets/icons/calendar/calendar-$mode.svg');

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
					placeholder="عنوان فرعی مطلب(اختیاری)..."
					primary
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.description}
					component={FormikClearInput}
					placeholder="توضیحات مطلب(اختیاری)..."
					primary
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.tags}
					component={FormikItemInput}
					placeholder="برچسب"
					label="برچسب ها"
					primary
					unique
				/>
			</InputContainer>
			<InputContainer>
				<Field
					component={FormikEditor}
					label="مطلب"
					placeholder="متن مطلب"
					name={fields.body}
				/>
			</InputContainer>
			<DateTimeContainer>
				<Field
					label="زمان انتشار"
					placeholder="زمان انتشار مطلب شما(اختیاری)"
					icon={calendar}
					primary
					name={fields.publishAt}
					component={FormikDateTimeInput}
					minDate={new Date()}
					showTimeSelect
					timeFormat="HH:mm"
					isClearable
				/>
			</DateTimeContainer>
			<InputContainer>
				<Field
					name={fields.publish}
					component={FormikCheckBox}
					text="انتشار همین الان"
				/>
			</InputContainer>
		</>
	);
};
