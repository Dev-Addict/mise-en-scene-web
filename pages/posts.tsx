import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Header, Meta} from '../components';
import {Props} from '../types';

const Posts: NextPage<Props> = ({setTheme}: Props) => {
	return (
		<div>
			<Meta title="پست ها" />
			<Header setTheme={setTheme} />
			<ComingSoon />
		</div>
	);
};

export default Posts;
