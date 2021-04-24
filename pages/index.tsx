import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Header} from '../components';
import {Props} from '../types';

const Home: NextPage<Props> = ({setTheme}) => {
	return (
		<div>
			<Header setTheme={setTheme} />
			<ComingSoon />
		</div>
	);
};

export default Home;
