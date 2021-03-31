import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {GifResult} from '../../../../../api';
import {GifSelector} from '../gif-selector.component';

export const FormikGifSelector: FC<FieldProps<GifResult | undefined>> = ({
	field: {name},
	form: {isSubmitting, setFieldValue},
}) => {
	const onSelect = () => (gif: GifResult) => setFieldValue(name, gif);

	return <GifSelector disabled={isSubmitting} onSelect={onSelect()} />;
};
