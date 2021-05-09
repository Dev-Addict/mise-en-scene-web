import {useEffect, useState} from 'react';
import Cookie from 'js-cookie';
import useDarkMode from 'use-dark-mode';

import {ThemeMode} from '../types';
import {useForceUpdate} from './force-update.hook';

export const useModeTheme = () => {
	const [theme, setTheme] = useState(ThemeMode.DARK);

	const cookieTheme = Cookie.get('theme');

	const {value: isDarkMode} = useDarkMode(false, {
		storageKey: undefined,
		onChange: undefined,
	});

	const isMounted = useForceUpdate();

	useEffect(() => {
		setTheme(
			(cookieTheme && cookieTheme === ThemeMode.DARK) ||
				(isDarkMode && cookieTheme !== ThemeMode.LIGHT)
				? ThemeMode.DARK
				: ThemeMode.LIGHT
		);
	}, [cookieTheme, isDarkMode, isMounted]);

	return theme;
};
