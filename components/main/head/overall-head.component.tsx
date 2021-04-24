import React from 'react';
import Head from 'next/head';

import {useThemeImage} from '../../../hooks';

export const OverallHead = () => {
	const favicon = useThemeImage('/assets/icons/favicon/favicon-$mode.ico');

	return (
		<Head>
			<title>میزانسن - اخبار سینمایی</title>
			<link rel="icon" href={favicon} />
		</Head>
	);
};
