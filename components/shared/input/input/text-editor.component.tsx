import React, {FC, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {
	Container,
	EditorContainer,
	Error,
	Label,
} from './input-components.component';

interface Props {
	label?: string;
	placeholder?: string;
	primary?: boolean;
	touched?: boolean;
	error?: string;
	showError?: boolean;
	disabled?: boolean;
	value?: EditorState;
	name?: string;
	onChange?: (editorState: EditorState) => void;
	onBlur?: (e: SyntheticEvent) => void;
	onFocus?: (e: SyntheticEvent) => void;
}

export const TextEditor: FC<Props> = ({
	onFocus,
	onBlur,
	label,
	primary,
	disabled,
	showError,
	touched,
	error,
	placeholder,
	value,
	onChange,
	...props
}) => {
	const [isFocus, setFocus] = useState(false);
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const editorRef = useRef<Editor>(null);

	const onEditorChange = () => (editorState: EditorState) => {
		setEditorState(editorState);
		onChange && onChange(editorState);
	};
	const onEditorFocus = () => (e: SyntheticEvent) => {
		setFocus(true);
		onFocus && onFocus(e);
	};
	const onEditorBlur = () => (e: SyntheticEvent) => {
		setFocus(false);
		onBlur && onBlur(e);
	};
	const onTextInputContainerClick = () => () => editorRef.current?.focus();

	useEffect(() => {
		if (value) setEditorState(value);
	}, [value]);

	return (
		<Container>
			{label && <Label>{label}</Label>}
			<EditorContainer
				isFocus={isFocus}
				onClick={onTextInputContainerClick()}
				primary={primary}
				disabled={disabled}>
				<Editor
					editorState={editorState}
					onChange={onEditorChange()}
					onFocus={onEditorFocus()}
					onBlur={onEditorBlur()}
					autoComplete="off"
					ref={editorRef}
					placeholder={placeholder}
					{...props}
				/>
			</EditorContainer>
			<Error show={showError}>{(touched && error) || <>&nbsp;</>}</Error>
		</Container>
	);
};
