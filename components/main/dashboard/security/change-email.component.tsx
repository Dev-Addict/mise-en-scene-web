import React, {useState} from 'react';

import {Button, Text, SlideMessage} from '../../../shared';
import {Color} from '../../../../data';
import {useAuth} from '../../../../hooks';

export const ChangeEmail = () => {
	const [loading, setLoading] = useState(false);

	const {user, resetEmailRequest} = useAuth();

	const action = () => async () => {
		if (loading) return;

		setLoading(true);

		const response = await resetEmailRequest({email: user?.email || ''});

		setLoading(false);

		return response.success;
	};

	return (
		<div>
			<Text text="آیا می خواهید ایمیل خود را تغییر دهید؟" />
			<SlideMessage
				message="ایمیل ارسال شد!"
				view={
					<Button
						primary
						color={Color.GHOST_WHITE}
						circular
						minWidth={150}
						disabled={loading}>
						تغییر ایمیل
					</Button>
				}
				action={action()}
			/>
		</div>
	);
};
