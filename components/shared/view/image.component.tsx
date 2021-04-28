import React, {FC, useRef} from 'react';
import styled, {css} from 'styled-components';

import {Image as ImageModel, StyledProps} from '../../../types';
import {useComponentSize} from '../../../hooks';

interface ContainerProps {
	width?: number;
	height?: number;
	disabled?: boolean;
	active?: boolean;
}

const Container = styled.div<StyledProps & ContainerProps>`
	position: relative;
	margin: 10px 0;
	overflow: hidden;
	width: ${({width}) => width};
	height: ${({height}) => height};

	${({active}) =>
		active &&
		css`
			cursor: pointer;

			&:hover {
				opacity: 0.5;
			}
		`}

	${({disabled}) =>
		disabled &&
		css`
			cursor: default;
			opacity: 0.5;
		`}
`;

const Img = styled.img`
	box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
	border: 1px solid ${({theme: {primary}}) => primary}4C;
	border-radius: 10px;
`;

interface Props {
	image?: ImageModel;
	width?: number;
	height?: number;
	defaultSrc?: string;
	disabled?: boolean;
	active?: boolean;
}

export const Image: FC<Props> = ({
	image,
	width: fWidth,
	height: fHeight,
	defaultSrc,
	disabled = false,
	active = false,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const {width: containerWidth} = useComponentSize(containerRef);

	return (
		<Container
			ref={containerRef}
			width={fWidth}
			height={fHeight}
			disabled={disabled}
			active={active}>
			<Img
				src={image ? `/image/${image?.directory}/${image?.image}` : defaultSrc}
				width={fWidth || containerWidth}
				height={
					fHeight ||
					(containerWidth / (image?.width || 0)) * (image?.height || 0)
				}
				alt={image?.alt || undefined}
			/>
		</Container>
	);
};
