import styled, {css} from 'styled-components';

import {Theme} from '../../../types';

export interface PointerProps {
	active?: boolean;
	theme: Theme;
}

export const Pointer = styled.div<PointerProps>`
	position: absolute;
	width: 15px;
	height: 15px;
	border: 2px solid ${({theme: {accent}}) => accent};
	transition: all 336ms;

	@media only screen and (max-width: 1000px) {
		display: none;
	}

	${({active}) =>
		!active &&
		css`
			opacity: 0;
		`}
`;

export const TopPointer = styled(Pointer)`
	border-right: none;
	border-bottom: none;
	left: -5px;
	top: 0;
`;

export const BottomPointer = styled(Pointer)`
	border-top: none;
	border-left: none;
	right: -5px;
	bottom: 0;
`;
