import React, {
	ChangeEventHandler,
	FC,
	InputHTMLAttributes,
	RefObject,
} from 'react';
import styled from 'styled-components';

const Input = styled.input`
	display: none;
`;

export type FileEventTarget = EventTarget & {files: FileList};

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	onFilesSelect?: (files: File[]) => void;
	inputRef?: RefObject<HTMLInputElement>;
}

export const FileInput: FC<Props> = ({
	maxLength,
	inputRef,
	onFilesSelect,
	...props
}) => {
	const onChange = (): ChangeEventHandler<
		HTMLInputElement & {target: FileEventTarget}
	> => ({target: {files}}) =>
		files &&
		onFilesSelect &&
		onFilesSelect(Array.from(files).splice(0, maxLength || Infinity));

	return <Input type="file" onChange={onChange()} {...props} ref={inputRef} />;
};

export type FileInputProps = Props;
