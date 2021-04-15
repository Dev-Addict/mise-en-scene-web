import React, {FC, ReactNode} from 'react';
import {Field} from 'formik';

import {
	Errors,
	Filler,
	FormikEmojiPicker,
	FormikGalleryInput,
	FormikGif,
	FormikGifSelector,
	FormikOpenGalleryInput,
	FormikPollInput,
	FormikPollTrigger,
	FormikTextEditor,
} from '../../shared';
import {WriteFields} from './write.form';
import {
	ControlRow,
	DateTimeField,
	OpenFieldContainer,
} from './write-components.component';

const fields: {
	[key in keyof WriteFields]: string;
} = {
	text: 'text',
	gif: 'gif',
	poll: 'poll',
	publishAt: 'publishAt',
	gallery: 'gallery',
	reAnnouncement: 'reAnnouncement',
	comment: 'comment',
};

interface Props {
	submitButton: ReactNode;
	errors: string[];
	isSubmitting: boolean;
}

export const WriteInputs: FC<Props> = ({
	submitButton,
	errors,
	isSubmitting,
}) => {
	return (
		<>
			<Field
				name={fields.text}
				component={FormikTextEditor}
				placeholder="چه شده است؟"
				primary
			/>
			<OpenFieldContainer>
				<Field name={fields.gif} component={FormikGif} />
			</OpenFieldContainer>
			<OpenFieldContainer>
				<Field name={fields.poll} component={FormikPollInput} />
			</OpenFieldContainer>
			<OpenFieldContainer>
				<Field
					name={fields.gallery}
					component={FormikOpenGalleryInput}
					maxLength={10}
				/>
			</OpenFieldContainer>
			<Errors errors={errors} />
			<ControlRow>
				{submitButton}
				<Filler />
				<DateTimeField name={fields.publishAt} isSubmitting={isSubmitting} />
				<Filler flex={0} minWidth={10} />
				<Field name={fields.poll} component={FormikPollTrigger} />
				<Filler flex={0} minWidth={10} />
				<Field
					name={fields.gallery}
					component={FormikGalleryInput}
					maxLength={10}
				/>
				<Filler flex={0} minWidth={10} />
				<Field name={fields.gif} component={FormikGifSelector} />
				<Filler flex={0} minWidth={10} />
				<Field name={fields.text} component={FormikEmojiPicker} />
			</ControlRow>
		</>
	);
};
