import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';

export const Container = styled.div<StyledProps>`
	position: relative;
	width: 100%;
`;

interface CloseProps {
	disabled?: boolean;
}

export const Close = styled.div<CloseProps>`
	position: absolute;
	width: 25px;
	height: 25px;
	left: 10px;
	top: 10px;
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

interface BlobImageProps {
	src: string;
	width: number;
	height: number;
}

export const BlobImage = styled.div<BlobImageProps>`
	width: ${({width}) => width}px;
	height: ${({height}) => height}px;
	background-image: url('${({src}) => src}');
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 10px;
	border: 1px solid ${({theme: {primary}}) => primary}4C;
	box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
`;
