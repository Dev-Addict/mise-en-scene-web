import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Header, Meta} from '../components';
import {Props} from '../types';

const Home: NextPage<Props> = ({setTheme}) => {
	return (
		<div>
			<Meta title="خانه" />
			<Header setTheme={setTheme} />
			<ComingSoon />
		</div>
	);
};

export default Home;
