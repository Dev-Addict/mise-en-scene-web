import React, {FC, useEffect} from 'react';
import {FieldProps} from 'formik';
import {FileInputProps} from '../file-input.component';
import {OpenGalleryInput} from '../open-gallery-input.component';

export const FormikOpenGalleryInput: FC<
	FieldProps<File[] | undefined> & FileInputProps
> = ({field: {name, value}, form: {isSubmitting, setFieldValue}, ...props}) => {
	const setFiles = () => (files: File[]) =>
		!isSubmitting && setFieldValue(name, files);

	useEffect(() => {
		if (value?.length === 0) setFieldValue(name, undefined);
	}, [value]);

	return (
		<>
			{value && (
				<OpenGalleryInput files={value} setFiles={setFiles()} {...props} />
			)}
		</>
	);
};
