import styled from 'styled-components';
import {StyledProps} from '../../types';

export const A = styled.a<StyledProps>`
	color: ${({theme: {link}}) => link};
	text-decoration: none;

	&:hover {
		opacity: 0.5;
	}

	&:visited,
	&:active,
	&:hover {
		color: ${({theme: {link}}) => link};
		text-decoration: none;
	}
`;
