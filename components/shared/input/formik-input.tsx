import React, {ChangeEventHandler, FC} from 'react';
import {FieldProps} from 'formik';

import {Input} from './input';

interface Props {
	label?: string;
	placeholder?: string;
	icon?: string;
	primary?: boolean;
	filter?: (value: string) => string;
}

export const FormikInput: FC<FieldProps & Props> = ({
	field: {name, value},
	form: {touched, errors, isSubmitting, setFieldValue},
	meta,
	filter,
	...props
}) => {
	const onChange = (): ChangeEventHandler<HTMLInputElement> => ({
		target: {value},
	}) => setFieldValue(name, filter ? filter(value) : value);

	return (
		<Input
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
