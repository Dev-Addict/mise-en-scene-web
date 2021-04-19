import React from 'react';
import {Field} from 'formik';

import {
	InputContainer,
	ProfileHeader,
} from '../../sign/sign-components.component';
import {useThemeImage} from '../../../../hooks';
import {FormikAvatarInput, FormikInput} from '../../../shared';
import {RequestChannelFields} from './request-channel.form';

const fields: {
	[key in keyof RequestChannelFields]: string;
} = {
	handle: 'handle',
	name: 'name',
	cover: 'cover',
};

export const RequestChannelInputs = () => {
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');
	const atSign = useThemeImage('/assets/icons/at-sign/at-sign-$mode.svg');

	return (
		<>
			<ProfileHeader>
				<Field
					component={FormikAvatarInput}
					name={fields.cover}
					defaultSrc="/assets/icons/aligned-megaphone/aligned-megaphone-$mode.svg"
				/>
			</ProfileHeader>
			<InputContainer>
				<Field
					label="هندل"
					placeholder="هندل کانال"
					icon={atSign}
					primary
					type="text"
					name={fields.handle}
					component={FormikInput}
				/>
			</InputContainer>
			<InputContainer>
				<Field
					label="نام"
					placeholder="نام کانال"
					icon={username}
					primary
					type="text"
					name={fields.name}
					component={FormikInput}
				/>
			</InputContainer>
		</>
	);
};
