import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {ClearInput} from '../clear-input.component';
import {EditorState} from 'draft-js';

interface Props {
	placeholder?: string;
	primary?: boolean;
}

export const FormikClearInput: FC<FieldProps<EditorState> & Props> = ({
	field: {name, value},
	form: {touched, errors, isSubmitting, setFieldValue},
	meta,
	...props
}) => {
	const onChange = () => (state: EditorState) => setFieldValue(name, state);

	return (
		<ClearInput
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
