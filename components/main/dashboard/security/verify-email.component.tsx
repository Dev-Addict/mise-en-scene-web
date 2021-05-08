import React, {useState} from 'react';

import {Button, Text, SlideMessage} from '../../../shared';
import {Color} from '../../../../data';
import {useAuth} from '../../../../hooks';

export const VerifyEmail = () => {
	const [loading, setLoading] = useState(false);

	const {user, verifyEmailRequest} = useAuth();

	const action = () => async () => {
		if (loading) return;

		setLoading(true);

		const response = await verifyEmailRequest({email: user?.email || ''});

		setLoading(false);

		return response.success;
	};

	return (
		<div>
			<Text text="آیا می خواهید ایمیل خود را تایید کنید؟" />
			<SlideMessage
				message="ایمیل ارسال شد!"
				view={
					<Button
						primary
						color={Color.GHOST_WHITE}
						circular
						minWidth={150}
						disabled={loading}>
						تایید ایمیل
					</Button>
				}
				action={action()}
			/>
		</div>
	);
};
