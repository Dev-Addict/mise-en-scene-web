import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Header} from '../components';
import {Props} from '../types';

const Tests: NextPage<Props> = ({setTheme}: Props) => {
	return (
		<div>
			<Header setTheme={setTheme} />
			<ComingSoon />
		</div>
	);
};

export default Tests;
