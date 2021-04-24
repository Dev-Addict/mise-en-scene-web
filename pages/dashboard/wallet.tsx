import React from 'react';
import {NextPage} from 'next';

import {ComingSoon, Dashboard} from '../../components';
import {Props} from '../../types';

const Security: NextPage<Props> = ({setTheme}) => {
	return (
		<Dashboard setTheme={setTheme}>
			<ComingSoon />
		</Dashboard>
	);
};

export default Security;
