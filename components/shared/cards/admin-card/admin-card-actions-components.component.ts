import styled, {css} from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;

	& > * {
		margin: 0 5px;
	}

	& > *:first-child {
		margin-left: 0;
	}

	& > *:last-child {
		margin-right: 0;
	}
`;

interface ItemProps {
	disabled?: boolean;
}

export const Item = styled.div<ItemProps>`
	width: 20px;
	height: 20px;
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
