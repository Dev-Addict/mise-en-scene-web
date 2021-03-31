import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {TextEditor} from '../text-editor.component';
import {EditorState} from 'draft-js';

interface Props {
	label?: string;
	placeholder?: string;
	primary?: boolean;
	touched?: boolean;
}

export const FormikTextEditor: FC<FieldProps & Props> = ({
	field: {name, value},
	form: {touched, errors, isSubmitting, setFieldValue},
	meta,
	...props
}) => {
	const onChange = () => (editorState: EditorState) => {
		setFieldValue(name, editorState);
	};

	return (
		<TextEditor
			touched={!!touched[name]}
			error={errors[name] as string}
			disabled={isSubmitting}
			value={value}
			showError
			onChange={onChange()}
			{...props}
		/>
	);
};
