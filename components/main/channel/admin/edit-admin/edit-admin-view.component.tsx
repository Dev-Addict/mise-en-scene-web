import React, {FC, useEffect} from 'react';
import {useRouter} from 'next/router';
import Error from 'next/error';

import {Channel, ChannelAdminPermission, User} from '../../../../../types';
import {SignHeader} from '../../../sign';
import {EditAdmin} from './edit-amin.component';
import {useAuth} from '../../../../../hooks';

interface Props {
	admin?: User;
	channel?: Channel;
}

export const EditAdminView: FC<Props> = ({admin, channel}) => {
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
			<Error statusCode={401} title="امکان ویرایش صاحب کانال وجود ندارد." />
		);

	if (!channel.admins?.some(({userData}) => userData?.id === admin.id))
		return (
			<Error statusCode={401} title="ادمین قبلا به کانال اضافه نشده است." />
		);

	if (channel.owner !== user?.id && !channel.myAdmin)
		return (
			<Error statusCode={403} title="شما اجازه دسترسی به این صفحه را ندارید!" />
		);

	if (
		channel.myAdmin &&
		channel.myAdmin.permissions?.includes(
			ChannelAdminPermission.EDIT_ADMINS_PERMISSIONS
		)
	)
		return (
			<Error statusCode={403} title="شما اجازه دسترسی به این صفحه را ندارید!" />
		);

	return (
		<div>
			<SignHeader />
			<EditAdmin admin={admin} channel={channel} />
		</div>
	);
};
