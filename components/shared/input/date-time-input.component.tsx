import React, {FC} from 'react';
import styled from 'styled-components';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {StyledProps} from '../../../types';
import {Input} from './input';

interface ContainerProps {
	width?: string;
	height?: string;
}

const Container = styled.div<StyledProps & ContainerProps>`
	width: ${({width}) => width};
	height: ${({height}) => height};

	& .react-datepicker {
		z-index: 100;
	}

	& * {
		color: ${({theme: {foreground}}) => foreground};
	}

	& .react-datepicker-wrapper {
		width: ${({width}) => width};
		height: ${({height}) => height};
	}

	& .react-datepicker-popper {
		transition: none;
	}

	&
		.react-datepicker-popper[data-placement^='bottom']
		.react-datepicker__triangle::before,
	&
		.react-datepicker-popper[data-placement^='top']
		.react-datepicker__triangle::before,
	.react-datepicker__year-read-view--down-arrow::before,
	& .react-datepicker__month-read-view--down-arrow::before,
	& .react-datepicker__month-year-read-view--down-arrow::before {
		border-bottom-color: ${({theme: {primary}}) => primary}4C;
	}

	&
		.react-datepicker-popper[data-placement^='bottom']
		.react-datepicker__triangle,
	&
		.react-datepicker-popper[data-placement^='bottom']
		.react-datepicker__triangle::before {
		border-bottom-color: ${({theme: {primary}}) => primary}4C;
	}

	&
		.react-datepicker-popper[data-placement^='bottom']
		.react-datepicker__triangle::before {
		border-bottom-color: ${({theme: {primary}}) => primary}4C;
	}

	& .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle,
	& .react-datepicker__year-read-view--down-arrow,
	& .react-datepicker__month-read-view--down-arrow,
	& .react-datepicker__month-year-read-view--down-arrow,
	&
		.react-datepicker-popper[data-placement^='top']
		.react-datepicker__triangle::before,
	& .react-datepicker__year-read-view--down-arrow::before,
	& .react-datepicker__month-read-view--down-arrow::before,
	& .react-datepicker__month-year-read-view--down-arrow::before {
		border-top-color: ${({theme: {primary}}) => primary}4C;
	}

	&
		.react-datepicker-popper[data-placement^='top']
		.react-datepicker__triangle::before,
	& .react-datepicker__year-read-view--down-arrow::before,
	& .react-datepicker__month-read-view--down-arrow::before,
	& .react-datepicker__month-year-read-view--down-arrow::before {
		border-top-color: ${({theme: {primary}}) => primary}4C;
	}

	& .react-datepicker {
		background-color: ${({theme: {background}}) => background};
		border: 1px solid ${({theme: {primary}}) => primary}4C;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
	}

	& .react-datepicker__header {
		background-color: ${({theme: {foreground}}) => foreground}08;
		border-bottom: 2px solid ${({theme: {foreground}}) => foreground}4C;
	}

	& .react-datepicker__navigation--previous {
		border-right-color: ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__navigation--previous:hover {
		border-right-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__navigation--previous--disabled,
	& .react-datepicker__navigation--previous--disabled:hover {
		border-right-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__navigation--next {
		border-left-color: ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__navigation--next:hover {
		border-left-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__navigation--next--disabled,
	& .react-datepicker__navigation--next--disabled:hover {
		border-left-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__navigation--years-previous {
		border-top-color: ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__navigation--years-previous:hover {
		border-top-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__navigation--years-upcoming {
		border-bottom-color: ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__navigation--years-upcoming:hover {
		border-bottom-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__time-container {
		border-left: 1px solid ${({theme: {foreground}}) => foreground}08;
	}

	& .react-datepicker__time-container--with-today-button {
		border: 1px solid ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__time-container .react-datepicker__time {
		background: ${({theme: {background}}) => background};
	}

	&
		.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item:hover {
		background-color: ${({theme: {link}}) => link};
	}

	&
		.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--selected {
		background-color: ${({theme: {link}}) => link};
		color: ${({theme: {foreground}}) => foreground};
	}

	&
		.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--selected:hover {
		background-color: ${({theme: {link}}) => link};
	}

	&
		.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--disabled {
		color: ${({theme: {foreground}}) => foreground};
		opacity: 0.5;
	}

	& .react-datepicker__week-number {
		color: ${({theme: {foreground}}) => foreground};
	}

	&
		.react-datepicker__week-number.react-datepicker__week-number--clickable:hover {
		background-color: ${({theme: {link}}) => link};
		opacity: 0.5;
	}

	& .react-datepicker__month--selected,
	& .react-datepicker__month--in-selecting-range,
	& .react-datepicker__month--in-range,
	& .react-datepicker__quarter--selected,
	& .react-datepicker__quarter--in-selecting-range,
	& .react-datepicker__quarter--in-range {
		background-color: ${({theme: {link}}) => link};
		color: ${({theme: {foreground}}) => foreground};
	}

	& .react-datepicker__month--selected:hover,
	& .react-datepicker__month--in-selecting-range:hover,
	& .react-datepicker__month--in-range:hover,
	& .react-datepicker__quarter--selected:hover,
	& .react-datepicker__quarter--in-selecting-range:hover,
	& .react-datepicker__quarter--in-range:hover {
		background-color: ${({theme: {link}}) => link};
	}

	& .react-datepicker__month--disabled,
	& .react-datepicker__quarter--disabled {
		opacity: 0.5;
	}

	& .react-datepicker__day--disabled,
	& .react-datepicker__day--disabled:hover {
		opacity: 0.5;
		cursor: default;
		background-color: transparent !important;
	}

	& .react-datepicker__day:hover,
	& .react-datepicker__month-text:hover,
	& .react-datepicker__quarter-text:hover,
	& .react-datepicker__year-text:hover {
		background-color: ${({theme: {link}}) => link};
		opacity: 0.5;
	}

	& .react-datepicker__day--highlighted,
	& .react-datepicker__month-text--highlighted,
	& .react-datepicker__quarter-text--highlighted,
	& .react-datepicker__year-text--highlighted {
		background-color: ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__day--highlighted:hover,
	& .react-datepicker__month-text--highlighted:hover,
	& .react-datepicker__quarter-text--highlighted:hover,
	& .react-datepicker__year-text--highlighted:hover {
		background-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__day--highlighted-custom-1,
	& .react-datepicker__month-text--highlighted-custom-1,
	& .react-datepicker__quarter-text--highlighted-custom-1,
	& .react-datepicker__year-text--highlighted-custom-1 {
		color: ${({theme: {foreground}}) => foreground};
	}

	& .react-datepicker__day--highlighted-custom-2,
	& .react-datepicker__month-text--highlighted-custom-2,
	& .react-datepicker__quarter-text--highlighted-custom-2,
	& .react-datepicker__year-text--highlighted-custom-2 {
		color: ${({theme: {foreground}}) => foreground};
	}

	& .react-datepicker__day--selected,
	.react-datepicker__day--in-selecting-range,
	& .react-datepicker__day--in-range,
	& .react-datepicker__month-text--selected,
	& .react-datepicker__month-text--in-selecting-range,
	& .react-datepicker__month-text--in-range,
	& .react-datepicker__quarter-text--selected,
	& .react-datepicker__quarter-text--in-selecting-range,
	& .react-datepicker__quarter-text--in-range,
	& .react-datepicker__year-text--selected,
	& .react-datepicker__year-text--in-selecting-range,
	& .react-datepicker__year-text--in-range {
		background-color: ${({theme: {link}}) => link};
	}

	& .react-datepicker__day--selected:hover,
	.react-datepicker__day--in-selecting-range:hover,
	& .react-datepicker__day--in-range:hover,
	& .react-datepicker__month-text--selected:hover,
	& .react-datepicker__month-text--in-selecting-range:hover,
	& .react-datepicker__month-text--in-range:hover,
	& .react-datepicker__quarter-text--selected:hover,
	& .react-datepicker__quarter-text--in-selecting-range:hover,
	& .react-datepicker__quarter-text--in-range:hover,
	& .react-datepicker__year-text--selected:hover,
	& .react-datepicker__year-text--in-selecting-range:hover,
	& .react-datepicker__year-text--in-range:hover {
		background-color: ${({theme: {link}}) => link};
	}

	& .react-datepicker__day--keyboard-selected,
	& .react-datepicker__month-text--keyboard-selected,
	& .react-datepicker__quarter-text--keyboard-selected,
	& .react-datepicker__year-text--keyboard-selected {
		background-color: ${({theme: {link}}) => link};
	}

	& .react-datepicker__day--keyboard-selected:hover,
	& .react-datepicker__month-text--keyboard-selected:hover,
	& .react-datepicker__quarter-text--keyboard-selected:hover,
	& .react-datepicker__year-text--keyboard-selected:hover {
		background-color: ${({theme: {link}}) => link};
		opacity: 0.5;
	}

	& .react-datepicker__day--in-selecting-range,
	& .react-datepicker__month-text--in-selecting-range,
	& .react-datepicker__quarter-text--in-selecting-range,
	& .react-datepicker__year-text--in-selecting-range {
		background-color: ${({theme: {link}}) => link}AA;
	}

	& .react-datepicker__month--selecting-range .react-datepicker__day--in-range,
	&
		.react-datepicker__month--selecting-range
		.react-datepicker__month-text--in-range,
	&
		.react-datepicker__month--selecting-range
		.react-datepicker__quarter-text--in-range,
	&
		.react-datepicker__month--selecting-range
		.react-datepicker__year-text--in-range {
		background-color: ${({theme: {foreground}}) => foreground};
	}

	& .react-datepicker__month-text.react-datepicker__month--selected:hover,
	& .react-datepicker__month-text.react-datepicker__month--in-range:hover,
	.react-datepicker__month-text.react-datepicker__quarter--selected:hover,
	.react-datepicker__month-text.react-datepicker__quarter--in-range:hover,
	& .react-datepicker__quarter-text.react-datepicker__month--selected:hover,
	& .react-datepicker__quarter-text.react-datepicker__month--in-range:hover,
	& .react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,
	& .react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {
		background-color: ${({theme: {link}}) => link};
		opacity: 0.5;
	}

	& .react-datepicker__month-text:hover,
	& .react-datepicker__quarter-text:hover {
		background-color: ${({theme: {foreground}}) => foreground};
	}

	&
		.react-datepicker__year-read-view:hover
		.react-datepicker__year-read-view--down-arrow,
	&
		.react-datepicker__year-read-view:hover
		.react-datepicker__month-read-view--down-arrow,
	&
		.react-datepicker__month-read-view:hover
		.react-datepicker__year-read-view--down-arrow,
	&
		.react-datepicker__month-read-view:hover
		.react-datepicker__month-read-view--down-arrow,
	&
		.react-datepicker__month-year-read-view:hover
		.react-datepicker__year-read-view--down-arrow,
	&
		.react-datepicker__month-year-read-view:hover
		.react-datepicker__month-read-view--down-arrow {
		background-color: ${({theme: {primary}}) => primary};
		opacity: 0.5;
	}

	& .react-datepicker__year-read-view--down-arrow,
	& .react-datepicker__month-read-view--down-arrow,
	& .react-datepicker__month-year-read-view--down-arrow {
		background-color: ${({theme: {primary}}) => primary};
	}

	& .react-datepicker__close-icon {
		left: -25px;
		top: 50%;
		transform: translateY(-50%);
	}

	& .react-datepicker__close-icon::after {
		background-color: ${({theme: {error}}) => error};
	}
`;

interface Props extends Omit<ReactDatePickerProps, 'onChange'>, ContainerProps {
	onChange?(
		date: Date | [Date, Date] | /* for selectsRange */ null,
		event: React.SyntheticEvent<any> | undefined
	): void;

	label?: string;
	placeholder?: string;
	icon?: string;
	primary?: boolean;
	touched?: boolean;
	error?: string;
	showError?: boolean;
}

export const DateTimeInput: FC<Props> = ({
	label,
	placeholder,
	icon,
	primary,
	touched,
	error,
	showError,
	height,
	width,
	...props
}) => {
	return (
		<Container height={height} width={width}>
			<DatePicker
				placeholderText={placeholder}
				customInput={
					<Input
						primary={primary}
						label={label}
						icon={icon}
						touched={touched}
						error={error}
						showError={showError}
					/>
				}
				onChange={() => {}}
				{...props}
			/>
		</Container>
	);
};

export type DateTimeInputProps = Props;
