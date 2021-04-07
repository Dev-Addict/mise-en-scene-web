import styled, {css} from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0 10px 0;
`;

interface ItemProps {
	reverse?: boolean;
	disabled?: boolean;
}

export const Item = styled.div<ItemProps>`
	direction: ltr;
	position: relative;
	height: 30px;
	width: 30px;
	cursor: pointer;
	z-index: 2;

	& > *:first-child {
		opacity: 0.5;

		${({reverse}) =>
			reverse &&
			css`
				transform: rotate(180deg);
			`}
	}

	&:hover > *:first-child {
		opacity: 1;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;

			&:hover > *:first-child {
				opacity: 0.5;
			}
		`}
`;

interface SideProps {
	active?: boolean;
}

export const Side = styled.div<SideProps>`
	direction: rtl;
	position: absolute;
	top: 50%;
	right: 120%;
	transform: translateY(-50%);
	white-space: nowrap;
	display: inline-block;
	z-index: 1;

	${({active = true}) =>
		!active &&
		css`
			opacity: 0;
			right: -120%;
		`}
`;
