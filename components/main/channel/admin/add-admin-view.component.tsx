import React, {FC} from 'react';
import Error from 'next/error';

import {Channel, User} from '../../../../types';
import {SignHeader} from '../../sign';
import {AddAdmin} from './add-amin.component';

interface Props {
	admin?: User;
	channel?: Channel;
}

export const AddAdminView: FC<Props> = ({admin, channel}) => {
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

	return (
		<div>
			<SignHeader />
			<AddAdmin admin={admin} channel={channel} />
		</div>
	);
};
