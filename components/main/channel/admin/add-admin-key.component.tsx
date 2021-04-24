import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik';

import {AdminFinderFields, AdminFinderForm} from '../../../forms';
import {ChannelAdmin, User} from '../../../../types';

const initialValues: AdminFinderFields = {
	authKey: '',
};

interface Props {
	admins?: ChannelAdmin[];
	owner?: User;
}

export const AdminFinder: FC<Props> = ({admins, owner}) => {
	const router = useRouter();
	const {handle} = router.query;

	const [errors, setErrors] = useState<string[]>([]);

	const onSubmit = (): ((
		values: AdminFinderFields,
		formikHelpers: FormikHelpers<AdminFinderFields>
	) => void | Promise<any>) => async ({authKey}, {setSubmitting}) => {
		setSubmitting(true);

		setErrors([]);

		if (owner?.username === authKey || owner?.email === authKey)
			setErrors(['امکان اضافه کردن صاحب کانال به عنوان ادمین وجود ندارد.']);
		else if (
			admins?.some(
				({userData}) =>
					userData?.username === authKey || userData?.email === authKey
			)
		)
			setErrors(['ادمین قبلا به کانال اضافه شده است.']);
		else await router.push(`/channels/${handle}/manage/admins/${authKey}/add`);

		setSubmitting(false);
	};

	return (
		<div>
			<AdminFinderForm
				onSubmit={onSubmit()}
				errors={errors}
				initialValues={initialValues}
			/>
		</div>
	);
};
