import React, {FC} from 'react';
import {FieldProps} from 'formik';
import {BaseEmoji, EmojiData} from 'emoji-mart';

import {EmojiPicker} from '../emoji-picker.component';
import {EditorState, Modifier} from 'draft-js';

export const FormikEmojiPicker: FC<FieldProps<EditorState>> = ({
	field: {name, value},
	form: {isSubmitting, setFieldValue},
}) => {
	const onSelect = () => (emoji: EmojiData) => {
		const content = Modifier.replaceText(
			value.getCurrentContent(),
			value.getSelection(),
			(emoji as BaseEmoji).native
		);

		const state = EditorState.push(value, content, 'insert-characters');

		setFieldValue(name, state);
	};

	return <EmojiPicker disabled={isSubmitting} onSelect={onSelect()} />;
};
