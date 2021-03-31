import React, {FC, useRef} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import {GifResult} from '../../../api';
import {StyledProps} from '../../../types';
import {useComponentSize} from '../../../hooks';

const Container = styled.div<StyledProps>`
	position: relative;
	margin: 10px 0;
	overflow: hidden;

	& > div:first-child {
		box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
		border: 1px solid ${({theme: {primary}}) => primary}4C;
		border-radius: 10px;
	}
`;

const Close = styled.div`
	width: 25px;
	height: 25px;
	position: absolute;
	top: 10px;
	left: 10px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

interface Props {
	gif: GifResult;
	disabled?: boolean;
	controls?: boolean;
	onDelete?: () => void;
}

export const Gif: FC<Props> = ({
	gif: {url, width, height},
	disabled = false,
	controls = false,
	onDelete,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const {width: containerWidth} = useComponentSize(containerRef);

	return (
		<Container ref={containerRef}>
			<Image
				src={`/image/gif/${url}`}
				width={containerWidth}
				height={(containerWidth / width) * height}
			/>
			{controls && (
				<Close onClick={disabled ? undefined : onDelete}>
					<Image src="/assets/icons/close/close.svg" width={25} height={25} />
				</Close>
			)}
		</Container>
	);
};
