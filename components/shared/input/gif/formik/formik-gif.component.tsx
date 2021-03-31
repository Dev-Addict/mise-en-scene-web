import React, {FC} from 'react';
import {FieldProps} from 'formik';

import {GifResult} from '../../../../../api';
import {Gif} from '../../../view/gif.component';

export const FormikGif: FC<FieldProps<GifResult | undefined>> = ({
	field: {name, value},
	form: {isSubmitting, setFieldValue},
}) => {
	const onDelete = () => () => {
		setFieldValue(name, undefined);
	};

	return (
		<>
			{value && (
				<Gif
					gif={value}
					disabled={isSubmitting}
					onDelete={onDelete()}
					controls
				/>
			)}
		</>
	);
};
