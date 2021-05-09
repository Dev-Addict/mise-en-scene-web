import {useState} from 'react';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {ThemeProvider} from 'styled-components';
import 'nprogress/nprogress.css';

import {
	CopyProvider,
	FloatingPen,
	GlobalStyle,
	Loading,
	OverallHead,
	SocketProvider,
} from '../components';
import {ThemeMode} from '../types';
import {darkTheme, lightTheme} from '../data';
import {apolloClient} from '../api';
import {AuthProvider} from '../components';
import {useModeTheme, useOnlineRouter, useProgressBar} from '../hooks';

const App = ({Component, pageProps}: AppProps) => {
	const [theme, setTheme] = useState(useModeTheme());

	useProgressBar();
	useOnlineRouter();

	return (
		<ApolloProvider client={apolloClient}>
			<AuthProvider>
				<ThemeProvider
					theme={theme === ThemeMode.DARK ? darkTheme : lightTheme}>
					<SocketProvider>
						<CopyProvider>
							<OverallHead />
							<GlobalStyle />
							<Component {...pageProps} setTheme={setTheme} />
							<FloatingPen />
							<Loading />
						</CopyProvider>
					</SocketProvider>
				</ThemeProvider>
			</AuthProvider>
		</ApolloProvider>
	);
};

export default App;
