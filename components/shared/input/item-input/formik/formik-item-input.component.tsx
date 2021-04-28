import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {ItemInput} from '../item-input.component';

interface Props {
	label?: string;
	placeholder?: string;
	primary?: boolean;
	showError?: boolean;
	unique?: boolean;
}

export const FormikItemInput: FC<FieldProps<string[]> & Props> = ({
	field: {name, value},
	form: {touched, errors, isSubmitting, setFieldValue},
	meta,
	...props
}) => {
	const onChange = () => (items: string[]) => setFieldValue(name, items);

	return (
		<ItemInput
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
