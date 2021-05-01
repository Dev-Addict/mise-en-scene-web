import {FormikErrors} from 'formik';

import {SearchFields} from '../../search';

export const searchValidator = ({
	value,
}: SearchFields): FormikErrors<SearchFields> => {
	const errors: FormikErrors<SearchFields> = {};

	if (!value) errors.value = 'لطفا متنی برای جست و جو وارد کنید.';

	return errors;
};
