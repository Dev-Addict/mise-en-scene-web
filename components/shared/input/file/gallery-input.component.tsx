import React, {FC, useRef} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {FileInput, FileInputProps} from './file-input.component';
import {useThemeImage} from '../../../../hooks';

interface ImageContainerProps {
	disabled?: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
	width: 25px;
	height: 25px;
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

interface Props extends FileInputProps {}

export const GalleryInput: FC<Props> = ({disabled, ...props}) => {
	const image = useThemeImage('/assets/icons/image/image-$mode.svg');

	const inputRef = useRef<HTMLInputElement>(null);

	const onImageClick = () => () => !disabled && inputRef.current?.click();

	return (
		<>
			<FileInput
				inputRef={inputRef}
				accept="image/*"
				multiple
				disabled={disabled}
				{...props}
			/>
			<ImageContainer onClick={onImageClick()} disabled={disabled}>
				<Image src={image} width={25} height={25} />
			</ImageContainer>
		</>
	);
};
