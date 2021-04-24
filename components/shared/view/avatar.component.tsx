import React, {FC} from 'react';

import {User} from '../../../types';
import {useAuth} from '../../../hooks';
import {Cover} from './cover.component';

interface Props {
	user?: User;
	size?: number;
	src?: string;
}

export const Avatar: FC<Props> = ({user, size = 200, src}) => {
	const {user: authUser} = useAuth();

	const localUser = user || authUser;

	return (
		<Cover
			size={size}
			src={`/image/user/avatar/${src || localUser?.avatar || 'default.svg'}`}
			link={src ? `/users/${localUser?.username || 'no'}` : undefined}
		/>
	);
};
