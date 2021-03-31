import React, {FC, useEffect, useRef, useState} from 'react';
import NImage from 'next/image';
import styled, {css} from 'styled-components';

import {StyledProps} from '../../../types';
import {useComponentSize, useThemeImage} from '../../../hooks';

const Container = styled.div<StyledProps>`
	position: relative;
	width: 100%;
`;

interface CloseProps {
	disabled?: boolean;
}

const Close = styled.div<CloseProps>`
	position: absolute;
	width: 25px;
	height: 25px;
	left: 10px;
	top: 10px;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface BlobImageProps {
	src: string;
	width: number;
	height: number;
}

export const BlobImage = styled.div<BlobImageProps>`
	width: ${({width}) => width}px;
	height: ${({height}) => height}px;
	background-image: url('${({src}) => src}');
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	border-radius: 10px;
	border: 1px solid ${({theme: {primary}}) => primary}4C;
	box-shadow: 3px 0 6px 0 ${({theme: {primary}}) => primary}29;
`;

interface Props {
	file?: File;
	controls?: boolean;
	disabled?: boolean;
	onDeleteClick?: () => void;
}

export const FileImage: FC<Props> = ({
	file,
	controls,
	disabled,
	onDeleteClick,
}) => {
	const logo = useThemeImage('/assets/logo/mes-$mode.svg');

	const containerRef = useRef<HTMLDivElement>(null);

	const [src, setSrc] = useState(logo);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const {width: containerWidth} = useComponentSize(containerRef);

	const onCloseClick = () => () =>
		!disabled && onDeleteClick && onDeleteClick();

	useEffect(() => {
		if (file) {
			const image = new Image();
			const reader = new FileReader();

			image.onload = function () {
				setWidth((this as any).width || 0);
				setHeight((this as any).height || 0);
			};

			reader.onload = ({target}) => {
				image.src = (target?.result as string | undefined) || logo;
				setSrc((target?.result as string | undefined) || logo);
			};

			reader.readAsDataURL(file);
		}
	}, [file]);

	return (
		<Container ref={containerRef}>
			<BlobImage
				src={src}
				width={containerWidth}
				height={(containerWidth / width) * height || containerWidth}
			/>
			{controls && (
				<Close disabled={disabled} onClick={onCloseClick()}>
					<NImage src="/assets/icons/close/close.svg" width={25} height={25} />
				</Close>
			)}
		</Container>
	);
};
