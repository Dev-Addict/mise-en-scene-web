import React, {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {FormikHelpers} from 'formik';

import {AdminFinderFields, AdminFinderForm} from '../../../../forms';
import {Channel, ChannelAdminPermission} from '../../../../../types';
import {useAuth} from '../../../../../hooks';

const initialValues: AdminFinderFields = {
	authKey: '',
};

interface Props {
	channel: Channel;
}

export const AdminFinder: FC<Props> = ({
	channel: {admins, owner, ownerData, myAdmin},
}) => {
	const router = useRouter();
	const {handle} = router.query;

	const [errors, setErrors] = useState<string[]>([]);

	const {user} = useAuth();

	const isAddable =
		owner === user?.id ||
		myAdmin?.permissions?.includes(ChannelAdminPermission.CREATE_NEW_ADMIN) ||
		false;

	const onSubmit = (): ((
		values: AdminFinderFields,
		formikHelpers: FormikHelpers<AdminFinderFields>
	) => void | Promise<any>) => async ({authKey}, {setSubmitting}) => {
		setSubmitting(true);

		setErrors([]);

		if (ownerData?.username === authKey || ownerData?.email === authKey)
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
			{isAddable && (
				<AdminFinderForm
					onSubmit={onSubmit()}
					errors={errors}
					initialValues={initialValues}
				/>
			)}
		</div>
	);
};
