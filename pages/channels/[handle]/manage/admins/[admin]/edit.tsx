import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';

import {EditAdminView, Meta} from '../../../../../../components';
import {Channel, Props, User} from '../../../../../../types';
import {findChannel, findUser} from '../../../../../../helpers';
import {cookieParser} from '../../../../../../utils';
import {useAuth} from '../../../../../../hooks';

interface InitialProps {
	channel?: Channel;
	admin?: User;
}

const EditAdmin: NextPage<Props & InitialProps, InitialProps> = ({
	admin,
	channel,
}) => {
	const router = useRouter();
	const {asPath} = router;

	const [localChannel, setLocalChannel] = useState(channel);
	const [localAdmin, setLocalAdmin] = useState(admin);

	const {isSigned, isLoading} = useAuth();

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	useEffect(() => {
		setLocalChannel(channel);
	}, [channel]);

	useEffect(() => {
		setLocalAdmin(admin);
	}, [admin]);

	return (
		<div>
			<Meta title={`ویرایش مدیر ${channel?.name}`} />
			<EditAdminView admin={localAdmin} channel={localChannel} />
		</div>
	);
};

EditAdmin.getInitialProps = async ({query: {handle, admin: authKey}, req}) => {
	const token =
		cookieParser(req?.headers?.cookie || '')['auth-token'] ||
		Cookie.get('auth-token');

	const channel = await findChannel(handle as string, token);
	const admin = await findUser(
		{
			$or: [
				{
					username: authKey,
				},
				{
					email: authKey,
				},
			],
		},
		token
	);

	return {
		channel,
		admin,
	};
};

export default EditAdmin;
