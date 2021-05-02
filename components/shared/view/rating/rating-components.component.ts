import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';

interface ContainerProps {
	ratio?: number;
	disabled?: boolean;
}

export const Container = styled.div<ContainerProps>`
	position: relative;
	width: ${({ratio = 1}) => ratio * 100}px;
	height: ${({ratio = 1}) => ratio * 20}px;
	background-color: ${({theme: {foreground}}) => foreground}80;
	direction: rtl;

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface RatedBarProps {
	width?: number;
	ratio?: number;
}

export const RatedBar = styled.div<StyledProps & RatedBarProps>`
	position: absolute;
	width: ${({width}) => width || 0}px;
	height: ${({ratio = 1}) => ratio * 20}px;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: ${({theme: {accent}}) => accent};
`;

interface RatingTemplateProps {
	ratable?: boolean;
	ratio?: number;
}

export const RatingTemplate = styled.div<RatingTemplateProps>`
	position: absolute;
	width: ${({ratio = 1}) => ratio * 100}px;
	height: ${({ratio = 1}) => ratio * 20}px;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	& > * {
		width: ${({ratio = 1}) => ratio * 100}px;
		height: ${({ratio = 1}) => ratio * 20}px;
	}

	& img {
		width: ${({ratio = 1}) => ratio * 100}px;
		height: ${({ratio = 1}) => ratio * 20}px;
	}

	${({ratable}) =>
		ratable &&
		css`
			cursor: pointer;
		`}
`;
