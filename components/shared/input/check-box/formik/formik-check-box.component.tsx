import React, {FC} from 'react';
import {FieldProps} from 'formik';
import {CheckBox, CheckBoxProps} from '../check-box.component';

export const FormikCheckBox: FC<FieldProps<boolean> & CheckBoxProps> = ({
	field: {name, value},
	form: {isSubmitting, setFieldValue, errors, touched},
	...props
}) => {
	const onChange = () => (value: boolean) =>
		!isSubmitting && setFieldValue(name, value || undefined);

	return (
		<CheckBox
			showError
			error={errors[name] as string}
			touched={!!touched[name]}
			value={value}
			onChange={onChange()}
			disabled={isSubmitting}
			{...props}
		/>
	);
};
