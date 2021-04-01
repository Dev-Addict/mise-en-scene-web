import React, {FC} from 'react';
import styled, {css} from 'styled-components';
import {FormikDateTimeInput, Row} from '../../shared';
import {Field} from 'formik';
import Image from 'next/image';
import {useThemeImage} from '../../../hooks';

export const ControlRow = styled(Row)`
	align-items: center;
	margin: 10px 0;
`;

interface CalendarProps {
	disabled?: boolean;
}

export const Calendar = styled.div<CalendarProps>`
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

export const OpenFieldContainer = styled.div`
	padding: 0 10px;
`;

interface DateTimeFieldProps {
	name: string;
	isSubmitting: boolean;
}

export const DateTimeField: FC<DateTimeFieldProps> = ({name, isSubmitting}) => {
	const calendar = useThemeImage('/assets/icons/calendar/calendar-$mode.svg');

	return (
		<Field
			name={name}
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
	);
};
