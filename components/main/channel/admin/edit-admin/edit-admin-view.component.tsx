import React, {FC} from 'react';
import Error from 'next/error';

import {Channel, User} from '../../../../../types';
import {SignHeader} from '../../../sign';
import {EditAdmin} from './edit-amin.component';

interface Props {
	admin?: User;
	channel?: Channel;
}

export const EditAdminView: FC<Props> = ({admin, channel}) => {
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

	return (
		<div>
			<SignHeader />
			<EditAdmin admin={admin} channel={channel} />
		</div>
	);
};
