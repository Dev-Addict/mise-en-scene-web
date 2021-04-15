import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../../types';

interface ItemsContainerProps {
	itemPerLine?: number;
}

export const ItemsContainer = styled.div<ItemsContainerProps>`
	display: grid;
	direction: rtl;
	grid-auto-rows: 1fr;
	grid-template-columns: ${({itemPerLine = 1}) =>
		new Array(itemPerLine).fill('1fr').join(' ')};
`;

interface ItemContainerProps {
	rightEdge?: boolean;
	leftEdge?: boolean;
}

export const ItemContainer = styled.div<ItemContainerProps>`
	padding: 4px;

	${({rightEdge}) =>
		rightEdge &&
		css`
			padding-right: 0;
		`}

	${({leftEdge}) =>
		leftEdge &&
		css`
			padding-left: 0;
		`}
`;

interface ItemProps {
	disabled?: boolean;
	active?: boolean;
}

export const Item = styled.div<StyledProps & ItemProps>`
	text-align: center;
	flex: 1;
	background-color: transparent;
	outline: none;
	padding: 10px 20px;
	font-size: 18px;
	cursor: pointer;
	width: 100%;
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	border: 2px solid ${({theme: {foreground}}) => foreground}4C;
	color: ${({theme: {foreground}}) => foreground};

	&:hover {
		border-color: ${({theme: {primary}}) => primary}4C;
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;

			&:hover {
				border-color: ${({theme: {foreground}}) => foreground}4C;
				box-shadow: none;
			}
		`}

	${({active}) =>
		active &&
		css`
			border-color: ${({theme: {primary}}) => primary}4C;
			box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
			background-color: ${({theme: {primary}}) => primary}20;
		`}
`;
