import React, {FC} from 'react';
import {Field, Formik, FormikHelpers, FormikProps} from 'formik';

import {Button, Errors, FormikInput} from '../../shared';
import {Color} from '../../../data';
import {useThemeImage} from '../../../hooks';
import {Body} from '../sign/sign-components.component';
import {searchValidator} from '../validators';

export interface SearchFields {
	value: string;
}

const fields: {
	[key in keyof SearchFields]: keyof SearchFields;
} = {
	value: 'value',
};

interface Props {
	onSubmit: (
		values: SearchFields,
		formikHelpers: FormikHelpers<SearchFields>
	) => void | Promise<void>;
	errors: string[];
	initialValues: SearchFields;
}

export const SearchForm: FC<Props> = ({onSubmit, initialValues, errors}) => {
	const search = useThemeImage('/assets/icons/magnifier/magnifier-$mode.svg');

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={searchValidator}
			enableReinitialize>
			{({isSubmitting}: FormikProps<SearchFields>) => (
				<Body>
					<Field
						placeholder="جست و جو..."
						icon={search}
						primary
						type="text"
						name={fields.value}
						component={FormikInput}
					/>
					<Errors errors={errors} />
					<Button
						type="submit"
						primary
						disabled={isSubmitting}
						color={Color.GHOST_WHITE}>
						جست و جو
					</Button>
				</Body>
			)}
		</Formik>
	);
};
