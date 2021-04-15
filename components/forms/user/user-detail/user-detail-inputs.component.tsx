import React from 'react';
import {Field} from 'formik';

import {
	FormikAvatarInput,
	FormikDateTimeInput,
	FormikOpenSelect,
	FormikTextEditor,
} from '../../../shared';
import {useThemeImage} from '../../../../hooks';
import {UserDetailFields} from './user-detail.form';
import {
	UserMainDetail,
	UserMainDetailInputs,
	InputContainer,
	UserBodyDetail,
	TextInput,
	genderItems,
} from './user-detail-components.compnent';

const fields: {
	[key in keyof UserDetailFields]: string;
} = {
	email: 'email',
	firstname: 'firstname',
	lastname: 'lastname',
	avatar: 'avatar',
	birthday: 'birthday',
	gender: 'gender',
	bio: 'bio',
	displayName: 'displayName',
	username: 'username',
};

export const UserDetailInputs = () => {
	const atSign = useThemeImage('/assets/icons/at-sign/at-sign-$mode.svg');
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');
	const calendar = useThemeImage('/assets/icons/calendar/calendar-$mode.svg');

	return (
		<>
			<UserMainDetail>
				<InputContainer>
					<Field component={FormikAvatarInput} name={fields.avatar} />
				</InputContainer>
				<UserMainDetailInputs>
					<TextInput name={fields.firstname} icon={username} label="اسم" />
					<TextInput name={fields.lastname} icon={username} label="فامیلی" />
				</UserMainDetailInputs>
			</UserMainDetail>
			<UserBodyDetail>
				<TextInput name={fields.username} icon={username} label="نام کاربری" />
				<TextInput
					name={fields.displayName}
					icon={username}
					label="نام نمایشی"
				/>
				<TextInput
					name={fields.email}
					icon={atSign}
					label="ایمیل"
					editable={false}
				/>
				<InputContainer>
					<Field
						label="تاریخ تولد"
						placeholder="تاریخ تولد شما"
						icon={calendar}
						primary
						name={fields.birthday}
						component={FormikDateTimeInput}
						minDate={new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)}
						maxDate={new Date(Date.now() - 16 * 365 * 24 * 60 * 60 * 1000)}
					/>
				</InputContainer>
				<InputContainer>
					<Field
						label="بیو"
						placeholder="بیو شما"
						primary
						name={fields.bio}
						component={FormikTextEditor}
					/>
				</InputContainer>
				<InputContainer>
					<Field
						label="جنسیت"
						name={fields.gender}
						component={FormikOpenSelect}
						items={genderItems}
					/>
				</InputContainer>
			</UserBodyDetail>
		</>
	);
};
