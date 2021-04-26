import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {ImageInput} from '../image-input.component';
import {Image} from '../../../../../types';

interface Props {
	editable?: boolean;
	defaultSrc?: string;
}

export const FormikImageInput: FC<FieldProps<Image | undefined> & Props> = ({
	field: {name, value},
	form: {setFieldValue, isSubmitting},
}) => {
	const onImageChange = () => (image: Image | undefined) =>
		setFieldValue(name, image);

	return (
		<ImageInput
			disabled={isSubmitting}
			onImageChange={onImageChange()}
			value={value}
		/>
	);
};
