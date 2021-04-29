import React from 'react';
import {NextPage} from 'next';
import {ErrorProps} from 'next/error';

import {Error} from '../components';
import {Props} from '../types';

const Error500: NextPage<ErrorProps & Props> = (props) => {
	return <Error {...props} code={500} />;
};

export default Error500;
