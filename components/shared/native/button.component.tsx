import styled, {css} from 'styled-components';

import {Color} from '../../../data';
import {StyledProps} from '../../../types';

interface Props {
	color?: Color;
	circular?: boolean;
	primary?: boolean;
}

export const Button = styled.div<StyledProps & Props>`
	display: inline-block;
	background-color: ${({theme: {accent}}) => accent};
	color: ${({theme: {foreground}, color}) => color || foreground};
	font-size: 16px;
	padding: 8px 20px;
	border-radius: 10px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
		box-shadow: 0 0 5px 0 ${({theme: {accent}}) => accent};
	}

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
`;
