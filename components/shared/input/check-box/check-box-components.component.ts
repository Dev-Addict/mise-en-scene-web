import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';
import {Color} from '../../../../data';

export const Container = styled.div`
	direction: rtl;
	width: 100%;
	flex: 1;
	padding: 0 10px;
`;

export const CheckBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	direction: rtl;
`;

interface BoxProps {
	disabled?: boolean;
}

export const Box = styled.div<StyledProps & BoxProps>`
	width: 30px;
	height: 30px;
	border-radius: 5px;
	border: 3px solid ${({theme: {primary}}) => primary};
	position: relative;
	overflow: hidden;
	direction: ltr;
	margin-left: 10px;
	cursor: pointer;

	${({disabled}) =>
		disabled &&
		css`
			cursor: default;
			opacity: 0.5;
		`}
`;

interface CheckBoxProps {
	checked?: boolean;
	disabled?: boolean;
}

export const CheckedBox = styled.div<StyledProps & CheckBoxProps>`
	position: absolute;
	width: 30px;
	height: 30px;
	background-color: ${({theme: {primary}}) => primary};
	top: -30px;
	left: -10px;
	border-radius: 3px;
	opacity: 0;

	${({checked = false}) =>
		checked &&
		css`
			top: 0;
			left: 0;
			opacity: 1;
		`}
`;

export const CheckMark = styled.div`
	display: inline-block;
	height: 20px;
	width: 12px;
	border: 5px solid ${Color.GHOST_WHITE};
	border-top: none;
	border-left: none;
	border-bottom-right-radius: 4px;
	position: relative;
	transform: translate(7px, 2px) rotate(45deg);
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
