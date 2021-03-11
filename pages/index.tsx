import React from 'react';

import {Header} from '../components';
import {Props} from '../types';

const Home = ({setTheme}: Props) => {
	return (
		<div>
			<Header setTheme={setTheme} />
		</div>
	);
};

export default Home;
