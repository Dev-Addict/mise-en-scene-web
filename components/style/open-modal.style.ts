import {createGlobalStyle, css} from 'styled-components';

interface Props {
	open: boolean;
}

export const OpenModalStyle = createGlobalStyle<Props>`
  ${({open}) =>
		open &&
		css`
			html,
			body {
				overflow: hidden;
			}
		`}
`;
