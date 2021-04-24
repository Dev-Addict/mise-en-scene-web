import React from 'react';
import {Field} from 'formik';

import {AdminPermissionsFields} from './admin-permissions.form';
import {InputContainer} from '../../../sign/sign-components.component';
import {FormikCheckBox} from '../../../../shared';

const fields: {
	[key in keyof AdminPermissionsFields]: string;
} = {
	POST: 'POST',
	EDIT_OTHERS_POST: 'EDIT_OTHERS_POST',
	DELETE_POST: 'DELETE_POST',
	CREATE_NEW_ADMIN: 'CREATE_NEW_ADMIN',
	DELETE_ADMIN: 'DELETE_ADMIN',
	EDIT_ADMINS_PERMISSIONS: 'EDIT_ADMINS_PERMISSIONS',
};

export const AdminPermissionsInputs = () => {
	return (
		<>
			<InputContainer>
				<Field
					name={fields.POST}
					component={FormikCheckBox}
					text="قابلیت گذاشتن مطلب"
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.EDIT_OTHERS_POST}
					component={FormikCheckBox}
					text="قابلیت ویرایش مطالب دیگران"
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.DELETE_POST}
					component={FormikCheckBox}
					text="قابلیت پاک کردن مطالب دیگران"
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.CREATE_NEW_ADMIN}
					component={FormikCheckBox}
					text="قابلیت ساخت مدیر جدید"
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.DELETE_ADMIN}
					component={FormikCheckBox}
					text="قابلیت حذف کردن مدیر"
				/>
			</InputContainer>
			<InputContainer>
				<Field
					name={fields.EDIT_ADMINS_PERMISSIONS}
					component={FormikCheckBox}
					text="قابلیت ویرایش قابلیت های مدیران"
				/>
			</InputContainer>
		</>
	);
};
