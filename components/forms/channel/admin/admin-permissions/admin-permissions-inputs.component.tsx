import React, {FC} from 'react';
import {Field} from 'formik';

import {AdminPermissionsFields} from './admin-permissions.form';
import {InputContainer} from '../../../sign/sign-components.component';
import {FormikCheckBox} from '../../../../shared';
import {ChannelAdmin, ChannelAdminPermission, None} from '../../../../../types';

const fields: {
	[key in keyof AdminPermissionsFields]: string;
} = {
	POST: 'POST',
	EDIT_OTHERS_POST: 'EDIT_OTHERS_POST',
	DELETE_POST: 'DELETE_POST',
	CREATE_NEW_ADMIN: 'CREATE_NEW_ADMIN',
	REMOVE_ADMIN: 'REMOVE_ADMIN',
	EDIT_ADMINS_PERMISSIONS: 'EDIT_ADMINS_PERMISSIONS',
};

interface Props {
	myAdmin: None<ChannelAdmin>;
}

export const AdminPermissionsInputs: FC<Props> = ({myAdmin}) => {
	const isDisabled = (permission: ChannelAdminPermission) =>
		myAdmin ? myAdmin?.permissions?.includes(permission) : false;

	return (
		<>
			<InputContainer>
				<Field
					name={fields.POST}
					component={FormikCheckBox}
					text="قابلیت گذاشتن مطلب"
					disabled={isDisabled(ChannelAdminPermission.POST)}
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.EDIT_OTHERS_POST}
					component={FormikCheckBox}
					text="قابلیت ویرایش مطالب دیگران"
					disabled={isDisabled(ChannelAdminPermission.EDIT_OTHERS_POST)}
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.DELETE_POST}
					component={FormikCheckBox}
					text="قابلیت پاک کردن مطالب دیگران"
					disabled={isDisabled(ChannelAdminPermission.DELETE_POST)}
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.CREATE_NEW_ADMIN}
					component={FormikCheckBox}
					text="قابلیت ساخت مدیر جدید"
					disabled={isDisabled(ChannelAdminPermission.CREATE_NEW_ADMIN)}
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.REMOVE_ADMIN}
					component={FormikCheckBox}
					text="قابلیت حذف کردن مدیر"
					disabled={isDisabled(ChannelAdminPermission.DELETE_ADMIN)}
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.EDIT_ADMINS_PERMISSIONS}
					component={FormikCheckBox}
					text="قابلیت ویرایش قابلیت های مدیران"
					disabled={isDisabled(ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS)}
				/>
			</InputContainer>
		</>
	);
};
