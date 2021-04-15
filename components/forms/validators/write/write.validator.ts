import {WriteFields} from '../../write';
import {FormikErrors} from 'formik';
import {editorStateToRawText} from '../../../../utils';

export const writeValidator = ({
	text,
	poll,
	reAnnouncement,
}: WriteFields): FormikErrors<WriteFields> => {
	const errors: FormikErrors<WriteFields> = {};

	if (
		!reAnnouncement &&
		!editorStateToRawText(text)
			.split('\n')
			.map((row) => row.trim())
			.join('')
	)
		errors.text = 'لطفا نوشته را پر کنید.';
	else if (editorStateToRawText(text).length > 2000)
		errors.text = 'حداکثر کاراکتر های مجاز 2000 تا است.';
	if (poll) {
		let questionError = '';
		const optionsErrors: string[] = [];

		if (!poll.question) questionError = 'سوال اجباری است.';

		for (const option of poll.options)
			optionsErrors.push(option ? '' : 'این گزینه اجباری است.');

		if (optionsErrors.join('') || questionError) (errors as any).poll = {};

		if (questionError) (errors as any).poll.question = questionError;

		if (optionsErrors.join('')) (errors as any).poll.options = optionsErrors;
	}

	return errors;
};
