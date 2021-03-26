import styled from 'styled-components';
import {Size} from '../../types';

interface SpaceDividerProps {
	size?: Size;
	vertical?: boolean;
	horizontal?: boolean;
}

export const SpaceDivider = styled.div<SpaceDividerProps>`
	margin: ${({size = Size.MEDIUM, vertical = true, horizontal = false}) => {
		const width = Object.values(Size).findIndex((v) => v === size) * 10;

		return `${vertical ? width : 0}px ${horizontal ? width : 0}px`;
	}};
`;
