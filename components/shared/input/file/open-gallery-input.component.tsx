import React, {FC, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

import {FileInput, FileInputProps} from './file-input.component';
import {FileImage} from '../../view';
import {useThemeImage} from '../../../../hooks';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > * {
		margin: 20px 0;
	}
`;

interface PlusProps {
	disabled?: boolean;
}

const Plus = styled.div<PlusProps>`
	width: 40px;
	height: 40px;
	cursor: pointer;

	& img {
		transform: rotate(45deg);
	}

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
		`}
`;

interface Props extends FileInputProps {
	files?: File[];
	setFiles?: (files: File[]) => void;
}

export const OpenGalleryInput: FC<Props> = ({
	files,
	disabled,
	setFiles,
	maxLength,
	...props
}) => {
	const close = useThemeImage('/assets/icons/close/close-$mode.svg');

	const inputRef = useRef<HTMLInputElement>(null);

	const [galleryFiles, setGalleryFiles] = useState<File[]>(files || []);

	const onDelete = (index: number) => () => {
		const newFiles = [...galleryFiles];
		newFiles.splice(index, 1);

		setGalleryFiles(newFiles);
		setFiles && setFiles(newFiles);
	};
	const onPlusClick = () => () => inputRef.current?.click();
	const onSelect = () => (files: File[]) => {
		if (files[0]) {
			setGalleryFiles([...galleryFiles, files[0]]);
			setFiles && setFiles([...galleryFiles, files[0]]);
		}
	};

	const renderFiles = () =>
		galleryFiles.map((file, i) => (
			<FileImage disabled={disabled} file={file} onDeleteClick={onDelete(i)} />
		));

	useEffect(() => {
		if (files) setGalleryFiles(files);
	}, [files]);

	return (
		<Container>
			<FileInput onFilesSelect={onSelect()} {...props} inputRef={inputRef} />
			{renderFiles()}
			{galleryFiles.length < (maxLength || Infinity) && (
				<Plus onClick={onPlusClick()} disabled={disabled}>
					<Image src={close} width={40} height={40} />
				</Plus>
			)}
		</Container>
	);
};
