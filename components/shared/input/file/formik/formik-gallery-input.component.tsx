import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {FileInputProps} from '../file-input.component';
import {GalleryInput} from '../gallery-input.component';

export const FormikGalleryInput: FC<FieldProps<File[]> & FileInputProps> = ({
	field: {name},
	form: {setFieldValue, isSubmitting},
}) => {
	const onFileSelect = () => (files: File[]) => {
		setFieldValue(name, files);
	};

	return (
		<GalleryInput disabled={isSubmitting} onFilesSelect={onFileSelect()} />
	);
};
