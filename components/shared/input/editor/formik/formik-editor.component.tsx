import React, {FC} from 'react';
import {EditorState} from 'draft-js';
import {FieldProps} from 'formik';
import {Editor} from '../editor.component';

interface Props {
	label?: string;
	placeholder?: string;
	icon?: string;
	primary?: boolean;
}

export const FormikEditor: FC<FieldProps<EditorState> & Props> = ({
	field: {name, value},
	form: {touched, errors, isSubmitting, setFieldValue},
	meta,
	...props
}) => {
	const onChange = () => (editorState: EditorState) =>
		setFieldValue(name, editorState);

	return (
		<Editor
			touched={!!touched[name]}
			error={errors[name] as string}
			disabled={isSubmitting}
			value={value}
			onChange={onChange()}
			showError
			{...props}
		/>
	);
};
