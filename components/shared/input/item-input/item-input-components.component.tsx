import styled, {css} from 'styled-components';

import {StyledProps} from '../../../../types';
import {Color} from '../../../../data';

export const Container = styled.div`
	direction: rtl;
	font-size: 18px;
	width: 100%;
	flex: 1;
	padding: 0 10px;
`;

export const Label = styled.div`
	margin-right: 10px;
`;

interface TextInputContainerProps {
	isFocus?: boolean;
	primary?: boolean;
	disabled?: boolean;
	editable?: boolean;
}

export const TextInputContainer = styled.div<
	StyledProps & TextInputContainerProps
>`
	width: 100%;
	border-radius: 10px;
	border: 2px solid ${({theme: {foreground}}) => foreground}4C;
	color: ${({theme: {foreground}}) => foreground};
	padding: 10px;

	&::placeholder {
		color: ${({theme: {foreground}}) => foreground}66;
	}

	${({isFocus, theme: {accent, primary: primaryColor}, primary}) =>
		isFocus &&
		css`
			border-color: ${primary ? primaryColor : accent}4C;
			box-shadow: 3px 0 6px 0 ${primary ? primaryColor : accent}29;
		`}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

export const TextInput = styled.input`
	flex: 1;
	border: none;
	background-color: transparent;
	outline: none;
	font-size: 18px;
	user-select: auto;
	width: auto;
	height: min-content;

	&:disabled {
		opacity: 0.5;
	}
`;

interface ErrorProps {
	show?: boolean;
}

export const Error = styled.div<StyledProps & ErrorProps>`
	width: 100%;
	direction: rtl;
	color: ${({theme: {error}}) => error};
	font-size: 14px;

	${({show}) =>
		!show &&
		css`
			display: none;
		`}
`;

interface ItemProps {
	disabled?: boolean;
}

export const Item = styled.div<StyledProps & ItemProps>`
	padding: 0 5px;
	border-radius: 5px;
	background-color: ${({theme: {primary}}) => primary};
	display: inline-block;
	margin: 0 4px;
	cursor: pointer;
	font-size: 16px;
	color: ${Color.GHOST_WHITE};

	&:hover {
		opacity: 0.5;
	}

	& > * {
		margin-right: 3px !important;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;
