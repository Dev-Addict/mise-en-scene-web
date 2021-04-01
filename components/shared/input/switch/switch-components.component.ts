import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';
import {Color} from '../../../../data';

interface ContainerProps {
	circular?: boolean;
	primary?: boolean;
}

export const Container = styled.div<StyledProps & ContainerProps>`
	border-radius: 4px;
	background-color: ${({theme: {accent}}) => accent};
	overflow: hidden;
	position: relative;
	padding: 0 1px;

	${({circular}) =>
		circular &&
		css`
			border-radius: 50px;
		`}

	${({primary}) =>
		primary &&
		css`
			background-color: ${({theme: {primary}}) => primary};
		`}
`;

interface ItemProps {
	unselectedItemColor?: Color;
	isSelected?: boolean;
}

export const Item = styled.div<StyledProps & ItemProps>`
	display: inline-block;
	padding: 10px 20px;
	z-index: 1;
	position: relative;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({isSelected, unselectedItemColor}) =>
		!isSelected &&
		css`
			color: ${unselectedItemColor};
		`}
`;

interface SelectedProps {
	width?: number;
	left?: number;
	circular?: boolean;
	primary?: boolean;
}

export const Selected = styled.div<StyledProps & SelectedProps>`
	position: absolute;
	border-radius: 4px;
	width: ${({width}) => width}px;
	left: ${({left}) => (left || 0) - 1}px;
	background-color: ${({theme: {background}}) => background};
	margin: 1px;
	top: 1px;
	bottom: 1px;

	${({circular}) =>
		circular &&
		css`
			border-radius: 50px;
		`}
`;
