import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';

export const Container = styled.div`
	direction: rtl;
	font-size: 18px;
	width: 100%;
	flex: 1;
	padding: 0 10px;
`;

export const Label = styled.div`
	margin-right: 5px;
`;

interface TextInputContainerProps {
	isFocus?: boolean;
	primary?: boolean;
}

export const TextInputContainer = styled.div<
	StyledProps & TextInputContainerProps
>`
	width: 100%;
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	border: 2px solid ${({theme: {foreground}}) => foreground}4C;
	color: ${({theme: {foreground}}) => foreground};

	&::placeholder {
		color: ${({theme: {foreground}}) => foreground}66;
	}

	${({isFocus, theme: {accent, primary: primaryColor}, primary}) =>
		isFocus &&
		css`
			border-color: ${primary ? primaryColor : accent}4C;
			box-shadow: 3px 0 6px 0 ${primary ? primaryColor : accent}29;
		`}
`;

interface TextInputProps {
	icon?: boolean;
}

export const TextInput = styled.input<StyledProps & TextInputProps>`
	flex: 1;
	border: none;
	background-color: transparent;
	outline: none;
	padding: 10px 20px 10px ${({icon}) => (icon ? 0 : 20)}px;
	font-size: 18px;
`;

export const Icon = styled.div`
	width: 28px;
	height: 28px;
	margin: 10px;
`;
