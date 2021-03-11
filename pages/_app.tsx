import {FC, useEffect, useState} from 'react';
import {AppProps} from 'next/app';
import Cookie from 'js-cookie';
import {createGlobalStyle, ThemeProvider, useTheme} from 'styled-components';
import useDarkMode from 'use-dark-mode';

import {StyledProps, ThemeMode} from '../types';
import {darkTheme, lightTheme} from '../data/themes';

const Style = createGlobalStyle<StyledProps>`
  * {
    font-family: 'Lalezar', cursive;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${({theme: {foreground}}) => foreground};
		user-select: none;
		transition: all 336ms;
  }
	
	html, body {
		background-color: ${({theme: {background}}) => background};
		height: 100vh;
	}
`;

const App: FC<AppProps> = ({Component, pageProps}) => {
	const cookieTheme = Cookie.get('theme');

	const {value: isDarkMode} = useDarkMode(false, {
		storageKey: undefined,
		onChange: undefined,
	});

	const [theme, setTheme] = useState(
		(cookieTheme && cookieTheme === ThemeMode.DARK) ||
			(isDarkMode && cookieTheme !== ThemeMode.LIGHT)
			? ThemeMode.DARK
			: ThemeMode.LIGHT
	);
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<ThemeProvider theme={theme === ThemeMode.DARK ? darkTheme : lightTheme}>
			<Style />
			{isMounted && <Component {...pageProps} setTheme={setTheme} />}
		</ThemeProvider>
	);
};

export default App;
