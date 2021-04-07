import styled, {css} from 'styled-components';
import {StyledProps} from '../../../../types';

interface ContainerProps {
	border?: boolean;
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: row;
	direction: rtl;
	margin: 20px 0;
	padding: 10px 10px 0 10px;
	border-radius: 10px;

	${({border}) =>
		border &&
		css`
			border: 3px solid ${({theme: {foreground}}) => foreground};
		`}
`;

interface BodyProps {
	border?: boolean;
}

export const Body = styled.div<StyledProps & BodyProps>`
	margin-right: 10px;
	padding: 10px;
	flex: 1;

	${({border}) =>
		border &&
		css`
			border-bottom: 3px solid ${({theme: {foreground}}) => foreground};
		`}
`;

export const UserDetails = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;

	& > *:not(:first-child):not(:last-child) {
		margin: 0 10px;
	}
`;
