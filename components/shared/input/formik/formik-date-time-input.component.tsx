import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {DateTimeInput, DateTimeInputProps} from '../date-time-input.component';

export const FormikDateTimeInput: FC<FieldProps & DateTimeInputProps> = ({
	field: {name, value},
	form: {errors, touched, isSubmitting, setFieldValue},
	...props
}) => {
	const onChange = () => (value: Date | null) =>
		!isSubmitting && setFieldValue(name, value || undefined);

	return (
		<DateTimeInput
			selected={value}
			disabled={isSubmitting}
			name={name}
			showError
			error={errors[name] as string}
			touched={!!touched[name]}
			onChange={onChange()}
			{...props}
		/>
	);
};
