import {FC, HTMLAttributes} from 'react';
import styled, {css} from 'styled-components';

import {A} from './a.component';
import {Size, StyledProps} from '../../types';

interface TextProps {
	size?: Size;
	lowOpacity?: boolean;
	hover?: boolean;
	center?: boolean;
	maxLines?: number;
	width?: number;
	active?: boolean;
	rtl?: boolean;
	danger?: boolean;
}

export const TextBase = styled.div<StyledProps & TextProps>`
	font-size: ${({size = Size.MEDIUM}) =>
		14 + (Object.values(Size).findIndex((v) => v === size) - 2) * 2}px;
	color: ${({theme: {foreground}}) => foreground}${({lowOpacity}) => lowOpacity && '80'};
	direction: ${({rtl}) => (rtl ? 'rtl' : 'ltr')};

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

  ${({active}) =>
		active &&
		css`
			cursor: pointer;

			&:hover {
				opacity: 0.5;
			}
		`}

  ${({danger, theme: {error}}) =>
		danger &&
		css`
			color: ${error};
		`}
`;

interface Props extends HTMLAttributes<HTMLDivElement> {
	size?: Size;
	lowOpacity?: boolean;
	hover?: boolean;
	center?: boolean;
	maxLines?: number;
	width?: number;
	active?: boolean;
	children?: never;
	text?: string;
	danger?: boolean;
	rtl?: boolean;
}

export const Text: FC<Props> = ({
	text = '',
	rtl = /^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿]*[֑-߿יִ-﷽ﹰ-ﻼ]/.test(text),
	...props
}) => {
	const renderText = () =>
		text.split(/[\s]((https?)?\w+\.\w{2,})[\s]/gi).map((part) =>
			/(https?)?\w+\.\w{2,}/gi.test(part) ? (
				<>
					&nbsp;
					<A href={part} target="_blank">
						{part.trim()}
					</A>
					&nbsp;
				</>
			) : (
				part
			)
		);

	return (
		<TextBase {...props} rtl={rtl}>
			{renderText()}
		</TextBase>
	);
};
