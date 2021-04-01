import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';

export const Container = styled.div<StyledProps>`
	direction: rtl;
	border-right: 3px solid ${({theme: {foreground}}) => foreground}4C;
	padding-right: 10px;
`;

export const Option = styled.div`
	display: flex;
	flex-direction: row;
`;

interface CloseProps {
	disabled?: boolean;
}

export const Close = styled.div<CloseProps>`
	width: 24px;
	height: 24px;
	cursor: pointer;
	margin: 0 10px;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}
`;

interface PlusProps {
	disabled?: boolean;
}

export const Plus = styled.div<PlusProps>`
	width: 24px;
	height: 24px;
	cursor: pointer;
	margin: 0 10px 20px;

	& > * {
		transform: rotate(45deg);
	}

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}
`;
