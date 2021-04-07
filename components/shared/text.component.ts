import styled, {css} from 'styled-components';
import {Size, StyledProps} from '../../types';

interface TextProps {
	size?: Size;
	lowOpacity?: boolean;
	hover?: boolean;
	center?: boolean;
}

export const Text = styled.div<StyledProps & TextProps>`
	font-size: ${({size = Size.MEDIUM}) =>
		14 + (Object.values(Size).findIndex((v) => v === size) - 2) * 2}px;
	color: ${({theme: {foreground}}) => foreground}${({lowOpacity}) => lowOpacity && '80'};
	direction: ${({children}) =>
		/^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿]*[֑-߿יִ-﷽ﹰ-ﻼ]/.test(
			JSON.stringify(children)
		)
			? 'rtl'
			: 'ltr'};

	${({hover}) =>
		hover &&
		css`
			&:hover {
				opacity: 0.5;
			}
		`}

	${({center}) =>
		center &&
		css`
			text-align: center;
		`}
`;
