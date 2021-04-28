import {FormikErrors} from 'formik';

import {PostFields} from '../../channel';

export const postValidator = async ({
	title,
	subtitle,
	description,
	tags,
	body,
}: PostFields) => {
	const errors: FormikErrors<PostFields> = {};

	if (title.getCurrentContent().getPlainText(' ').length > 100)
		errors.title = 'حداکثر سایز عنوان صد حرف است.';

	if (subtitle.getCurrentContent().getPlainText(' ').length > 200)
		errors.subtitle = 'حداکثر سایز عنوان فرعی دویست حرف است.';

	if (description.getCurrentContent().getPlainText(' ').length > 500)
		errors.subtitle = 'حداکثر سایز توضیحات پانصد حرف است.';

	if (tags.length > 30) errors.tags = 'حداکثر تعداد برچسب سی عدد هست.';

	if (tags.some((tag) => tag.length > 50))
		errors.tags = 'حداکثر سایز هر تگ پنجاه حرف است.';

	if (body.getCurrentContent().getPlainText(' ').length > 10000)
		errors.body = 'حداکثر سایز متن ده هزار حرف است.';

	return errors;
};
