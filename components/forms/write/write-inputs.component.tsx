import React, {FC, ReactNode} from 'react';
import Image from 'next/image';
import {Field} from 'formik';
import styled, {css} from 'styled-components';

import {
	Errors,
	Filler,
	FormikDateTimeInput,
	FormikEmojiPicker,
	FormikGalleryInput,
	FormikGif,
	FormikGifSelector,
	FormikOpenGalleryInput,
	FormikPollInput,
	FormikPollTrigger,
	FormikTextEditor,
	Row,
} from '../../shared';
import {WriteFields} from './write.form';
import {useThemeImage} from '../../../hooks';

const ControlRow = styled(Row)`
	align-items: center;
	margin: 10px 0;
`;

interface CalendarProps {
	disabled?: boolean;
}

const Calendar = styled.div<CalendarProps>`
	width: 40px;
	height: 40px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

const fields: {
	[key in keyof WriteFields]: string;
} = {
	text: 'text',
	gif: 'gif',
	poll: 'poll',
	publishAt: 'publishAt',
	gallery: 'gallery',
};

interface Props {
	submitButton: ReactNode;
	errors: string[];
	isSubmitting?: boolean;
}

export const WriteInputs: FC<Props> = ({
	submitButton,
	errors,
	isSubmitting,
}) => {
	const calendar = useThemeImage('/assets/icons/calendar/calendar-$mode.svg');

	return (
		<>
			<Field
				name={fields.text}
				component={FormikTextEditor}
				placeholder="چه شده است؟"
				primary
			/>
			<Row>
				<Filler flex={0} minWidth={10} />
				<Filler>
					<Field name={fields.gif} component={FormikGif} />
				</Filler>
				<Filler flex={0} minWidth={10} />
			</Row>
			<Row>
				<Filler flex={0} minWidth={10} />
				<Filler>
					<Field name={fields.poll} component={FormikPollInput} />
				</Filler>
				<Filler flex={0} minWidth={10} />
			</Row>
			<Row>
				<Filler flex={0} minWidth={10} />
				<Filler>
					<Field
						name={fields.gallery}
						component={FormikOpenGalleryInput}
						maxLength={10}
					/>
				</Filler>
				<Filler flex={0} minWidth={10} />
			</Row>
			<Errors errors={errors} />
			<ControlRow>
				{submitButton}
				<Filler />
				<Field
					name={fields.publishAt}
					component={FormikDateTimeInput}
					width="40px"
					height="40px"
					isClearable
					minDate={new Date()}
					showTimeSelect
					timeFormat="HH:mm"
					customInput={
						<Calendar disabled={isSubmitting}>
							<Image src={calendar} width={40} height={40} />
						</Calendar>
					}
				/>
				<Filler flex={0} minWidth={20} />
				<Field name={fields.poll} component={FormikPollTrigger} />
				<Filler flex={0} minWidth={20} />
				<Field
					name={fields.gallery}
					component={FormikGalleryInput}
					maxLength={10}
				/>
				<Filler flex={0} minWidth={20} />
				<Field name={fields.gif} component={FormikGifSelector} />
				<Filler flex={0} minWidth={20} />
				<Field name={fields.text} component={FormikEmojiPicker} />
			</ControlRow>
		</>
	);
};
