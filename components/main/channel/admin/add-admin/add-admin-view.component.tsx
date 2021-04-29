import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {useRouter} from 'next/router';

import {SignHeader} from '../../../sign';
import {Error} from '../../../error';
import {AddAdmin} from './add-amin.component';
import {useAuth} from '../../../../../hooks';
import {
	Channel,
	ChannelAdminPermission,
	ThemeMode,
	User,
} from '../../../../../types';

interface Props {
	admin?: User;
	channel?: Channel;
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

export const AddAdminView: FC<Props> = ({admin, channel, setTheme}) => {
	const router = useRouter();
	const {asPath} = router.query;

	const {isSigned, isLoading, user} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	if (!channel)
		return (
			<Error
				code={404}
				title="کانالی با این هندل وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (!channel.verified)
		return (
			<Error
				code={404}
				title="کانال هنوز تایید نشده است."
				setTheme={setTheme}
			/>
		);

	if (!admin)
		return (
			<Error
				code={404}
				title="کاربری با ایمیل یا نام کاربری وارد شده وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (channel.ownerData?.id === admin.id)
		return (
			<Error
				code={401}
				title="امکان اضافه کردن صاحب کانال به عنوان ادمین وجود ندارد."
				setTheme={setTheme}
			/>
		);

	if (channel.admins?.some(({userData}) => userData?.id === admin.id))
		return (
			<Error
				code={401}
				title="ادمین قبلا به کانال اضافه شده است."
				setTheme={setTheme}
			/>
		);

	if (channel.owner !== user?.id && !channel.myAdmin)
		return (
			<Error
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	if (
		channel.myAdmin &&
		channel.myAdmin.permissions?.includes(ChannelAdminPermission.POST)
	)
		return (
			<Error
				code={403}
				title="شما اجازه دسترسی به این صفحه را ندارید!"
				setTheme={setTheme}
			/>
		);

	return (
		<div>
			<SignHeader />
			<AddAdmin admin={admin} channel={channel} />
		</div>
	);
};
