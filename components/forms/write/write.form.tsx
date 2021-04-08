import React, {FC} from 'react';
import {EditorState} from 'draft-js';
import {Form, Formik, FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';

import {Button} from '../../shared';
import {WriteInputs} from './write-inputs.component';
import {Color} from '../../../data';
import {GifResult} from '../../../api';
import {Poll} from '../../../types';
import {writeValidator} from '../validators/write/write.validator';

export interface WriteFields {
	text: EditorState;
	gif: GifResult | undefined;
	poll: Poll | undefined;
	publishAt: Date | undefined;
	gallery: File[] | undefined;
	reAnnouncement: string | undefined;
	comment: string | undefined;
}

interface Props {
	onSubmit: (
		values: WriteFields,
		formikHelpers: FormikHelpers<WriteFields>
	) => void | Promise<void>;
	errors: string[];
	initialValues: WriteFields;
}

export const WriteForm: FC<Props> = ({onSubmit, initialValues, errors}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={writeValidator}>
			{({isSubmitting}: FormikProps<WriteFields>) => (
				<Form>
					<WriteInputs
						isSubmitting={isSubmitting}
						submitButton={
							<Button
								type="submit"
								primary
								circular
								disabled={isSubmitting}
								color={Color.GHOST_WHITE}>
								ارسال
							</Button>
						}
						errors={errors}
					/>
				</Form>
			)}
		</Formik>
	);
};
