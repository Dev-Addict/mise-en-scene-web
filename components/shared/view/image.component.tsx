import React, {FC, useRef} from 'react';
import NImage from 'next/image';
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

	& > div:first-child {
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		border: 1px solid ${({theme: {primary}}) => primary}4C;
		border-radius: 10px;
	}
`;

interface Props {
	image: ImageModel;
	width?: number;
	height?: number;
}

export const Image: FC<Props> = ({
	image: {directory, image, alt, height, width},
	width: fWidth,
	height: fHeight,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const {width: containerWidth} = useComponentSize(containerRef);

	return (
		<Container ref={containerRef} width={fWidth} height={fHeight}>
			<NImage
				src={`/image/${directory}/${image}`}
				width={fWidth || containerWidth}
				height={fHeight || (containerWidth / (width || 0)) * (height || 0)}
				alt={alt || undefined}
			/>
		</Container>
	);
};
