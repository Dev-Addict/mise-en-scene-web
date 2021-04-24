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
} from '../components';
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
		<CopyProvider>
			<ApolloProvider client={apolloClient}>
				<AuthProvider>
					<ThemeProvider
						theme={theme === ThemeMode.DARK ? darkTheme : lightTheme}>
						<OverallHead />
						<GlobalStyle />
						{isMounted && (
							<>
								<Component {...pageProps} setTheme={setTheme} />
								<FloatingPen />
								<Loading />
							</>
						)}
					</ThemeProvider>
				</AuthProvider>
			</ApolloProvider>
		</CopyProvider>
	);
};

export default App;
