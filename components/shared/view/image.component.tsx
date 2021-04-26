import React, {FC, useRef} from 'react';
import styled from 'styled-components';

import {Image as ImageModel, StyledProps} from '../../../types';
import {useComponentSize} from '../../../hooks';

interface ContainerProps {
	width?: number;
	height?: number;
}

const Container = styled.div<StyledProps & ContainerProps>`
	position: relative;
	margin: 10px 0;
	overflow: hidden;
	width: ${({width}) => width};
	height: ${({height}) => height};
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
}

export const Image: FC<Props> = ({
	image,
	width: fWidth,
	height: fHeight,
	defaultSrc,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const {width: containerWidth} = useComponentSize(containerRef);

	return (
		<Container ref={containerRef} width={fWidth} height={fHeight}>
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
