import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {useRouter} from 'next/router';

import {
	Channel,
	ChannelAdminPermission,
	ThemeMode,
	User,
} from '../../../../../types';
import {SignHeader} from '../../../sign';
import {ErrorPage} from '../../../error';
import {EditAdmin} from './edit-amin.component';
import {useAuth} from '../../../../../hooks';

interface Props {
	admin?: User;
	channel?: Channel;
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const EditAdminView: FC<Props> = ({admin, channel, setTheme}) => {
	const router = useRouter();
	const {asPath} = router.query;

	const {isSigned, isLoading, user} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	if (!channel)
		return (
			<ErrorPage
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!channel.verified)
		return (
			<ErrorPage
				code={404}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (!admin)
		return (
			<ErrorPage
				code={404}
				setTheme={setTheme}
				title="کاربری با ایمیل یا نام کاربری وارد شده وجود ندارد."
			/>
		);

	if (channel.ownerData?.id === admin.id)
		return (
			<ErrorPage
				code={401}
				title="امکان ویرایش صاحب کانال وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!channel.admins?.some(({userData}) => userData?.id === admin.id))
		return (
			<ErrorPage
				code={401}
				title="ادمین قبلا به کانال اضافه نشده است."
				setTheme={setTheme}
			/>
		);

	if (channel.owner !== user?.id && !channel.myAdmin)
		return (
			<ErrorPage
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	if (
		channel.myAdmin &&
		channel.myAdmin.permissions?.includes(
			ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS
		)
	)
		return (
			<ErrorPage
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<SignHeader />
			<EditAdmin admin={admin} channel={channel} />
		</div>
	);
};
