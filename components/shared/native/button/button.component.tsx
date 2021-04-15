import styled, {css} from 'styled-components';

import {Color} from '../../../../data';
import {StyledProps} from '../../../../types';

interface Props {
	color?: Color;
	circular?: boolean;
	primary?: boolean;
	danger?: boolean;
	outline?: boolean;
	fill?: boolean;
	disabled?: boolean;
	floating?: boolean;
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
	minWidth?: number;
}

export const Button = styled.button<StyledProps & Props>`
	display: inline-block;
	background-color: ${({theme: {accent}}) => accent};
	color: ${({theme: {foreground}, color}) => color || foreground};
	font-size: 16px;
	padding: 8px 20px;
	border-radius: 4px;
	cursor: pointer;
	border: none;
	outline: none;
	text-align: center;
	min-width: ${({minWidth}) => minWidth}px;

	&:hover {
		opacity: 0.5;
		box-shadow: 0 0 5px 0 ${({theme: {accent}}) => accent};
	}

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}

	${({circular}) =>
		circular &&
		css`
			border-radius: 100px;
		`}

  ${({primary}) =>
		primary &&
		css`
			background-color: ${({theme: {primary}}) => primary};

			&:hover {
				box-shadow: 0 0 5px 0 ${({theme: {primary}}) => primary};
			}
		`}

  ${({danger, theme: {error}}) =>
		danger &&
		css`
			background-color: ${error};

			&:hover {
				box-shadow: 0 0 5px 0 ${error};
			}
		`}

  ${({outline, theme: {background, accent}, primary, danger}) =>
		outline &&
		css`
			background-color: ${background};
			border: 3px solid ${accent};

			${primary &&
			css`
				border-color: ${({theme: {primary}}) => primary};
			`}

			${danger &&
			css`
				border-color: ${({theme: {error}}) => error};
			`}
		`}

  ${({fill}) =>
		fill &&
		css`
			width: 100%;
		`}
	
	${({floating, top, right, bottom, left}) =>
		floating &&
		css`
			position: fixed;
			top: ${top}px;
			right: ${right}px;
			bottom: ${bottom}px;
			left: ${left}px;
		`}
`;
