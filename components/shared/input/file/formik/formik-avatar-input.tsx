import React, {FC, useEffect, useState} from 'react';
import {FieldProps} from 'formik';

import {AvatarInput} from '../avatar-input.component';

interface Props {
	editable?: boolean;
	defaultSrc?: string;
}

export const FormikAvatarInput: FC<
	FieldProps<File | string | undefined> & Props
> = ({
	field: {name, value},
	form: {setFieldValue, isSubmitting},
	editable = true,
	defaultSrc,
}) => {
	const [initialSrc, setInitialSrc] = useState(
		typeof value === 'string' ? `/image/user/avatar/${value}` : undefined
	);

	const onFileChange = () => (file: File | undefined) => {
		setFieldValue(name, file);
	};

	const file = typeof value === 'string' ? undefined : value;

	useEffect(() => {
		if (typeof value === 'string') setInitialSrc(`/image/user/avatar/${value}`);
	}, [value]);

	return (
		<AvatarInput
			file={file}
			onFileChange={onFileChange()}
			disabled={isSubmitting}
			editable={editable}
			initialSrc={initialSrc}
			defaultSrc={defaultSrc}
		/>
	);
};
