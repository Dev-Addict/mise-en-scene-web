import {Dispatch, SetStateAction} from 'react';

import {ThemeMode} from '../data';

export interface Props {
	setTheme: Dispatch<SetStateAction<ThemeMode>>;
}
