import React, {FC, useMemo, useRef, useState} from 'react';
import Image from 'next/image';
import {AtomicBlockUtils, EditorState} from 'draft-js';
import DraftEditor from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import {InlineToolbarContent} from './inline-toolbar-content.component';
import {Text} from '../../text.component';
import {Size} from '../../../../types';
import {useThemeImage} from '../../../../hooks';
import {FileInput} from '../file';
import {uploadImage} from '../../../../helpers';
import {
	blockRenderer,
	Container,
	EditorContainer,
	ImageControl,
	InlineToolbarContainer,
	Error,
} from './editor-components.component';

interface Props {
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	value?: EditorState;
	onChange?: (editorState: EditorState) => void;
	showError?: boolean;
	error?: string;
	touched?: boolean;
	readOnly?: boolean;
}

export const Editor: FC<Props> = ({
	label,
	placeholder,
	disabled,
	value,
	onChange,
	showError,
	error,
	touched,
	readOnly,
}) => {
	const image = useThemeImage('/assets/icons/image/image-$mode.svg');

	const imageInputRef = useRef<HTMLInputElement>(null);

	const [editorState, setEditorState] = useState(
		() => value || EditorState.createEmpty()
	);
	const [loading, setLoading] = useState(false);

	const [plugins, InlineToolbar] = useMemo(() => {
		const inlineToolbarPlugin = createInlineToolbarPlugin();
		const linkifyPlugin = createLinkifyPlugin();
		return [
			[inlineToolbarPlugin, linkifyPlugin],
			inlineToolbarPlugin.InlineToolbar,
		];
	}, []);

	const onImageClick = () => () => imageInputRef.current?.click();
	const onImageSelect = () => async (files: File[]) => {
		if (files[0]) {
			setLoading(true);

			const image = await uploadImage({image: files[0]});

			if (image) {
				const currentContent = editorState
					.getCurrentContent()
					.createEntity('IMAGE', 'IMMUTABLE', {image});

				const entityKey = currentContent.getLastCreatedEntityKey();

				const newState = EditorState.set(editorState, {currentContent});

				setEditorState(
					AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' ')
				);
			}

			setLoading(false);
		}
	};
	const onEditorChange = () => (editorState: EditorState) => {
		setEditorState(editorState);
		onChange && onChange(editorState);
	};

	return (
		<>
			<FileInput
				disabled={loading || disabled}
				inputRef={imageInputRef}
				accept="image/*"
				onFilesSelect={onImageSelect()}
			/>
			<Container>
				{label && <Text size={Size.LARGE} text={label} />}
				<EditorContainer disabled={disabled || loading} readOnly={readOnly}>
					<DraftEditor
						editorState={editorState}
						onChange={onEditorChange()}
						plugins={plugins}
						placeholder={placeholder}
						readOnly={readOnly || disabled || loading}
						blockRendererFn={blockRenderer}
					/>
					<InlineToolbarContainer>
						<InlineToolbar>
							{(props) => <InlineToolbarContent {...props} />}
						</InlineToolbar>
					</InlineToolbarContainer>
				</EditorContainer>
				{!readOnly && (
					<ImageControl disabled={disabled || loading} onClick={onImageClick()}>
						<Image src={image} width={18} height={18} />
					</ImageControl>
				)}
				<Error show={showError}>{(touched && error) || <>&nbsp;</>}</Error>
			</Container>
		</>
	);
};
