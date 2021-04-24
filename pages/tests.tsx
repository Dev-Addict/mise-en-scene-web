import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Header, Meta} from '../components';
import {Props} from '../types';

const Tests: NextPage<Props> = ({setTheme}: Props) => {
	return (
		<div>
			<Meta title="تست ها" />
			<Header setTheme={setTheme} />
			<ComingSoon />
		</div>
	);
};

export default Tests;
