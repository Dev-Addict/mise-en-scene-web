import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik';

import {SearchFields, SearchForm} from '../../forms';

const initialValues: SearchFields = {
	value: '',
};

interface InputProps {
	value?: string;
}

export const SearchInput: FC<InputProps> = ({value}) => {
	const router = useRouter();

	const [errors, setErrors] = useState<string[]>([]);

	const onSubmit = (): ((
		values: SearchFields,
		formikHelpers: FormikHelpers<SearchFields>
	) => void | Promise<void>) => async ({value}, {setSubmitting, resetForm}) => {
		setErrors([]);

		setSubmitting(true);

		await router.push(`/search/${value}`);

		resetForm();

		setSubmitting(false);
	};

	return (
		<SearchForm
			onSubmit={onSubmit()}
			errors={errors}
			initialValues={{value: value || initialValues.value}}
		/>
	);
};
