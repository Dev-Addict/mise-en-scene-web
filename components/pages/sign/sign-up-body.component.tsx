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

export const SignUpBody = () => {
	const profile = useThemeImage('/assets/icons/profile/profile-$mode.svg');
	const atSign = useThemeImage('/assets/icons/at-sign/at-sign-$mode.svg');
	const username = useThemeImage('/assets/icons/user-name/user-name-$mode.svg');

	return (
		<Body>
			<Profile>
				<Image src={profile} width="200px" height="200px" />
			</Profile>
			<ProfileHeader>ثبت نام</ProfileHeader>
			<InputContainer>
				<Input
					label="ایمیل"
					placeholder="ایمیل شما"
					icon={atSign}
					primary
					type="email"
					name="email"
				/>
			</InputContainer>
			<InputContainer>
				<Input
					label="نام کاربری"
					placeholder="نام کاربری شما"
					icon={username}
					primary
					type="text"
					name="username"
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
				حساب کاربری دارید؟ <ConvertLink>وارد شوید!</ConvertLink>
			</ConvertText>
			<SubmitContainer>
				<Button primary color={Color.GHOST_WHITE}>
					ثبت نام
				</Button>
			</SubmitContainer>
		</Body>
	);
};
