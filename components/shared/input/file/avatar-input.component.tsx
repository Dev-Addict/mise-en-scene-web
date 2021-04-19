import React, {FC, useEffect, useRef, useState} from 'react';

import {FileInput} from './file-input.component';
import {FileImage} from '../../view';
import styled, {css} from 'styled-components';

const Container = styled.div`
	width: 200px;
	height: 200px;
`;

interface AvatarProps {
	disabled?: boolean;
}

const Avatar = styled.div<AvatarProps>`
	width: 200px;
	height: 200px;
	overflow: hidden;
	border: 3px solid ${({theme: {link}}) => link};
	border-radius: 50%;
	cursor: pointer;

	& > * > * {
		width: 200px;
		height: 200px;
	}

	&:hover {
		opacity: 0.5;
	}

	${({disabled}) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: default;
		`}
`;

interface Props {
	file?: File;
	onFileChange?: (file: File | undefined) => void;
	editable?: boolean;
	disabled?: boolean;
	initialSrc?: string;
	defaultSrc?: string;
}

export const AvatarInput: FC<Props> = ({
	file,
	onFileChange,
	editable = true,
	disabled = false,
	initialSrc,
	defaultSrc,
}) => {
	const [localFile, setLocalFile] = useState(file);

	const inputRef = useRef<HTMLInputElement>(null);

	const onAvatarClick = () => () => !disabled && inputRef.current?.click();
	const onFileSelect = () => (files: File[]) => {
		setLocalFile(files[0]);
		onFileChange && onFileChange(files[0]);
	};

	useEffect(() => {
		setLocalFile(file);
	}, [file]);

	return (
		<>
			<FileInput
				onFilesSelect={onFileSelect()}
				disabled={disabled || !editable}
				inputRef={inputRef}
			/>
			<Container onClick={onAvatarClick()}>
				<Avatar disabled={disabled}>
					<FileImage
						file={localFile}
						controls={false}
						disabled={disabled}
						initialSrc={initialSrc}
						defaultSrc={defaultSrc}
					/>
				</Avatar>
			</Container>
		</>
	);
};
