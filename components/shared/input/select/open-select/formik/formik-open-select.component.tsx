import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {OpenSelect, OpenSelectProps} from '../open-select.component';

export const FormikOpenSelect: FC<FieldProps & OpenSelectProps> = ({
	field: {name, value},
	form: {isSubmitting, setFieldValue, touched, errors},
	...props
}) => {
	const onChange = () => (value: any) => {
		setFieldValue(name, value);
	};

	return (
		<OpenSelect
			onChange={onChange()}
			value={value}
			touched={!!touched[name]}
			disabled={isSubmitting}
			error={errors[name] as string}
			showError
			{...props}
		/>
	);
};
