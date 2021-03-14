import React from 'react';
import Image from 'next/image';

import {Button, Input} from '../../shared';
import {Color} from '../../../data';
import {
	Body,
	ConvertLink,
	ConvertText,
	InputContainer,
	Profile,
	ProfileHeader,
	SubmitContainer,
} from './sign-components.component';
import {useThemeImage} from '../../../hooks';

export const SignInBody = () => {
	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	return (
		<Body>
			<Profile>
				<Image src={profile} width="200px" height="200px" />
			</Profile>
			<ProfileHeader>ورود</ProfileHeader>
			<InputContainer>
				<Input
					label="ایمیل یا نام کاربری"
					placeholder="ایمیل یا نام کابری شما"
					icon={username}
					primary
					type="text"
					name="authKey"
				/>
			</InputContainer>
			<InputContainer>
				<Input
					label="رمز عبور"
					placeholder="رمز عبور شما"
					primary
					type="password"
					name="password"
				/>
			</InputContainer>
			<ConvertText>
				<div>
					رمز عبور خود را فراموش کردید؟{' '}
					<ConvertLink>رمز عبور خود را بازیابی کنید!</ConvertLink>
				</div>
				<div>
					حساب کاربری ندارید؟ <ConvertLink>ثبت نام کنید!</ConvertLink>
				</div>
			</ConvertText>
			<SubmitContainer>
				<Button primary color={Color.GHOST_WHITE}>
					ثبت نام
				</Button>
			</SubmitContainer>
		</Body>
	);
};
