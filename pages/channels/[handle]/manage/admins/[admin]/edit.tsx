import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Cookie from 'js-cookie';

import {EditAdminView, Meta} from '../../../../../../components';
import {Channel, Process, Props, User} from '../../../../../../types';
import {findChannel, findUser} from '../../../../../../helpers';
import {useAppState, useAuth} from '../../../../../../hooks';

const EditAdmin: NextPage<Props> = ({setTheme}) => {
	const router = useRouter();
	const {asPath} = router;
	const {handle, admin: authKey} = router.query;

	const [channel, setChannel] = useState<Channel | undefined>(undefined);
	const [admin, setAdmin] = useState<User | undefined>(undefined);

	const {isSigned, isLoading} = useAuth();

	const {addProcess, removeProcess} = useAppState();

	useEffect(() => {
		const token = Cookie.get('auth-token');

		(async () => {
			addProcess(Process.CHANNEL);
			addProcess(Process.ADMIN);

			setChannel(await findChannel(handle as string, token));
			setAdmin(
				await findUser(
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
				)
			);

			addProcess(Process.ADMIN);
			removeProcess(Process.CHANNEL);
		})();
	}, [handle, authKey]);

	useEffect(() => {
		if (!isLoading && !isSigned) router.push(`/sign?callback=${asPath}`);
	}, [asPath, isSigned, isLoading]);

	return (
		<div>
			<Meta title={`ویرایش مدیر ${channel?.name}`} />
			<EditAdminView admin={admin} channel={channel} setTheme={setTheme} />
		</div>
	);
};

export default EditAdmin;
