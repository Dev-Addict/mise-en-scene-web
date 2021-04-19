import {FormikErrors} from 'formik';

import {RequestChannelFields} from '../../channel';
import {usernameValidator} from '../../../../utils';
import {apolloClient} from '../../../../api';
import {
	CHECK_HANDLE_MUTATION,
	CheckHandleMutationData,
	CheckHandleMutationVariables,
} from '../../../../api/mutations/channel/check-handle.mutation';

export const requestChannelValidator = async ({
	handle,
	name,
}: RequestChannelFields): Promise<FormikErrors<RequestChannelFields>> => {
	const errors: FormikErrors<RequestChannelFields> = {};

	if (!handle) errors.handle = 'هندل اجباری است.';
	else if (!usernameValidator(handle, false))
		errors.handle =
			'هندل نامعتبر است. حداقل چهار کاراکتر با حروف انگلیسی و اعداد و آندرلاین.';
	try {
		if (!errors.handle)
			if (
				!(
					await apolloClient.mutate<
						CheckHandleMutationData,
						CheckHandleMutationVariables
					>({
						mutation: CHECK_HANDLE_MUTATION,
						variables: {handle},
					})
				).data?.checkHandle
			)
				errors.handle = 'هندل تکراری است.';
	} catch (e) {}

	if (!name) errors.name = 'نام اجباری است.';
	else if (name.length < 4)
		errors.name = 'نام حداقل باید از چهار کاراکتر تشکیل شده باشد.';
	else if (name.length > 20)
		errors.name = 'نام حداکثر باید از بیست کاراکتر تشکیل شده باشد.';

	return errors;
};
