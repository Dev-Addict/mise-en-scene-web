import React, {FC, useEffect} from 'react';
import {useRouter} from 'next/router';
import Error from 'next/error';

import {Channel, ChannelAdminPermission, User} from '../../../../../types';
import {SignHeader} from '../../../sign';
import {AddAdmin} from './add-amin.component';
import {useAuth} from '../../../../../hooks';

interface Props {
	admin?: User;
	channel?: Channel;
}

export const AddAdminView: FC<Props> = ({admin, channel}) => {
	const router = useRouter();
	const {asPath} = router.query;

	const {isSigned, isLoading, user} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	if (!channel)
		return <Error statusCode={404} title="کانالی با این هندل وجود ندارد." />;

	if (!channel.verified)
		return <Error statusCode={404} title="کانال هنوز تایید نشده است." />;

	if (!admin)
		return (
			<Error
				statusCode={404}
				title="کاربری با ایمیل یا نام کاربری وارد شده وجود ندارد."
			/>
		);

	if (channel.ownerData?.id === admin.id)
		return (
			<Error
				statusCode={401}
				title="امکان اضافه کردن صاحب کانال به عنوان ادمین وجود ندارد."
			/>
		);

	if (channel.admins?.some(({userData}) => userData?.id === admin.id))
		return (
			<Error statusCode={401} title="ادمین قبلا به کانال اضافه شده است." />
		);

	if (channel.owner !== user?.id && !channel.myAdmin)
		return (
			<Error statusCode={403} title="شما اجازه دسترسی به این صفحه را ندارید!" />
		);

	if (
		channel.myAdmin &&
		channel.myAdmin.permissions?.includes(ChannelAdminPermission.POST)
	)
		return (
			<Error statusCode={403} title="شما اجازه دسترسی به این صفحه را ندارید!" />
		);

	return (
		<div>
			<SignHeader />
			<AddAdmin admin={admin} channel={channel} />
		</div>
	);
};
