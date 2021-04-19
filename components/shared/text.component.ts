import styled, {css} from 'styled-components';
import {Size, StyledProps} from '../../types';

interface TextProps {
	size?: Size;
	lowOpacity?: boolean;
	hover?: boolean;
	center?: boolean;
	maxLines?: number;
	width?: number;
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

  ${({maxLines}) =>
		maxLines &&
		css`
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: ${maxLines};
			-webkit-box-orient: vertical;
		`}

  ${({width}) =>
		width &&
		css`
			width: ${width}px;
		`}
`;
