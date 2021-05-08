import React from 'react';
import {NextPage} from 'next';

import {
	ErrorPage,
	IllustrationMessage,
	Meta,
	SignHeader,
} from '../../../../components';
import {Props, User} from '../../../../types';
import {verifyEmail} from '../../../../helpers';
import {useThemeImage} from '../../../../hooks';

interface InitialProps {
	user?: User;
	exists: boolean;
	expired: boolean;
}

const Reset: NextPage<Props & InitialProps, InitialProps> = ({
	exists,
	expired,
	setTheme,
}) => {
	const secured = useThemeImage(
		'/assets/illustrations/secured/secured-$mode.svg'
	);

	if (!exists)
		return (
			<ErrorPage
				code={404}
				title="نشانه تایید ایمیل پیدا نشد."
				setTheme={setTheme}
			/>
		);

	if (expired)
		return (
			<ErrorPage
				code={410}
				title="زمان استفاده از نشانه وارد شده گذشته است لطفا دوباره است. لطفا دوباره تلاش کنید."
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<Meta title="تایید ایمیل" />
			<SignHeader />
			<IllustrationMessage
				message="ایمیل شما با موفقیت تایید شد."
				image={secured}
				extra={40}
			/>
		</div>
	);
};

Reset.getInitialProps = async ({query: {token}}) => {
	return verifyEmail(token as string);
};

export default Reset;
