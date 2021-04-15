import React, {useState} from 'react';

import {ActionContainer} from './profile-components.component';
import {Button, SlideMessage, Text} from '../../shared';
import {Color} from '../../../data';
import {useAuth} from '../../../hooks';

export const ChangePassword = () => {
	const [loading, setLoading] = useState(false);

	const {user, resetPasswordRequest} = useAuth();

	const action = () => async () => {
		if (loading) return;

		setLoading(true);

		const response = await resetPasswordRequest({authKey: user?.email || ''});

		setLoading(false);

		return response.success;
	};

	return (
		<ActionContainer>
			<Text>آیا می خواهید رمزعبور خود را تغییر دهید؟</Text>
			<SlideMessage
				message="ایمیل ارسال شد!"
				view={
					<Button
						primary
						color={Color.GHOST_WHITE}
						circular
						minWidth={150}
						disabled={loading}>
						تغییر رمزعبور
					</Button>
				}
				action={action()}
			/>
		</ActionContainer>
	);
};
