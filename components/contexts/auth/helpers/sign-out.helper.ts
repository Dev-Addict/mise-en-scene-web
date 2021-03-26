import {Dispatch, SetStateAction} from 'react';

import {User} from '../../../../types';
import Cookie from 'js-cookie';

interface Props {
	setUser: Dispatch<SetStateAction<User | null>>;
	setSigned: Dispatch<SetStateAction<boolean>>;
	setToken: Dispatch<SetStateAction<string | undefined>>;
}

export const signOut = ({setUser, setSigned, setToken}: Props) => (): void => {
	Cookie.remove('auth-token');
	setUser(null);
	setSigned(false);
	setToken(undefined);
};
