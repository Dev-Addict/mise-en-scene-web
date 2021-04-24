import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Header, Meta} from '../components';
import {Props} from '../types';

const DayChoice: NextPage<Props> = ({setTheme}: Props) => {
	return (
		<div>
			<Meta title="انتخاب روز" />
			<Header setTheme={setTheme} />
			<ComingSoon />
		</div>
	);
};

export default DayChoice;
