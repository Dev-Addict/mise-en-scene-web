import {useState} from 'react';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {ThemeProvider} from 'styled-components';
import 'nprogress/nprogress.css';

import {GlobalStyle, Loading} from '../components';
import {ThemeMode} from '../types';
import {darkTheme, lightTheme} from '../data';
import {apolloClient} from '../api';
import {AuthProvider} from '../components';
import {useForceUpdate, useModeTheme, useProgressBar} from '../hooks';

const App = ({Component, pageProps}: AppProps) => {
	const [theme, setTheme] = useState(useModeTheme());

	const isMounted = useForceUpdate();

	useProgressBar();

	return (
		<ApolloProvider client={apolloClient}>
			<AuthProvider>
				<ThemeProvider
					theme={theme === ThemeMode.DARK ? darkTheme : lightTheme}>
					<GlobalStyle />
					{isMounted && (
						<>
							<Component {...pageProps} setTheme={setTheme} />
							<Loading />
						</>
					)}
				</ThemeProvider>
			</AuthProvider>
		</ApolloProvider>
	);
};

export default App;
