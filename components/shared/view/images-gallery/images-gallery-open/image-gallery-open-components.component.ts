import styled, {createGlobalStyle, css} from 'styled-components';

import {StyledProps} from '../../../../../types';

interface StyleProps {
	open: boolean;
}

export const Style = createGlobalStyle<StyleProps>`
  ${({open}) =>
		open &&
		css`
			html,
			body {
				overflow: hidden;
			}
		`}
`;

interface ContainerProps {
	open: boolean;
}

export const Container = styled.div<StyledProps & ContainerProps>`
	position: fixed;
	top: -100%;
	right: -100%;
	bottom: 100%;
	left: 100%;
	background-color: ${({theme: {foreground}}) => foreground}4C;
	z-index: 1000;
	display: flex;
	flex-direction: column;

	${({open}) =>
		open &&
		css`
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		`}
`;

export const Items = styled.div`
	width: 100%;
	height: 200px;
`;
