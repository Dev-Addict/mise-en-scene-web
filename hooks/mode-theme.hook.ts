import useDarkMode from 'use-dark-mode';
import Cookie from 'js-cookie';

import {ThemeMode} from '../types';

export const useModeTheme = () => {
	const cookieTheme = Cookie.get('theme');

	const {value: isDarkMode} = useDarkMode(false, {
		storageKey: undefined,
		onChange: undefined,
	});

	return (cookieTheme && cookieTheme === ThemeMode.DARK) ||
		(isDarkMode && cookieTheme !== ThemeMode.LIGHT)
		? ThemeMode.DARK
		: ThemeMode.LIGHT;
};
